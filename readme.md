# Spending Pad

An application to organize and optimize your finances.

## TECHS
- NodeJS
- PostgreSQL
- TypeScript
- Jest
- Docker
- Swagger
- JWT

## USE CASES
- Create Transaction
- Sign Up
- Sign In
- Delete Transaction
- Get Transaction by ID
- List Transactions
- Update Transaction

## RUN

```zsh
npm install
docker compose up -d
npm run prisma:migrate
npm run start:dev

# OR

npm install -g pnpm
docker compose up -d
pnpm prisma:migrate
pnpm start:dev
```

## Routes

### Create User

**Endpoint:** `POST /api/users`

### Request Parameters

```typescript
type Body = {
  name: string
  email: string
  password: string
}
```

### Get User by ID

**Endpoint:** `GET /api/users/:id`

### Request Parameters

```typescript
type id = uuid
```

### Create Transaction

**Endpoint:** `POST /api/transactions`

### Request Parameters

```typescript
type Body = {
  userId: string
  title: string
  value: number
  type: boolean
}
```

**Note:** `TRUE` represents income values, `FALSE` represents expense values.

### Get Transaction by ID

**Endpoint:** `GET /api/transactions/:id`

### Request Parameters

```typescript
type Params = {
  id: string
}
```

### List Transactions by User ID

**Endpoint:** `GET /api/transactions/list/:userId`

### Request Parameters

```typescript
type userId = uuid
```

### Delete Transaction by ID

**Endpoint:** `DELETE /api/transactions/:id`

### Request Parameters

```typescript
type id = uuid
```

### Update Transaction by ID

**Endpoint:** `PUT /api/transactions/:id`

### Request Parameters

```typescript
type id = uuid

type Body = {
  title?: string
  value?: number
  type?: boolean
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
