<div style="display: flex; align-items: center; justify-content: start; flex-direction: row; gap: 10px;">
<p align="left">
  <img src="./docs/logo-icon.svg" width="50" />
</p>
<h1>
Selffy 
</h1>
</div>

![preview](./docs/preview.png)

## About
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
4. Create a **.env** file in the root of the project and add the following variables:
```python
DATABASE_URL="postgresql://docker:docker@localhost:5432/selffy-db"
JWT_SECRET="secret"
```
5. Add the migrations: ```npx prisma migrate dev```
6. Run the API: ```npm run dev```

> - ✅ The API will be running on http://localhost:3000
> - 📖 The Swagger documentation will be available at http://localhost:3000/docs/swagger
> - 💡 By initial (your database will be empty), the api will run the seeders scripts, creating mock users, projects, tasks, costs and the roles.You can use the following admin credentials to login in development mode: email **admin@selffy.com** and password **admin123**


### Web
1. Go to **web** folder: ```cd web```
2. Install dependencies: ```npm install```
3. Create a **.env.local** file in the root of the project and add the following variables:
```python
VITE_API_BASE_URL="http://localhost:3000"
```
4. Run the project: ```npm run dev```

> - ✅ The web app will be running on http://localhost:5173

## Features

### Users

- [x] It should be able to authenticate a user using e-mail & password;
- [x] It should be able to create a user;
- [x] It should be able to update a user;
- [x] It should be able to delete a user;
- [x] It should be able to list all users;
- [x] It should be able to get a user by id;
- [x] It should be able to count the number of users;
- [x] It should be able to search users by name;
- [x] It should be able to get the users insights;
- [x] It should be able to get the users growth (monthly, weekly, daily);

### Projects

- [x] It should be able to create a project;
- [x] It should be able to update a project;
- [x] It should be able to delete a project;
- [x] It should be able to list all projects;
- [x] It should be able to get a project by id;
- [x] It should be able to count the number of projects;
- [x] It should be able to count the number of projects by status;
- [x] It should be able to get the projects growth (monthly, weekly, daily);
- [x] It should be able to get the projects total revenue;
- [x] It should be able to search projects by title;
- [x] It should be able to get the projects insights;

### Tasks

- [x] It should be able to create a task;
- [x] It should be able to update a task;
- [x] It should be able to delete a task;
- [x] It should be able to list all tasks;
- [x] It should be able to get a task by id;
- [x] It should be able to count the number of tasks;
- [x] It should be able to count the number of tasks by status;
- [x] It should be able to count the number of tasks by priority;
- [x] It should be able to get the tasks growth (monthly, weekly, daily);
- [x] It should be able to get the tasks insights;
- [x] It should be able to search tasks by title;

### Costs
- [x] It should be able to create a cost;
- [x] It should be able to update a cost;
- [x] It should be able to delete a cost;
- [x] It should be able to list all costs;
- [x] It should be able to get a cost by id;
- [x] It should be able to count the number of costs;
- [x] It should be able to get the costs growth (monthly, weekly, daily);
- [x] It should be able to get the costs insights;
- [x] It should be able to search costs by title;
- [x] It should be able to get the costs total value;

## RBAC (Role Based Access Control)

### Roles

- ```Admin```
- ```Free```
- ```Free```

### Permissions table

|                                 | Admin | Free  | Premium|
|---------------------------------|-------|-------|--------|
| **Access Admin Dashboard**      | ✅    | ❌    | ❌     |
| **Access User Dashboard**       | ✅    | ✅    | ✅     | 
| **Create User**                 | ✅    | ⚠️     | ⚠️      | x
| **Update User**                 | ✅    | ⚠️     | ⚠️      |x
| **Delete User**                 | ✅    | ⚠️    | ⚠️     |
| **List Users**                  | ✅    | ❌    | ❌     |
| **Search Users**                | ✅    | ❌    | ❌     |
| **Access Project Insights**     | ✅    | ✅    | ✅     |
| **Create Project**              | ✅    | ⚠️     | ✅     |
| **Update Project**              | ✅    | ⚠️     | ⚠️      |
| **Delete Project**              | ✅    | ⚠️     | ⚠️      |
| **Search Projects**             | ✅    | ❌    | ❌     |
| **Access Task Insights**        | ✅    | ⚠️     | ⚠️      |
| **Create Task**                 | ✅    | ⚠️     | ⚠️      |
| **Update Task**                 | ✅    | ⚠️     | ⚠️      |
| **Delete Task**                 | ✅    | ⚠️     | ⚠️      |
| **View Costs Insights**         | ✅    | ⚠️     | ⚠️      |
| **Add Costs**                   | ✅    | ⚠️     | ⚠️      |
| **Update Costs**                | ✅    | ⚠️     | ⚠️      |
| **Delete Costs**                | ✅    | ⚠️     | ⚠️      |

> ✅ = allowed  
> ❌ = not allowed  
> ⚠️ = allowed with limitations or specific conditions


#### Conditions

- ```Free```: Can only create 5 projects.
- ```Premium```: Can create unlimited projects.
- ```Free``` ```Premium```: Can only do actions related to themselves. Ex: Can update their user profile, but can't update other users profiles.