# 🏋️ FitnesPro

Full-stack веб-приложение — каталог фитнес-упражнений с авторизацией, фильтрацией,
избранным и админ-панелью для управления контентом.

**Backend** — REST API на Express + Prisma + PostgreSQL: JWT-аутентификация через
httpOnly-куки с автоматическим обновлением токенов, роли USER / ADMIN, CRUD
упражнений и категорий, избранное.

**Frontend** — Next.js 16 (App Router, RSC) + React 19: серверный рендеринг с
предзагрузкой данных через React Query, каталог упражнений с детальными секциями,
фильтрация по категориям, избранное и админ-страницы добавления/редактирования
упражнений.

> 📖 Документация двуязычная: в каждом файле сверху русская версия, ниже —
> разделитель и английская.

---

## 🚀 Возможности

- 🔐 Регистрация / вход / выход через **JWT в httpOnly-куках** (access + refresh)
- ♻️ Прозрачное обновление access-токена через refresh-токен
- 👥 Роли пользователей: **USER** и **ADMIN** (защищённые маршруты)
- 🏃 Каталог упражнений с детальными секциями (техника, инструкция, список шагов)
- 🏷️ Категории упражнений (группы мышц, инвентарь, сложность)
- 🔎 Фильтрация по категориям + пагинация
- ⭐ Избранные упражнения для авторизованного пользователя
- 🛠️ Админ-панель: создание и редактирование упражнений, привязка категорий
- 🖥️ SSR + React Query (предзагрузка на сервере, гидрация на клиенте)
- 🛡️ Защита API от массовых запросов (`express-rate-limit`), валидация данных (Zod)

## 🧱 Стек

| Слой      | Технологии |
| --------- | ---------- |
| Backend   | Node.js, Express 5, TypeScript, Prisma 5, PostgreSQL, Zod 4, JWT, bcrypt, cookie-parser, cors, express-rate-limit |
| Frontend  | Next.js 16 (App Router), React 19, TypeScript, TanStack Query 5, Axios, Zustand, Tailwind CSS 4, clsx, tailwind-merge |
| Хранилище | PostgreSQL |

## 📚 Документация

В каждой части проекта есть папка `docs/` с двумя файлами: `start.md` — как запустить,
`passport.md` — техпаспорт (структура, библиотеки, архитектура).

| Файл | Что внутри |
| ---- | ---------- |
| [backend/docs/start.md](backend/docs/start.md)       | Установка, переменные окружения, миграции, сиды и запуск **бэкенда** |
| [backend/docs/passport.md](backend/docs/passport.md) | Архитектура бэкенда, структура папок, библиотеки, модель данных, описание REST API, схема аутентификации |
| [frontend/docs/start.md](frontend/docs/start.md)     | Установка, переменные окружения и запуск **фронтенда** |
| [frontend/docs/passport.md](frontend/docs/passport.md) | Архитектура фронтенда (Feature-Sliced Design), структура папок, библиотеки, маршруты, работа с данными и токенами |

---

## ⚡ Полная инструкция по запуску

### 1. Требования

- **Node.js 18+** (рекомендуется 20+)
- **npm**
- **PostgreSQL** — запущенный сервер и доступ к созданию БД
- Порт **3000** (фронтенд) и **3001** (бэкенд) свободны

### 2. Создайте базу данных

Подключитесь к PostgreSQL и создайте пустую базу:

```sql
CREATE DATABASE fitness;
```

### 3. Backend (REST API)

```bash
# 3.1. Перейти в папку бэкенда и установить зависимости
cd backend
npm install

# 3.2. Создать файл окружения из шаблона
cp .env.example .env
```

Заполните `.env`:

| Переменная      | Назначение                          | Пример |
| --------------- | ----------------------------------- | ------ |
| `DATABASE_URL`  | Строка подключения к PostgreSQL     | `postgresql://user:password@localhost:5432/fitness` |
| `PORT`          | Порт API (по умолчанию `3001`)      | `3001` |
| `JWT_SECRET`    | Секрет для подписи JWT-токенов       | любая длинная строка |
| `FRONTEND_URL`  | Адрес фронтенда (для CORS и куки)    | `http://localhost:3000` |

> `NODE_ENV` — опционально (для `tsx`/продакшена).

Применяем миграции (создаст таблицы и сгенерирует Prisma Client):

```bash
npm run migrate
```

Наполняем базу демо-данными (**внимание: сид очищает все таблицы перед заливкой**):

```bash
npm run seed
```

Запускаем API в режиме разработки:

```bash
npm run dev
```

Бэкенд стартует на **http://localhost:3001**.

> После сида в базе есть администратор: **admin@gmail.com / admin123**,
> а также демо-пользователи `user1@gmail.com` … `userN@gmail.com` с паролем `password123`.

### 4. Frontend (UI)

В новом терминале:

```bash
# 4.1. Перейти в папку фронтенда и установить зависимости
cd frontend
npm install

# 4.2. Создать файл окружения из шаблона
cp .env.example .env
```

| Переменная                | Назначение                     | Пример |
| ------------------------- | ------------------------------ | ------ |
| `NEXT_PUBLIC_BACKEND_URL` | Базовый URL REST API (бэкенда) | `http://localhost:3001` |

