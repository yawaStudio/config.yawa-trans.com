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
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async (ctx) => {
  const { default: HomeController } = await import(
    'App/Controllers/Http/HomeController'
  )
  return new HomeController().index(ctx)
})
Route.group(() => {
  Route.get('/', async (ctx) => {
    const { default: UsersController } = await import(
      'App/Controllers/Http/UsersController'
    )
    return new UsersController().index(ctx)
  })

  Route.post('/create', async (ctx) => {
    const { default: UsersController } = await import(
      'App/Controllers/Http/UsersController'
    )
    return new UsersController().store(ctx)
  })
}).prefix('users')



Route.get('/login', async ({ view }) => {
  return view.render('security.login')
})