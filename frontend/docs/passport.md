# Frontend — Техпаспорт

Подробное описание архитектуры, структуры, библиотек, маршрутов и работы с данными.

## 1. Общее

SSR/SPA-интерфейс на **Next.js 16 App Router**. React Server Components предзагружают
данные на сервере, затем они гидрируются на клиенте через TanStack Query. Код
организован по методологии **Feature-Sliced Design (FSD)**.

- **Фреймворк:** Next.js 16 (App Router, RSC)
- **UI:** React 19, Tailwind CSS 4 (компоненты написаны вручную)
- **Данные:** TanStack Query + Axios
- **UI-состояние:** Zustand
- **Язык:** TypeScript

## 2. Библиотеки

### Реально используемые

| Пакет                   | Версия     | Назначение |
| ----------------------- | ---------- | ---------- |
| `next`                  | 16.0.5     | Фреймворк, роутинг, RSC, сборка |
| `react` / `react-dom`   | 19.2.0     | UI-библиотека |
| `@tanstack/react-query` | ^5.100.14  | Кеш и фетчинг серверных данных |
| `axios`                 | ^1.16.1    | HTTP-клиент + interceptor рефреша токена |
| `zustand`               | ^5.0.13    | Глобальное UI-состояние (стор модалок, `shared/stores`) |
| `clsx`                  | ^2.1.1     | Условные классы (в хелпере `cn`) |
| `tailwind-merge`        | ^3.4.0     | Слияние Tailwind-классов без конфликтов |

### Сборка / стили

`tailwindcss` + `@tailwindcss/postcss` (Tailwind CSS 4), `tw-animate-css` (анимации),
`eslint` + `eslint-config-next`, `typescript`, `@types/*`.

> ℹ️ Иконки подключаются как SVG-файлы из `public/svg` через `next/image`.
> UI-компоненты (`Accordion`, `Button`, `SurveyRadio`, `Card`) написаны вручную
> на обычном HTML + Tailwind.

## 3. Структура папок (Feature-Sliced Design)

```
frontend/src/
├── app/                        # Next.js App Router (маршруты, layout'ы, loading, error)
│   ├── layout.tsx              # корневой layout + Providers
│   ├── globals.css
│   ├── (landing)/              # группа маршрутов — лендинг
│   │   └── page.tsx
│   └── (functional)/           # группа маршрутов — приложение (Header/Footer, prefetch юзера)
│       ├── layout.tsx          # prefetch /users/me + HydrationBoundary
│       ├── auth/login          # вход
│       ├── auth/register       # регистрация
│       ├── exercise            # список упражнений
│       ├── exercise/[id]       # детальная страница
│       ├── exercise/[id]/edit  # редактирование
│       ├── exercise/create     # создание
│       └── favorite            # избранное
├── pages/                      # «толстые» компоненты-страницы (Home, Auth, Exercise, ...)
├── widgets/                    # крупные блоки UI: Header, Footer
├── entities/                   # бизнес-сущности (FSD)
│   ├── user/                   # api (client + server), features (queryOptions), types
│   ├── exercise/               # api (client + server), features (queryOptions), types
│   ├── category/               # types
│   └── level/                  # types
├── shared/                     # переиспользуемое
│   ├── ui/                     # button, Card, Accordion, Link, скелетоны и т.д.
│   ├── lib/                    # axios (instance + refresh interceptor), cn
│   ├── hooks/                  # useToggle
│   ├── stores/                 # Zustand-сторы UI-состояния (modalStore)
│   ├── features/               # LocalTokens
│   └── types/                  # общие типы (пагинация, токены)
├── layouts/                    # Providers (QueryClientProvider)
└── public/                     # img/, svg/
```

### Слои FSD (снизу вверх)

`shared → entities → widgets → pages → app`. Верхние слои импортируют нижние, не наоборот.

## 4. Маршруты (App Router)

| Путь                  | Назначение |
| --------------------- | ---------- |
| `/`                   | Лендинг (группа `(landing)`) |
| `/auth/login`         | Вход |
| `/auth/register`      | Регистрация |
| `/exercise`           | Каталог упражнений (фильтры, пагинация) |
| `/exercise/[id]`      | Детальная страница упражнения |
| `/exercise/[id]/edit` | Редактирование упражнения |
| `/exercise/create`    | Создание упражнения |
| `/favorite`           | Избранные упражнения |

