import { prisma } from "@ioc:Adonis/Addons/Prisma";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";


export default class RubricsController {
  public async index({ view }: HttpContextContract) {

    const rubrics = await prisma.rubrics.findMany();
    var activated;
    var blocked;
    var all;
    all = await prisma.rubrics.aggregate({
      _count: { isActiveted: true },
    });
    all = all._count.isActiveted;

    activated = await prisma.rubrics.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: true },
    });
    activated = activated._count.isActiveted;

    blocked = await prisma.rubrics.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: false },
    });
    blocked = blocked._count.isActiveted;
    console.log('from prisma ', rubrics)
    return view.render("reseaux.rubrics.index", {
      rubrics,
      activated,
      blocked,
      all,

    });
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.only(["name", "reseauId"]);

    console.log(data);
    data;
    try {
      await prisma.rubrics.create({
        data: {
          name: data.name,
          reseauId: data.reseauId,
        },
      });

    } catch (error) {
      throw new Error(`Error creating rubrics ${JSON.stringify(error)}`);
    }
    return response.redirect("back");
  }

  public async edit({ params, request, response }: HttpContextContract) {
    const id = params.id;
    const data = await request.only(["name", "reseauId"]);
    await prisma.rubrics.update({
      where: { id: id },
      data: {
        name: data.name,
        reseauId: data.reseauId,
      },
    });

    return response.redirect("back");

  }
  
  public async activeted({ params, response }: HttpContextContract) {
    const id = params.id;

    await prisma.rubrics.update({
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

    await prisma.rubrics.update({
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

    await prisma.rubrics.delete({
      where: {
        id
      }
    });

    return response.redirect("back");
  }
}
