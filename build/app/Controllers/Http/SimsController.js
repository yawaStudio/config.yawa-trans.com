"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Prisma_1 = global[Symbol.for('ioc.use')]("Adonis/Addons/Prisma");
class SimsController {
    async index({ view }) {
        const sims = await Prisma_1.prisma.sim.findMany({
            select: {
                id: true,
                imsi: true,
                provider: true,
                isActiveted: true,
                number: true,
                device: true
            },
        });
        var activated;
        var blocked;
        var all;
        all = await Prisma_1.prisma.sim.aggregate({
            _count: { isActiveted: true },
        });
        all = all._count.isActiveted;
        activated = await Prisma_1.prisma.device.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: true },
        });
        activated = activated._count.isActiveted;
        blocked = await Prisma_1.prisma.sim.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: false },
        });
        blocked = blocked._count.isActiveted;
        console.log('from prisma ', sims);
        return view.render("materiels.sims", {
            sims,
            activated,
            blocked,
            all,
        });
    }
    async store({ request, response }) {
        const data = await request.only(["provider", "number", "imsi"]);
        console.log(data);
        data;
        try {
            await Prisma_1.prisma.sim.create({
                data: {
                    provider: data.provider,
                    imsi: data.imsi,
                    number: data.number
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
        const data = await request.only(["provider", "number", "imsi"]);
        await Prisma_1.prisma.sim.update({
            where: { id: id },
            data: {
                provider: data.provider,
                imsi: data.imsi,
                number: data.number
            },
        });
        return response.redirect("back");
    }
    async search({ request }) {
        const data = await request.only(["imsi"]);
        const sim = await Prisma_1.prisma.sim.findFirst({
            where: { imsi: data.imsi }
        });
        console.log(sim);
        return sim;
    }
    async activeted({ params, response }) {
        const id = params.id;
        await Prisma_1.prisma.sim.update({
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
        await Prisma_1.prisma.sim.update({
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
        await Prisma_1.prisma.sim.delete({
            where: {
                id
            }
        });
        return response.redirect("back");
    }
}
exports.default = SimsController;
//# sourceMappingURL=SimsController.js.map