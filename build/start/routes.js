"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.get('/', async (ctx) => {
    const { default: HomeController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/HomeController')));
    return new HomeController().index(ctx);
})
    .middleware('auth');
Route_1.default.group(() => {
    Route_1.default.get('/', async (ctx) => {
        const { default: UsersController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/UsersController')));
        return new UsersController().index(ctx);
    });
    Route_1.default.post('/create', async (ctx) => {
        const { default: UsersController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/UsersController')));
        return new UsersController().store(ctx);
    });
    Route_1.default.post('/edit/:id', async (ctx) => {
        const { default: UsersController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/UsersController')));
        return new UsersController().edit(ctx);
    });
    Route_1.default.get('/delete/:id', async (ctx) => {
        const { default: UsersController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/UsersController')));
        return new UsersController().destroy(ctx);
    });
    Route_1.default.get('/deactiveted/:id', async (ctx) => {
        const { default: UsersController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/UsersController')));
        return new UsersController().deactiveted(ctx);
    });
    Route_1.default.get('/activeted/:id', async (ctx) => {
        const { default: UsersController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/UsersController')));
        return new UsersController().activeted(ctx);
    });
    Route_1.default.get('/password/:id', async (ctx) => {
        const { default: UsersController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/UsersController')));
        return new UsersController().password(ctx);
    });
}).prefix('users');
Route_1.default.group(() => {
    Route_1.default.get('/', async (ctx) => {
        const { default: AppareilsController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/AppareilsController')));
        return new AppareilsController().index(ctx);
    });
    Route_1.default.post('/create', async (ctx) => {
        const { default: AppareilsController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/AppareilsController')));
        return new AppareilsController().store(ctx);
    });
    Route_1.default.post('/edit/:id', async (ctx) => {
        const { default: AppareilsController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/AppareilsController')));
        return new AppareilsController().edit(ctx);
    });
    Route_1.default.post('/add/:id', async (ctx) => {
        const { default: AppareilsController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/AppareilsController')));
        return new AppareilsController().add(ctx);
    });
    Route_1.default.group(() => {
        Route_1.default.get('/', async (ctx) => {
            const { default: AppareilsController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/AppareilsController')));
            return new AppareilsController().device(ctx);
        });
        Route_1.default.post('/create', async (ctx) => {
            const { default: AppareilsController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/AppareilsController')));
            return new AppareilsController().store(ctx);
        });
        Route_1.default.post('/sim/:id', async (ctx) => {
            const { default: AppareilsController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/AppareilsController')));
            return new AppareilsController().sim(ctx);
        });
        Route_1.default.get('/activeted/:id', async (ctx) => {
            const { default: AppareilsController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/AppareilsController')));
            return new AppareilsController().activeted(ctx);
        });
        Route_1.default.get('/deactiveted/:id', async (ctx) => {
            const { default: AppareilsController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/AppareilsController')));
            return new AppareilsController().deactiveted(ctx);
        });
        Route_1.default.get('/delete/:id', async (ctx) => {
            const { default: AppareilsController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/AppareilsController')));
            return new AppareilsController().destroy(ctx);
        });
    }).prefix('devices');
    Route_1.default.get('/delete/:id', async (ctx) => {
        const { default: AppareilsController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/AppareilsController')));
        return new AppareilsController().delete(ctx);
    });
}).prefix('materiels')
    .middleware('auth');
Route_1.default.group(() => {
    Route_1.default.get('/', async (ctx) => {
        const { default: SimsController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/SimsController')));
        return new SimsController().index(ctx);
    });
    Route_1.default.post('/create', async (ctx) => {
        const { default: SimsController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/SimsController')));
        return new SimsController().store(ctx);
    });
    Route_1.default.post('/search', async (ctx) => {
        const { default: SimsController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/SimsController')));
        return new SimsController().search(ctx);
    });
    Route_1.default.post('/edit/:id', async (ctx) => {
        const { default: SimsController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/SimsController')));
        return new SimsController().edit(ctx);
    });
    Route_1.default.get('/activeted/:id', async (ctx) => {
        const { default: SimsController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/SimsController')));
        return new SimsController().activeted(ctx);
    });
    Route_1.default.get('/deactiveted/:id', async (ctx) => {
        const { default: SimsController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/SimsController')));
        return new SimsController().deactiveted(ctx);
    });
    Route_1.default.get('/delete/:id', async (ctx) => {
        const { default: SimsController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/SimsController')));
        return new SimsController().destroy(ctx);
    });
}).prefix('sims')
    .middleware('auth');
Route_1.default.group(() => {
    Route_1.default.get('/', async (ctx) => {
        const { default: LicencesController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/LicencesController')));
        return new LicencesController().index(ctx);
    });
    Route_1.default.post('/create', async (ctx) => {
        const { default: LicencesController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/LicencesController')));
        return new LicencesController().store(ctx);
    });
    Route_1.default.post('/edit/:id', async (ctx) => {
        const { default: LicencesController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/LicencesController')));
        return new LicencesController().edit(ctx);
    });
    Route_1.default.get('/activeted/:id', async (ctx) => {
        const { default: LicencesController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/LicencesController')));
        return new LicencesController().activeted(ctx);
    });
    Route_1.default.get('/deactiveted/:id', async (ctx) => {
        const { default: LicencesController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/LicencesController')));
        return new LicencesController().deactiveted(ctx);
    });
    Route_1.default.get('/delete/:id', async (ctx) => {
        const { default: LicencesController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/LicencesController')));
        return new LicencesController().destroy(ctx);
    });
}).prefix('licences')
    .middleware('auth');
Route_1.default.group(() => {
    Route_1.default.get('/', async (ctx) => {
        const { default: SettingController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/SettingController')));
        return new SettingController().index(ctx);
    });
    Route_1.default.post('/init', async (ctx) => {
        const { default: SettingController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/SettingController')));
        return new SettingController().init(ctx);
    });
    Route_1.default.post('/edit/:id', async (ctx) => {
        const { default: SettingController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/SettingController')));
        return new SettingController().edit(ctx);
    });
    Route_1.default.post('/logo/:id', async (ctx) => {
        const { default: SettingController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/SettingController')));
        return new SettingController().logo(ctx);
    });
    Route_1.default.get('/roles', async (ctx) => {
        const { default: SettingController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/SettingController')));
        return new SettingController().index(ctx);
    });
    Route_1.default.post('/roles/create', async (ctx) => {
        const { default: SettingController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/SettingController')));
        return new SettingController().store(ctx);
    });
    Route_1.default.post('/roles/edit/:id', async (ctx) => {
        const { default: SettingController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/SettingController')));
        return new SettingController().update(ctx);
    });
}).prefix('settings');
Route_1.default.group(() => {
    Route_1.default.get('/', async (ctx) => {
        const { default: ReseauxController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ReseauxController')));
        return new ReseauxController().index(ctx);
    });
    Route_1.default.post('/create', async (ctx) => {
        const { default: ReseauxController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ReseauxController')));
        return new ReseauxController().store(ctx);
    });
    Route_1.default.post('/edit/:id', async (ctx) => {
        const { default: ReseauxController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ReseauxController')));
        return new ReseauxController().edit(ctx);
    });
    Route_1.default.post('/itinerary/create/:id', async (ctx) => {
        const { default: ReseauxController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ReseauxController')));
        return new ReseauxController().addItinerary(ctx);
    });
    Route_1.default.get('/view/:id', async (ctx) => {
        const { default: ReseauxController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ReseauxController')));
        return new ReseauxController().view(ctx);
    });
    Route_1.default.get('/operators/:id', async (ctx) => {
        const { default: ReseauxController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ReseauxController')));
        return new ReseauxController().op(ctx);
    });
    Route_1.default.get('/line-managers/:id', async (ctx) => {
        const { default: ReseauxController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ReseauxController')));
        return new ReseauxController().lineManger(ctx);
    });
    Route_1.default.get('/controllers/:id', async (ctx) => {
        const { default: ReseauxController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ReseauxController')));
        return new ReseauxController().controllers(ctx);
    });
    Route_1.default.get('/regulator/:id', async (ctx) => {
        const { default: ReseauxController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ReseauxController')));
        return new ReseauxController().regulators(ctx);
    });
    Route_1.default.get('/sellers/:id', async (ctx) => {
        const { default: ReseauxController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ReseauxController')));
        return new ReseauxController().seller(ctx);
    });
    Route_1.default.get('/drivers/:id', async (ctx) => {
        const { default: ReseauxController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ReseauxController')));
        return new ReseauxController().driver(ctx);
    });
    Route_1.default.get('/devices/:id', async (ctx) => {
        const { default: ReseauxController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ReseauxController')));
        return new ReseauxController().device(ctx);
    });
    Route_1.default.get('/itinerarys/:id', async (ctx) => {
        const { default: ReseauxController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ReseauxController')));
        return new ReseauxController().view(ctx);
    });
    Route_1.default.get('/rubrics/:id', async (ctx) => {
        const { default: ReseauxController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ReseauxController')));
        return new ReseauxController().rubrics(ctx);
    });
    Route_1.default.get('/vehicules/:id', async (ctx) => {
        const { default: ReseauxController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ReseauxController')));
        return new ReseauxController().bus(ctx);
    });
    Route_1.default.get('/activeted/:id', async (ctx) => {
        const { default: ReseauxController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ReseauxController')));
        return new ReseauxController().activeted(ctx);
    });
    Route_1.default.get('/deactiveted/:id', async (ctx) => {
        const { default: ReseauxController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ReseauxController')));
        return new ReseauxController().deactiveted(ctx);
    });
    Route_1.default.get('/delete/:id', async (ctx) => {
        const { default: ReseauxController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ReseauxController')));
        return new ReseauxController().destroy(ctx);
    });
}).prefix('reseaux')
    .middleware('auth');
Route_1.default.group(() => {
    Route_1.default.get('/', async (ctx) => {
        const { default: OperatorController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/OperatorController')));
        return new OperatorController().index(ctx);
    });
    Route_1.default.post('/create', async (ctx) => {
        const { default: OperatorController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/OperatorController')));
        return new OperatorController().store(ctx);
    });
    Route_1.default.post('/edit/:id', async (ctx) => {
        const { default: OperatorController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/OperatorController')));
        return new OperatorController().edit(ctx);
    });
    Route_1.default.post('/vehicules/create/:id', async (ctx) => {
        const { default: OperatorController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/OperatorController')));
        return new OperatorController().addAuto(ctx);
    });
    Route_1.default.get('/view/:id', async (ctx) => {
        const { default: OperatorController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/OperatorController')));
        return new OperatorController().view(ctx);
    });
    Route_1.default.get('/activeted/:id', async (ctx) => {
        const { default: OperatorController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/OperatorController')));
        return new OperatorController().activeted(ctx);
    });
    Route_1.default.get('/deactiveted/:id', async (ctx) => {
        const { default: OperatorController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/OperatorController')));
        return new OperatorController().deactiveted(ctx);
    });
    Route_1.default.get('/delete/:id', async (ctx) => {
        const { default: OperatorController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/OperatorController')));
        return new OperatorController().destroy(ctx);
    });
}).prefix('operators')
    .middleware('auth');
Route_1.default.group(() => {
    Route_1.default.get('/', async (ctx) => {
        const { default: ControllersController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ControllersController')));
        return new ControllersController().index(ctx);
    });
    Route_1.default.post('/create', async (ctx) => {
        const { default: ControllersController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ControllersController')));
        return new ControllersController().store(ctx);
    });
    Route_1.default.post('/edit/:id', async (ctx) => {
        const { default: ControllersController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ControllersController')));
        return new ControllersController().edit(ctx);
    });
    Route_1.default.post('/password/:id', async (ctx) => {
        const { default: ControllersController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ControllersController')));
        return new ControllersController().editPwd(ctx);
    });
    Route_1.default.get('/view/:id', async (ctx) => {
        const { default: ControllersController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ControllersController')));
        return new ControllersController().view(ctx);
    });
    Route_1.default.get('/activeted/:id', async (ctx) => {
        const { default: ControllersController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ControllersController')));
        return new ControllersController().activeted(ctx);
    });
    Route_1.default.get('/deactiveted/:id', async (ctx) => {
        const { default: ControllersController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ControllersController')));
        return new ControllersController().deactiveted(ctx);
    });
    Route_1.default.get('/delete/:id', async (ctx) => {
        const { default: ControllersController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ControllersController')));
        return new ControllersController().destroy(ctx);
    });
}).prefix('controllers')
    .middleware('auth');
Route_1.default.group(() => {
    Route_1.default.get('/', async (ctx) => {
        const { default: SellersController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/SellersController')));
        return new SellersController().index(ctx);
    });
    Route_1.default.post('/create', async (ctx) => {
        const { default: SellersController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/SellersController')));
        return new SellersController().store(ctx);
    });
    Route_1.default.post('/edit/:id', async (ctx) => {
        const { default: SellersController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/SellersController')));
        return new SellersController().edit(ctx);
    });
    Route_1.default.get('/view/:id', async (ctx) => {
        const { default: SellersController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/SellersController')));
        return new SellersController().view(ctx);
    });
    Route_1.default.get('/activeted/:id', async (ctx) => {
        const { default: SellersController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/SellersController')));
        return new SellersController().activeted(ctx);
    });
    Route_1.default.get('/deactiveted/:id', async (ctx) => {
        const { default: SellersController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/SellersController')));
        return new SellersController().deactiveted(ctx);
    });
    Route_1.default.get('/delete/:id', async (ctx) => {
        const { default: SellersController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/SellersController')));
        return new SellersController().destroy(ctx);
    });
}).prefix('sellers')
    .middleware('auth');
Route_1.default.group(() => {
    Route_1.default.get('/', async (ctx) => {
        const { default: LineManagerController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/LineManagerController')));
        return new LineManagerController().index(ctx);
    });
    Route_1.default.post('/create', async (ctx) => {
        const { default: LineManagerController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/LineManagerController')));
        return new LineManagerController().store(ctx);
    });
    Route_1.default.post('/edit/:id', async (ctx) => {
        const { default: LineManagerController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/LineManagerController')));
        return new LineManagerController().edit(ctx);
    });
    Route_1.default.get('/view/:id', async (ctx) => {
        const { default: LineManagerController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/LineManagerController')));
        return new LineManagerController().view(ctx);
    });
    Route_1.default.get('/activeted/:id', async (ctx) => {
        const { default: LineManagerController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/LineManagerController')));
        return new LineManagerController().activeted(ctx);
    });
    Route_1.default.get('/deactiveted/:id', async (ctx) => {
        const { default: LineManagerController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/LineManagerController')));
        return new LineManagerController().deactiveted(ctx);
    });
    Route_1.default.get('/delete/:id', async (ctx) => {
        const { default: LineManagerController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/LineManagerController')));
        return new LineManagerController().destroy(ctx);
    });
}).prefix('line-managers')
    .middleware('auth');
Route_1.default.group(() => {
    Route_1.default.get('/', async (ctx) => {
        const { default: DriversController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/DriversController')));
        return new DriversController().index(ctx);
    });
    Route_1.default.post('/create', async (ctx) => {
        const { default: DriversController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/DriversController')));
        return new DriversController().store(ctx);
    });
    Route_1.default.post('/edit/:id', async (ctx) => {
        const { default: DriversController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/DriversController')));
        return new DriversController().edit(ctx);
    });
    Route_1.default.get('/view/:id', async (ctx) => {
        const { default: DriversController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/DriversController')));
        return new DriversController().view(ctx);
    });
    Route_1.default.get('/activeted/:id', async (ctx) => {
        const { default: DriversController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/DriversController')));
        return new DriversController().activeted(ctx);
    });
    Route_1.default.get('/deactiveted/:id', async (ctx) => {
        const { default: DriversController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/DriversController')));
        return new DriversController().deactiveted(ctx);
    });
    Route_1.default.get('/delete/:id', async (ctx) => {
        const { default: DriversController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/DriversController')));
        return new DriversController().destroy(ctx);
    });
}).prefix('drivers')
    .middleware('auth');
Route_1.default.group(() => {
    Route_1.default.get('/', async (ctx) => {
        const { default: RubricsController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/RubricsController')));
        return new RubricsController().index(ctx);
    });
    Route_1.default.post('/create', async (ctx) => {
        const { default: RubricsController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/RubricsController')));
        return new RubricsController().store(ctx);
    });
    Route_1.default.post('/edit/:id', async (ctx) => {
        const { default: RubricsController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/RubricsController')));
        return new RubricsController().edit(ctx);
    });
    Route_1.default.get('/activeted/:id', async (ctx) => {
        const { default: RubricsController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/RubricsController')));
        return new RubricsController().activeted(ctx);
    });
    Route_1.default.get('/deactiveted/:id', async (ctx) => {
        const { default: RubricsController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/RubricsController')));
        return new RubricsController().deactiveted(ctx);
    });
    Route_1.default.get('/delete/:id', async (ctx) => {
        const { default: RubricsController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/RubricsController')));
        return new RubricsController().destroy(ctx);
    });
}).prefix('rubrics')
    .middleware('auth');
Route_1.default.group(() => {
    Route_1.default.get('/', async (ctx) => {
        const { default: RegulatorsController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/RegulatorsController')));
        return new RegulatorsController().index(ctx);
    });
    Route_1.default.post('/create', async (ctx) => {
        const { default: RegulatorsController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/RegulatorsController')));
        return new RegulatorsController().store(ctx);
    });
    Route_1.default.post('/edit/:id', async (ctx) => {
        const { default: RegulatorsController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/RegulatorsController')));
        return new RegulatorsController().edit(ctx);
    });
    Route_1.default.get('/activeted/:id', async (ctx) => {
        const { default: RegulatorsController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/RegulatorsController')));
        return new RegulatorsController().activeted(ctx);
    });
    Route_1.default.get('/deactiveted/:id', async (ctx) => {
        const { default: ControllersController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ControllersController')));
        return new ControllersController().deactiveted(ctx);
    });
    Route_1.default.get('/delete/:id', async (ctx) => {
        const { default: RegulatorsController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/RegulatorsController')));
        return new RegulatorsController().destroy(ctx);
    });
}).prefix('regulators')
    .middleware('auth');
Route_1.default.group(() => {
    Route_1.default.get('/', async (ctx) => {
        const { default: DevicesController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/DevicesController')));
        return new DevicesController().index(ctx);
    });
    Route_1.default.post('/create', async (ctx) => {
        const { default: DevicesController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/DevicesController')));
        return new DevicesController().store(ctx);
    });
    Route_1.default.post('/edit/:id', async (ctx) => {
        const { default: DevicesController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/DevicesController')));
        return new DevicesController().edit(ctx);
    });
    Route_1.default.get('/activeted/:id', async (ctx) => {
        const { default: DevicesController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/DevicesController')));
        return new DevicesController().activeted(ctx);
    });
    Route_1.default.get('/deactiveted/:id', async (ctx) => {
        const { default: DevicesController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/DevicesController')));
        return new DevicesController().deactiveted(ctx);
    });
    Route_1.default.get('/delete/:id', async (ctx) => {
        const { default: DevicesController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/DevicesController')));
        return new DevicesController().destroy(ctx);
    });
}).prefix('attributions')
    .middleware('auth');
Route_1.default.group(() => {
    Route_1.default.get('/', async (ctx) => {
        const { default: VehiculeController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/VehiculeController')));
        return new VehiculeController().index(ctx);
    });
    Route_1.default.post('/create', async (ctx) => {
        const { default: VehiculeController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/VehiculeController')));
        return new VehiculeController().store(ctx);
    });
    Route_1.default.post('/edit/:id', async (ctx) => {
        const { default: VehiculeController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/VehiculeController')));
        return new VehiculeController().edit(ctx);
    });
    Route_1.default.get('/view/:id', async (ctx) => {
        const { default: VehiculeController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/VehiculeController')));
        return new VehiculeController().view(ctx);
    });
    Route_1.default.get('/activeted/:id', async (ctx) => {
        const { default: VehiculeController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/VehiculeController')));
        return new VehiculeController().activeted(ctx);
    });
    Route_1.default.get('/deactiveted/:id', async (ctx) => {
        const { default: VehiculeController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/VehiculeController')));
        return new VehiculeController().deactiveted(ctx);
    });
    Route_1.default.get('/delete/:id', async (ctx) => {
        const { default: VehiculeController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/VehiculeController')));
        return new VehiculeController().destroy(ctx);
    });
}).prefix('vehicules')
    .middleware('auth');
Route_1.default.group(() => {
    Route_1.default.get('/', async (ctx) => {
        const { default: ItineraryController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ItineraryController')));
        return new ItineraryController().index(ctx);
    });
    Route_1.default.post('/create', async (ctx) => {
        const { default: ItineraryController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ItineraryController')));
        return new ItineraryController().store(ctx);
    });
    Route_1.default.post('/rates/:id', async (ctx) => {
        const { default: ItineraryController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ItineraryController')));
        return new ItineraryController().rate(ctx);
    });
    Route_1.default.post('/edit/:id', async (ctx) => {
        const { default: ItineraryController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ItineraryController')));
        return new ItineraryController().edit(ctx);
    });
    Route_1.default.post('/points/edit/:id', async (ctx) => {
        const { default: ItineraryController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ItineraryController')));
        return new ItineraryController().points(ctx);
    });
    Route_1.default.get('/rates/delete/:id', async (ctx) => {
        const { default: ItineraryController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ItineraryController')));
        return new ItineraryController().delRate(ctx);
    });
    Route_1.default.get('/activeted/:id', async (ctx) => {
        const { default: ItineraryController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ItineraryController')));
        return new ItineraryController().activeted(ctx);
    });
    Route_1.default.get('/deactiveted/:id', async (ctx) => {
        const { default: ItineraryController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ItineraryController')));
        return new ItineraryController().deactiveted(ctx);
    });
    Route_1.default.get('/delete/:id', async (ctx) => {
        const { default: ItineraryController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/ItineraryController')));
        return new ItineraryController().destroy(ctx);
    });
}).prefix('itinerarys')
    .middleware('auth');
Route_1.default.get('/login', async ({ view }) => {
    return view.render('security.login');
});
Route_1.default.post('/login', async (ctx) => {
    const { default: AuthController } = await Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Controllers/Http/AuthController')));
    return new AuthController().login(ctx);
});
Route_1.default.get('/logout', async ({ auth, response }) => {
    await auth.use('web').logout();
    response.redirect('/login');
});
//# sourceMappingURL=routes.js.map