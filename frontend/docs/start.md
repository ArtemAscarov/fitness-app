# Frontend — Запуск

Веб-интерфейс на **Next.js 16 (App Router) + React 19 + TypeScript**.

## 1. Требования

- **Node.js 18+** (рекомендуется 20+)
- npm
- Запущенный бэкенд (см. [../../backend/docs/start.md](../../backend/docs/start.md))

## 2. Установка зависимостей

```bash
cd frontend
npm install
```

## 3. Переменные окружения

```bash
cp .env.example .env
```

| Переменная                | Назначение                     | Пример |
| ------------------------- | ------------------------------ | ------ |
| `NEXT_PUBLIC_BACKEND_URL` | Базовый URL REST API (бэкенда) | `http://localhost:3001` |

> ⚠️ Префикс `NEXT_PUBLIC_` обязателен — переменная используется и в браузере
> (Axios), и на сервере (RSC через `fetch`).

## 4. Запуск

```bash
npm run dev              # режим разработки → http://localhost:3000
```

> Бэкенд должен быть запущен, а его `FRONTEND_URL` указывать на этот адрес —
> иначе куки/CORS работать не будут.

## 5. Сборка и продакшен

```bash
npm run build            # production-сборка
npm run start            # запуск собранного приложения
npm run lint             # проверка кода ESLint
```

## 6. Доступные npm-скрипты

| Скрипт           | Что делает                   |
| ---------------- | ---------------------------- |
| `npm run dev`    | Запуск в режиме разработки   |
| `npm run build`  | Production-сборка            |
| `npm run start`  | Запуск собранного приложения |
| `npm run lint`   | Проверка кода ESLint         |

## 7. Частые проблемы

- **Данные не грузятся / 401** — проверьте `NEXT_PUBLIC_BACKEND_URL` и что бэкенд запущен.
- **Не сохраняется вход (куки)** — на бэкенде `FRONTEND_URL` должен точно совпадать
  с адресом фронта, запросы идут с `withCredentials`.
- **CORS-ошибки** — несовпадение origin между фронтом и `FRONTEND_URL` бэкенда.

> Описание структуры, библиотек и архитектуры — в [passport.md](passport.md).

---
---

# Frontend — Getting Started

Web UI built with **Next.js 16 (App Router) + React 19 + TypeScript**.

## 1. Requirements

- **Node.js 18+** (20+ recommended)
- npm
- A running backend (see [../../backend/docs/start.md](../../backend/docs/start.md))

## 2. Install dependencies

```bash
cd frontend
npm install
```

## 3. Environment variables

```bash
cp .env.example .env
```

| Variable                  | Purpose                       | Example |
| ------------------------- | ----------------------------- | ------- |
| `NEXT_PUBLIC_BACKEND_URL` | Base URL of the REST API      | `http://localhost:3001` |

> ⚠️ The `NEXT_PUBLIC_` prefix is required — the variable is used both in the browser
> (Axios) and on the server (RSC via `fetch`).

## 4. Run

```bash
npm run dev              # development mode → http://localhost:3000
```

> The backend must be running and its `FRONTEND_URL` must point to this address —
> otherwise cookies/CORS will not work.

## 5. Build and production

```bash
npm run build            # production build
npm run start            # run the built app
npm run lint             # ESLint check
```

## 6. Available npm scripts

| Script           | What it does           |
| ---------------- | ---------------------- |
| `npm run dev`    | Run in development mode |
| `npm run build`  | Production build       |
| `npm run start`  | Run the built app      |
| `npm run lint`   | ESLint check           |

## 7. Common issues

- **Data won't load / 401** — check `NEXT_PUBLIC_BACKEND_URL` and that the backend is running.
- **Login doesn't persist (cookies)** — the backend's `FRONTEND_URL` must exactly match the
  frontend address, and requests must be sent with `withCredentials`.
- **CORS errors** — an origin mismatch between the frontend and the backend's `FRONTEND_URL`.

> The structure, libraries and architecture are described in [passport.md](passport.md).
