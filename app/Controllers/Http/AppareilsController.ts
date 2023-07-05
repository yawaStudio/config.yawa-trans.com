import { prisma } from "@ioc:Adonis/Addons/Prisma";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";


export default class AppareilsController {
  public async index({ view }: HttpContextContract) {

    const appareils = await prisma.device.findMany({
      select: {
        id: true,
        code: true,
        type: true,
        isActiveted: true,
        sim: true
      },
    });
    const sims = await prisma.sim.findMany({
      where: {
        isActiveted: false
      }
    })

    var activated;
    var blocked;
    var all;
    all = await prisma.device.aggregate({
      _count: { isActiveted: true },
    });
    all = all._count.isActiveted;

    activated = await prisma.device.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: true },
    });
    activated = activated._count.isActiveted;

    blocked = await prisma.device.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: false },
    });
    blocked = blocked._count.isActiveted;
    return view.render("stocks.appareils.index", {
      appareils,
      activated,
      blocked,
      all,

      sims
    });
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.only(["type", "simId"]);

    console.log(data);
    var uuid = Math.floor(1000 + Math.random() * 9000).toString();
    uuid = data.type + uuid
    try {
      await prisma.device.create({
        data: {
          code: uuid,
          type: data.type,
          simId: data.simId
        },
      });



    } catch (error) {
      throw new Error(`Error creating device ${JSON.stringify(error)}`);
    }
    return response.redirect("back");
  }

  public async edit({ params, request, response }: HttpContextContract) {
    const id = params.id;
    const data = await request.only(["type", "simId"]);
    // Query returns User or null
    const appareil = await prisma.device.findUniqueOrThrow({
      where: {
        id,
      },
    });


    await prisma.device.update({
      where: { id: appareil.id },
      data: { simId: data.simId },
    });
    console.log(appareil);

    return response.redirect("back");

  }

  public async sim({ params, request, response }: HttpContextContract) {
    const id = params.id;
    const data = await request.only(["simId"]);
    // Query returns device or null
    const appareil = await prisma.device.update({
      where: {
        id
      },
      data: {
        simId: data.simId
      }
    })




    console.log(appareil);

    return response.redirect("back");
  }

  public async activeted({ params, response }: HttpContextContract) {
    const id = params.id;

    await prisma.device.update({
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

    await prisma.device.update({
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

    await prisma.device.delete({
      where: {
        id
      }
    });

    return response.redirect("back");
  }
}
