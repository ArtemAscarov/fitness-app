# Backend — Техпаспорт

Подробное описание архитектуры, структуры, библиотек, модели данных и REST API бэкенда.

## 1. Общее

REST API для приложения каталога фитнес-упражнений. Слоистая архитектура
**route → middleware → controller → service → Prisma**. Аутентификация — JWT в
httpOnly-куках с refresh-ротацией. Валидация входных данных — Zod.

- **Язык:** TypeScript (ESM, `"type": "module"`)
- **Раннер dev:** `tsx watch`
- **СУБД:** PostgreSQL через Prisma ORM

## 2. Библиотеки

### Зависимости

| Пакет                 | Версия  | Назначение |
| --------------------- | ------- | ---------- |
| `express`             | ^5.2.1  | HTTP-сервер и роутинг |
| `@prisma/client`      | 5.22.0  | ORM-клиент для PostgreSQL |
| `zod`                 | ^4.3.6  | Валидация body/params/query |
| `jsonwebtoken`        | ^9.0.3  | Подпись и проверка JWT |
| `bcrypt`              | ^6.0.0  | Хеширование паролей |
| `cookie-parser`       | ^1.4.7  | Парсинг кук из запросов |
| `cors`                | ^2.8.6  | CORS + поддержка credentials |
| `express-rate-limit`  | ^8.5.2  | Ограничение частоты запросов |
| `uuid`                | ^14.0.0 | Генерация id для refresh-токенов |

### Dev-зависимости

`prisma` (CLI и миграции), `tsx` (запуск TS + watch), `typescript`, `dotenv`,
`@types/*` (express, jsonwebtoken, bcrypt, cors, cookie-parser, node).

## 3. Структура папок

```
backend/
├── prisma/
│   ├── schema.prisma          # модель данных
│   ├── migrations/            # история миграций
│   └── seed.ts                # наполнение БД демо-данными
├── src/
│   ├── server.ts              # точка входа: express-app, middleware, монтирование роутеров
│   ├── prisma.ts              # singleton PrismaClient
│   ├── routes/                # маршруты (auth, user, exercise, favorite, category, categoryGroup, refresh)
│   ├── controllers/           # обработчики req/res, работа с куками
│   ├── services/              # бизнес-логика, обращения к Prisma
│   ├── middleware/
│   │   ├── CheckAuth.ts            # проверка JWT + ролей
│   │   ├── Validators.ts          # фабрики bodyValidator/paramValidator/queryValidator (Zod)
│   │   └── GlobalErrorValidator.ts # глобальный обработчик ошибок
│   ├── validators/            # Zod-схемы для каждого ресурса
│   ├── util/
│   │   ├── createTokens.ts        # генерация access/refresh токенов + запись refresh в БД
│   │   ├── CustomError.ts         # класс ошибки со статус-кодом
│   │   └── zodErrorParser.ts      # приведение ошибок Zod к удобному формату
│   └── lib/types/type.ts      # общие TS-типы (JWT payloads и т.д.)
├── .env.example
├── tsconfig.json
└── package.json
```

### Поток запроса

```
HTTP → server.ts → CORS / json / cookieParser / rateLimit
     → Router → Middleware (Zod-валидация, CheckAuth)
     → Controller (req/res, куки) → Service (логика + Prisma) → PostgreSQL
   ↳ ошибки → GlobalErrorValidator
```

## 4. Модель данных (Prisma)

| Модель            | Описание | Ключевые связи |
| ----------------- | -------- | -------------- |
| `User`            | Пользователь: email, хеш пароля, роль (`USER`/`ADMIN`) | 1→N `Refresh`, 1→N `Favorite` |
| `Refresh`         | Активный refresh-токен (`tokenId` = uuid, `expireDate`) | N→1 `User` |
| `Exercise`        | Упражнение: title, description, duration, image, calory | N↔M `Category`, 1→N `ExerciseSection`, 1→N `Favorite` |
| `ExerciseSection` | Блок-секция упражнения (заголовок, описание, image, список) | N→1 `Exercise` (cascade) |
| `Category`        | Категория (группа мышц / инвентарь / тип тренировки / уровень сложности), `slug` уникальный | N↔M `Exercise`, N→1 `CategoriesGroup` (опционально) |
| `CategoriesGroup` | Группа категорий (например «Группы мышц», «Оборудование», «Уровень сложности») | 1→N `Category` |
| `Favorite`        | Избранное: уникальная пара `(exerciseId, userId)` | N→1 `User`, N→1 `Exercise` |

