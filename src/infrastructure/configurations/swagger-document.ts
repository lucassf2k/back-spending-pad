export const SwaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Financial Management System API',
    description: 'API for user and financial transaction management',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:3001/',
      description: 'Development server',
    },
  ],
  paths: {
    '/api/v1/users': {
      post: {
        summary: 'Create a new user',
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
            description: 'User successfully created',
          },
        },
      },
    },
    '/api/v1/users/sign-in': {
      post: {
        summary: 'Sign in to the user account',
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
            description: 'Successful login, access token returned',
          },
        },
      },
    },
    '/api/v1/transactions': {
      post: {
        summary: 'Create a new transaction',
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
            description: 'Transaction successfully created',
          },
        },
      },
    },
    '/api/v1/transactions/{id}': {
      delete: {
        summary: 'Delete a specific transaction',
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'ID of the transaction to be deleted',
          },
        ],
        responses: {
          '200': {
            description: 'Transaction successfully deleted',
          },
        },
      },
      get: {
        summary: 'Get a specific transaction',
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'ID of the transaction to be retrieved',
          },
        ],
        responses: {
          '200': {
            description: 'Transaction found',
          },
        },
      },
      put: {
        summary: 'Update a specific transaction',
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'ID of the transaction to be updated',
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
            description: 'Transaction successfully updated',
          },
        },
      },
    },
    '/api/v1/transactions?page=1': {
      get: {
        summary: 'Get all user transactions',
        security: [{ BearerAuth: [] }],
        responses: {
          '200': {
            description: 'List of user transactions',
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
};
