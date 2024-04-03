# Spending Pad

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
