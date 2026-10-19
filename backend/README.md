# Backend

REST API на Express 5 + TypeScript (ESM) + Prisma + PostgreSQL. Как запустить, описано в [корневом README](../README.md).

## Скрипты

| Скрипт | Что делает |
| ------ | ---------- |
| `npm run dev` | запуск с перезагрузкой (`tsx watch`) |
| `npm run build` | сборка в `dist/` (`tsc`) |
| `npm start` | запуск собранного `dist/src/server.js` |
| `npm run migrate` | создать и применить миграцию (`prisma migrate dev`, только для разработки) |
| `npm run generate` | сгенерировать Prisma Client |
| `npm run seed` | заполнить базу, если она пустая. `-- --force` — стереть и заполнить заново |
| `npm run migrate-demo-emails` | разово перевести старые демо-адреса (`demo@fitness.app`, `admin@gmail.com`, `user1…39@gmail.com`) на `@example.com`. Меняет только email, повторный запуск безопасен |
| `npm run studio` | Prisma Studio, просмотр базы в браузере |
| `npm test` | проверка типов (`tsc --noEmit`) |

## Структура

```
backend/
├── prisma/
│   ├── schema.prisma        # модель данных
│   ├── migrations/          # история миграций
│   ├── seed.ts              # демо-данные (идемпотентный)
│   └── migrate-demo-emails.ts # разовый перенос демо-адресов на example.com
├── src/
│   ├── server.ts            # точка входа: CORS, rate limit, роутеры
│   ├── prisma.ts            # экземпляр PrismaClient
│   ├── routes/              # маршруты
│   ├── validators/          # Zod-схемы
│   ├── middleware/          # CheckAuth, валидаторы, обработчик ошибок
│   ├── controllers/         # req/res, установка кук
│   ├── services/            # бизнес-логика и запросы к БД
│   └── util/                # токены, CustomError, разбор ошибок Zod
├── Dockerfile
└── docker-entrypoint.sh
```

Поток запроса: `route → validator (Zod) → CheckAuth → controller → service → Prisma`. Ошибки сервисы бросают как `CustomError(message, status)`, ответ формирует `GlobalErrorValidator`.

## Модель данных

| Модель | Описание |
| ------ | -------- |
| `User` | email, хэш пароля, роль `USER` / `ADMIN` |
| `Refresh` | активные refresh-токены (для ротации и выхода) |
| `Exercise` | упражнение: название, длительность, калории, картинка |
| `ExerciseSection` | блок описания упражнения (техника, ошибки), удаляется вместе с упражнением |
| `Category` | категория с уникальным `slug`, связь с упражнениями многие-ко-многим |
| `CategoriesGroup` | группа категорий: мышцы, инвентарь, уровень сложности |
| `Favorite` | избранное, уникальная пара пользователь + упражнение |

Уровень сложности — не отдельная модель, а категории группы «Уровень сложности».

## Авторизация

- Вход и регистрация ставят две httpOnly-куки: `accessToken` (2 часа) и `refreshToken` (30 дней). Без «Запомнить меня» обе куки сессионные.
- `refreshToken` хранит id записи в таблице `Refresh`. `POST /refresh` удаляет старую запись и выдаёт новую пару токенов (ротация).
- `CheckAuth({ isStrict, accessedRoles })`: `isStrict` — без токена `403`, `accessedRoles` — допуск только указанным ролям. Без `isStrict` запрос проходит и без логина.
- Пароли хэшируются `bcrypt`. Куки `sameSite: "lax"`, `secure` при `NODE_ENV=production`.

## API

| Метод | Путь | Доступ | Описание |
| ----- | ---- | ------ | -------- |
| POST | `/register` | все | регистрация `{ email, password, remember? }` |
| POST | `/login` | все | вход, те же поля |
| POST | `/logout` | все | удалить refresh, очистить куки |
| POST | `/refresh` | refresh-кука | новая пара токенов |
| GET | `/users/me` | авторизован | текущий пользователь |
| GET | `/users`, `/users/:id` | ADMIN | список пользователей / один |
| GET | `/exercise` | все | список: `title`, `calory`, `isFavorite`, `category` (slug или массив), `page`, `limit` (≤ 100) |
| GET | `/exercise/:id` | все | одно упражнение |
| POST, PATCH, DELETE | `/exercise`, `/exercise/:id` | все* | создание, изменение, удаление |
| POST | `/exercise/connectToCategory`, `/exercise/disConnectToCategory` | все* | привязать / отвязать категорию |
| POST, DELETE | `/favorite` | авторизован | `{ exerciseId }` — добавить / убрать |
| GET, POST, PATCH, DELETE | `/category`, `/category/:id` | все | категории |

\* `CheckAuth()` без `isStrict`: логин не требуется. Известное ограничение, сознательно не исправлено.

Пароль: 6–256 символов. Email приводится к нижнему регистру.

**Защита:** rate limit 500 запросов / 15 минут на IP. CORS разрешает только `FRONTEND_URL` с `credentials: true`.

**`trust proxy` = 4.** На проде запрос идёт через Vercel → Cloudflare → балансировщик Render → прокси Render, и Express видит адрес последнего посредника. Настройка велит брать IP клиента из `X-Forwarded-For`, отсчитав 4 доверенных звена справа, иначе rate limit считал бы всех пользователей одним IP. Число получено по логу `X-Forwarded-For` на Render: если цепочка посредников изменится, его нужно пересчитать. Запросы напрямую на `onrender.com` (в обход Vercel) проходят на одно звено меньше, поэтому клиент может подделать свой IP для rate limit. Это известное ограничение.

## Docker-образ

Две стадии на `node:22-slim` (не alpine: нативному `bcrypt` там нужна компиляция).

- **build:** `npm ci` → `prisma generate` → `tsc`.
- **runtime:** `npm ci --omit=dev`, `openssl` (без него Prisma выбирает неверный движок), готовый `dist/`, пользователь `node`.

При старте контейнера `docker-entrypoint.sh` выполняет `prisma migrate deploy`, потом сид (пропускает непустую базу) и через `exec` запускает сервер. В compose стоит `init: true`, чтобы `docker stop` корректно останавливал сервер (SIGTERM).

`prisma` и `dotenv` лежат в `dependencies`, потому что нужны в рантайме: миграции при старте и чтение `.env`.
