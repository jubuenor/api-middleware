/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(()=>{
  Route.post('/register','AuthController.register');
  Route.post('/login','AuthController.login');

  // middleware perfil usuario

  Route.group(()=>{
    Route.get('/users','UsersController.listUsers');
    Route.get('/users/:name','UsersController.findByName');
    Route.put('/users/:id','UsersController.updateUser');
    Route.delete('/users/:id','UsersController.deleteUser');
  }).middleware("authUser");

  // middleware perfil admin

  Route.group(()=>{
    Route.post('/profiles','ProfilesController.registerProfile');
    Route.get('/profiles','ProfilesController.listProfiles');
    Route.get('/profiles/id','ProfilesController.showProfile');
    Route.put('/profiles/:id','ProfilesController.updateProfile');
    Route.delete('/profiles/:id','ProfilesController.deleteProfile');
  }).middleware("authAdmin");

  // middleware perfil admin library

  Route.group(()=>{
    Route.get('/books','BooksController.index');
    Route.get('/books/:id','BooksController.showBook');
    Route.put('/books/update/:id','BooksController.update');
    Route.post('/books','BooksController.store');
    Route.delete('/books/:id','BooksController.deleteBook');
  }).middleware("authLibrary");
  
}).prefix('/api')