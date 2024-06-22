# Surapp

  

Surapp is a powerful and scalable application built using the NestJS framework. Surapp aims to help people get information about Islam by allowing users to ask questions and receive answers from knowledgeable reciters.

  

## Table of Contents

  

- [Installation](#installation)

- [Configuration](#configuration)

- [Running the app](#running-the-app)

- [Test](#test)

- [Database Management](#database-management)

- [Support](#support)

- [License](#license)

  

## Installation

  

To get started with Surapp, you need to have Node.js and npm (Node Package Manager) installed on your machine.

  

1. Clone the repository:

  

```bash

git clone https://github.com/yourusername/surapp.git

```

  

2. Navigate to the project directory:

  

```bash

cd surapp

```

  

3. Install the dependencies:

  

```bash

npm install

```

  

## Configuration

  

Before running the application, you need to set up the environment variables. Create a `.env` file in the root directory of your project and add the following configuration:

  

```dotenv

# Server

PORT=9000

  

# Database

DB_HOST=localhost

DB_USERNAME=postgres

DB_PASSWORD=12345

DB_NAME=surapp

DB_PORT=5432

```
These environment variables configure the server port and the database connection.


## Running the app

To run the application, you have several options:

### Development
To start the app in development mode with hot-reloads enabled:
```bash
npm run dev
```
### Production
To build and run the app in production mode:
```bash
npm run build 
npm run start:prod
```

## Database Management
Surapp uses TypeORM for database management. You can use the following commands to manage your database migrations:

### Run migrations
```bash
npm run db:migrate
```

#### Generate a new migration
```bash
npm run db:generate
```

#### Create a new migration file
```bash
npm run db:create
```

#### Revert the last migration
```bash
npm run db:revert
```

#### Drop the database schema
```bash
npm run db:drop
```

#### Restart the database (drop and migrate)
```bash
npm run db:restart
```