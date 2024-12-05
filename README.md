# MonorepoCcTransactions

## Database

Run and stop Postgres database with docker:

```sh
npm run docker:db-up

npm run docker:db-stop

npm run docker:db-down
```

Update database schema

```sh
npm run db:generate
npm run db:push
```

Seed database

```sh
npm run db:seed
```

## Development

Run application in development

```sh
npm run serve
```