Enum `ROLE`: `ADMIN`, `USER`.

> Уровень сложности упражнения (`easy`/`medium`/`hard`) реализован не отдельной
> моделью, а категориями внутри группы «Уровень сложности» — упражнение
> связывается с ними так же, как с категориями мышц или оборудования.

## 5. Аутентификация

- При регистрации/входе сервер ставит **две httpOnly-куки**: `accessToken` (живёт 2 часа)
  и `refreshToken` (путь `/refresh`, до 30 дней).
- `accessToken` несёт `id` пользователя; `refreshToken` несёт `refreshId` (uuid),
  по которому в таблице `Refresh` хранится запись.
- При истёкшем access фронт дёргает `POST /refresh`: старый refresh удаляется,
  выдаётся новая пара токенов (**rotation**).
- Middleware `CheckAuth` проверяет токен и роль:
  - `isStrict: true` — без валидного токена сразу `403`;
  - `accessedRoles: ["ADMIN"]` — допуск только для указанных ролей.
- Пароли хешируются `bcrypt` (10 раундов).

## 6. REST API

Базовый URL: `http://localhost:<PORT>`. Аутентификация передаётся куками
(`withCredentials`). Валидация — Zod.

**Auth (`/`)**

| Метод | Путь        | Тело | Описание |
| ----- | ----------- | ---- | -------- |
| POST  | `/register` | `{ email, password, remember? }` | Регистрация, выставляет куки-токены |
| POST  | `/login`    | `{ email, password, remember? }` | Вход, выставляет куки-токены |
| POST  | `/logout`   | — | Удаляет refresh из БД и чистит куки |

> Пароль: 6–256 символов. `email` нормализуется (trim + lowercase).

**Refresh (`/refresh`)**

| Метод | Путь | Описание |
| ----- | ---- | -------- |
| POST  | `/`  | По refresh-куке выдаёт новую пару токенов (rotation) |

**Users (`/users`)**

| Метод | Путь   | Доступ | Описание |
| ----- | ------ | ------ | -------- |
| GET   | `/me`  | авторизован | Текущий пользователь |
| GET   | `/`    | ADMIN | Список пользователей (query-пагинация) |
| GET   | `/:id` | ADMIN | Пользователь по id |

**Exercise (`/exercise`)**

| Метод  | Путь                    | Описание |
| ------ | ----------------------- | -------- |
| GET    | `/`                     | Список с фильтрами и пагинацией |
| GET    | `/:id`                  | Одно упражнение |
| POST   | `/`                     | Создать упражнение (+ секции) |
| PATCH  | `/:id`                  | Частично обновить |
| DELETE | `/:id`                  | Удалить |
| POST   | `/connectToCategory`    | Привязать упражнение к категории |
| POST   | `/disConnectToCategory` | Отвязать упражнение от категории |

Query-фильтры `GET /exercise`: `title`, `calory`, `isFavorite` (bool),
`category` (slug или массив slug'ов — включая slug'и категорий-уровней сложности),
`page` (default 1), `limit` (default 20, max 100).

**Favorite (`/favorite`)**

| Метод  | Путь | Доступ | Тело | Описание |
| ------ | ---- | ------ | ---- | -------- |
| POST   | `/`  | авторизован | `{ exerciseId }` | Добавить в избранное |
| DELETE | `/`  | авторизован | `{ exerciseId }` | Убрать из избранного |

**Category (`/category`)** и **CategoryGroup (`/categoryGroup`)** — одинаковый CRUD:

| Метод  | Путь   | Описание |
| ------ | ------ | -------- |
| GET    | `/`    | Список |
| POST   | `/`    | Создать |
| PATCH  | `/:id` | Обновить |
| DELETE | `/:id` | Удалить |

> `POST`/`PATCH` для `/category` принимают опциональный `categoryGroupId`
> для привязки категории к группе.

## 7. Кросс-секционные детали

