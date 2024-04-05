export const SwaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Sistema de Gerenciamento Financeiro API',
    description: 'API para gerenciamento de usuários e transações financeiras',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:3001/',
      description: 'Servidor de desenvolvimento',
    },
  ],
  paths: {
    '/api/users': {
      post: {
        summary: 'Criar um novo usuário',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'Fulando de Tal' },
                  email: { type: 'string', example: 'fulano@mail.com' },
                  password: { type: 'string', example: '123456578' },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Usuário criado com sucesso',
          },
        },
      },
    },
    '/api/users/sign-in': {
      post: {
        summary: 'Entrar na conta do usuário',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string', example: 'fulano@mail.com' },
                  password: { type: 'string', example: '123456578' },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Login bem-sucedido, token de acesso retornado',
          },
        },
      },
    },
    '/api/transactions': {
      post: {
        summary: 'Criar uma nova transação',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string', example: 'Gasto no mercado do mês' },
                  value: { type: 'number', example: 589.5 },
                  type: { type: 'boolean', example: false },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Transação criada com sucesso',
          },
        },
      },
    },
    '/api/transactions/{id}': {
      delete: {
        summary: 'Deletar uma transação específica',
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'ID da transação a ser deletada',
          },
        ],
        responses: {
          '200': {
            description: 'Transação deletada com sucesso',
          },
        },
      },
      get: {
        summary: 'Obter uma transação específica',
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'ID da transação a ser obtida',
          },
        ],
        responses: {
          '200': {
            description: 'Transação encontrada',
          },
        },
      },
      put: {
        summary: 'Atualizar uma transação específica',
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'ID da transação a ser atualizada',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: {
                    type: 'string',
                    example: 'Gasto no mercado do mês',
                  },
                  value: { type: 'number', example: 589.5 },
                  type: { type: 'boolean', example: false },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Transação atualizada com sucesso',
          },
        },
      },
    },
    '/api/transactions/': {
      get: {
        summary: 'Obter todas as transações do usuário',
        security: [{ BearerAuth: [] }],
        responses: {
          '200': {
            description: 'Lista de transações do usuário',
          },
        },
      },
    },
  },
  securitySchemes: {
    BearerAuth: {
      type: 'http',
      scheme: 'bearer',
    },
  },
}
