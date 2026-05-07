# Optimizely Headless - Learning Project

A wip headless CMS setup using Optimizely CMS 12 as the backend and Next.js 16 as the frontend, connected via the Content Delivery API. 

The project scenario is a blog site.

See [SETUP.md](SETUP.md) for initial project setup from scratch.

## Architecture

```
optimizely-headless-test/
├── frontend/   Next.js 16, React 19, TypeScript, Mantine
└── backend/    ASP.NET Core 8, Optimizely CMS 12, Content Delivery API
```

The backend runs in headless mode. The frontend uses the Content Delivery Api to generate sites. Content is authored in the Optimizely admin UI and stored in SQL Server.

## Content types

| Class | CMS type | Properties |
|---|---|---|
| `StartPage` | Page | `Heading` (string), `MainBody` (XhtmlString), `MainContentArea` (ContentArea) |
| `BlogListingPage` | Page | `Heading` (string), `Intro` (XhtmlString) |
| `ArticlePage` | Page | `Title` (string), `Author` (string), `PublishedDate` (DateTime), `Body` (XhtmlString) |
| `TextBlock` | Block | `Heading` (string), `Text` (XhtmlString) |

New content types are added as C# classes in `backend/Models/`. Rebuilding the backend registers them automatically.

## How content flows

1. Editor creates or edits content in the CMS admin UI (`/episerver/cms`)
2. Content is stored in SQL Server by Optimizely CMS
3. A visitor requests a URL -> Next.js calls `GET /api/content?url=...`
4. The Content Delivery API serialises the matching content type to JSON
5. Next.js renders the matching component tree server-side (ISR (wip), 60 s revalidation)

## Key files

| File | Purpose |
|---|---|
| `frontend/src/lib/optimizely.ts` | All API calls to the Content Delivery API |
| `frontend/src/app/page.tsx` | Home page - fetches the CMS start page |
| `frontend/src/app/[...slug]/page.tsx` | Catch-all route - resolves any URL to CMS content |
| `frontend/src/components/NavBar.tsx` | Navigation bar - fetches start page children from the CMS |
| `frontend/src/components/RenderPage.tsx` | Dispatches to the right page component by content type |
| `frontend/src/components/RenderBlock.tsx` | Dispatches to the right block component by content type |
| `frontend/src/components/ContentAreaRenderer.tsx` | Resolves content references in parallel and renders blocks |

