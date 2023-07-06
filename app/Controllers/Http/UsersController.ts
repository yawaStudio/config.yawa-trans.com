import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { prisma } from "@ioc:Adonis/Addons/Prisma";
import * as argon2 from "argon2";

export default class UsersController {
  public async index({ view }: HttpContextContract) {
    const users = await prisma.user.findMany({
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
    all = await prisma.user.aggregate({
      _count: { isActiveted: true },
    });
    all = all._count.isActiveted;

    activated = await prisma.user.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: true },
    });
    activated = activated._count.isActiveted;

    blocked = await prisma.user.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: false },
    });
    blocked = blocked._count.isActiveted;
    const roles = await prisma.role.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    //console.log(users)
    return view.render("users.index", {
      users,
      roles,
      activated,
      blocked,
      all,
    });
  }

  public async create({ view }: HttpContextContract) {
    return view.render("users.register");
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.only(["name", "email", "roleId"]);


    console.log(data);
    // var uuid = Math.floor(100000 + Math.random() * 900000).toString();
    const hash = await argon2.hash("123456");

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hash,
        roleId: data.roleId,
      },
    });

    if (user) {
      const account = await prisma.account.create({
        data: {
          userId: user.id,
          name: data.name,
        },
      });
      console.log("account ", account);

      return response.redirect("back");
    } else {
      return response.redirect("back");
    }
  }

  public async show({ params, view, response }: HttpContextContract) {
    const id = params.id;
    // Query returns User or null
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    console.log(user);
    if (user) {
      return view.render("users.view", {
        user: user,
      });
    } else {
      return response.redirect("back");
    }
  }

  public async edit({ params, request, response }: HttpContextContract) {
    const id = params.id;
    const data = await request.only(["name", "email", "roleId", "phone"]);
    await prisma.user.update({
      where: { id: id },
      data: {
        name: data.name,
        email: data.email,
        roleId: data.roleId
      },
    });
    await prisma.account.update({
      where: { userId: id },
      data: {
        name: data.name,
        phone: data.phone,
      },
    });
    return response.redirect("back");

  }

  public async activeted({ params, response }: HttpContextContract) {
    const id = params.id;
    await prisma.user.update({
      where: {
        id
      },
      data: {
        isActiveted: true
      }
    });

    return response.redirect("back");
  }
  public async deactiveted({ params, response }: HttpContextContract) {
    const id = params.id;

    await prisma.user.update({
      where: {
        id
      },
      data: {
        isActiveted: false
      }
    });

    return response.redirect("back");
  }
  public async password({ params, response }: HttpContextContract) {
    const id = params.id;
    const hash = await argon2.hash("123456");
    await prisma.user.update({
      where: {
        id
      },
      data: {
        password: hash,
      }
    });

    return response.redirect("back");
  }

  public async destroy({ params, response }: HttpContextContract) {
    const id = params.id;

    await prisma.user.delete({
      where: {
        id
      }
    });

    return response.redirect("back");
  }
}