> ⚠️ Префикс `NEXT_PUBLIC_` обязателен — переменная используется и в браузере
> (Axios), и на сервере (RSC через `fetch`).

Запускаем:

```bash
npm run dev
```

Фронтенд стартует на **http://localhost:3000** — откройте адрес в браузере.

### 5. Проверка

1. Откройте http://localhost:3000 — загрузится лендинг.
2. Войдите под админом (`admin@gmail.com` / `admin123`), чтобы увидеть кнопки
   редактирования упражнений.
3. Убедитесь, что каталог `/exercise` отдаёт данные (бэкенд запущен и `FRONTEND_URL`
   совпадает с адресом фронтенда — иначе куки/CORS не работают).

---

## 🛠️ Полезные npm-скрипты

### Backend (`cd backend`)

| Скрипт              | Что делает                                    |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Запуск API в режиме разработки (tsx watch)    |
| `npm run migrate`   | Применить миграции (prisma migrate dev)       |
| `npm run generate`  | Сгенерировать Prisma Client                   |
| `npm run studio`    | Открыть Prisma Studio (визуальный просмотр БД)|
| `npm run seed`      | Залить демо-данные (сбрасывает таблицы)       |
| `npm test`          | Проверка типов (tsc --noEmit)                 |

### Frontend (`cd frontend`)

| Скрипт          | Что делает                          |
| --------------- | ----------------------------------- |
| `npm run dev`   | Запуск в режиме разработки          |
| `npm run build` | Production-сборка                   |
| `npm run start` | Запуск собранного приложения        |
| `npm run lint`  | Проверка кода ESLint                |

---

## 🐛 Частые проблемы

- **Данные не грузятся / 401** — проверьте `NEXT_PUBLIC_BACKEND_URL` на фронтенде
  и что бэкенд запущен.
- **Не сохраняется вход (куки)** — на бэкенде `FRONTEND_URL` должен точно совпадать
  с адресом фронтенда (`http://localhost:3000`), запросы идут с `withCredentials`.
- **CORS-ошибки** — несовпадение origin фронтенда и `FRONTEND_URL` бэкенда.
- **Ошибка подключения к БД при `npm run migrate`** — проверьте `DATABASE_URL` и что
  PostgreSQL запущен и принимает подключения.
- **Сиды не заливаются** — сид очищает таблицы; если данные уже нужны, выполните его
  один раз после миграций.

---

## 🗂️ Структура репозитория

```
fitness-app/
├── backend/              # REST API (Express + Prisma)
│   ├── prisma/           # schema.prisma, миграции, seed
│   ├── src/              # controllers, services, routes, middleware, validators, util
│   └── docs/             # start.md, passport.md
├── frontend/             # Next.js приложение (App Router, FSD)
│   ├── src/              # app, pages, widgets, entities, shared, layouts
│   ├── public/           # картинки и svg-иконки
│   └── docs/             # start.md, passport.md
└── README.md             # этот файл
```

---

---

# 🏋️ FitnesPro (English)

Full-stack web application — a catalog of fitness exercises with authentication,
filtering, favorites and an admin panel for managing content.

**Backend** — a REST API built with Express + Prisma + PostgreSQL: JWT authentication
via httpOnly cookies with automatic token refresh, USER / ADMIN roles, CRUD for
exercises and categories, favorites.

**Frontend** — Next.js 16 (App Router, RSC) + React 19: server-side rendering with
data prefetching via React Query, an exercise catalog with detailed sections,
category filtering, favorites and admin pages for creating/editing exercises.

> 📖 The documentation is bilingual: each file has the Russian version on top,
> followed by a separator and the English version.

## 🚀 Features

- 🔐 Sign up / sign in / sign out via **JWT in httpOnly cookies** (access + refresh)
- ♻️ Transparent access-token refresh through a refresh token
- 👥 User roles: **USER** and **ADMIN** (protected routes)
- 🏃 Exercise catalog with detailed sections (technique, instructions, step lists)
- 🏷️ Exercise categories (muscle groups, equipment, difficulty)
- 🔎 Filtering by categories + pagination
- ⭐ Favorite exercises for the authenticated user
- 🛠️ Admin panel: create and edit exercises, bind categories
- 🖥️ SSR + React Query (data prefetched on the server, hydrated on the client)
- 🛡️ API rate limiting (`express-rate-limit`), data validation (Zod)

## 🧱 Stack

| Layer     | Technologies |
| --------- | ------------ |
| Backend   | Node.js, Express 5, TypeScript, Prisma 5, PostgreSQL, Zod 4, JWT, bcrypt, cookie-parser, cors, express-rate-limit |
| Frontend  | Next.js 16 (App Router), React 19, TypeScript, TanStack Query 5, Axios, Zustand, Tailwind CSS 4, clsx, tailwind-merge |
| Storage   | PostgreSQL |

## 📚 Documentation

Each part of the project has a `docs/` folder with two files: `start.md` — how to run it,
`passport.md` — the tech passport (structure, libraries, architecture).

