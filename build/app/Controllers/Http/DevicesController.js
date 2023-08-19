"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Prisma_1 = global[Symbol.for('ioc.use')]("Adonis/Addons/Prisma");
class DevicesController {
    async index({ view }) {
        const operators = await Prisma_1.prisma.deviceAttribution.findMany({
            include: {
                Companie: true,
                reseau: true,
                vehicule: true,
                device: true
            }
        });
        const custumers = await Prisma_1.prisma.operator.findMany();
        console.log(operators);
        var activated;
        var blocked;
        var all;
        all = await Prisma_1.prisma.operator.aggregate({
            _count: { isActiveted: true },
        });
        all = all._count.isActiveted;
        activated = await Prisma_1.prisma.operator.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: true },
        });
        activated = activated._count.isActiveted;
        blocked = await Prisma_1.prisma.operator.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: false },
        });
        blocked = blocked._count.isActiveted;
        return view.render("reseaux.devices.index", {
            operators,
            activated,
            blocked,
            custumers,
            all,
        });
    }
    async store({ request, response }) {
        const data = await request.only([
            "deviceId",
            "vehiculeId",
        ]);
        console.log(data);
        const companie = await Prisma_1.prisma.vehicule.findFirstOrThrow({
            where: {
                id: data.vehiculeId
            },
            include: {
                reseau: true,
                operator: true,
                Companie: true
            }
        });
        const device = await Prisma_1.prisma.device.findFirstOrThrow({
            where: {
                id: data.deviceId
            }
        });
        console.log(companie);
        try {
            const save = await Prisma_1.prisma.deviceAttribution.create({
                data: {
                    deviceId: data.deviceId,
                    deviceCode: device.code,
                    operatorId: companie.operator.id,
                    vehiculeId: data.vehiculeId,
                    CompanieId: companie.Companie.id,
                    reseauId: companie.reseau.id,
                },
            });
            if (save) {
                await Prisma_1.prisma.device.update({
                    where: {
                        id: data.deviceId
                    },
                    data: {
                        isActiveted: true
                    }
                });
                await Prisma_1.prisma.vehicule.update({
                    where: {
                        id: data.vehiculeId
                    },
                    data: {
                        isActiveted: true
                    }
                });
            }
        }
        catch (error) {
            throw new Error(`Error creating device ${JSON.stringify(error)}`);
        }
        return response.redirect("back");
    }
    async edit({ params, request, response }) {
        const id = params.id;
        const data = await request.only([
            "deviceId",
            "vehiculeId",
        ]);
        const dev = await Prisma_1.prisma.deviceAttribution.findFirstOrThrow({
            where: { id }
        });
        const device = await Prisma_1.prisma.device.findFirstOrThrow({
            where: {
                id: data.deviceId
            }
        });
        const companie = await Prisma_1.prisma.vehicule.findFirstOrThrow({
            where: {
                id: data.vehiculeId
            },
            include: {
                reseau: true,
                operator: true,
                Companie: true
            }
        });
        await Prisma_1.prisma.device.update({
            where: {
                id: dev.deviceId
            },
            data: {
                isActiveted: false
            }
        });
        await Prisma_1.prisma.vehicule.update({
            where: {
                id: dev.vehiculeId
            },
            data: {
                isActiveted: false
            }
        });
        const save = await Prisma_1.prisma.deviceAttribution.update({
            where: { id: id },
            data: {
                deviceId: data.deviceId,
                operatorId: companie.operator.id,
                vehiculeId: data.vehiculeId,
                deviceCode: device.code,
                CompanieId: companie.Companie.id,
                reseauId: companie.reseau.id,
            },
        });
        if (save) {
            await Prisma_1.prisma.device.update({
                where: {
                    id: data.deviceId
                },
                data: {
                    isActiveted: true
                }
            });
        }
        return response.redirect("back");
    }
    async view({ params, view }) {
        const id = params.id;
        const item = await Prisma_1.prisma.deviceAttribution.findFirst({
            where: {
                id: id
            },
            include: {
                Companie: true,
                reseau: true,
                vehicule: true,
                device: true
            }
        });
        var activated;
        var blocked;
        var all;
        all = await Prisma_1.prisma.itinerary.aggregate({
            where: { reseauId: id },
            _count: { isActiveted: true },
        });
        all = all._count.isActiveted;
        activated = await Prisma_1.prisma.itinerary.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: true, reseauId: id },
        });
        activated = activated._count.isActiveted;
        blocked = await Prisma_1.prisma.itinerary.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: false, reseauId: id },
        });
        blocked = blocked._count.isActiveted;
        console.log(item);
        return view.render("reseaux.devices.view", {
            item,
            activated,
            blocked,
            all,
        });
    }
    async activeted({ params, response }) {
        const id = params.id;
        await Prisma_1.prisma.deviceAttribution.update({
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
        await Prisma_1.prisma.deviceAttribution.update({
            where: {
                id
            },
            data: {
                isActiveted: false
            }
        });
        return response.redirect("back");
    }
    async destroy({ params, response }) {
        const id = params.id;
        const device = await Prisma_1.prisma.deviceAttribution.findFirstOrThrow({
            where: {
                id
            },
        });
        await Prisma_1.prisma.device.update({
            where: {
                id: device.deviceId
            },
            data: {
                isActiveted: false
            }
        });
        await Prisma_1.prisma.vehicule.update({
            where: {
                id: device.vehiculeId
            },
            data: {
                isActiveted: false
            }
        });
        await Prisma_1.prisma.deviceAttribution.delete({
            where: {
                id
            },
        });
        return response.redirect("back");
    }
}
exports.default = DevicesController;
//# sourceMappingURL=DevicesController.js.map