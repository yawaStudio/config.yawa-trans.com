"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Prisma_1 = global[Symbol.for('ioc.use')]("Adonis/Addons/Prisma");
class ControllersController {
    async index({ view }) {
        const controller = await Prisma_1.prisma.controller.findMany({
            include: {
                Controls: true,
            }
        });
        const custumers = await Prisma_1.prisma.reseau.findMany();
        console.log(controller);
        var activated;
        var blocked;
        var all;
        all = await Prisma_1.prisma.controller.aggregate({
            _count: { isActiveted: true },
        });
        all = all._count.isActiveted;
        activated = await Prisma_1.prisma.controller.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: true },
        });
        activated = activated._count.isActiveted;
        blocked = await Prisma_1.prisma.controller.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: false },
        });
        blocked = blocked._count.isActiveted;
        return view.render("reseaux.controller.index", {
            controller,
            activated,
            blocked,
            custumers,
            all,
        });
    }
    async store({ request, response }) {
        const data = await request.only([
            "name",
            "phone",
            "password",
            "ReseauId"
        ]);
        data.password = '123456';
        try {
            await Prisma_1.prisma.controller.create({
                data: {
                    name: data.name,
                    phone: data.phone,
                    password: data.password,
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
            "name",
            "phone",
            "password",
            "ReseauId"
        ]);
        await Prisma_1.prisma.controller.update({
            where: { id: id },
            data: {
                name: data.name,
                phone: data.phone,
                password: data.password,
                ReseauId: data.ReseauId,
            },
        });
        return response.redirect("back");
    }
    async editPwd({ params, request, response }) {
        const id = params.id;
        const data = await request.only([
            "password"
        ]);
        await Prisma_1.prisma.controller.update({
            where: { id },
            data: {
                password: data.password,
            }
        });
        return response.redirect("back");
    }
    async view({ params, view }) {
        const id = params.id;
        const item = await Prisma_1.prisma.controller.findFirst({
            where: {
                id: id
            },
            include: {
                Controls: true,
            }
        });
        return view.render("reseaux.controller.view", {
            item,
        });
    }
    async activeted({ params, response }) {
        const id = params.id;
        await Prisma_1.prisma.controller.update({
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
        await Prisma_1.prisma.controller.update({
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
        await Prisma_1.prisma.controller.delete({
            where: {
                id
            }
        });
        return response.redirect("back");
    }
}
exports.default = ControllersController;
//# sourceMappingURL=ControllersController.js.map