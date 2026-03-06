import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Omnicore User Service API',
      version: '1.0.0',
      description: 'API de gestion des utilisateurs, rôles, adresses, préférences et logs d\'audit pour Omnicore.',
    },
    servers: [
      {
        url: 'http://localhost:3002',
        description: 'Serveur de développement',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            auth_user_id: { type: 'string', format: 'uuid' },
            country_id: { type: 'string', format: 'uuid' },
            first_name: { type: 'string' },
            last_name: { type: 'string' },
            phone_number: { type: 'string' },
            status: { type: 'string' },
          },
        },
        CreateUserInput: {
          type: 'object',
          required: ['auth_user_id', 'country_id'],
          properties: {
            auth_user_id: { type: 'string', format: 'uuid' },
            country_id: { type: 'string', format: 'uuid' },
            first_name: { type: 'string', maxLength: 255 },
            last_name: { type: 'string', maxLength: 255 },
            phone_number: { type: 'string', maxLength: 50 },
            status: { type: 'string', maxLength: 50 },
          },
        },
        UpdateUserInput: {
          type: 'object',
          properties: {
            country_id: { type: 'string', format: 'uuid' },
            first_name: { type: 'string', maxLength: 255 },
            last_name: { type: 'string', maxLength: 255 },
            phone_number: { type: 'string', maxLength: 50 },
            status: { type: 'string', maxLength: 50 },
          },
          minProperties: 1,
        },
        Role: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            description: { type: 'string' },
          },
        },
        RoleInput: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
          },
        },
        CreateUserRoleInput: {
          type: 'object',
          required: ['user_id', 'role_id'],
          properties: {
            user_id: { type: 'string', format: 'uuid' },
            role_id: { type: 'string', format: 'uuid' },
            assigned_at: { type: 'string', format: 'date-time', nullable: true },
          },
        },
        UpdateUserRoleInput: {
          type: 'object',
          properties: {
            role_id: { type: 'string', format: 'uuid' },
            assigned_at: { type: 'string', format: 'date-time', nullable: true },
          },
          minProperties: 1,
        },
        UserAddress: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            user_id: { type: 'string', format: 'uuid' },
            country_id: { type: 'string', format: 'uuid', nullable: true },
            street: { type: 'string' },
            city: { type: 'string' },
            postal_code: { type: 'string' },
            is_primary: { type: 'boolean' },
          },
        },
        CreateUserAddressInput: {
          type: 'object',
          required: ['user_id'],
          properties: {
            user_id: { type: 'string', format: 'uuid' },
            country_id: { type: 'string', format: 'uuid', nullable: true },
            street: { type: 'string', maxLength: 255 },
            city: { type: 'string', maxLength: 255 },
            postal_code: { type: 'string', maxLength: 255 },
            is_primary: { type: 'boolean' },
          },
        },
        UpdateUserAddressInput: {
          type: 'object',
          properties: {
            user_id: { type: 'string', format: 'uuid' },
            country_id: { type: 'string', format: 'uuid', nullable: true },
            street: { type: 'string', maxLength: 255 },
            city: { type: 'string', maxLength: 255 },
            postal_code: { type: 'string', maxLength: 255 },
            is_primary: { type: 'boolean' },
          },
          minProperties: 1,
        },
        UserPreference: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            user_id: { type: 'string', format: 'uuid' },
            language: { type: 'string' },
            timezone: { type: 'string' },
            notifications_enabled: { type: 'boolean' },
          },
        },
        CreateUserPreferenceInput: {
          type: 'object',
          required: ['user_id'],
          properties: {
            user_id: { type: 'string', format: 'uuid' },
            language: { type: 'string', maxLength: 255 },
            timezone: { type: 'string', maxLength: 255 },
            notifications_enabled: { type: 'boolean' },
          },
        },
        UpdateUserPreferenceInput: {
          type: 'object',
          properties: {
            user_id: { type: 'string', format: 'uuid' },
            language: { type: 'string', maxLength: 255 },
            timezone: { type: 'string', maxLength: 255 },
            notifications_enabled: { type: 'boolean' },
          },
          minProperties: 1,
        },
        UserAuditLog: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            user_id: { type: 'string', format: 'uuid' },
            action: { type: 'string' },
            performed_by: { type: 'string', format: 'uuid', nullable: true },
            created_at: { type: 'string', format: 'date-time', nullable: true },
          },
        },
        CreateUserAuditLogInput: {
          type: 'object',
          required: ['user_id', 'action'],
          properties: {
            user_id: { type: 'string', format: 'uuid' },
            action: { type: 'string', maxLength: 255 },
            performed_by: { type: 'string', format: 'uuid', nullable: true },
            created_at: { type: 'string', format: 'date-time', nullable: true },
          },
        },
        UpdateUserAuditLogInput: {
          type: 'object',
          properties: {
            user_id: { type: 'string', format: 'uuid' },
            action: { type: 'string', maxLength: 255 },
            performed_by: { type: 'string', format: 'uuid', nullable: true },
            created_at: { type: 'string', format: 'date-time', nullable: true },
          },
          minProperties: 1,
        },
      },
    },
  },
  apis: ['./src/routes/*.js', './src/app.js'],
};

export const swaggerSpec = swaggerJsdoc(options);
