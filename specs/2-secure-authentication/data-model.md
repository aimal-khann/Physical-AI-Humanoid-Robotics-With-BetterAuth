# Data Model: Secure Authentication System

This document defines the data structures for the Secure Authentication feature, based on the feature specification.

## User Entity

Represents a user account in the system.

- **Source**: `spec.md`, "Key Entities" section.
- **Storage**: Neon Postgres database, `users` table.

| Field Name           | Data Type        | Constraints                             | Description                                  |
|----------------------|------------------|-----------------------------------------|----------------------------------------------|
| `id`                 | `UUID`           | Primary Key, Auto-generated             | Unique identifier for the user.              |
| `name`               | `VARCHAR(255)`   | Not Null                                | The user's full name.                        |
| `email`              | `VARCHAR(255)`   | Not Null, Unique                        | The user's email address, used for login.    |
| `password`           | `VARCHAR(255)`   | Not Null                                | The user's hashed password.                  |
| `softwareBackground` | `TEXT`           |                                         | User-provided description of software experience. |
| `hardwareBackground` | `TEXT`           |                                         | User-provided description of hardware experience. |
| `createdAt`          | `TIMESTAMPTZ`    | Not Null, Default `NOW()`               | Timestamp of when the user account was created. |
| `updatedAt`          | `TIMESTAMPTZ`    | Not Null, Default `NOW()`               | Timestamp of the last update to the user account. |

### State Transitions

- A `User` entity is created when a new user successfully completes the registration form.
- The `updatedAt` field is modified whenever a user's details are changed (though this feature does not include profile editing).
