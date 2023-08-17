## Idea Forum Web Application

This is a full-stack web application aimed to implement requirements as: 

- Create a forum where users can share ideas
- Registered users will be able to create, update, and delete their own ideas
- Logged-in users will be able to upvote or add comments to any idea
- Everyone can view an idea and the number of upvotes and comments associated with the idea
- Validate all data received from the user, providing error messages any time data fails to validate

## Development Techniques

- Frontend: Vue.js
- Backend: Laravel Sanctum + Breeze
- Database: MySQL (Tables: users, ideas, comments, upvotes)
  

Built Restful APIs returning JSON Response using Laravel Sanctum with basic authentication handled by Laravel Breeze, and frontend retrieves data using Fetch API by sending asynchronous requests, and processing returned JSON to serve for generating dynamic views of web pages.

Data access and manipulating(CRUD) within relational tables are done with help of Eloquent ORM which is a feature of Laravel.

## Hava a try

After cloning this project to your local directory, you need to complete following steps before running it.

- Install dependencies for laravel project

  Open your command-line interface (CLI) or terminal and navigate to the root directory of your Laravel project. In the terminal, run command:  __composer install__

- Create a .env file if it doesn't exist

  Rename __.env.example__ to __.env__, then configure your database connection

- Generate Application Key

  run command:  __php artisan key:generate__

- Migrate Database

  Run migrations to set up the database tables. Run command: __php artisan migrate --seed__

- Start Development Server

  Start Backend Server (PHP Artisan Serve). Run command: __php artisan serve__

  Start Frontend Server. Navigate to frontend directory of this project, run command: __npm run dev__


Now, you can access this Laravel web application at URL: __Frontend Server URL__ 
  
  
  

