# Spending Pad

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

## Rotas

### Criação de usuários

**Endpoint:** `POST /api/users`

### Parâmetros da requisição

```typescript
type Body = {
  name: string
  email: string
  password: string
}
```

### Obter usuário pelo ID

**Endpoint:** `GET /api/users/:id`

### Parâmetros da Requisição

```typescript
type id = uuid
```

### Criação de transações

**Endpoint:** `POST /api/transactions`

### Parâmetros da requisição

```typescript
type Body = {
  userId: string
  title: string
  value: number
  type: boolean
}
```

\*\*OBS.: TRUE são valores de entrada, FALSE são valores de saída

### Obter transação pelo ID

**Endpoint:** `GET /api/transactions/:id`

### Parâmetros da requisição

```typescript
type Params = {
  id: string
}
```

### Listar transações de um usuário pelo id do usuário

**\*Endpoint:** `GET /api/transactions/list/:userId`

### Parâmetros da requisíção

```typescript
type userId = uuid
```

### Deletar transação pelo id

**Endpoint:** `DELETE /api/transactions/:id`

### Parâmetros da requisição

```typescript
type id = uuid
```

### Atualizar transação pelo id

**Endpoint:** `PUT /api/transactions/:id`

### Parâmetros da requisição

```typescript
type id = uuid

type Body = {
  title?: string
  value?: number
  type?: boolean
}
```
