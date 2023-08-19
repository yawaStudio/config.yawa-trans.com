"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Prisma_1 = global[Symbol.for('ioc.use')]("Adonis/Addons/Prisma");
class LicencesController {
    async index({ view }) {
        const licences = await Prisma_1.prisma.licence.findMany();
        var activated;
        var blocked;
        var all;
        all = await Prisma_1.prisma.licence.aggregate({
            _count: { isActive: true },
        });
        all = all._count.isActive;
        activated = await Prisma_1.prisma.licence.aggregate({
            _count: { isActive: true },
            where: { isActive: true },
        });
        activated = activated._count.isActive;
        blocked = await Prisma_1.prisma.licence.aggregate({
            _count: { isActive: true },
            where: { isActive: false },
        });
        blocked = blocked._count.isActive;
        return view.render("licences.index", {
            licences,
            activated,
            blocked,
            all,
        });
    }
    async store({ request, response }) {
        const data = await request.only(["type", "licenceName", "licenceAmount"]);
        console.log(data);
        var uuid = Math.floor(1000 + Math.random() * 9000).toString();
        if (data.type == 'Forfait') {
            uuid = 'F-' + uuid;
        }
        else {
            uuid = 'P-' + uuid;
        }
        try {
            await Prisma_1.prisma.licence.create({
                data: {
                    licenceCode: uuid,
                    type: data.type,
                    licenceName: data.licenceName,
                    licenceAmount: data.licenceAmount,
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
        const data = await request.only(["type", "licenceName", "licenceAmount"]);
        var uuid = Math.floor(1000 + Math.random() * 9000).toString();
        if (data.type == 'Forfait') {
            uuid = 'F-' + uuid;
        }
        else {
            uuid = 'P-' + uuid;
        }
        await Prisma_1.prisma.licence.update({
            where: { id: id },
            data: {
                type: data.type,
                licenceName: data.licenceName,
                licenceAmount: data.licenceAmount,
            },
        });
        return response.redirect("back");
    }
    async activeted({ params, response }) {
        const id = params.id;
        await Prisma_1.prisma.licence.update({
            where: {
                id
            },
            data: {
                isActive: true
            }
        });
        return response.redirect("back");
    }
    async deactiveted({ params, response }) {
        const id = params.id;
        await Prisma_1.prisma.licence.update({
            where: {
                id
            },
            data: {
                isActive: false
            }
        });
        return response.redirect("back");
    }
    async destroy({ params, response }) {
        const id = params.id;
        await Prisma_1.prisma.licence.delete({
            where: {
                id
            }
        });
        return response.redirect("back");
    }
}
exports.default = LicencesController;
//# sourceMappingURL=LicencesController.js.map