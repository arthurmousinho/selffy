<div style="display: flex; align-items: center; justify-content: start; flex-direction: row; gap: 10px;">
<p align="center">
  <img src="./docs/logo-icon.svg" width="50" />
</p>
<h1>
Selffy
</h1>
</div>

Selffy is a comprehensive platform designed to help you manage all your personal and professional freelance projects seamlessly in one place. With Selffy, you can streamline your workflow, stay organized, and efficiently track your progress, ensuring you never miss a deadline. 

🚧 **Selffy is under development** 🚧

## Tech Stack
- ```React```: 
- ```VITE```: 
- ```Typescript```: 
- ```Shadcn/UI```: 
- ```TailwindCSS```: 
- ```Nest.Js```: 
- ```Prisma ORM```: 
- ```PostgreSQL```: 
- ```Docker```: 

## Dependencies
- [Node/NPM](https://nodejs.org/)
- [Docker](https://www.docker.com/)

## How to run it?
Clone the repository
```bash
https://github.com/arthurmousinho/selffy.git
```

### API
Go to **api** folder
```bash
cd api
```
Install dependencies 
```bash
npm install
```
Run docker container
```bash
docker-compose up -d
```
Add the migrations 
```bash
npx prisma migrate dev
```
Create a .env file in the root of the project and add the following variables:
```python
DATABASE_URL="postgresql://docker:docker@localhost:5432/selffy-db"
JWT_SECRET="secret"
```
Run the API
```bash
npm run start:dev
```
Open API Swagger Documentation
[http://localhost:3000/docs/swagger](http://localhost:3000/docs/swagger)

## Web
Go to **web** folder
```bash
cd web
```
Install dependencies
```bash
npm install
```
Create a .env.local file in the root of the project and add the following variables:
```python
VITE_API_BASE_URL="http://localhost:3000"
```
Run the Web
```bash
npm run dev
```