- **Rate limiting:** 500 запросов / 15 минут на клиента (`express-rate-limit`).
- **CORS:** методы `GET, POST, PATCH, DELETE`, `credentials: true`, origin из `FRONTEND_URL`.
- **Обработка ошибок:** сервисы бросают `CustomError(message, statusCode)`;
  глобальный `GlobalErrorValidator` формирует JSON-ответ.
- **Ошибки валидации:** Zod-ошибки приводятся к читаемому виду в `zodErrorParser.ts`.

> Как поднять и запустить — в [start.md](start.md).

---
---

# Backend — Tech Passport

A detailed description of the backend architecture, structure, libraries, data model and REST API.

## 1. Overview

REST API for a fitness-exercise catalog application. Layered architecture:
**route → middleware → controller → service → Prisma**. Authentication is JWT in
httpOnly cookies with refresh rotation. Input validation is done with Zod.

- **Language:** TypeScript (ESM, `"type": "module"`)
- **Dev runner:** `tsx watch`
- **Database:** PostgreSQL via Prisma ORM

## 2. Libraries

### Dependencies

| Package               | Version | Purpose |
| --------------------- | ------- | ------- |
| `express`             | ^5.2.1  | HTTP server and routing |
| `@prisma/client`      | 5.22.0  | ORM client for PostgreSQL |
| `zod`                 | ^4.3.6  | body/params/query validation |
| `jsonwebtoken`        | ^9.0.3  | Signing and verifying JWTs |
| `bcrypt`              | ^6.0.0  | Password hashing |
| `cookie-parser`       | ^1.4.7  | Parsing cookies from requests |
| `cors`                | ^2.8.6  | CORS + credentials support |
| `express-rate-limit`  | ^8.5.2  | Request rate limiting |
| `uuid`                | ^14.0.0 | Generating ids for refresh tokens |

### Dev dependencies

`prisma` (CLI and migrations), `tsx` (run TS + watch), `typescript`, `dotenv`,
`@types/*` (express, jsonwebtoken, bcrypt, cors, cookie-parser, node).

## 3. Folder structure

```
backend/
├── prisma/
│   ├── schema.prisma          # data model
│   ├── migrations/            # migration history
│   └── seed.ts                # seeds the DB with demo data
├── src/
│   ├── server.ts              # entry point: express app, middleware, router mounting
│   ├── prisma.ts              # PrismaClient singleton
│   ├── routes/                # routes (auth, user, exercise, favorite, category, categoryGroup, refresh)
│   ├── controllers/           # req/res handlers, cookie handling
│   ├── services/              # business logic, Prisma access
│   ├── middleware/
│   │   ├── CheckAuth.ts            # JWT + role checks
│   │   ├── Validators.ts          # bodyValidator/paramValidator/queryValidator factories (Zod)
│   │   └── GlobalErrorValidator.ts # global error handler
│   ├── validators/            # Zod schemas per resource
│   ├── util/
│   │   ├── createTokens.ts        # generate access/refresh tokens + store refresh in DB
│   │   ├── CustomError.ts         # error class with a status code
│   │   └── zodErrorParser.ts      # normalizes Zod errors into a friendly shape
│   └── lib/types/type.ts      # shared TS types (JWT payloads, etc.)
├── .env.example
├── tsconfig.json
└── package.json
```

### Request flow

```
HTTP → server.ts → CORS / json / cookieParser / rateLimit
     → Router → Middleware (Zod validation, CheckAuth)
     → Controller (req/res, cookies) → Service (logic + Prisma) → PostgreSQL
   ↳ errors → GlobalErrorValidator
```

## 4. Data model (Prisma)

| Model             | Description | Key relations |
| ----------------- | ----------- | ------------- |
| `User`            | User: email, password hash, role (`USER`/`ADMIN`) | 1→N `Refresh`, 1→N `Favorite` |
| `Refresh`         | Active refresh token (`tokenId` = uuid, `expireDate`) | N→1 `User` |
| `Exercise`        | Exercise: title, description, duration, image, calory | N↔M `Category`, 1→N `ExerciseSection`, 1→N `Favorite` |
| `ExerciseSection` | An exercise section block (title, description, image, list) | N→1 `Exercise` (cascade) |
| `Category`        | Category (muscle group / equipment / workout type / difficulty level), unique `slug` | N↔M `Exercise`, N→1 `CategoriesGroup` (optional) |
| `CategoriesGroup` | A group of categories (e.g. "Muscle groups", "Equipment", "Difficulty level") | 1→N `Category` |
| `Favorite`        | Favorite: unique `(exerciseId, userId)` pair | N→1 `User`, N→1 `Exercise` |

