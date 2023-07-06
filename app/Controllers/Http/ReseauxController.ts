import { prisma } from "@ioc:Adonis/Addons/Prisma";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import * as argon2 from "argon2";

export default class ReseauxController {
  public async index({ view }: HttpContextContract) {

    const reseaux = await prisma.reseau.findMany({

      select: {
        name: true,
        Config: {
          select: {
            itinerary: true,
            invoicing: true,
            depatureDuration: true,
            agentName: true,
            agentPhone: true,
            agentEmail: true,
          },
        },

      },
    });
    console.log(reseaux)
    var activated;
    var blocked;
    var all;
    all = await prisma.reseau.aggregate({
      _count: { isActiveted: true },
    });
    all = all._count.isActiveted;

    activated = await prisma.reseau.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: true },
    });
    activated = activated._count.isActiveted;

    blocked = await prisma.reseau.aggregate({
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

  public async store({ request, response }: HttpContextContract) {
    const data = await request.only([
      "name",
      "agentName",
      "agentPhone",
      "agentEmail"
    ]);


    try {
      const save = await prisma.reseau.create({
        data: {
          name: data.name,
        },
      });

      if (save) {
        await prisma.reseauConfig.create({
          data: {
            reseauId: save.id,
            agentName: data.agentName,
            agentPhone: data.agentPhone,
            agentEmail: data.agentEmail,
          },
        });

        const hash = await argon2.hash("123456");
        const role = await prisma.role.findFirstOrThrow({
          where: {
            name: 'Gestionnaire'
          }
        })
        const user = await prisma.user.create({
          data: {
            name: data.agentName,
            email: data.agentEmail,
            password: hash,
            roleId: role.id,
          },
        });

        if (user) {
          const account = await prisma.account.create({
            data: {
              userId: user.id,
              name: data.agentName,
              phone: data.agentPhone
            },
          });
          console.log("account ", account);
        }
      }
    } catch (error) {
      throw new Error(`Error creating device ${JSON.stringify(error)}`);
    }
    return response.redirect("back");
  }

  public async edit({ params, request, response }: HttpContextContract) {
    const id = params.id;
    const data = await request.only(["name",]);
    await prisma.reseau.update({
      where: { id: id },
      data: {
        name: data.name,
      },
    });

    return response.redirect("back");

  }

  public async config({ params, request, response }: HttpContextContract) {
    const id = params.id;
    const data = await request.only([
      "itinerary",
      "invoicing",
      "depatureDuration",
      "agentName",
      "agentPhone",
      "agentEmail"
    ]);
    await prisma.reseauConfig.update({
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

  public async activeted({ params, response }: HttpContextContract) {
    const id = params.id;
    await prisma.reseau.update({
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

    await prisma.reseau.update({
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

    await prisma.reseau.delete({
      where: {
        id
      }
    });

    return response.redirect("back");
  }
}
