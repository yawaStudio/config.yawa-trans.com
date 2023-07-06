import { prisma } from "@ioc:Adonis/Addons/Prisma";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";


export default class LicencesController {
  public async index({ view }: HttpContextContract) {

    const licences = await prisma.licence.findMany();

    var activated;
    var blocked;
    var all;
    all = await prisma.licence.aggregate({
      _count: { isActive: true },
    });
    all = all._count.isActive;

    activated = await prisma.licence.aggregate({
      _count: { isActive: true },
      where: { isActive: true },
    });
    activated = activated._count.isActive;

    blocked = await prisma.licence.aggregate({
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

  public async store({ request, response }: HttpContextContract) {
    const data = await request.only(["type", "licenceName", "licenceAmount"]);

    console.log(data);
    var uuid = Math.floor(1000 + Math.random() * 9000).toString();
    if (data.type == 'Forfait') {
      uuid = 'F-' + uuid
    } else {
      uuid = 'P-' + uuid
    }
    try {
      await prisma.licence.create({
        data: {
          licenceCode: uuid,
          type: data.type,
          licenceName: data.licenceName,
          licenceAmount: data.licenceAmount,
        },
      });
    } catch (error) {
      throw new Error(`Error creating device ${JSON.stringify(error)}`);
    }
    return response.redirect("back");
  }

  public async edit({ params, request, response }: HttpContextContract) {
    const id = params.id;
    const data = await request.only(["type", "licenceName", "licenceAmount"]);
    var uuid = Math.floor(1000 + Math.random() * 9000).toString();
    if (data.type == 'Forfait') {
      uuid = 'F-' + uuid
    } else {
      uuid = 'P-' + uuid
    }
    await prisma.licence.update({
      where: { id: id },
      data: {
        type: data.type,
        licenceName: data.licenceName,
        licenceAmount: data.licenceAmount,
      },
    });

    return response.redirect("back");

  }



  public async activeted({ params, response }: HttpContextContract) {
    const id = params.id;
    await prisma.licence.update({
      where: {
        id
      },
      data: {
        isActive: true
      }
    });

    return response.redirect("back");
  }
  public async deactiveted({ params, response }: HttpContextContract) {
    const id = params.id;

    await prisma.licence.update({
      where: {
        id
      },
      data: {
        isActive: false
      }
    });

    return response.redirect("back");
  }

  public async destroy({ params, response }: HttpContextContract) {
    const id = params.id;

    await prisma.licence.delete({
      where: {
        id
      }
    });

    return response.redirect("back");
  }
}