`ROLE` enum: `ADMIN`, `USER`.

> Exercise difficulty (`easy`/`medium`/`hard`) is not a separate model — it's
> implemented as categories inside a "Difficulty level" group, and an exercise
> links to them the same way it links to muscle-group or equipment categories.

## 5. Authentication

- On register/login the server sets **two httpOnly cookies**: `accessToken` (lives 2 hours)
  and `refreshToken` (path `/refresh`, up to 30 days).
- `accessToken` carries the user `id`; `refreshToken` carries a `refreshId` (uuid)
  that maps to a record in the `Refresh` table.
- When the access token expires the frontend calls `POST /refresh`: the old refresh is
  deleted and a new token pair is issued (**rotation**).
- The `CheckAuth` middleware verifies the token and role:
  - `isStrict: true` — no valid token results in an immediate `403`;
  - `accessedRoles: ["ADMIN"]` — access limited to the listed roles.
- Passwords are hashed with `bcrypt` (10 rounds).

## 6. REST API

Base URL: `http://localhost:<PORT>`. Authentication is sent via cookies
(`withCredentials`). Validation is done with Zod.

**Auth (`/`)**

| Method | Path        | Body | Description |
| ------ | ----------- | ---- | ----------- |
| POST   | `/register` | `{ email, password, remember? }` | Register, sets cookie tokens |
| POST   | `/login`    | `{ email, password, remember? }` | Sign in, sets cookie tokens |
| POST   | `/logout`   | — | Removes the refresh from the DB and clears cookies |

> Password: 6–256 characters. `email` is normalized (trim + lowercase).

**Refresh (`/refresh`)**

| Method | Path | Description |
| ------ | ---- | ----------- |
| POST   | `/`  | Issues a new token pair from the refresh cookie (rotation) |

**Users (`/users`)**

| Method | Path   | Access | Description |
| ------ | ------ | ------ | ----------- |
| GET    | `/me`  | authenticated | Current user |
| GET    | `/`    | ADMIN | User list (query pagination) |
| GET    | `/:id` | ADMIN | User by id |

**Exercise (`/exercise`)**

| Method | Path                    | Description |
| ------ | ----------------------- | ----------- |
| GET    | `/`                     | List with filters and pagination |
| GET    | `/:id`                  | A single exercise |
| POST   | `/`                     | Create an exercise (+ sections) |
| PATCH  | `/:id`                  | Partial update |
| DELETE | `/:id`                  | Delete |
| POST   | `/connectToCategory`    | Attach an exercise to a category |
| POST   | `/disConnectToCategory` | Detach an exercise from a category |

`GET /exercise` query filters: `title`, `calory`, `isFavorite` (bool),
`category` (slug or array of slugs — including difficulty-level category slugs),
`page` (default 1), `limit` (default 20, max 100).

**Favorite (`/favorite`)**

| Method | Path | Access | Body | Description |
| ------ | ---- | ------ | ---- | ----------- |
| POST   | `/`  | authenticated | `{ exerciseId }` | Add to favorites |
| DELETE | `/`  | authenticated | `{ exerciseId }` | Remove from favorites |

**Category (`/category`)** and **CategoryGroup (`/categoryGroup`)** — identical CRUD:

| Method | Path   | Description |
| ------ | ------ | ----------- |
| GET    | `/`    | List |
| POST   | `/`    | Create |
| PATCH  | `/:id` | Update |
| DELETE | `/:id` | Delete |

> `POST`/`PATCH` on `/category` accept an optional `categoryGroupId` to attach
> the category to a group.

## 7. Cross-cutting details

- **Rate limiting:** 500 requests / 15 minutes per client (`express-rate-limit`).
- **CORS:** methods `GET, POST, PATCH, DELETE`, `credentials: true`, origin from `FRONTEND_URL`.
- **Error handling:** services throw `CustomError(message, statusCode)`; the global
  `GlobalErrorValidator` builds the JSON response.
- **Validation errors:** Zod errors are normalized into a readable form in `zodErrorParser.ts`.

> For how to set up and run it, see [start.md](start.md).