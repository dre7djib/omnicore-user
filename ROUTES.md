# Routes disponibles

Base URL: `http://localhost:3002`

## Users

- `POST /users`
- `GET /users`
- `GET /users/:id`
- `PUT /users/:id`
- `DELETE /users/:id`

## Roles

- `POST /roles`
- `GET /roles`
- `GET /roles/:id`
- `PUT /roles/:id`
- `DELETE /roles/:id`

## User Roles

- `POST /user-roles`
- `GET /user-roles`
- `GET /user-roles/:userId`
- `PUT /user-roles/:userId` (body: `role_id`)
- `DELETE /user-roles/:userId`

## User Addresses

- `POST /user-addresses`
- `GET /user-addresses`
- `GET /user-addresses/:id`
- `PUT /user-addresses/:id`
- `DELETE /user-addresses/:id`

## User Preferences

- `POST /user-preferences`
- `GET /user-preferences`
- `GET /user-preferences/:id`
- `PUT /user-preferences/:id`
- `DELETE /user-preferences/:id`

## User Audit Logs

- `POST /user-audit-logs`
- `GET /user-audit-logs`
- `GET /user-audit-logs/:id`
- `PUT /user-audit-logs/:id`
- `DELETE /user-audit-logs/:id`

