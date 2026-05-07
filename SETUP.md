# Setup

Guide to setup Optimizely CMS headless with Next.js.

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- Node.js 22
- SQL Server 2019 with default instance (`MSSQLSERVER`)

## Backend setup

### 1. Install the EPiServer CLI and project templates

Follow the [Optimizely developer docs](https://docs.developers.optimizely.com/content-management-system/docs/set-up-a-development-environment).

### 2. Generate the backend project

```bash
dotnet new epi-cms-empty
```

### 3. Adjust the target framework

In `*.csproj`, set:

```xml
<TargetFramework>net8.0</TargetFramework>
```

### 4. Configure the connection string

In `appsettings.Development.json`, update the connection string to use the installed SQL Server instance and enable automatic schema creation:

```json
"ConnectionStrings": {
  "EPiServerDB": "Data Source=.;Initial Catalog=optimizely_headless;Integrated Security=True;TrustServerCertificate=True;Connect Timeout=30"
},
"EPiServer": {
  "Cms": {
    "DataAccess": {
      "CreateDatabaseSchema": "true"
    }
  }
}
```

### 5. Install required packages

Add these to `*.csproj` (the generated template does not include all of them):

```xml
<PackageReference Include="EPiServer.CMS" Version="12.34.3" />
<PackageReference Include="EPiServer.Cms.UI" Version="12.34.3" />
<PackageReference Include="EPiServer.Cms.UI.Core" Version="12.34.3" />
<PackageReference Include="EPiServer.Cms.UI.AspNetIdentity" Version="12.34.3" />
<!-- Content Delivery API to enable headless mode -->
<PackageReference Include="EPiServer.ContentDeliveryApi.Cms" Version="3.12.6" />
<PackageReference Include="EPiServer.ContentDeliveryApi.Core" Version="3.12.6" />
<!-- OIDC to generate credentials for Next.js -->
<PackageReference Include="EPiServer.OpenIDConnect" Version="3.12.6" />
<PackageReference Include="EPiServer.OpenIDConnect.UI" Version="3.12.6" />
```

Then configure all packages in `Startup.cs` as in this project.

### 6. Switch to HTTP in launchSettings.json

The generated template configures HTTPS only. Node.js does not trust the dotnet dev cert by default, which causes fetch errors from the frontend. Change `applicationUrl` in `Properties/launchSettings.json` to HTTP:

```json
"applicationUrl": "http://localhost:5000/"
```

## Database setup

Create an empty SQL database named `optimizely_headless` on the default instance. The schema is created automatically on first run (`CreateDatabaseSchema: true`).

## Frontend setup

### 1. Generate a Next.js project

```bash
npx create-next-app@latest frontend
```

### 2. Install Mantine

```bash
cd frontend
npm install @mantine/core @mantine/hooks postcss-preset-mantine postcss-simple-vars
```

### 3. Create the environment file

Create `frontend/.env.local`:

```
OPTIMIZELY_API_URL=http://localhost:5000/api/episerver/v3.0
```

This points the frontend to the Content Delivery API served by the backend.

## Running the project

**Backend** (from `backend/`):

```bash
dotnet run
```

-> CMS admin UI: `http://localhost:5000/episerver/cms`  
-> Content Delivery API: `http://localhost:5000/api`

**Frontend** (from `frontend/`):

```bash
npm run dev
```

-> `http://localhost:3000`

## First-run setup

1. Go to `http://localhost:5000/util/register` and create an admin root user
2. Verify the Content Delivery API is up: `http://localhost:5000/api/episerver/v3.0/content` (should return an empty array)
3. Verify the CMS admin panel is reachable: `http://localhost:5000/episerver/cms`

## CMS configuration

1. Add a Start Page to the backend project as in `backend/Models/Start Page`. After relaunching the backend, create a Start Page in the admin panel: **Edit -> Create Content -> New Page**. Name it `Start Page`, add some content, and publish it.
2. Create a website entry: **Admin -> Config -> Manage Websites -> Create Website**
   - URL: `http://localhost:3000` - sets the base URL for content links in the Content Delivery API response
   - Start Page: select the page created above
   - Add a host: `localhost:5000` / `http` - keeps the CMS editing UI on the backend