Группы `(landing)` и `(functional)` не влияют на URL — задают общий layout.
В `(functional)/layout.tsx` рендерятся `Header`/`Footer` и предзагружается текущий
пользователь (`/users/me`). Для загрузочных состояний — `loading.tsx` со скелетонами;
глобальные `error.tsx` и `not-found.tsx`.

## 5. Работа с данными

Двойной подход — **сервер + клиент**:

- **Серверные функции** (`entities/*/api/server.ts`): вызываются в RSC, читают
  `accessToken` из кук через `next/headers` и пробрасывают его в `fetch` к API.
  Данные предзагружаются в `QueryClient` и отдаются клиенту через `HydrationBoundary`.
- **Клиентские API** (`entities/*/api/index.ts`): используют общий Axios-инстанс
  (`shared/lib/axios.ts`) с `withCredentials`.
- **queryOptions** (`entities/*/features/get*QueryOptions.ts`): единые ключи и настройки
  запросов для переиспользования на сервере и клиенте.

Глобальные настройки React Query (`layouts/Providers.tsx`): `retry: 2`,
`staleTime: 10 мин`, `refetchOnWindowFocus: false`.

### Обновление токена (Axios interceptor)

`shared/lib/axios.ts` перехватывает ответы `401` и **один раз** дёргает `POST /refresh`,
после чего повторяет исходный запрос. Параллельные 401-ответы ждут один общий промис
рефреша (`refreshOnce`), чтобы не слать дубли. Пути `/login`, `/register`, `/refresh`
из рефреш-логики исключены.

## 6. UI и стили

- **Tailwind CSS 4** — основное стилизование; тёмная градиентная тема.
- **Хелпер `cn`** (`shared/lib/cn.ts`) — `clsx` + `tailwind-merge` для безопасного
  объединения классов.
- **UI-компоненты** написаны вручную (без UI-библиотеки): варианты кнопок — через `switch`,
  аккордеон — на `useToggle` + Tailwind.
- **Zustand** (`shared/stores/`) — глобальное UI-состояние (стор модалок).
- **Скелетоны** (`shared/ui/skeletons/`) — состояния загрузки страниц.

## 7. Конфигурация

| Файл                  | Назначение |
| --------------------- | ---------- |
| `next.config.ts`      | Конфиг Next.js |
| `tsconfig.json`       | TS + алиас `@/*` → `src/*` |
| `eslint.config.mjs`   | Правила ESLint |
| `postcss.config.mjs`  | PostCSS + Tailwind |
| `components.json`     | Конфиг UI-компонентов (shadcn-style) |

> Как поднять и запустить — в [start.md](start.md).

---
---

# Frontend — Tech Passport

A detailed description of the architecture, structure, libraries, routes and data handling.

## 1. Overview

An SSR/SPA UI built with **Next.js 16 App Router**. React Server Components prefetch data
on the server, which is then hydrated on the client via TanStack Query. The code is
organized using the **Feature-Sliced Design (FSD)** methodology.

- **Framework:** Next.js 16 (App Router, RSC)
- **UI:** React 19, Tailwind CSS 4 (components written by hand)
- **Data:** TanStack Query + Axios
- **UI state:** Zustand
- **Language:** TypeScript

## 2. Libraries

### Actually used

| Package                 | Version    | Purpose |
| ----------------------- | ---------- | ------- |
| `next`                  | 16.0.5     | Framework, routing, RSC, build |
| `react` / `react-dom`   | 19.2.0     | UI library |
| `@tanstack/react-query` | ^5.100.14  | Server-data cache and fetching |
| `axios`                 | ^1.16.1    | HTTP client + token-refresh interceptor |
| `zustand`               | ^5.0.13    | Global UI state (modal store, `shared/stores`) |
| `clsx`                  | ^2.1.1     | Conditional classes (in the `cn` helper) |
| `tailwind-merge`        | ^3.4.0     | Merging Tailwind classes without conflicts |

### Build / styling

`tailwindcss` + `@tailwindcss/postcss` (Tailwind CSS 4), `tw-animate-css` (animations),
`eslint` + `eslint-config-next`, `typescript`, `@types/*`.

> ℹ️ Icons are included as SVG files from `public/svg` via `next/image`.
> The UI components (`Accordion`, `Button`, `SurveyRadio`, `Card`) are written by hand
> with plain HTML + Tailwind.

## 3. Folder structure (Feature-Sliced Design)

