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
    return new SettingController().index(ctx)
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
  Route.get('/operators/:id', async (ctx) => {
    const { default: ReseauxController } = await import(
      'App/Controllers/Http/ReseauxController'
    )
    return new ReseauxController().op(ctx)
  })
  Route.get('/controllers/:id', async (ctx) => {
    const { default: ReseauxController } = await import(
      'App/Controllers/Http/ReseauxController'
    )
    return new ReseauxController().controllers(ctx)
  })
  Route.get('/regulator/:id', async (ctx) => {
    const { default: ReseauxController } = await import(
      'App/Controllers/Http/ReseauxController'
    )
    return new ReseauxController().regulators(ctx)
  })
  Route.get('/sellers/:id', async (ctx) => {
    const { default: ReseauxController } = await import(
      'App/Controllers/Http/ReseauxController'
    )
    return new ReseauxController().seller(ctx)
  })
  Route.get('/drivers/:id', async (ctx) => {
    const { default: ReseauxController } = await import(
      'App/Controllers/Http/ReseauxController'
    )
    return new ReseauxController().driver(ctx)
  })
  Route.get('/devices/:id', async (ctx) => {
    const { default: ReseauxController } = await import(
      'App/Controllers/Http/ReseauxController'
    )
    return new ReseauxController().device(ctx)
  })
  Route.get('/itinerarys/:id', async (ctx) => {
    const { default: ReseauxController } = await import(
      'App/Controllers/Http/ReseauxController'
    )
    return new ReseauxController().view(ctx)
  })
  Route.get('/rubrics/:id', async (ctx) => {
    const { default: ReseauxController } = await import(
      'App/Controllers/Http/ReseauxController'
    )
    return new ReseauxController().rubrics(ctx)
  })
  Route.get('/vehicules/:id', async (ctx) => {
    const { default: ReseauxController } = await import(
      'App/Controllers/Http/ReseauxController'
    )
    return new ReseauxController().bus(ctx)
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

//Operators
Route.group(() => {
  Route.get('/', async (ctx) => {
    const { default: OperatorController } = await import(
      'App/Controllers/Http/OperatorController'
    )
    return new OperatorController().index(ctx)
  })

  Route.post('/create', async (ctx) => {
    const { default: OperatorController } = await import(
      'App/Controllers/Http/OperatorController'
    )
    return new OperatorController().store(ctx)
  })

  Route.post('/edit/:id', async (ctx) => {
    const { default: OperatorController } = await import(
      'App/Controllers/Http/OperatorController'
    )
    return new OperatorController().edit(ctx)
  })
  Route.post('/vehicules/create/:id', async (ctx) => {
    const { default: OperatorController } = await import(
      'App/Controllers/Http/OperatorController'
    )
    return new OperatorController().addAuto(ctx)
  })
  Route.get('/view/:id', async (ctx) => {
    const { default: OperatorController } = await import(
      'App/Controllers/Http/OperatorController'
    )
    return new OperatorController().view(ctx)
  })
  Route.get('/activeted/:id', async (ctx) => {
    const { default: OperatorController } = await import(
      'App/Controllers/Http/OperatorController'
    )
    return new OperatorController().activeted(ctx)
  })
  Route.get('/deactiveted/:id', async (ctx) => {
    const { default: OperatorController } = await import(
      'App/Controllers/Http/OperatorController'
    )
    return new OperatorController().deactiveted(ctx)
  })
  Route.get('/delete/:id', async (ctx) => {
    const { default: OperatorController } = await import(
      'App/Controllers/Http/OperatorController'
    )
    return new OperatorController().destroy(ctx)
  })
}).prefix('operators')
  .middleware('auth')


//Controllers
Route.group(() => {
  Route.get('/', async (ctx) => {
    const { default: ControllersController } = await import(
      'App/Controllers/Http/ControllersController'
    )
    return new ControllersController().index(ctx)
  })

  Route.post('/create', async (ctx) => {
    const { default: ControllersController } = await import(
      'App/Controllers/Http/ControllersController'
    )
    return new ControllersController().store(ctx)
  })

  Route.post('/edit/:id', async (ctx) => {
    const { default: ControllersController } = await import(
      'App/Controllers/Http/ControllersController'
    )
    return new ControllersController().edit(ctx)
  })
  Route.post('/password/:id', async (ctx) => {
    const { default: ControllersController } = await import(
      'App/Controllers/Http/ControllersController'
    )
    return new ControllersController().editPwd(ctx)
  })
  Route.get('/view/:id', async (ctx) => {
    const { default: ControllersController } = await import(
      'App/Controllers/Http/ControllersController'
    )
    return new ControllersController().view(ctx)
  })
  Route.get('/activeted/:id', async (ctx) => {
    const { default: ControllersController } = await import(
      'App/Controllers/Http/ControllersController'
    )
    return new ControllersController().activeted(ctx)
  })
  Route.get('/deactiveted/:id', async (ctx) => {
    const { default: ControllersController } = await import(
      'App/Controllers/Http/ControllersController'
    )
    return new ControllersController().deactiveted(ctx)
  })
  Route.get('/delete/:id', async (ctx) => {
    const { default: ControllersController } = await import(
      'App/Controllers/Http/ControllersController'
    )
    return new ControllersController().destroy(ctx)
  })
}).prefix('controllers')
  .middleware('auth')

//Sellers
Route.group(() => {
  Route.get('/', async (ctx) => {
    const { default: SellersController } = await import(
      'App/Controllers/Http/SellersController'
    )
    return new SellersController().index(ctx)
  })

  Route.post('/create', async (ctx) => {
    const { default: SellersController } = await import(
      'App/Controllers/Http/SellersController'
    )
    return new SellersController().store(ctx)
  })

  Route.post('/edit/:id', async (ctx) => {
    const { default: SellersController } = await import(
      'App/Controllers/Http/SellersController'
    )
    return new SellersController().edit(ctx)
  })
  
  Route.get('/view/:id', async (ctx) => {
    const { default: SellersController } = await import(
      'App/Controllers/Http/SellersController'
    )
    return new SellersController().view(ctx)
  })
  Route.get('/activeted/:id', async (ctx) => {
    const { default: SellersController } = await import(
      'App/Controllers/Http/SellersController'
    )
    return new SellersController().activeted(ctx)
  })
  Route.get('/deactiveted/:id', async (ctx) => {
    const { default: SellersController } = await import(
      'App/Controllers/Http/SellersController'
    )
    return new SellersController().deactiveted(ctx)
  })
  Route.get('/delete/:id', async (ctx) => {
    const { default: SellersController } = await import(
      'App/Controllers/Http/SellersController'
    )
    return new SellersController().destroy(ctx)
  })
}).prefix('sellers')
  .middleware('auth')
//Drivers
Route.group(() => {
  Route.get('/', async (ctx) => {
    const { default: DriversController } = await import(
      'App/Controllers/Http/DriversController'
    )
    return new DriversController().index(ctx)
  })

  Route.post('/create', async (ctx) => {
    const { default: DriversController } = await import(
      'App/Controllers/Http/DriversController'
    )
    return new DriversController().store(ctx)
  })

  Route.post('/edit/:id', async (ctx) => {
    const { default: DriversController } = await import(
      'App/Controllers/Http/DriversController'
    )
    return new DriversController().edit(ctx)
  })
  
  Route.get('/view/:id', async (ctx) => {
    const { default: DriversController } = await import(
      'App/Controllers/Http/DriversController'
    )
    return new DriversController().view(ctx)
  })
  Route.get('/activeted/:id', async (ctx) => {
    const { default: DriversController } = await import(
      'App/Controllers/Http/DriversController'
    )
    return new DriversController().activeted(ctx)
  })
  Route.get('/deactiveted/:id', async (ctx) => {
    const { default: DriversController } = await import(
      'App/Controllers/Http/DriversController'
    )
    return new DriversController().deactiveted(ctx)
  })
  Route.get('/delete/:id', async (ctx) => {
    const { default: DriversController } = await import(
      'App/Controllers/Http/DriversController'
    )
    return new DriversController().destroy(ctx)
  })
}).prefix('drivers')
  .middleware('auth')

//Rubriques
Route.group(() => {
  Route.get('/', async (ctx) => {
    const { default: RubricsController } = await import(
      'App/Controllers/Http/RubricsController'
    )
    return new RubricsController().index(ctx)
  })

  Route.post('/create', async (ctx) => {
    const { default: RubricsController } = await import(
      'App/Controllers/Http/RubricsController'
    )
    return new RubricsController().store(ctx)
  })

  Route.post('/edit/:id', async (ctx) => {
    const { default: RubricsController } = await import(
      'App/Controllers/Http/RubricsController'
    )
    return new RubricsController().edit(ctx)
  })
  
 
  Route.get('/activeted/:id', async (ctx) => {
    const { default: RubricsController } = await import(
      'App/Controllers/Http/RubricsController'
    )
    return new RubricsController().activeted(ctx)
  })
  Route.get('/deactiveted/:id', async (ctx) => {
    const { default: RubricsController } = await import(
      'App/Controllers/Http/RubricsController'
    )
    return new RubricsController().deactiveted(ctx)
  })
  Route.get('/delete/:id', async (ctx) => {
    const { default: RubricsController } = await import(
      'App/Controllers/Http/RubricsController'
    )
    return new RubricsController().destroy(ctx)
  })
}).prefix('rubrics')
  .middleware('auth')

//regulators
Route.group(() => {
  Route.get('/', async (ctx) => {
    const { default: RegulatorsController } = await import(
      'App/Controllers/Http/RegulatorsController'
    )
    return new RegulatorsController().index(ctx)
  })

  Route.post('/create', async (ctx) => {
    const { default: RegulatorsController } = await import(
      'App/Controllers/Http/RegulatorsController'
    )
    return new RegulatorsController().store(ctx)
  })

  Route.post('/edit/:id', async (ctx) => {
    const { default: RegulatorsController } = await import(
      'App/Controllers/Http/RegulatorsController'
    )
    return new RegulatorsController().edit(ctx)
  })
  
 
  Route.get('/activeted/:id', async (ctx) => {
    const { default: RegulatorsController } = await import(
      'App/Controllers/Http/RegulatorsController'
    )
    return new RegulatorsController().activeted(ctx)
  })
  Route.get('/deactiveted/:id', async (ctx) => {
    const { default: ControllersController } = await import(
      'App/Controllers/Http/ControllersController'
    )
    return new ControllersController().deactiveted(ctx)
  })
  Route.get('/delete/:id', async (ctx) => {
    const { default: RegulatorsController } = await import(
      'App/Controllers/Http/RegulatorsController'
    )
    return new RegulatorsController().destroy(ctx)
  })
}).prefix('regulators')
  .middleware('auth')

  //Réseau devices
Route.group(() => {
  Route.get('/', async (ctx) => {
    const { default: DevicesController } = await import(
      'App/Controllers/Http/DevicesController'
    )
    return new DevicesController().index(ctx)
  })

  Route.post('/create', async (ctx) => {
    const { default: DevicesController } = await import(
      'App/Controllers/Http/DevicesController'
    )
    return new DevicesController().store(ctx)
  })

  Route.post('/edit/:id', async (ctx) => {
    const { default: DevicesController } = await import(
      'App/Controllers/Http/DevicesController'
    )
    return new DevicesController().edit(ctx)
  })
  
 
  Route.get('/activeted/:id', async (ctx) => {
    const { default: DevicesController } = await import(
      'App/Controllers/Http/DevicesController'
    )
    return new DevicesController().activeted(ctx)
  })
  Route.get('/deactiveted/:id', async (ctx) => {
    const { default: DevicesController } = await import(
      'App/Controllers/Http/DevicesController'
    )
    return new DevicesController().deactiveted(ctx)
  })
  Route.get('/delete/:id', async (ctx) => {
    const { default: DevicesController } = await import(
      'App/Controllers/Http/DevicesController'
    )
    return new DevicesController().destroy(ctx)
  })
}).prefix('attributions')
  .middleware('auth')

//Vehicule
Route.group(() => {
  Route.get('/', async (ctx) => {
    const { default: VehiculeController } = await import(
      'App/Controllers/Http/VehiculeController'
    )
    return new VehiculeController().index(ctx)
  })

  Route.post('/create', async (ctx) => {
    const { default: VehiculeController } = await import(
      'App/Controllers/Http/VehiculeController'
    )
    return new VehiculeController().store(ctx)
  })

  Route.post('/edit/:id', async (ctx) => {
    const { default: VehiculeController } = await import(
      'App/Controllers/Http/VehiculeController'
    )
    return new VehiculeController().edit(ctx)
  })
  
  Route.get('/view/:id', async (ctx) => {
    const { default: VehiculeController } = await import(
      'App/Controllers/Http/VehiculeController'
    )
    return new VehiculeController().view(ctx)
  })
  Route.get('/activeted/:id', async (ctx) => {
    const { default: VehiculeController } = await import(
      'App/Controllers/Http/VehiculeController'
    )
    return new VehiculeController().activeted(ctx)
  })
  Route.get('/deactiveted/:id', async (ctx) => {
    const { default: VehiculeController } = await import(
      'App/Controllers/Http/VehiculeController'
    )
    return new VehiculeController().deactiveted(ctx)
  })
  Route.get('/delete/:id', async (ctx) => {
    const { default: VehiculeController } = await import(
      'App/Controllers/Http/VehiculeController'
    )
    return new VehiculeController().destroy(ctx)
  })
}).prefix('vehicules')
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
