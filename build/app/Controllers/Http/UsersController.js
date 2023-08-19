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
class UsersController {
    async index({ view }) {
        const users = await Prisma_1.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                isActiveted: true,
                account: {
                    select: {
                        phone: true,
                        img: true
                    }
                }
            },
        });
        var activated;
        var blocked;
        var all;
        all = await Prisma_1.prisma.user.aggregate({
            _count: { isActiveted: true },
        });
        all = all._count.isActiveted;
        activated = await Prisma_1.prisma.user.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: true },
        });
        activated = activated._count.isActiveted;
        blocked = await Prisma_1.prisma.user.aggregate({
            _count: { isActiveted: true },
            where: { isActiveted: false },
        });
        blocked = blocked._count.isActiveted;
        const roles = await Prisma_1.prisma.role.findMany({
            select: {
                id: true,
                name: true,
            },
        });
        return view.render("users.index", {
            users,
            roles,
            activated,
            blocked,
            all,
        });
    }
    async create({ view }) {
        return view.render("users.register");
    }
    async store({ request, response }) {
        const data = await request.only(["name", "email", "roleId"]);
        console.log(data);
        const hash = await argon2.hash("123456");
        const user = await Prisma_1.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hash,
                roleId: data.roleId,
            },
        });
        if (user) {
            const account = await Prisma_1.prisma.account.create({
                data: {
                    userId: user.id,
                    name: data.name,
                },
            });
            console.log("account ", account);
            return response.redirect("back");
        }
        else {
            return response.redirect("back");
        }
    }
    async show({ params, view, response }) {
        const id = params.id;
        const user = await Prisma_1.prisma.user.findUnique({
            where: {
                id,
            },
        });
        console.log(user);
        if (user) {
            return view.render("users.view", {
                user: user,
            });
        }
        else {
            return response.redirect("back");
        }
    }
    async edit({ params, request, response }) {
        const id = params.id;
        const data = await request.only(["name", "email", "roleId", "phone"]);
        await Prisma_1.prisma.user.update({
            where: { id: id },
            data: {
                name: data.name,
                email: data.email,
                roleId: data.roleId
            },
        });
        await Prisma_1.prisma.account.update({
            where: { userId: id },
            data: {
                name: data.name,
                phone: data.phone,
            },
        });
        return response.redirect("back");
    }
    async activeted({ params, response }) {
        const id = params.id;
        await Prisma_1.prisma.user.update({
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
        await Prisma_1.prisma.user.update({
            where: {
                id
            },
            data: {
                isActiveted: false
            }
        });
        return response.redirect("back");
    }
    async password({ params, response }) {
        const id = params.id;
        const hash = await argon2.hash("123456");
        await Prisma_1.prisma.user.update({
            where: {
                id
            },
            data: {
                password: hash,
            }
        });
        return response.redirect("back");
    }
    async destroy({ params, response }) {
        const id = params.id;
        await Prisma_1.prisma.user.delete({
            where: {
                id
            }
        });
        return response.redirect("back");
    }
}
exports.default = UsersController;
//# sourceMappingURL=UsersController.js.map