
import { prisma } from "@ioc:Adonis/Addons/Prisma";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ControllersController {
  public async index({ view }: HttpContextContract) {

    const controller = await prisma.controller.findMany({

      include:{
        Controls: true,
      }
    });
    const custumers= await prisma.reseau.findMany()
    console.log(controller)
    var activated;
    var blocked;
    var all;
    all = await prisma.controller.aggregate({
      _count: { isActiveted: true },
    });
    all = all._count.isActiveted;

    activated = await prisma.controller.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: true },
    });
    activated = activated._count.isActiveted;

    blocked = await prisma.controller.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: false },
    });
    blocked = blocked._count.isActiveted;
    return view.render("reseaux.controller.index", {
      controller,
      activated,
      blocked,
      custumers,
      all,
    });
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.only([
      "name",
      "phone",
      "password",
      "ReseauId"
    ]);

    data.password = '123456'
    try {
      await prisma.controller.create({
        data: {
          name: data.name,
          phone: data.phone,
          password: data.password,
          ReseauId: data.ReseauId,
        },
      });
    } catch (error) {
      throw new Error(`Error creating device ${JSON.stringify(error)}`);
    }
    return response.redirect("back");
  }

  public async edit({ params, request, response }: HttpContextContract) {
    const id = params.id;
    const data = await request.only([
      "name",
      "phone",
      "password",
      "ReseauId"
    ]);

   
    await prisma.controller.update({
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
  public async editPwd({ params, request, response }: HttpContextContract) {
    const id = params.id;
    const data = await request.only([
      "password"
    ]);

    
    await prisma.controller.update({
      where:{id},
      data: {
        password: data.password,
      }
    })
    

    return response.redirect("back");

  }
  
  public async view({ params, view }: HttpContextContract) {
    const id = params.id;
    const item = await prisma.controller.findFirst({
      where: {
        id: id
      },
      include:{
        Controls: true,
      }
    });
    
    return view.render("reseaux.controller.view", {
      item,
    });
  }
  public async activeted({ params, response }: HttpContextContract) {
    const id = params.id;
    await prisma.controller.update({
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

    await prisma.controller.update({
      where: {
        id
      },
      data: {
        isActiveted: false
      }
    });

    return response.redirect("back");
  }

  public async destroy({ params, response }: HttpContextContract) {
    const id = params.id;

    await prisma.controller.delete({
      where: {
        id
      }
    });

    return response.redirect("back");
  }
}


