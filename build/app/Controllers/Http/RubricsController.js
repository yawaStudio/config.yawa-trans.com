"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Prisma_1 = global[Symbol.for('ioc.use')]("Adonis/Addons/Prisma");
class RubricsController {
    async index({ view }) {
        const rubrics = await Prisma_1.prisma.rubrics.findMany();
        var activated;
        var blocked;
        var all;
        all = await Prisma_1.prisma.rubrics.aggregate({
            _count: { isActiveted: true },
        });
        all = all._count.isActiveted;
        activated = await Prisma_1.prisma.rubrics.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: true },
        });
        activated = activated._count.isActiveted;
        blocked = await Prisma_1.prisma.rubrics.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: false },
        });
        blocked = blocked._count.isActiveted;
        console.log('from prisma ', rubrics);
        return view.render("reseaux.rubrics.index", {
            rubrics,
            activated,
            blocked,
            all,
        });
    }
    async store({ request, response }) {
        const data = await request.only(["name", "reseauId"]);
        console.log(data);
        data;
        try {
            await Prisma_1.prisma.rubrics.create({
                data: {
                    name: data.name,
                    reseauId: data.reseauId,
                },
            });
        }
        catch (error) {
            throw new Error(`Error creating rubrics ${JSON.stringify(error)}`);
        }
        return response.redirect("back");
    }
    async edit({ params, request, response }) {
        const id = params.id;
        const data = await request.only(["name", "reseauId"]);
        await Prisma_1.prisma.rubrics.update({
            where: { id: id },
            data: {
                name: data.name,
                reseauId: data.reseauId,
            },
        });
        return response.redirect("back");
    }
    async activeted({ params, response }) {
        const id = params.id;
        await Prisma_1.prisma.rubrics.update({
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
        await Prisma_1.prisma.rubrics.update({
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
        await Prisma_1.prisma.rubrics.delete({
            where: {
                id
            }
        });
        return response.redirect("back");
    }
}
exports.default = RubricsController;
//# sourceMappingURL=RubricsController.js.map