```
frontend/src/
├── app/                        # Next.js App Router (routes, layouts, loading, error)
│   ├── layout.tsx              # root layout + Providers
│   ├── globals.css
│   ├── (landing)/              # route group — landing page
│   │   └── page.tsx
│   └── (functional)/           # route group — app (Header/Footer, user prefetch)
│       ├── layout.tsx          # prefetch /users/me + HydrationBoundary
│       ├── auth/login          # sign in
│       ├── auth/register       # sign up
│       ├── exercise            # exercise list
│       ├── exercise/[id]       # detail page
│       ├── exercise/[id]/edit  # edit
│       ├── exercise/create     # create
│       └── favorite            # favorites
├── pages/                      # "fat" page components (Home, Auth, Exercise, ...)
├── widgets/                    # large UI blocks: Header, Footer
├── entities/                   # business entities (FSD)
│   ├── user/                   # api (client + server), features (queryOptions), types
│   ├── exercise/               # api (client + server), features (queryOptions), types
│   ├── category/               # types
│   └── level/                  # types
├── shared/                     # reusable code
│   ├── ui/                     # button, Card, Accordion, Link, skeletons, etc.
│   ├── lib/                    # axios (instance + refresh interceptor), cn
│   ├── hooks/                  # useToggle
│   ├── stores/                 # Zustand stores for UI state (modalStore)
│   ├── features/               # LocalTokens
│   └── types/                  # shared types (pagination, tokens)
├── layouts/                    # Providers (QueryClientProvider)
└── public/                     # img/, svg/
```

### FSD layers (bottom to top)

`shared → entities → widgets → pages → app`. Upper layers import lower ones, not the reverse.

## 4. Routes (App Router)

| Path                  | Purpose |
| --------------------- | ------- |
| `/`                   | Landing page (group `(landing)`) |
| `/auth/login`         | Sign in |
| `/auth/register`      | Sign up |
| `/exercise`           | Exercise catalog (filters, pagination) |
| `/exercise/[id]`      | Exercise detail page |
| `/exercise/[id]/edit` | Edit an exercise |
| `/exercise/create`    | Create an exercise |
| `/favorite`           | Favorite exercises |

The `(landing)` and `(functional)` groups don't affect the URL — they set a shared layout.
`(functional)/layout.tsx` renders `Header`/`Footer` and prefetches the current user
(`/users/me`). Loading states use `loading.tsx` with skeletons; global `error.tsx` and
`not-found.tsx` are provided.

## 5. Data handling

A dual approach — **server + client**:

- **Server functions** (`entities/*/api/server.ts`): called in RSC, read the `accessToken`
  cookie via `next/headers` and forward it in the `fetch` to the API. Data is prefetched
  into a `QueryClient` and passed to the client via `HydrationBoundary`.
- **Client APIs** (`entities/*/api/index.ts`): use the shared Axios instance
  (`shared/lib/axios.ts`) with `withCredentials`.
- **queryOptions** (`entities/*/features/get*QueryOptions.ts`): shared query keys and
  settings reused on both server and client.

Global React Query settings (`layouts/Providers.tsx`): `retry: 2`, `staleTime: 10 min`,
`refetchOnWindowFocus: false`.

### Token refresh (Axios interceptor)

`shared/lib/axios.ts` intercepts `401` responses and calls `POST /refresh` **once**, then
retries the original request. Parallel 401s await a single shared refresh promise
(`refreshOnce`) to avoid duplicate calls. The `/login`, `/register` and `/refresh` paths
are excluded from the refresh logic.

## 6. UI and styling

- **Tailwind CSS 4** — primary styling; a dark gradient theme.
- **`cn` helper** (`shared/lib/cn.ts`) — `clsx` + `tailwind-merge` for safe class merging.
- **UI components** are written by hand (no UI library): button variants via `switch`,
  accordion via `useToggle` + Tailwind.
- **Zustand** (`shared/stores/`) — global UI state (modal store).
- **Skeletons** (`shared/ui/skeletons/`) — page loading states.

## 7. Configuration

| File                  | Purpose |
| --------------------- | ------- |
| `next.config.ts`      | Next.js config |
| `tsconfig.json`       | TS + alias `@/*` → `src/*` |
| `eslint.config.mjs`   | ESLint rules |
| `postcss.config.mjs`  | PostCSS + Tailwind |
| `components.json`     | UI components config (shadcn-style) |

> For how to set up and run it, see [start.md](start.md).
