This E-commerce-dashboard repository is in conncection with the E-commerce-store

# Install packages

npm i

# Setup .env file
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in

NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/

NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

 This was inserted by `prisma init`:
 Environment variables declared in this file are automatically made available to Prisma.
 See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

 Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
 See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL=''
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
STRIPE_API_KEY=
FRONTEND_STORE_URL=http://localhost:3001
STRIPE_WEBHOOK_SECRET=

# Connect to PlanetScale and Push Prisma
npx prisma generate
npx prisma db push

# Connect to PlanetScale and Push Prisma
npx prisma generate
npx prisma db push

# Start the app
npm run dev
make sure the app runs on port: http://localhost:3000
