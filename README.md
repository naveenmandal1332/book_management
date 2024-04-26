# book_management

## Installation

Provide instructions on how to install the project and its dependencies.

```bash
npm install
```

## Configuration

Before running the project, make sure to set up the following environment variables:

- PORT: The port number on which the server will run. Default is 3000.
- MONGODB_URL: The MongoDB connection URL.
- SECRET_KEY: Secret key used for signing JWT tokens.
- TOKEN_EXPIRY: Expiration time for JWT tokens in seconds.

## Running the Application

To run the application, use the following command:

```bash
npm start
```

## API Endpoints

- Description: Handle User Input validation

### User Api

#### POST /api/user/signup

- Description: Endpoint for user signup.
- Request Body:
  ```json
  {
    "name": "naveen mandal",
    "email": "test9@gmail.com",
    "password": "123456789"
  }
  ```

#### POST /api/user/signin

- Description: Endpoint for user authentication.
- Request Body:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

#### GET /api/user/logout

- Description: Endpoint for user logout.
- cookies:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MmE5OTY3NWNjODUzMjU5MGRkZmE1YSIsImlhdCI6MTcxNDE2MDUyNCwiZXhwIjoxOTczMzYwNTI0fQ.09be5gbobOzs5FElwek0jC3mpUuTf_9MHV77dRFhOzQ"
  }
  ```

### Books Api

#### POST /api/book

- Description: Endpoint for add books but only loggedIn user can add the books.

- Headers

  ```json
  {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MmE5OTY3NWNjODUzMjU5MGRkZmE1YSIsImlhdCI6MTcxNDE2MDUyNCwiZXhwIjoxOTczMzYwNTI0fQ.09be5gbobOzs5FElwek0jC3mpUuTf_9MHV77dRFhOzQ"
  }
  ```

- Request Body:
  - Description: User cannot add any invalid value in year field like any negative number or any future year
  ```json
  {
    "title": "OOps",
    "author": "Naveen",
    "publisher": "Arihant",
    "year": 2000,
    "userId": "662a99675cc8532590ddfa5a"
  }
  ```

#### PATCH /api/book/:id

- Description: Endpoint for update any books details.

- Headers

  ```json
  {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MmE5OTY3NWNjODUzMjU5MGRkZmE1YSIsImlhdCI6MTcxNDE2MDUyNCwiZXhwIjoxOTczMzYwNTI0fQ.09be5gbobOzs5FElwek0jC3mpUuTf_9MHV77dRFhOzQ"
  }
  ```

- Request Body:
  - Description: You can update any details of books.
  ```json
  {
    "title": "DBMS Raju",
    "author": "Tony",
    "publisher": "Penguine",
    "year": 2020
  }
  ```

#### DELETE /api/book/:id

- Description: Endpoint for delete books

- Headers

  ```json
  {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MmE5OTY3NWNjODUzMjU5MGRkZmE1YSIsImlhdCI6MTcxNDE2MDUyNCwiZXhwIjoxOTczMzYwNTI0fQ.09be5gbobOzs5FElwek0jC3mpUuTf_9MHV77dRFhOzQ"
  }
  ```

#### POST /api/book/fetch

- Description: Endpoint for fetch books details any filter given in the body if you dont provide any filter in body it will fetch all books from database.

- Headers

  ```json
  {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MmE5OTY3NWNjODUzMjU5MGRkZmE1YSIsImlhdCI6MTcxNDE2MDUyNCwiZXhwIjoxOTczMzYwNTI0fQ.09be5gbobOzs5FElwek0jC3mpUuTf_9MHV77dRFhOzQ"
  }
  ```

- Request Body:
  - Description: These are filters and it's a dynamic filter, it fetch data on the basis of filter.
  ```json
  {
    "year": 2018,
    "author": "",
    "title": "",
    "publisher": "",
    "userId": ""
  }
  ```
