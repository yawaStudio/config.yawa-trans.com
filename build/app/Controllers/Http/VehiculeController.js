"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Prisma_1 = global[Symbol.for('ioc.use')]("Adonis/Addons/Prisma");
class VehiculeController {
    async index({ view }) {
        const vehicules = await Prisma_1.prisma.vehicule.findMany({
            include: {
                Companie: true,
                reseau: true,
                operator: true,
            }
        });
        const custumers = await Prisma_1.prisma.companie.findMany();
        console.log(vehicules);
        var activated;
        var blocked;
        var all;
        all = await Prisma_1.prisma.vehicule.aggregate({
            _count: { isActiveted: true },
        });
        all = all._count.isActiveted;
        activated = await Prisma_1.prisma.vehicule.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: true },
        });
        activated = activated._count.isActiveted;
        blocked = await Prisma_1.prisma.vehicule.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: false },
        });
        blocked = blocked._count.isActiveted;
        return view.render("reseaux.vehicules.index", {
            vehicules,
            activated,
            blocked,
            custumers,
            all,
        });
    }
    async store({ request, response }) {
        const data = await request.only([
            "matricule",
            "operatorId"
        ]);
        const op = await Prisma_1.prisma.operator.findFirstOrThrow({
            where: {
                id: data.operatorId
            }
        });
        await Prisma_1.prisma.vehicule.create({
            data: {
                matricule: data.matricule,
                operatorId: data.operatorId,
                CompanieId: op.companieId,
                reseauId: op.reseauId
            }
        });
        return response.redirect("back");
    }
    async edit({ params, request, response }) {
        const id = params.id;
        const data = await request.only([
            "matricule",
            "operatorId"
        ]);
        console.log(data);
        const op = await Prisma_1.prisma.operator.findFirstOrThrow({
            where: {
                id: data.operatorId
            }
        });
        console.log(op);
        await Prisma_1.prisma.vehicule.update({
            where: {
                id
            },
            data: {
                matricule: data.matricule,
                operatorId: id,
                CompanieId: op.companieId,
                reseauId: op.reseauId
            }
        });
        return response.redirect("back");
    }
    async view({ params, view }) {
        const id = params.id;
        const item = await Prisma_1.prisma.operator.findFirst({
            where: {
                id: id
            },
            include: {
                Companie: true,
                reseau: true,
                Vehicules: true,
                Device: true
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
        return view.render("reseaux.operators.view", {
            item,
            activated,
            blocked,
            all,
        });
    }
    async activeted({ params, response }) {
        const id = params.id;
        await Prisma_1.prisma.vehicule.update({
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
        await Prisma_1.prisma.vehicule.update({
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
        await Prisma_1.prisma.vehicule.delete({
            where: {
                id
            }
        });
        return response.redirect("back");
    }
}
exports.default = VehiculeController;
//# sourceMappingURL=VehiculeController.js.map