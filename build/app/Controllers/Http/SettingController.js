"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Prisma_1 = global[Symbol.for('ioc.use')]("Adonis/Addons/Prisma");
var moment = require('moment');
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
class SettingController {
    async index({ view }) {
        const roles = await Prisma_1.prisma.role.findMany({
            select: {
                id: true,
                name: true,
            },
        });
        return view.render("settings.role", {
            roles,
        });
    }
    async config({ view }) {
        const config = await Prisma_1.prisma.appConfig.findFirst();
        console.log('config', JSON.parse(JSON.stringify(config)));
        var statut = true;
        if (config == null) {
            statut = false;
        }
        console.log(statut);
        return view.render("settings.index", {
            config,
            statut
        });
    }
    async init({ request, response }) {
        const data = await request.only([
            "name",
            "ninea",
            "rccm",
            "phone",
            "email",
            "adress",
            "webSite",
            "version",
            "manager"
        ]);
        moment().format();
        moment.locale('fr');
        var createdAt = moment().format('L');
        var updatedAt = moment().format('LLLL');
        try {
            await Prisma_1.prisma.appConfig.create({
                data: {
                    name: data.name,
                    ninea: data.ninea,
                    rccm: data.rccm,
                    phone: data.phone,
                    email: data.email,
                    adress: data.adress,
                    webSite: data.webSite,
                    version: data.version,
                    manager: data.manager,
                    createdAt: createdAt,
                    updatedAt: updatedAt,
                },
            });
        }
        catch (error) {
            throw new Error(`Error creating device ${JSON.stringify(error)}`);
        }
        return response.redirect("back");
    }
    async store({ request, response }) {
        const data = await request.only(["name",]);
        try {
            await Prisma_1.prisma.role.create({
                data: {
                    name: data.name,
                },
            });
        }
        catch (error) {
            throw new Error(`Error creating device ${JSON.stringify(error)}`);
        }
        return response.redirect("back");
    }
    async edit({ params, request, response }) {
        const id = params.id;
        const data = await request.only([
            "name",
            "ninea",
            "rccm",
            "phone",
            "email",
            "adress",
            "webSite",
            "version",
            "manager"
        ]);
        moment().format();
        moment.locale('fr');
        var updatedAt = moment().format('LLLL');
        await Prisma_1.prisma.appConfig.update({
            where: { id: id },
            data: {
                name: data.name,
                ninea: data.ninea,
                rccm: data.rccm,
                phone: data.phone,
                email: data.email,
                adress: data.adress,
                webSite: data.webSite,
                version: data.version,
                manager: data.manager,
                updatedAt: updatedAt,
            },
        });
        return response.redirect("back");
    }
    async logo({ params, request, response }) {
        const id = params.id;
        const coverImage = request.file('cover_image');
        if (coverImage) {
            await coverImage.move(Application_1.default.tmpPath('uploads'));
        }
        console.log('logo', coverImage);
        moment().format();
        moment.locale('fr');
        var updatedAt = moment().format('LLLL');
        return response.redirect("back");
    }
    async update({ params, request, response }) {
        const id = params.id;
        const data = await request.only(["name",]);
        await Prisma_1.prisma.role.update({
            where: { id: id },
            data: {
                name: data.name,
            },
        });
        return response.redirect("back");
    }
}
exports.default = SettingController;
//# sourceMappingURL=SettingController.js.map