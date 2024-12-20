# Selffy - API

## Tech Stack
- Node.js
- TypeScript
- Prisma ORM
- PostgreSQL
- Docker
- Nest.js

## How run it?
1. Go to **api** folder: 
```bash
cd api
```

2. Install dependencies:
``` bash
 npm install
```

3. Run docker container: 
```bash
docker-compose up -d
```

4. Create a **.env** file in the root of the project and add the following variables:
```python
DATABASE_URL="postgresql://docker:docker@localhost:5432/selffy-db"
JWT_SECRET=""

AI_MODEL_API_URL="http://localhost:3333"
AI_MODEL_API_KEY=""

CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```
5. Add the migrations: 
```bash
npx prisma migrate dev
```

6. Run the API: 
```bash
npm run dev
```

> - ✅ The API will be running on http://localhost:3000
> - 📖 The Swagger documentation will be available at http://localhost:3000/docs/swagger
> - 💡 By initial (your database will be empty), the api will run the seeders scripts, creating mock users, projects, tasks, costs and the roles.You can use the following admin credentials to login in development mode: email **admin@selffy.com** and password **admin123**