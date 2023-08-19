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
class ItineraryController {
    async index({ view }) {
        const reseaux = await Prisma_1.prisma.reseau.findMany({
            select: {
                name: true,
                id: true,
                Itinerary: {
                    select: {
                        name: true,
                        isActiveted: true
                    },
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
        return view.render("reseaux.itinerarys.index", {
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
                        name: 'Gestionnaire'
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
        await Prisma_1.prisma.itinerary.update({
            where: { id: id },
            data: {
                name: data.name,
            },
        });
        return response.redirect("back");
    }
    async points({ params, request, response }) {
        const id = params.id;
        const data = await request.only([
            "id",
            "name",
            "longitude",
            "latitude",
        ]);
        console.log(data);
        await Prisma_1.prisma.coordinate.delete({
            where: {
                id: data.id
            }
        });
        const point = await Prisma_1.prisma.coordinate.findFirstOrThrow({
            where: {
                itineraryId: id,
            },
            select: {
                latitude: true,
                longitude: true
            }
        });
        console.log(point);
        const earthRadiusKm = 6371;
        const toRadians = (degrees) => {
            return (degrees * Math.PI) / 180;
        };
        const lat1 = toRadians(data.latitude);
        const lon1 = toRadians(data.longitude);
        const lat2 = toRadians(point.latitude);
        const lon2 = toRadians(point.longitude);
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
        data.latitude = Number(data.latitude);
        data.longitude = Number(data.longitude);
        await Prisma_1.prisma.coordinate.create({
            data: {
                name: data.name,
                latitude: data.latitude,
                longitude: data.longitude,
                itineraryId: id
            }
        });
        await Prisma_1.prisma.itinerary.update({
            where: { id: id },
            data: {
                distance: distance,
            },
        });
        return response.redirect("back");
    }
    async rate({ params, request, response }) {
        const id = params.id;
        const data = await request.only(["name", "price", "section"]);
        data.name = data.name + ' ' + data.price;
        data.price = Number(data.price);
        await Prisma_1.prisma.rate.create({
            data: {
                name: data.name,
                price: data.price,
                section: data.section,
                itineraryId: id,
            },
        });
        return response.redirect("back");
    }
    async delRate({ params, response }) {
        const id = params.id;
        await Prisma_1.prisma.rate.delete({
            where: {
                id
            }
        });
        return response.redirect("back");
    }
    async activeted({ params, response }) {
        const id = params.id;
        await Prisma_1.prisma.itinerary.update({
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
        await Prisma_1.prisma.itinerary.update({
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
        await Prisma_1.prisma.itinerary.delete({
            where: {
                id
            }
        });
        return response.redirect("back");
    }
}
exports.default = ItineraryController;
//# sourceMappingURL=ItineraryController.js.map