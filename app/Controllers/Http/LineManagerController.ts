
import { prisma } from "@ioc:Adonis/Addons/Prisma";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class LineManagerController {
  public async index({ view }: HttpContextContract) {

    const regulators = await prisma.lineManager.findMany({

    });
    const custumers= await prisma.reseau.findMany()
    console.log(regulators)
    var activated;
    var blocked;
    var all;
    all = await prisma.lineManager.aggregate({
      _count: { isActiveted: true },
    });
    all = all._count.isActiveted;

    activated = await prisma.lineManager.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: true },
    });
    activated = activated._count.isActiveted;

    blocked = await prisma.lineManager.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: false },
    });
    blocked = blocked._count.isActiveted;
    return view.render("reseaux.line-managers.index", {
      regulators,
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
      await prisma.lineManager.create({
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

   
    await prisma.lineManager.update({
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

    
    await prisma.lineManager.update({
      where:{id},
      data: {
        password: data.password,
      }
    })
    

    return response.redirect("back");

  }
  
  public async view({ params, view }: HttpContextContract) {
    const id = params.id;
    const item = await prisma.lineManager.findFirst({
      where: {
        id: id
      },
    });
    
    return view.render("reseaux.line-managers.view", {
      item,
    });
  }
  public async activeted({ params, response }: HttpContextContract) {
    const id = params.id;
    await prisma.lineManager.update({
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

    await prisma.lineManager.update({
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

    await prisma.lineManager.delete({
      where: {
        id
      }
    });

    return response.redirect("back");
  }
}


