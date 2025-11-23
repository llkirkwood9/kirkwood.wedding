# Kirkwood Wedding API

## Requirements

- Visual Studio 2026 or newer
    - https://visualstudio.microsoft.com/
- dotnet-ef tool
    - `dotnet tool install --global dotnet-ef`
- Docker
    - https://www.docker.com/
- SQL Server Management Studio (SSMS)
    - https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms

## Local Database Setup

- Ensure Docker and dotnet-ef are installed.

- Open command prompt to [Repo]/api folder and run `docker compose up -d`
    - This will pull the latest SQL server image, set it up, and start running it.

- Run `dotnet ef database update`
    - This will create the database and tables.

- To stop the local database, open command prompt to [Repo]/api folder and run `docker compose down`


## Connecting to Local Database in SSMS

- Open SQL Server Management Studio (SSMS) and connect to the local database:
    - Server name: `localhost,1433`
    - Authentication: SQL Server Authentication
    - Username: `sa`
    - Password: `YourStrong!Passw0rd`

## Making Changes to the Database

- Any changes to the database schema should be made through the Models in the Models folder.

- To apply changes to the database, create a new migration:
    - `dotnet ef migrations add <MigrationName>`
    - This will create a new migration file in the Migrations folder.

- To apply the migration to the database, run:
    - `dotnet ef database update`
    - This will apply the latest migration to the database.

- Note: Only one persion should be making changes to the database schema at a time to avoid conflicts.

## Secrets Management

- The `appsettings.local.json` file stores important IDs/API keys. This file is not comitted to the repo and for security purposes, should never be.

### Creating appsettings.local.json

- Create a new file in the api project folder named `appsettings.local.json`.

- Add the following structure to the file:
```json
{
  "GoogleClientId": "<GOOGLE-CLIENT-ID>",
  "GoogleClientSecret": "<GOOGLE-CLIENT-SECRET>"
}
```

- Replace the placeholder values with the actual IDs and secrets.