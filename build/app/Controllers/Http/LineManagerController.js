"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Prisma_1 = global[Symbol.for('ioc.use')]("Adonis/Addons/Prisma");
class LineManagerController {
    async index({ view }) {
        const regulators = await Prisma_1.prisma.lineManager.findMany({});
        const custumers = await Prisma_1.prisma.reseau.findMany();
        console.log(regulators);
        var activated;
        var blocked;
        var all;
        all = await Prisma_1.prisma.lineManager.aggregate({
            _count: { isActiveted: true },
        });
        all = all._count.isActiveted;
        activated = await Prisma_1.prisma.lineManager.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: true },
        });
        activated = activated._count.isActiveted;
        blocked = await Prisma_1.prisma.lineManager.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: false },
        });
        blocked = blocked._count.isActiveted;
        return view.render("reseaux.line-managers.index", {
            regulators,
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
            await Prisma_1.prisma.lineManager.create({
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
        await Prisma_1.prisma.lineManager.update({
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
        await Prisma_1.prisma.lineManager.update({
            where: { id },
            data: {
                password: data.password,
            }
        });
        return response.redirect("back");
    }
    async view({ params, view }) {
        const id = params.id;
        const item = await Prisma_1.prisma.lineManager.findFirst({
            where: {
                id: id
            },
        });
        return view.render("reseaux.line-managers.view", {
            item,
        });
    }
    async activeted({ params, response }) {
        const id = params.id;
        await Prisma_1.prisma.lineManager.update({
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
        await Prisma_1.prisma.lineManager.update({
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
        await Prisma_1.prisma.lineManager.delete({
            where: {
                id
            }
        });
        return response.redirect("back");
    }
}
exports.default = LineManagerController;
//# sourceMappingURL=LineManagerController.js.map