| File | What's inside |
| ---- | ------------- |
| [backend/docs/start.md](backend/docs/start.md)       | Installation, environment variables, migrations, seeds and running the **backend** |
| [backend/docs/passport.md](backend/docs/passport.md) | Backend architecture, folder structure, libraries, data model, REST API reference, authentication scheme |
| [frontend/docs/start.md](frontend/docs/start.md)     | Installation, environment variables and running the **frontend** |
| [frontend/docs/passport.md](frontend/docs/passport.md) | Frontend architecture (Feature-Sliced Design), folder structure, libraries, routes, data and token handling |

---

## ⚡ Full run instructions

### 1. Requirements

- **Node.js 18+** (20+ recommended)
- **npm**
- **PostgreSQL** — a running server with the ability to create a database
- Ports **3000** (frontend) and **3001** (backend) free

### 2. Create the database

Connect to PostgreSQL and create an empty database:

```sql
CREATE DATABASE fitness;
```

### 3. Backend (REST API)

```bash
# 3.1. Go to the backend folder and install dependencies
cd backend
npm install

# 3.2. Create the environment file from the template
cp .env.example .env
```

Fill in `.env`:

| Variable       | Purpose                             | Example |
| -------------- | ----------------------------------- | ------- |
| `DATABASE_URL` | PostgreSQL connection string        | `postgresql://user:password@localhost:5432/fitness` |
| `PORT`         | API port (defaults to `3001`)       | `3001` |
| `JWT_SECRET`   | Secret used to sign JWT tokens      | any long string |
| `FRONTEND_URL` | Frontend address (for CORS/cookies) | `http://localhost:3000` |

> `NODE_ENV` is optional (for `tsx`/production).

Apply migrations (creates tables and generates the Prisma Client):

```bash
npm run migrate
```

Seed the database with demo data (**note: the seed clears all tables before seeding**):

```bash
npm run seed
```

Run the API in development mode:

```bash
npm run dev
```

The backend starts at **http://localhost:3001**.

> After seeding there is an administrator: **admin@gmail.com / admin123**,
> plus demo users `user1@gmail.com` … `userN@gmail.com` with password `password123`.

### 4. Frontend (UI)

In a new terminal:

```bash
# 4.1. Go to the frontend folder and install dependencies
cd frontend
npm install

# 4.2. Create the environment file from the template
cp .env.example .env
```

| Variable                  | Purpose                   | Example |
| ------------------------- | ------------------------- | ------- |
| `NEXT_PUBLIC_BACKEND_URL` | Base URL of the REST API  | `http://localhost:3001` |

> ⚠️ The `NEXT_PUBLIC_` prefix is required — the variable is used both in the browser
> (Axios) and on the server (RSC via `fetch`).

Run it:

```bash
npm run dev
```

The frontend starts at **http://localhost:3000** — open the address in your browser.

### 5. Verification

1. Open http://localhost:3000 — the landing page loads.
2. Sign in as admin (`admin@gmail.com` / `admin123`) to see exercise edit buttons.
3. Check that the catalog at `/exercise` returns data (the backend must be running and
   its `FRONTEND_URL` must match the frontend address — otherwise cookies/CORS won't work).

---

## 🛠️ Useful npm scripts

### Backend (`cd backend`)

| Script               | What it does                              |
| -------------------- | ----------------------------------------- |
| `npm run dev`        | Run the API in development mode (tsx watch) |
| `npm run migrate`    | Apply migrations (prisma migrate dev)     |
| `npm run generate`   | Generate the Prisma Client                |
| `npm run studio`     | Open Prisma Studio (visual DB browser)    |
| `npm run seed`       | Seed demo data (resets tables)            |
| `npm test`           | Type check (tsc --noEmit)                 |

### Frontend (`cd frontend`)

| Script          | What it does                   |
| --------------- | ------------------------------ |
| `npm run dev`   | Run in development mode        |
| `npm run build` | Production build               |
| `npm run start` | Run the built app              |
| `npm run lint`  | ESLint check                   |

---

## 🐛 Common issues

- **Data won't load / 401** — check `NEXT_PUBLIC_BACKEND_URL` on the frontend and that
  the backend is running.
- **Login doesn't persist (cookies)** — the backend's `FRONTEND_URL` must exactly match
  the frontend address (`http://localhost:3000`), and requests must use `withCredentials`.
- **CORS errors** — an origin mismatch between the frontend and the backend's `FRONTEND_URL`.
- **DB connection error on `npm run migrate`** — check `DATABASE_URL` and that PostgreSQL
  is running and accepting connections.
- **Seeds don't apply** — the seed clears tables; run it once after migrations.

---

## 🗂️ Repository structure

```
fitness-app/
├── backend/              # REST API (Express + Prisma)
│   ├── prisma/           # schema.prisma, migrations, seed
│   ├── src/              # controllers, services, routes, middleware, validators, util
│   └── docs/             # start.md, passport.md
├── frontend/             # Next.js app (App Router, FSD)
│   ├── src/              # app, pages, widgets, entities, shared, layouts
│   ├── public/           # images and svg icons
│   └── docs/             # start.md, passport.md
└── README.md             # this file
```
