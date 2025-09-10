# Node.js TypeScript Boilerplate

A production-ready Node.js TypeScript boilerplate with Express.js, MongoDB, JWT authentication, and comprehensive security features.

## 🚀 Features

- **TypeScript** - Full TypeScript support with strict type checking
- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT Authentication** - Secure token-based authentication
- **Rate Limiting** - Built-in rate limiting for API protection
- **Security** - Helmet.js, CORS, input validation with Zod
- **Code Quality** - ESLint, Prettier, and TypeScript strict mode
- **Environment Configuration** - Environment variables with .env support
- **Error Handling** - Comprehensive error handling middleware
- **Logging** - Morgan HTTP request logger

## 📁 Project Structure

```
src/
├── config/
│   └── db.ts              # Database configuration
├── controllers/
│   └── authController.ts   # Authentication controllers
├── middleware/
│   ├── authMiddleware.ts   # JWT authentication middleware
│   ├── errorMiddleware.ts  # Error handling middleware
│   └── rateLimiter.ts      # Rate limiting middleware
├── models/
│   └── userModel.ts        # User Mongoose model
├── routes/
│   └── authRoutes.ts       # Authentication routes
├── types/
│   └── express/
│       └── index.d.ts      # Express type extensions
├── utils/
│   └── generateToken.ts    # JWT token generation utility
├── validators/
│   └── authValidator.ts    # Input validation schemas
└── app.ts                  # Main application file
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nodejs-typescript-boilerplate.git
   cd nodejs-typescript-boilerplate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=3000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/nodejs-typescript-boilerplate
   JWT_SECRET=your-super-secret-jwt-key-here
   CORS_ORIGIN=http://localhost:3000
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🚀 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run start` - Build and start production server
- `npm run build:prod` - Build for production
- `npm run build:push` - Lint, format, and build for production
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Check code formatting with Prettier
- `npm run format:fix` - Fix code formatting with Prettier

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/nodejs-typescript-boilerplate` |
| `JWT_SECRET` | JWT secret key | Required |
| `CORS_ORIGIN` | CORS allowed origin | `http://localhost:3000` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window in milliseconds | `900000` (15 minutes) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `100` |

### Rate Limiting

The boilerplate includes three levels of rate limiting:

1. **General Rate Limiter** - Applied to all routes
   - 100 requests per 15 minutes per IP

2. **Auth Rate Limiter** - Applied to authentication routes
   - 5 requests per 15 minutes per IP

3. **Password Reset Rate Limiter** - For password reset functionality
   - 3 requests per hour per IP

## 📚 API Endpoints

### Authentication

| Method | Endpoint | Description | Rate Limit |
|--------|----------|-------------|------------|
| POST | `/api/v1/auth/register` | Register a new user | 5/15min |
| POST | `/api/v1/auth/login` | Login user | 5/15min |
| GET | `/api/v1/auth/me` | Get current user | 100/15min |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check endpoint |

## 🔒 Security Features

- **Helmet.js** - Sets security headers
- **CORS** - Configurable Cross-Origin Resource Sharing
- **Rate Limiting** - Multiple levels of rate limiting
- **Input Validation** - Zod schema validation
- **Password Hashing** - bcryptjs for secure password storage
- **JWT Authentication** - Secure token-based authentication
- **Environment Variables** - Sensitive data protection

## 🧪 Example Usage

### Register a new user

```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get current user

```bash
curl -X GET http://localhost:3000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🛡️ Security Best Practices

1. **Change default JWT secret** - Use a strong, unique JWT secret
2. **Configure CORS properly** - Set appropriate CORS origins for production
3. **Use HTTPS in production** - Always use HTTPS in production environments
4. **Regular dependency updates** - Keep dependencies updated for security patches
5. **Environment variables** - Never commit sensitive data to version control
6. **Rate limiting** - Adjust rate limits based on your application needs

## 🚀 Deployment

### Using Docker (Recommended)

1. Create a `Dockerfile`:
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build:prod
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. Build and run:
   ```bash
   docker build -t nodejs-typescript-boilerplate .
   docker run -p 3000:3000 --env-file .env nodejs-typescript-boilerplate
   ```

### Manual Deployment

1. Build the application:
   ```bash
   npm run build:prod
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) - Web framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [MongoDB](https://www.mongodb.com/) - Database
- [Mongoose](https://mongoosejs.com/) - ODM
- [JWT](https://jwt.io/) - Authentication
- [Zod](https://zod.dev/) - Schema validation

---

**Happy Coding! 🚀**