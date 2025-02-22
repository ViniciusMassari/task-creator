# Task creator

Simple task creator with simple csv upload

## 💻 Techs

- Fastify
- fast-csv
- Typescript
- Prisma ORM
- Zod

## How to use

```console
git clone git@github.com:ViniciusMassari/task-creator.git
```

Open the project and then:

```console
npm install

npm run start:dev
```

Create a .env file inside the root and create a var like:

```console
DATABASE_URL="postgresql://docker:docker@localhost:5432/task?schema=public"
```

Afterwards execute:

```console
docker compose up -d

npx prisma studio
```

Open the docs in endpoint: /documentation

### Uploading csv

The CSV file should be like the one inside the assets folder, you can use it.

### Opening the database

```console
npx prisma studio
```
