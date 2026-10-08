# Frontend

Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4. Как запустить, описано в [корневом README](../README.md).

## Скрипты

| Скрипт | Что делает |
| ------ | ---------- |
| `npm run dev` | режим разработки, http://localhost:3000 |
| `npm run build` | production-сборка (`output: "standalone"`) |
| `npm start` | запуск собранного приложения |
| `npm run lint` | ESLint |

## Структура (Feature-Sliced Design)

```
src/
├── app/            # маршруты App Router: layout, loading, error
├── views/          # экраны целиком (Home, Auth, Exercise, ExerciseForm, ...)
├── widgets/        # Header, Footer
├── entities/       # user, exercise, category: api, queryOptions, типы, UI
├── shared/         # ui, lib (axios, cn), config, hooks, stores, types
├── layouts/        # Providers (React Query), ModalLayout
└── middleware.ts   # обновление access-токена до рендера
```

Слои импортируют только нижние: `shared → entities → widgets → views → app`.

Экраны лежат в `views`, а не в `pages`: папка `src/pages` включает в Next второй роутер (Pages Router), и он ломает сборку.

## Маршруты

| Путь | Страница |
| ---- | -------- |
| `/` | лендинг |
| `/auth/login`, `/auth/register` | вход, регистрация |
| `/exercise` | каталог с фильтрами и пагинацией |
| `/exercise/[id]` | упражнение |
| `/favorite` | избранное |
| `/admin` | админ-панель |
| `/admin/add-exercise`, `/admin/edit-exercise/[id]` | создание и редактирование упражнения |

## Работа с данными

Код фронта выполняется в двух местах, и адрес бэкенда у них разный:

| Где | Файлы | Куда идёт запрос |
| --- | ----- | ---------------- |
| браузер | `entities/*/api/index.ts`, `shared/lib/axios.ts` | `/api/...` на домен фронта |
| сервер Next | `entities/*/api/server.ts`, `middleware.ts` | `SERVER_BACKEND_URL` (`shared/config/backend.ts`) |

- **Прокси.** `rewrites` в `next.config.ts` пересылает `/api/:path*` на `BACKEND_INTERNAL_URL`. Поэтому куки авторизации ставятся на домен фронта и видны серверу Next. Адрес запекается при `next build`.
- **SSR.** Серверные функции читают `accessToken` из кук, данные предзагружаются в `QueryClient` и передаются клиенту через `HydrationBoundary`.
- **Обновление токена.** В браузере axios-интерсептор на `401` один раз вызывает `/refresh` и повторяет запрос; параллельные запросы ждут общий промис. На сервере то же делает `middleware.ts` до рендера страницы.
- **Состояние.** Серверные данные хранит TanStack Query, UI-состояние (модалки) — Zustand.

## Docker-образ

Две стадии на `node:22-slim`. Сборка в режиме `standalone`: Next кладёт в `.next/standalone` готовый `server.js` и только нужные модули (около 38 МБ вместо 456 МБ `node_modules`). Папки `public` и `.next/static` в standalone не входят, их копирует Dockerfile.

- `BACKEND_INTERNAL_URL` передаётся как build arg (для `rewrites`) и как переменная окружения при запуске (для SSR и middleware).
- `HOSTNAME=0.0.0.0`, иначе сервер слушает только внутри контейнера.
