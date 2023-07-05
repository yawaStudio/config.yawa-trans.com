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
  .middleware('auth')


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

  Route.get('/view/:id', async (ctx) => {
    const { default: UsersController } = await import(
      'App/Controllers/Http/UsersController'
    )
    return new UsersController().show(ctx)
  })
}).prefix('users')

//Appareils
Route.group(() => {
  Route.get('/', async (ctx) => {
    const { default: AppareilsController } = await import(
      'App/Controllers/Http/AppareilsController'
    )
    return new AppareilsController().index(ctx)
  })

  Route.post('/create', async (ctx) => {
    const { default: AppareilsController } = await import(
      'App/Controllers/Http/AppareilsController'
    )
    return new AppareilsController().store(ctx)
  })

  Route.post('/sim/:id', async (ctx) => {
    const { default: AppareilsController } = await import(
      'App/Controllers/Http/AppareilsController'
    )
    return new AppareilsController().sim(ctx)
  })

  Route.get('/activeted/:id', async (ctx) => {
    const { default: AppareilsController } = await import(
      'App/Controllers/Http/AppareilsController'
    )
    return new AppareilsController().activeted(ctx)
  })
  Route.get('/deactiveted/:id', async (ctx) => {
    const { default: AppareilsController } = await import(
      'App/Controllers/Http/AppareilsController'
    )
    return new AppareilsController().deactiveted(ctx)
  })
  Route.get('/delete/:id', async (ctx) => {
    const { default: AppareilsController } = await import(
      'App/Controllers/Http/AppareilsController'
    )
    return new AppareilsController().destroy(ctx)
  })
}).prefix('appareils')
  .middleware('auth')

//Sims
Route.group(() => {
  Route.get('/', async (ctx) => {
    const { default: SimsController } = await import(
      'App/Controllers/Http/SimsController'
    )
    return new SimsController().index(ctx)
  })

  Route.post('/create', async (ctx) => {
    const { default: SimsController } = await import(
      'App/Controllers/Http/SimsController'
    )
    return new SimsController().store(ctx)
  })

  Route.post('/edit/:id', async (ctx) => {
    const { default: SimsController } = await import(
      'App/Controllers/Http/SimsController'
    )
    return new SimsController().edit(ctx)
  })

  Route.get('/activeted/:id', async (ctx) => {
    const { default: SimsController } = await import(
      'App/Controllers/Http/SimsController'
    )
    return new SimsController().activeted(ctx)
  })
  Route.get('/deactiveted/:id', async (ctx) => {
    const { default: SimsController } = await import(
      'App/Controllers/Http/SimsController'
    )
    return new SimsController().deactiveted(ctx)
  })
  Route.get('/delete/:id', async (ctx) => {
    const { default: SimsController } = await import(
      'App/Controllers/Http/SimsController'
    )
    return new SimsController().destroy(ctx)
  })
}).prefix('sims')
  .middleware('auth')

//Licences
Route.group(() => {
  Route.get('/', async (ctx) => {
    const { default: LicencesController } = await import(
      'App/Controllers/Http/LicencesController'
    )
    return new LicencesController().index(ctx)
  })

  Route.post('/create', async (ctx) => {
    const { default: LicencesController } = await import(
      'App/Controllers/Http/LicencesController'
    )
    return new LicencesController().store(ctx)
  })

  Route.post('/edit/:id', async (ctx) => {
    const { default: LicencesController } = await import(
      'App/Controllers/Http/LicencesController'
    )
    return new LicencesController().edit(ctx)
  })

  Route.get('/activeted/:id', async (ctx) => {
    const { default: LicencesController } = await import(
      'App/Controllers/Http/LicencesController'
    )
    return new LicencesController().activeted(ctx)
  })
  Route.get('/deactiveted/:id', async (ctx) => {
    const { default: LicencesController } = await import(
      'App/Controllers/Http/LicencesController'
    )
    return new LicencesController().deactiveted(ctx)
  })
  Route.get('/delete/:id', async (ctx) => {
    const { default: LicencesController } = await import(
      'App/Controllers/Http/LicencesController'
    )
    return new LicencesController().destroy(ctx)
  })
}).prefix('licences')
  .middleware('auth')


Route.get('/login', async ({ view }) => {
  return view.render('security.login')
})
Route.post('/login', async (ctx) => {
  const { default: AuthController } = await import(
    'App/Controllers/Http/AuthController'
  )
  return new AuthController().login(ctx)
})

Route.get('/logout', async ({ auth, response }) => {
  await auth.use('web').logout()
  response.redirect('/login')
})
