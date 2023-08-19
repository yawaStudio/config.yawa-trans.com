"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Prisma_1 = global[Symbol.for('ioc.use')]("Adonis/Addons/Prisma");
var moment = require('moment');
class AppareilsController {
    async index({ view }) {
        const devices = await Prisma_1.prisma.deviceType.findMany({
            include: {
                _count: {
                    select: { Device: true },
                },
            },
        });
        console.log(devices);
        const sims = await Prisma_1.prisma.sim.findMany({
            where: {
                isActiveted: false
            }
        });
        var activated;
        var blocked;
        var all;
        all = await Prisma_1.prisma.device.aggregate({
            _count: { isActiveted: true },
        });
        all = all._count.isActiveted;
        activated = await Prisma_1.prisma.device.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: true },
        });
        activated = activated._count.isActiveted;
        blocked = await Prisma_1.prisma.device.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: false },
        });
        blocked = blocked._count.isActiveted;
        return view.render("materiels.index", {
            devices,
            activated,
            blocked,
            all,
            sims
        });
    }
    async device({ view }) {
        const devices = await Prisma_1.prisma.device.findMany({
            include: {
                device: true
            }
        });
        const types = await Prisma_1.prisma.deviceType.findMany();
        console.log(devices);
        var activated;
        var blocked;
        var all;
        all = await Prisma_1.prisma.device.aggregate({
            _count: { isActiveted: true },
        });
        all = all._count.isActiveted;
        activated = await Prisma_1.prisma.device.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: true },
        });
        activated = activated._count.isActiveted;
        blocked = await Prisma_1.prisma.device.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: false },
        });
        blocked = blocked._count.isActiveted;
        return view.render("materiels.devices", {
            devices,
            activated,
            blocked,
            all,
            types
        });
    }
    async store({ request, response }) {
        const data = await request.only(["type", "details", "quantity", "price"]);
        moment().format();
        moment.locale('fr');
        var count = Number(data.quantity);
        data.price = Number(data.price);
        var updatedAt = moment().format('LLLL');
        console.log(data);
        const type = await Prisma_1.prisma.deviceType.create({
            data: {
                type: data.type,
                details: data.details,
                price: data.price,
                updatedAt: updatedAt,
            }
        });
        for (let i = 0; i < count; i++) {
            var uuid = Math.floor(1000 + Math.random() * 9000).toString();
            uuid = data.type + uuid;
            await Prisma_1.prisma.device.create({
                data: {
                    code: uuid,
                    typeId: type.id,
                    price: data.price,
                    updatedAt: updatedAt,
                },
            });
        }
        console.log("Okk");
        return response.redirect("back");
    }
    async add({ params, request, response }) {
        const id = params.id;
        const data = await request.only(["quantity"]);
        moment().format();
        moment.locale('fr');
        var count = Number(data.quantity);
        const model = await Prisma_1.prisma.deviceType.findUniqueOrThrow({
            where: {
                id
            }
        });
        var updatedAt = moment().format('LLLL');
        for (let i = 0; i < count; i++) {
            var uuid = Math.floor(1000 + Math.random() * 9000).toString();
            uuid = model.type + uuid;
            await Prisma_1.prisma.device.create({
                data: {
                    code: uuid,
                    typeId: id,
                    price: model.price,
                    updatedAt: updatedAt,
                },
            });
        }
        return response.redirect("back");
    }
    async edit({ params, request, response }) {
        const id = params.id;
        const data = await request.only(["price", "details"]);
        moment().format();
        moment.locale('fr');
        data.price = Number(data.price);
        var updatedAt = moment().format('LLLL');
        await Prisma_1.prisma.deviceType.update({
            where: { id: id },
            data: {
                price: data.price,
                details: data.details,
                updatedAt: updatedAt,
            },
        });
        await Prisma_1.prisma.device.updateMany({
            where: {
                typeId: id
            },
            data: {
                price: data.price,
                updatedAt: updatedAt
            }
        });
        return response.redirect("back");
    }
    async sim({ params, request, response }) {
        const id = params.id;
        const data = await request.only(["simId"]);
        const appareil = await Prisma_1.prisma.simDevice.update({
            where: {
                id
            },
            data: {
                simId: data.simId
            }
        });
        console.log(appareil);
        return response.redirect("back");
    }
    async activeted({ params, response }) {
        const id = params.id;
        await Prisma_1.prisma.device.update({
            where: {
                id
            },
            data: {
                isActiveted: true
            }
        });
        return response.redirect("back");
    }
    async deactiveted({ params, response }) {
        const id = params.id;
        await Prisma_1.prisma.device.update({
            where: {
                id
            },
            data: {
                isActiveted: false
            }
        });
        return response.redirect("back");
    }
    async delete({ params, response }) {
        const id = params.id;
        await Prisma_1.prisma.deviceType.delete({
            where: {
                id
            }
        });
        return response.redirect("back");
    }
    async destroy({ params, response }) {
        const id = params.id;
        await Prisma_1.prisma.device.delete({
            where: {
                id
            }
        });
        return response.redirect("back");
    }
}
exports.default = AppareilsController;
//# sourceMappingURL=AppareilsController.js.map