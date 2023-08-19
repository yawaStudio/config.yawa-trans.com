"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Prisma_1 = global[Symbol.for('ioc.use')]("Adonis/Addons/Prisma");
class RegulatorsController {
    async index({ view }) {
        const regulators = await Prisma_1.prisma.regulator.findMany({
            include: {
                Regulation: true,
            }
        });
        const custumers = await Prisma_1.prisma.reseau.findMany();
        console.log(regulators);
        var activated;
        var blocked;
        var all;
        all = await Prisma_1.prisma.regulator.aggregate({
            _count: { isActiveted: true },
        });
        all = all._count.isActiveted;
        activated = await Prisma_1.prisma.regulator.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: true },
        });
        activated = activated._count.isActiveted;
        blocked = await Prisma_1.prisma.regulator.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: false },
        });
        blocked = blocked._count.isActiveted;
        return view.render("reseaux.regulators.index", {
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
            await Prisma_1.prisma.regulator.create({
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
        await Prisma_1.prisma.regulator.update({
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
        await Prisma_1.prisma.regulator.update({
            where: { id },
            data: {
                password: data.password,
            }
        });
        return response.redirect("back");
    }
    async view({ params, view }) {
        const id = params.id;
        const item = await Prisma_1.prisma.regulator.findFirst({
            where: {
                id: id
            },
            include: {
                Regulation: true,
            }
        });
        return view.render("reseaux.regulators.view", {
            item,
        });
    }
    async activeted({ params, response }) {
        const id = params.id;
        await Prisma_1.prisma.regulator.update({
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
        await Prisma_1.prisma.regulator.update({
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
        await Prisma_1.prisma.regulator.delete({
            where: {
                id
            }
        });
        return response.redirect("back");
    }
}
exports.default = RegulatorsController;
//# sourceMappingURL=RegulatorsController.js.map