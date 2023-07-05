import { prisma } from "@ioc:Adonis/Addons/Prisma";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";


export default class SimsController {
  public async index({ view }: HttpContextContract) {

    const sims = await prisma.sim.findMany({
      select: {
        id: true,
        imsi: true,
        provider: true,
        isActiveted: true,
        number: true,
        device: true
      },
    });
    var activated;
    var blocked;
    var all;
    all = await prisma.sim.aggregate({
      _count: { isActiveted: true },
    });
    all = all._count.isActiveted;

    activated = await prisma.device.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: true },
    });
    activated = activated._count.isActiveted;

    blocked = await prisma.sim.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: false },
    });
    blocked = blocked._count.isActiveted;
    console.log('from prisma ', sims)
    return view.render("stocks.sims.index", {
      sims,
      activated,
      blocked,
      all,

    });
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.only(["provider", "number", "imsi"]);

    console.log(data);
    data;
    try {
      await prisma.sim.create({
        data: {
          provider: data.provider,
          imsi: data.imsi,
          number: data.number
        },
      });

    } catch (error) {
      throw new Error(`Error creating device ${JSON.stringify(error)}`);
    }
    return response.redirect("back");
  }

  public async edit({ params, request, response }: HttpContextContract) {
    const id = params.id;
    const data = await request.only(["provider", "number", "imsi"]);
    // Query returns User or null



    await prisma.sim.update({
      where: { id: id },
      data: {
        provider: data.provider,
        imsi: data.imsi,
        number: data.number
      },
    });

    return response.redirect("back");

  }

  public async activeted({ params, response }: HttpContextContract) {
    const id = params.id;

    await prisma.sim.update({
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

    await prisma.sim.update({
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

    await prisma.sim.delete({
      where: {
        id
      }
    });

    return response.redirect("back");
  }
}
