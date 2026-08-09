# Backend — Запуск

REST API на **Express 5 + TypeScript + Prisma + PostgreSQL**.

## 1. Требования

- **Node.js 18+** (рекомендуется 20+)
- **PostgreSQL** (локально или в облаке)
- npm

## 2. Установка зависимостей

```bash
cd backend
npm install
```

## 3. Переменные окружения

Скопируйте пример и заполните значения:

```bash
cp .env.example .env
```

| Переменная     | Назначение                                       | Пример |
| -------------- | ------------------------------------------------ | ------ |
| `DATABASE_URL` | Строка подключения к PostgreSQL                  | `postgresql://user:pass@localhost:5432/fitness` |
| `PORT`         | Порт, на котором поднимается API                 | `3001` |
| `JWT_SECRET`   | Секрет для подписи JWT (access и refresh токенов) | `super-secret-string` |
| `FRONTEND_URL` | URL фронтенда (нужен для CORS + credentials)     | `http://localhost:3000` |

> ⚠️ `JWT_SECRET` обязателен в проде. В коде есть fallback `"It_is_secret"`,
> использовать его в реальном окружении нельзя.
>
> ℹ️ Для безопасных кук в проде установите `NODE_ENV=production` — тогда у кук
> включается флаг `secure`.

## 4. База данных: миграции и сиды

```bash
npm run migrate          # применить миграции (prisma migrate dev)
npm run generate         # сгенерировать Prisma Client (обычно автоматически)
npm run seed             # наполнить БД демо-данными
npm run studio           # GUI для БД (опционально)
```

## 5. Запуск

Режим разработки (auto-reload через `tsx watch`):

```bash
npm run dev
```

После старта в консоли появится `Server listened sucfull`.
API доступно на `http://localhost:<PORT>` (по умолчанию `3001`).

## 6. Доступные npm-скрипты

| Скрипт              | Что делает                  |
| ------------------- | --------------------------- |
| `npm run dev`       | Запуск API в watch-режиме   |
| `npm run migrate`   | Применение миграций Prisma  |
| `npm run generate`  | Генерация Prisma Client     |
| `npm run seed`      | Наполнение БД демо-данными  |
| `npm run studio`    | Prisma Studio (GUI для БД)  |
| `npm run test`      | Проверка типов TypeScript   |

## 7. Частые проблемы

- **`Can't reach database server`** — проверьте, что PostgreSQL запущен и `DATABASE_URL` верный.
- **CORS / куки не ставятся** — `FRONTEND_URL` должен точно совпадать с адресом фронтенда,
  а на фронте запросы идут с `withCredentials: true`.
- **`PrismaClient is not generated`** — выполните `npm run generate`.

> Описание структуры, библиотек, модели данных и эндпоинтов — в [passport.md](passport.md).

---
---

# Backend — Getting Started

REST API built with **Express 5 + TypeScript + Prisma + PostgreSQL**.

## 1. Requirements

- **Node.js 18+** (20+ recommended)
- **PostgreSQL** (local or cloud)
- npm

## 2. Install dependencies

```bash
cd backend
npm install
```

## 3. Environment variables

Copy the example and fill in the values:

```bash
cp .env.example .env
```

| Variable       | Purpose                                            | Example |
| -------------- | -------------------------------------------------- | ------- |
| `DATABASE_URL` | PostgreSQL connection string                       | `postgresql://user:pass@localhost:5432/fitness` |
| `PORT`         | Port the API listens on                            | `3001` |
| `JWT_SECRET`   | Secret used to sign JWTs (access and refresh tokens) | `super-secret-string` |
| `FRONTEND_URL` | Frontend URL (required for CORS + credentials)     | `http://localhost:3000` |

> ⚠️ `JWT_SECRET` is required in production. The code has a `"It_is_secret"`
> fallback that must not be used in a real environment.
>
> ℹ️ For secure cookies in production set `NODE_ENV=production` — this enables the
> `secure` flag on cookies.

## 4. Database: migrations and seeds

```bash
npm run migrate          # apply migrations (prisma migrate dev)
npm run generate         # generate Prisma Client (usually automatic)
npm run seed             # seed the DB with demo data
npm run studio           # database GUI (optional)
```

## 5. Run

Development mode (auto-reload via `tsx watch`):

```bash
npm run dev
```

On startup the console prints `Server listened sucfull`.
The API is available at `http://localhost:<PORT>` (defaults to `3001`).

## 6. Available npm scripts

| Script              | What it does                |
| ------------------- | --------------------------- |
| `npm run dev`       | Run the API in watch mode   |
| `npm run migrate`   | Apply Prisma migrations     |
| `npm run generate`  | Generate Prisma Client      |
| `npm run seed`      | Seed the DB with demo data  |
| `npm run studio`    | Prisma Studio (DB GUI)      |
| `npm run test`      | TypeScript type checking    |

## 7. Common issues

- **`Can't reach database server`** — make sure PostgreSQL is running and `DATABASE_URL` is correct.
- **CORS / cookies not set** — `FRONTEND_URL` must exactly match the frontend address,
  and the frontend must send requests with `withCredentials: true`.
- **`PrismaClient is not generated`** — run `npm run generate`.

> The structure, libraries, data model and endpoints are described in [passport.md](passport.md).
