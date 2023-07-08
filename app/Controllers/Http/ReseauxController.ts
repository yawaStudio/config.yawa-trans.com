import { Coordinate } from './../../../node_modules/.prisma/client/index.d';
import { prisma } from "@ioc:Adonis/Addons/Prisma";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import * as argon2 from "argon2";

export default class ReseauxController {
  public async index({ view }: HttpContextContract) {

    const reseaux = await prisma.reseau.findMany({

      select: {
        name: true,
        id: true,
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
  public async addItinerary({ params, request, response }: HttpContextContract) {
    const id = params.id;
    const data = await request.only([
      "itname",
      "ter1",
      "lat1",
      "long1",
      "ter2",
      "lat2",
      "long2"
    ]);

    const earthRadiusKm = 6371;
    const toRadians = (degrees) => {
      return (degrees * Math.PI) / 180;
    };
    const lat1 = toRadians(data.lat1);
    const lon1 = toRadians(data.long1);
    const lat2 = toRadians(data.lat2);
    const lon2 = toRadians(data.long2);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    let distance = earthRadiusKm * c;
    distance = Math.round(distance)
    const add = await prisma.itinerary.create({
      data: {
        name: data.itname,
        distance: distance,
        reseauId: id
      }
    })
    data.lat1 = Number(data.lat1)
    data.long1 = Number(data.long1)
    data.lat2 = Number(data.lat2)
    data.long2 = Number(data.long2)
    const t1 = await prisma.coordinate.create({
      data:
      {
        name: data.ter1,
        latitude: data.lat1,
        longitude: data.long1,
        itineraryId: add.id
      }

    })
    if (t1) {

      await prisma.coordinate.create({
        data: {

          name: data.ter2,
          latitude: data.lat1,
          longitude: data.long2,
          itineraryId: add.id

        },
      })
    }
    console.log(data)

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
  public async view({ params, view }: HttpContextContract) {
    const id = params.id;
    const item = await prisma.reseau.findFirst({
      where: {
        id: id
      }
    });
    const itinerarys = await prisma.itinerary.findMany({
      where: {
        reseauId: id
      },
      include: {
        coordinates: true,
        rates: true
      }
    })
    const itiBlock = await prisma.itinerary.findMany({
      where: {
        reseauId: id,
        isActiveted: false
      },
      include: {
        coordinates: true,
        rates: true
      }
    })
    var activated;
    var blocked;
    var all;
    all = await prisma.itinerary.aggregate({
      where: { reseauId: id },
      _count: { isActiveted: true },
    });
    all = all._count.isActiveted;

    activated = await prisma.itinerary.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: true, reseauId: id },
    });
    activated = activated._count.isActiveted;

    blocked = await prisma.itinerary.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: false, reseauId: id },
    });
    blocked = blocked._count.isActiveted;
    console.log(item)
    return view.render("reseaux.view", {
      item,
      itinerarys,
      activated,
      blocked,
      itiBlock,
      all,
    });
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


