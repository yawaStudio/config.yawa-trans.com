"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Prisma_1 = global[Symbol.for('ioc.use')]("Adonis/Addons/Prisma");
class DriversController {
    async index({ view }) {
        const sellers = await Prisma_1.prisma.driver.findMany({
            include: {
                vehicule: {
                    include: {
                        Companie: true
                    }
                },
            }
        });
        var activated;
        var blocked;
        var all;
        all = await Prisma_1.prisma.driver.aggregate({
            _count: { isActiveted: true },
        });
        all = all._count.isActiveted;
        activated = await Prisma_1.prisma.driver.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: true },
        });
        activated = activated._count.isActiveted;
        blocked = await Prisma_1.prisma.driver.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: false },
        });
        blocked = blocked._count.isActiveted;
        return view.render("reseaux.drivers.index", {
            sellers,
            activated,
            blocked,
            all,
        });
    }
    async store({ request, response }) {
        const data = await request.only([
            "ReseauId",
            "vehiculeId",
            "name",
            "phone"
        ]);
        try {
            const save = await Prisma_1.prisma.driver.create({
                data: {
                    vehiculeId: data.vehiculeId,
                    name: data.name,
                    phone: data.phone,
                    ReseauId: data.ReseauId,
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
            "ReseauId",
            "vehiculeId",
            "name",
            "phone"
        ]);
        const save = await Prisma_1.prisma.driver.update({
            where: { id: id },
            data: {
                name: data.name,
                phone: data.phone,
                vehiculeId: data.vehiculeId,
                ReseauId: data.ReseauId,
            },
        });
        return response.redirect("back");
    }
    async view({ params, view }) {
        const id = params.id;
        const item = await Prisma_1.prisma.driver.findFirst({
            where: {
                id: id
            },
            include: {
                vehicule: true,
                Selling: true
            }
        });
        return view.render("reseaux.drivers.view", {
            item,
        });
    }
    async activeted({ params, response }) {
        const id = params.id;
        await Prisma_1.prisma.driver.update({
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
        await Prisma_1.prisma.driver.update({
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
        await Prisma_1.prisma.driver.delete({
            where: {
                id
            },
        });
        return response.redirect("back");
    }
}
exports.default = DriversController;
//# sourceMappingURL=DriversController.js.map