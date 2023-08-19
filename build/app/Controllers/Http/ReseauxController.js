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
class ReseauxController {
    async index({ view }) {
        const reseaux = await Prisma_1.prisma.reseau.findMany({
            include: {
                Companie: true,
                Config: true,
                _count: {
                    select: { Vehicule: true, Operator: true, Companie: true },
                },
            },
        });
        console.log(reseaux);
        var activated;
        var blocked;
        var all;
        all = await Prisma_1.prisma.reseau.aggregate({
            _count: { isActiveted: true },
        });
        all = all._count.isActiveted;
        activated = await Prisma_1.prisma.reseau.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: true },
        });
        activated = activated._count.isActiveted;
        blocked = await Prisma_1.prisma.reseau.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: false },
        });
        blocked = blocked._count.isActiveted;
        return view.render("reseaux.index", {
            reseaux,
            activated,
            blocked,
            all,
        });
    }
    async store({ request, response }) {
        const data = await request.only([
            "name",
            "agentName",
            "agentPhone",
            "agentEmail"
        ]);
        try {
            const save = await Prisma_1.prisma.reseau.create({
                data: {
                    name: data.name,
                },
            });
            if (save) {
                await Prisma_1.prisma.reseauConfig.create({
                    data: {
                        reseauId: save.id,
                        agentName: data.agentName,
                        agentPhone: data.agentPhone,
                        agentEmail: data.agentEmail,
                    },
                });
                const hash = await argon2.hash("123456");
                const role = await Prisma_1.prisma.role.findFirstOrThrow({
                    where: {
                        name: 'AGENT CETUD'
                    }
                });
                const user = await Prisma_1.prisma.user.create({
                    data: {
                        name: data.agentName,
                        email: data.agentEmail,
                        password: hash,
                        roleId: role.id,
                    },
                });
                if (user) {
                    const account = await Prisma_1.prisma.account.create({
                        data: {
                            userId: user.id,
                            name: data.agentName,
                            phone: data.agentPhone
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
        const data = await request.only(["name",]);
        await Prisma_1.prisma.reseau.update({
            where: { id: id },
            data: {
                name: data.name,
            },
        });
        return response.redirect("back");
    }
    async addItinerary({ params, request, response }) {
        const id = params.id;
        const data = await request.only([
            "itname",
            "ter1",
            "lat1",
            "long1",
            "ter2",
            "lat2",
            "long2"
        ]);
        const earthRadiusKm = 6371;
        const toRadians = (degrees) => {
            return (degrees * Math.PI) / 180;
        };
        const lat1 = toRadians(data.lat1);
        const lon1 = toRadians(data.long1);
        const lat2 = toRadians(data.lat2);
        const lon2 = toRadians(data.long2);
        const dLat = lat2 - lat1;
        const dLon = lon2 - lon1;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1) *
                Math.cos(lat2) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let distance = earthRadiusKm * c;
        distance = Math.round(distance);
        const add = await Prisma_1.prisma.itinerary.create({
            data: {
                name: data.itname,
                distance: distance,
                reseauId: id
            }
        });
        data.lat1 = Number(data.lat1);
        data.long1 = Number(data.long1);
        data.lat2 = Number(data.lat2);
        data.long2 = Number(data.long2);
        const t1 = await Prisma_1.prisma.coordinate.create({
            data: {
                name: data.ter1,
                latitude: data.lat1,
                longitude: data.long1,
                itineraryId: add.id
            }
        });
        if (t1) {
            await Prisma_1.prisma.coordinate.create({
                data: {
                    name: data.ter2,
                    latitude: data.lat1,
                    longitude: data.long2,
                    itineraryId: add.id
                },
            });
        }
        console.log(data);
        return response.redirect("back");
    }
    async config({ params, request, response }) {
        const id = params.id;
        const data = await request.only([
            "itinerary",
            "invoicing",
            "depatureDuration",
            "agentName",
            "agentPhone",
            "agentEmail"
        ]);
        await Prisma_1.prisma.reseauConfig.update({
            where: { id: id },
            data: {
                itinerary: data.itinerary,
                invoicing: data.invoicing,
                depatureDuration: data.depatureDuration,
                agentName: data.agentName,
                agentPhone: data.agentPhone,
                agentEmail: data.agentEmail,
            },
        });
        return response.redirect("back");
    }
    async view({ params, view }) {
        const id = params.id;
        const item = await Prisma_1.prisma.reseau.findFirst({
            where: {
                id: id
            },
            include: {
                Operator: true,
                Vehicule: true,
                Itinerary: {
                    include: {
                        coordinates: true,
                        rates: true
                    }
                }
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
        return view.render("reseaux.view", {
            item,
            activated,
            blocked,
            all,
        });
    }
    async op({ params, view }) {
        const id = params.id;
        const item = await Prisma_1.prisma.reseau.findFirstOrThrow({
            where: {
                id: id
            },
            include: {
                Operator: {
                    include: {
                        Companie: true,
                        reseau: true,
                        Vehicules: true,
                        _count: {
                            select: { Vehicules: true, Device: true },
                        },
                    }
                },
            }
        });
        const custumers = await Prisma_1.prisma.companie.findMany({
            where: {
                ReseauId: id
            }
        });
        var activated;
        var blocked;
        var all;
        all = await Prisma_1.prisma.operator.aggregate({
            where: { reseauId: id },
            _count: { isActiveted: true },
        });
        all = all._count.isActiveted;
        activated = await Prisma_1.prisma.operator.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: true, reseauId: id },
        });
        activated = activated._count.isActiveted;
        blocked = await Prisma_1.prisma.operator.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: false, reseauId: id },
        });
        blocked = blocked._count.isActiveted;
        console.log(item);
        return view.render("reseaux.operators.index", {
            item,
            activated,
            blocked,
            custumers,
            all,
        });
    }
    async bus({ params, view }) {
        const id = params.id;
        const item = await Prisma_1.prisma.reseau.findFirst({
            where: {
                id: id
            },
            include: {
                Vehicule: {
                    include: {
                        Companie: true,
                        reseau: true,
                        operator: true,
                    }
                },
            }
        });
        const operators = await Prisma_1.prisma.operator.findMany({
            where: {
                reseauId: id
            }
        });
        var activated;
        var blocked;
        var all;
        all = await Prisma_1.prisma.vehicule.aggregate({
            where: { reseauId: id },
            _count: { isActiveted: true },
        });
        all = all._count.isActiveted;
        activated = await Prisma_1.prisma.vehicule.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: true, reseauId: id },
        });
        activated = activated._count.isActiveted;
        blocked = await Prisma_1.prisma.vehicule.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: false, reseauId: id },
        });
        blocked = blocked._count.isActiveted;
        console.log(item);
        return view.render("reseaux.vehicules.index", {
            item,
            activated,
            blocked,
            all,
            operators
        });
    }
    async controllers({ params, view }) {
        const id = params.id;
        const item = await Prisma_1.prisma.reseau.findFirst({
            where: {
                id: id
            },
            include: {
                Controller: {
                    select: { name: true, id: true, password: true, phone: true, isActiveted: true },
                },
            }
        });
        var activated;
        var blocked;
        var all;
        all = await Prisma_1.prisma.controller.aggregate({
            where: { ReseauId: id },
            _count: { isActiveted: true },
        });
        all = all._count.isActiveted;
        activated = await Prisma_1.prisma.controller.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: true, ReseauId: id },
        });
        activated = activated._count.isActiveted;
        blocked = await Prisma_1.prisma.controller.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: false, ReseauId: id },
        });
        blocked = blocked._count.isActiveted;
        console.log(item);
        return view.render("reseaux.controller.index", {
            item,
            activated,
            blocked,
            all,
        });
    }
    async regulators({ params, view }) {
        const id = params.id;
        const item = await Prisma_1.prisma.reseau.findFirst({
            where: {
                id: id
            },
            include: {
                Regulator: {
                    select: { name: true, id: true, password: true, phone: true, isActiveted: true },
                },
            }
        });
        var activated;
        var blocked;
        var all;
        all = await Prisma_1.prisma.regulator.aggregate({
            where: { ReseauId: id },
            _count: { isActiveted: true },
        });
        all = all._count.isActiveted;
        activated = await Prisma_1.prisma.regulator.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: true, ReseauId: id },
        });
        activated = activated._count.isActiveted;
        blocked = await Prisma_1.prisma.regulator.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: false, ReseauId: id },
        });
        blocked = blocked._count.isActiveted;
        console.log(item);
        return view.render("reseaux.regulators.index", {
            item,
            activated,
            blocked,
            all,
        });
    }
    async lineManger({ params, view }) {
        const id = params.id;
        const item = await Prisma_1.prisma.reseau.findFirst({
            where: {
                id: id
            },
            include: {
                LineManager: {
                    select: { name: true, id: true, password: true, phone: true, isActiveted: true },
                },
            }
        });
        var activated;
        var blocked;
        var all;
        all = await Prisma_1.prisma.lineManager.aggregate({
            where: { ReseauId: id },
            _count: { isActiveted: true },
        });
        all = all._count.isActiveted;
        activated = await Prisma_1.prisma.lineManager.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: true, ReseauId: id },
        });
        activated = activated._count.isActiveted;
        blocked = await Prisma_1.prisma.lineManager.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: false, ReseauId: id },
        });
        blocked = blocked._count.isActiveted;
        console.log(item);
        return view.render("reseaux.line-managers.index", {
            item,
            activated,
            blocked,
            all,
        });
    }
    async device({ params, view }) {
        const id = params.id;
        const item = await Prisma_1.prisma.reseau.findFirst({
            where: {
                id: id
            },
            include: {
                Device: {
                    include: {
                        Companie: true,
                        device: true,
                        operator: {
                            include: {
                                Companie: true
                            }
                        },
                        reseau: true,
                        vehicule: true
                    }
                },
            }
        });
        const devices = await Prisma_1.prisma.device.findMany({
            where: {
                isActiveted: false
            }
        });
        const vehicules = await Prisma_1.prisma.vehicule.findMany({
            where: {
                reseauId: id,
                isActiveted: false
            },
            include: {
                operator: {
                    include: {
                        Companie: true
                    }
                }
            }
        });
        var activated;
        var blocked;
        var all;
        all = await Prisma_1.prisma.deviceAttribution.aggregate({
            where: { reseauId: id },
            _count: { isActiveted: true },
        });
        all = all._count.isActiveted;
        activated = await Prisma_1.prisma.deviceAttribution.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: true, reseauId: id },
        });
        activated = activated._count.isActiveted;
        blocked = await Prisma_1.prisma.deviceAttribution.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: false, reseauId: id },
        });
        blocked = blocked._count.isActiveted;
        console.log(item);
        return view.render("reseaux.devices.index", {
            item,
            activated,
            blocked,
            all,
            devices,
            vehicules
        });
    }
    async seller({ params, view }) {
        const id = params.id;
        const item = await Prisma_1.prisma.reseau.findFirst({
            where: {
                id: id
            },
            include: {
                Sellers: {
                    include: {
                        vehicule: {
                            include: {
                                Companie: true,
                                operator: true
                            }
                        },
                    }
                },
            }
        });
        const vehicules = await Prisma_1.prisma.vehicule.findMany({
            where: {
                reseauId: id,
            },
            include: {
                operator: {
                    include: {
                        Companie: true
                    }
                }
            }
        });
        var activated;
        var blocked;
        var all;
        all = await Prisma_1.prisma.seller.aggregate({
            where: { ReseauId: id },
            _count: { isActiveted: true },
        });
        all = all._count.isActiveted;
        activated = await Prisma_1.prisma.seller.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: true, ReseauId: id },
        });
        activated = activated._count.isActiveted;
        blocked = await Prisma_1.prisma.seller.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: false, ReseauId: id },
        });
        blocked = blocked._count.isActiveted;
        console.log(item);
        return view.render("reseaux.sellers.index", {
            item,
            activated,
            blocked,
            all,
            vehicules
        });
    }
    async driver({ params, view }) {
        const id = params.id;
        const item = await Prisma_1.prisma.reseau.findFirst({
            where: {
                id: id
            },
            include: {
                Driver: {
                    include: {
                        vehicule: {
                            include: {
                                Companie: true,
                                operator: true
                            }
                        },
                    }
                },
            }
        });
        const vehicules = await Prisma_1.prisma.vehicule.findMany({
            where: {
                reseauId: id,
            },
            include: {
                operator: {
                    include: {
                        Companie: true
                    }
                }
            }
        });
        var activated;
        var blocked;
        var all;
        all = await Prisma_1.prisma.driver.aggregate({
            where: { ReseauId: id },
            _count: { isActiveted: true },
        });
        all = all._count.isActiveted;
        activated = await Prisma_1.prisma.driver.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: true, ReseauId: id },
        });
        activated = activated._count.isActiveted;
        blocked = await Prisma_1.prisma.driver.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: false, ReseauId: id },
        });
        blocked = blocked._count.isActiveted;
        console.log(item);
        return view.render("reseaux.drivers.index", {
            item,
            activated,
            blocked,
            all,
            vehicules
        });
    }
    async rubrics({ params, view }) {
        const id = params.id;
        const item = await Prisma_1.prisma.reseau.findFirst({
            where: {
                id: id
            },
            include: {
                Rubrics: true
            }
        });
        var activated;
        var blocked;
        var all;
        all = await Prisma_1.prisma.rubrics.aggregate({
            where: { reseauId: id },
            _count: { isActiveted: true },
        });
        all = all._count.isActiveted;
        activated = await Prisma_1.prisma.rubrics.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: true, reseauId: id },
        });
        activated = activated._count.isActiveted;
        blocked = await Prisma_1.prisma.rubrics.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: false, reseauId: id },
        });
        blocked = blocked._count.isActiveted;
        console.log(item);
        return view.render("reseaux.rubrics.index", {
            item,
            activated,
            blocked,
            all,
        });
    }
    async activeted({ params, response }) {
        const id = params.id;
        await Prisma_1.prisma.reseau.update({
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
        await Prisma_1.prisma.reseau.update({
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
        await Prisma_1.prisma.reseau.delete({
            where: {
                id
            }
        });
        return response.redirect("back");
    }
}
exports.default = ReseauxController;
//# sourceMappingURL=ReseauxController.js.map