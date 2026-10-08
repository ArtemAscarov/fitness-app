# FitnesPro

Каталог фитнес-упражнений: регистрация и вход, фильтры по категориям, избранное, админ-панель для управления упражнениями.

**Стек:** Next.js 16 · React 19 · TanStack Query · Express 5 · Prisma · PostgreSQL · Docker

## Быстрый старт (Docker)

Нужен только [Docker Desktop](https://www.docker.com/products/docker-desktop/), Node.js ставить не надо.

```bash
git clone <url-репозитория>
cd fitness-app
cp backend/.env.example backend/.env
docker compose up --build
```

Откройте http://localhost:3000.

При первом запуске бэкенд сам применит миграции и заполнит базу демо-данными. Повторные запуски данные не трогают: база хранится в Docker-томе `pgdata`.

### Демо-аккаунты

| Роль  | Email              | Пароль                             |
| ----- | ------------------ | ---------------------------------- |
| USER  | `demo@fitness.app` | `demo12345`                        |
| ADMIN | `admin@gmail.com`  | значение `SEED_ADMIN_PASSWORD` в `backend/.env` |

Админ создаётся, только если задана `SEED_ADMIN_PASSWORD`. Кроме того, сид создаёт `user1…39@gmail.com` с паролем `password123`.

### Полезные команды

| Команда | Что делает |
| ------- | ---------- |
| `docker compose up --build` | собрать образы и запустить |
| `docker compose up -d` | запустить в фоне |
| `docker compose logs -f backend` | логи сервиса |
| `docker compose down` | остановить, данные остаются |
| `docker compose down -v` | остановить и **удалить базу** (следующий запуск начнёт с нуля) |
| `docker compose exec backend node dist/prisma/seed.js --force` | перезалить демо-данные |

## Как устроено

```
браузер ──► frontend :3000 (Next.js) ──► backend :3001 (Express) ──► postgres :5432
              /api/* проксируется
```

| Сервис | Образ | Порт наружу |
| ------ | ----- | ----------- |
| `frontend` | `frontend/Dockerfile`, Next.js `standalone` | 3000 |
| `backend`  | `backend/Dockerfile`, при старте `migrate deploy` → сид → сервер | 3001 |
| `postgres` | `postgres:16`, healthcheck через `pg_isready` | не пробрасывается |

**Почему браузер ходит на `/api`, а не прямо на бэкенд.** Next пересылает `/api/*` на бэкенд (`rewrites` в `frontend/next.config.ts`). Для браузера всё живёт на одном домене, и куки авторизации принадлежат домену фронта: их видят и браузер, и сервер Next (SSR, `middleware.ts`). Это важно на проде, где фронт и бэк на разных доменах.

## Переменные окружения

### backend/.env

| Переменная | Назначение | Пример |
| ---------- | ---------- | ------ |
| `DATABASE_URL` | подключение к PostgreSQL. В Docker переопределяется в `docker-compose.yml` | `postgresql://postgres:postgres@localhost:5432/fitness_db` |
| `PORT` | порт API | `3001` |
| `JWT_SECRET` | секрет подписи токенов. **На проде обязательно** длинная случайная строка | — |
| `FRONTEND_URL` | разрешённый origin для CORS | `http://localhost:3000` |
| `NODE_ENV` | `production` включает флаг `secure` у кук | `production` |
| `SEED_ADMIN_PASSWORD` | пароль админа для сида. Пусто — админ не создаётся | — |

### frontend/.env

| Переменная | Назначение | Пример |
| ---------- | ---------- | ------ |
| `BACKEND_INTERNAL_URL` | адрес бэкенда для сервера Next (прокси `/api`, SSR, middleware). Читается **и при сборке, и при запуске**: после смены нужна пересборка | `http://localhost:3001` |

В Docker эту переменную задаёт `docker-compose.yml` (`http://backend:3001`), файл `frontend/.env` не нужен.

## Запуск без Docker

Нужны Node.js 22 и запущенный PostgreSQL.

```bash
# бэкенд
cd backend
cp .env.example .env      # указать DATABASE_URL на свою базу
npm install
npm run migrate
npm run seed
npm run dev               # http://localhost:3001

# фронтенд (в другом терминале)
cd frontend
cp .env.example .env
npm install
npm run dev               # http://localhost:3000
```

Можно комбинировать: базу и бэкенд поднять через `docker compose up postgres backend`, а фронт запустить через `npm run dev`.

## Частые проблемы

- **Правки в коде не видны в Docker.** Без `--build` compose берёт старый образ: `docker compose up --build`.
- **Демо-пользователя нет после обновления сида.** Сид пропускает непустую базу. Нужно `docker compose down -v` или `seed --force`.
- **Порт занят.** 3000 или 3001 занят другой программой: остановите её или поменяйте левую часть в `ports:`.
- **`docker` не находит движок.** Docker Desktop не запущен.

## Документация

- [backend/README.md](backend/README.md) — API, модель данных, авторизация, Docker-образ
- [frontend/README.md](frontend/README.md) — структура (FSD), маршруты, работа с данными
