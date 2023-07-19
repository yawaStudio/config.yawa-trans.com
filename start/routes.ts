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

  Route.post('/edit/:id', async (ctx) => {
    const { default: UsersController } = await import(
      'App/Controllers/Http/UsersController'
    )
    return new UsersController().edit(ctx)
  })
  Route.get('/delete/:id', async (ctx) => {
    const { default: UsersController } = await import(
      'App/Controllers/Http/UsersController'
    )
    return new UsersController().destroy(ctx)
  })
  Route.get('/deactiveted/:id', async (ctx) => {
    const { default: UsersController } = await import(
      'App/Controllers/Http/UsersController'
    )
    return new UsersController().deactiveted(ctx)
  })
  Route.get('/activeted/:id', async (ctx) => {
    const { default: UsersController } = await import(
      'App/Controllers/Http/UsersController'
    )
    return new UsersController().activeted(ctx)
  })
  Route.get('/password/:id', async (ctx) => {
    const { default: UsersController } = await import(
      'App/Controllers/Http/UsersController'
    )
    return new UsersController().password(ctx)
  })
}).prefix('users')

//Materiels
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
  Route.post('/edit/:id', async (ctx) => {
    const { default: AppareilsController } = await import(
      'App/Controllers/Http/AppareilsController'
    )
    return new AppareilsController().edit(ctx)
  })
  Route.post('/add/:id', async (ctx) => {
    const { default: AppareilsController } = await import(
      'App/Controllers/Http/AppareilsController'
    )
    return new AppareilsController().add(ctx)
  })
  Route.group(() => {
    Route.get('/', async (ctx) => {
      const { default: AppareilsController } = await import(
        'App/Controllers/Http/AppareilsController'
      )
      return new AppareilsController().device(ctx)
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
  }).prefix('devices')
}).prefix('materiels')
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
  Route.post('/search', async (ctx) => {
    const { default: SimsController } = await import(
      'App/Controllers/Http/SimsController'
    )
    return new SimsController().search(ctx)
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

//Setting
Route.group(() => {
  Route.get('/', async (ctx) => {
    const { default: SettingController } = await import(
      'App/Controllers/Http/SettingController'
    )
    return new SettingController().config(ctx)
  })
  Route.post('/init', async (ctx) => {
    const { default: SettingController } = await import(
      'App/Controllers/Http/SettingController'
    )
    return new SettingController().init(ctx)
  })
  Route.post('/edit/:id', async (ctx) => {
    const { default: SettingController } = await import(
      'App/Controllers/Http/SettingController'
    )
    return new SettingController().edit(ctx)
  })
  Route.post('/logo/:id', async (ctx) => {
    const { default: SettingController } = await import(
      'App/Controllers/Http/SettingController'
    )
    return new SettingController().logo(ctx)
  })
  Route.get('/roles', async (ctx) => {
    const { default: SettingController } = await import(
      'App/Controllers/Http/SettingController'
    )
    return new SettingController().index(ctx)
  })
  Route.post('/roles/create', async (ctx) => {
    const { default: SettingController } = await import(
      'App/Controllers/Http/SettingController'
    )
    return new SettingController().store(ctx)
  })

  Route.post('/roles/edit/:id', async (ctx) => {
    const { default: SettingController } = await import(
      'App/Controllers/Http/SettingController'
    )
    return new SettingController().update(ctx)
  })

}).prefix('settings')
  .middleware('auth')

//Réseaux
Route.group(() => {
  Route.get('/', async (ctx) => {
    const { default: ReseauxController } = await import(
      'App/Controllers/Http/ReseauxController'
    )
    return new ReseauxController().index(ctx)
  })

  Route.post('/create', async (ctx) => {
    const { default: ReseauxController } = await import(
      'App/Controllers/Http/ReseauxController'
    )
    return new ReseauxController().store(ctx)
  })

  Route.post('/edit/:id', async (ctx) => {
    const { default: ReseauxController } = await import(
      'App/Controllers/Http/ReseauxController'
    )
    return new ReseauxController().edit(ctx)
  })
  Route.post('/itinerary/create/:id', async (ctx) => {
    const { default: ReseauxController } = await import(
      'App/Controllers/Http/ReseauxController'
    )
    return new ReseauxController().addItinerary(ctx)
  })
  Route.get('/view/:id', async (ctx) => {
    const { default: ReseauxController } = await import(
      'App/Controllers/Http/ReseauxController'
    )
    return new ReseauxController().view(ctx)
  })
  Route.get('/activeted/:id', async (ctx) => {
    const { default: ReseauxController } = await import(
      'App/Controllers/Http/ReseauxController'
    )
    return new ReseauxController().activeted(ctx)
  })
  Route.get('/deactiveted/:id', async (ctx) => {
    const { default: ReseauxController } = await import(
      'App/Controllers/Http/ReseauxController'
    )
    return new ReseauxController().deactiveted(ctx)
  })
  Route.get('/delete/:id', async (ctx) => {
    const { default: ReseauxController } = await import(
      'App/Controllers/Http/ReseauxController'
    )
    return new ReseauxController().destroy(ctx)
  })
}).prefix('reseaux')
  .middleware('auth')

//Itinéraires
Route.group(() => {
  Route.get('/', async (ctx) => {
    const { default: ItineraryController } = await import(
      'App/Controllers/Http/ItineraryController'
    )
    return new ItineraryController().index(ctx)
  })

  Route.post('/create', async (ctx) => {
    const { default: ItineraryController } = await import(
      'App/Controllers/Http/ItineraryController'
    )
    return new ItineraryController().store(ctx)
  })

  Route.post('/rates/:id', async (ctx) => {
    const { default: ItineraryController } = await import(
      'App/Controllers/Http/ItineraryController'
    )
    return new ItineraryController().rate(ctx)
  })

  Route.post('/edit/:id', async (ctx) => {
    const { default: ItineraryController } = await import(
      'App/Controllers/Http/ItineraryController'
    )
    return new ItineraryController().edit(ctx)
  })
  Route.post('/points/edit/:id', async (ctx) => {
    const { default: ItineraryController } = await import(
      'App/Controllers/Http/ItineraryController'
    )
    return new ItineraryController().points(ctx)
  })
  Route.get('/rates/delete/:id', async (ctx) => {
    const { default: ItineraryController } = await import(
      'App/Controllers/Http/ItineraryController'
    )
    return new ItineraryController().delRate(ctx)
  })
  Route.get('/activeted/:id', async (ctx) => {
    const { default: ItineraryController } = await import(
      'App/Controllers/Http/ItineraryController'
    )
    return new ItineraryController().activeted(ctx)
  })
  Route.get('/deactiveted/:id', async (ctx) => {
    const { default: ItineraryController } = await import(
      'App/Controllers/Http/ItineraryController'
    )
    return new ItineraryController().deactiveted(ctx)
  })
  Route.get('/delete/:id', async (ctx) => {
    const { default: ItineraryController } = await import(
      'App/Controllers/Http/ItineraryController'
    )
    return new ItineraryController().destroy(ctx)
  })
}).prefix('itinerarys')
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
