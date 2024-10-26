<div style="display: flex; align-items: center; justify-content: start; flex-direction: row; gap: 10px;">
<p align="left">
  <img src="./docs/logo-icon.svg" width="50" />
</p>
<h1>
Selffy
</h1>
</div>

Selffy is a comprehensive platform designed to help you manage all your personal and professional freelance projects seamlessly in one place. With Selffy, you can streamline your workflow, stay organized, and efficiently track your progress, ensuring you never miss a deadline. 

🚧 **Selffy is under development** 🚧

## Tech Stack
- ```React```
- ```VITE```
- ```Typescript```
- ```Shadcn/UI```
- ```TailwindCSS```
- ```Nest.Js```
- ```Prisma ORM```
- ```PostgreSQL```
- ```Docker```

## Dependencies
- [Git](https://git-scm.com/downloads)
- [Node/NPM](https://nodejs.org/)
- [Docker](https://www.docker.com/)

## How to use?
Clone the repository: ```https://github.com/arthurmousinho/selffy.git```

### API
1. Go to **api** folder: ```cd api```
2. Install dependencies: ```npm install```
3. Run docker container: ```docker-compose up -d```
4. Add the migrations: ```npx prisma migrate dev```
5. Create a **.env** file in the root of the project and add the following variables:
```python
DATABASE_URL="postgresql://docker:docker@localhost:5432/selffy-db"
JWT_SECRET="secret"
```
6. Run the API: ```npm run dev```

> - ✅ The API will be running on http://localhost:3000
> - 📖 The Swagger documentation will be available at http://localhost:3000/docs/swagger

### Web
1. Go to **web** folder: ```cd web```
2. Install dependencies: ```npm install```
3. Create a **.env.local** file in the root of the project and add the following variables:
```python
VITE_API_BASE_URL="http://localhost:3000"
```
4. Run the project: ```npm run dev```

> - ✅ The web app will be running on http://localhost:5173

# Notes
- By initial (your database will be empty), the api will run the seeders scripts, creating mock users, projects, tasks, costs and the roles.
- You can use the following admin credentials to login in development mode: 
  - **📩 Email: admin@selffy.com**
  - **🔒 Password: admin123**