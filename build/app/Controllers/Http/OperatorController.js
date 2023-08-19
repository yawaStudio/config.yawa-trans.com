"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Prisma_1 = global[Symbol.for('ioc.use')]("Adonis/Addons/Prisma");
const argon2 = __importStar(require("argon2"));
class OperatorController {
    async index({ view }) {
        const operators = await Prisma_1.prisma.operator.findMany({
            include: {
                Companie: true,
                reseau: true,
                Vehicules: true,
                _count: {
                    select: { Vehicules: true, Device: true },
                },
            }
        });
        const custumers = await Prisma_1.prisma.companie.findMany();
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
        return view.render("reseaux.operators.index", {
            operators,
            activated,
            blocked,
            custumers,
            all,
        });
    }
    async store({ request, response }) {
        const data = await request.only([
            "name",
            "email",
            "phone",
            "companieId"
        ]);
        const companie = await Prisma_1.prisma.companie.findFirstOrThrow({
            where: {
                id: data.companieId
            }
        });
        try {
            const save = await Prisma_1.prisma.operator.create({
                data: {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    companieId: data.companieId,
                    reseauId: companie.ReseauId,
                },
            });
            if (save) {
                const hash = await argon2.hash("123456");
                const role = await Prisma_1.prisma.role.findFirstOrThrow({
                    where: {
                        name: 'OPERATEUR'
                    }
                });
                const user = await Prisma_1.prisma.user.create({
                    data: {
                        name: data.name,
                        email: data.phone,
                        password: hash,
                        roleId: role.id,
                    },
                });
                if (user) {
                    const account = await Prisma_1.prisma.account.create({
                        data: {
                            userId: user.id,
                            name: data.name,
                            phone: data.phone
                        },
                    });
                    console.log("account ", account);
                }
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
            "name",
            "email",
            "phone",
            "companieId"
        ]);
        const companie = await Prisma_1.prisma.companie.findFirstOrThrow({
            where: {
                id: data.companieId
            }
        });
        await Prisma_1.prisma.operator.update({
            where: { id: id },
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                companieId: data.companieId,
                reseauId: companie.ReseauId,
            },
        });
        return response.redirect("back");
    }
    async addAuto({ params, request, response }) {
        const id = params.id;
        const data = await request.only([
            "matricule"
        ]);
        const op = await Prisma_1.prisma.operator.findFirstOrThrow({
            where: {
                id
            }
        });
        await Prisma_1.prisma.vehicule.create({
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
        await Prisma_1.prisma.operator.update({
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
        await Prisma_1.prisma.operator.update({
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
        await Prisma_1.prisma.operator.delete({
            where: {
                id
            }
        });
        return response.redirect("back");
    }
}
exports.default = OperatorController;
//# sourceMappingURL=OperatorController.js.map