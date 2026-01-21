# Omnicore User Service

User management microservice for the Omnicore e-commerce platform.

## Features

- User CRUD operations
- Role-based access control
- User address management
- User preferences management
- User audit logging
- RESTful API endpoints

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v13 or higher)
- npm or yarn

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp env_exemple .env
# Edit .env with your database credentials
```

3. Run database migrations:
```bash
npm run prisma:migrate
```

4. Generate Prisma Client:
```bash
npm run prisma:generate
```

## Running the Service

### Development mode:
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with hot reload
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio (database GUI)

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | - |
| PORT | Server port | 3002 |
| NODE_ENV | Environment (development/production) | development |

## API Endpoints

### Users
- `GET /users` - List all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Roles
- `GET /roles` - List all roles
- `GET /roles/:id` - Get role by ID
- `POST /roles` - Create new role
- `PUT /roles/:id` - Update role
- `DELETE /roles/:id` - Delete role

### User Roles
- `GET /user-roles` - List all user roles
- `GET /user-roles/:userId` - Get user roles by user ID
- `POST /user-roles` - Assign role to user
- `PUT /user-roles/:userId` - Update user role
- `DELETE /user-roles/:userId` - Remove role from user

### User Addresses
- `GET /user-addresses` - List all user addresses
- `GET /user-addresses/:id` - Get address by ID
- `POST /user-addresses` - Create new address
- `PUT /user-addresses/:id` - Update address
- `DELETE /user-addresses/:id` - Delete address

### User Preferences
- `GET /user-preferences` - List all user preferences
- `GET /user-preferences/:id` - Get preferences by ID
- `POST /user-preferences` - Create new preferences
- `PUT /user-preferences/:id` - Update preferences
- `DELETE /user-preferences/:id` - Delete preferences

### User Audit Logs
- `GET /user-audit-logs` - List all audit logs
- `GET /user-audit-logs/:id` - Get audit log by ID
- `POST /user-audit-logs` - Create new audit log
- `PUT /user-audit-logs/:id` - Update audit log
- `DELETE /user-audit-logs/:id` - Delete audit log

## Database Schema

### Models
- **User** - User information and profile data
- **Role** - Role definitions for access control
- **UserRole** - Many-to-many relationship between users and roles
- **UserAddress** - User shipping and billing addresses
- **UserPreference** - User preferences (language, timezone, notifications)
- **UserAuditLog** - Audit trail for user actions

## Project Structure

```
omnicore-user/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── middlewares/    # Express middlewares
│   ├── models/         # Data models
│   ├── repositories/   # Data access layer
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── utils/          # Helper functions
│   ├── validators/     # Request validation schemas
│   ├── app.js          # Express app setup
│   └── server.js       # Server entry point
├── prisma/
│   ├── migrations/     # Database migrations
│   └── schema.prisma   # Database schema
├── .env                # Environment variables
└── package.json        # Dependencies
```

## License

ISC
