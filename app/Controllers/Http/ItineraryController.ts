import { prisma } from "@ioc:Adonis/Addons/Prisma";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import * as argon2 from "argon2";

export default class ItineraryController {
  public async index({ view }: HttpContextContract) {

    const reseaux = await prisma.reseau.findMany({

      select: {
        name: true,
        id: true,
        Itinerary: {
          select: {
            name: true,
            isActiveted: true
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
    return view.render("reseaux.itinerarys.index", {
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
    await prisma.itinerary.update({
      where: { id: id },
      data: {
        name: data.name,
      },
    });

    return response.redirect("back");

  }
  public async points({ params, request, response }: HttpContextContract) {
    const id = params.id;
    const data = await request.only([
      "id",
      "name",
      "longitude",
      "latitude",
    ]);
    console.log(data)
    await prisma.coordinate.delete({
      where: {
        id: data.id
      }
    });
    const point = await prisma.coordinate.findFirstOrThrow({
      where: {
        itineraryId: id,
      },
      select: {
        latitude: true,
        longitude: true
      }
    })
    console.log(point)
    const earthRadiusKm = 6371;
    const toRadians = (degrees) => {
      return (degrees * Math.PI) / 180;
    };
    const lat1 = toRadians(data.latitude);
    const lon1 = toRadians(data.longitude);
    const lat2 = toRadians(point.latitude);
    const lon2 = toRadians(point.longitude);
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
    data.latitude = Number(data.latitude)
    data.longitude = Number(data.longitude)
    await prisma.coordinate.create({
      data:
      {
        name: data.name,
        latitude: data.latitude,
        longitude: data.longitude,
        itineraryId: id
      }
    })
    await prisma.itinerary.update({
      where: { id: id },
      data: {
        distance: distance,
      },
    });

    return response.redirect("back");

  }
  public async rate({ params, request, response }: HttpContextContract) {
    const id = params.id;
    const data = await request.only(["name", "price", "section"]);
    data.name = data.name + ' ' + data.price
    data.price = Number(data.price)
    await prisma.rate.create({
      data: {
        name: data.name,
        price: data.price,
        section: data.section,
        itineraryId: id,
      },
    });

    return response.redirect("back");

  }
  public async delRate({ params, response }: HttpContextContract) {
    const id = params.id;

    await prisma.rate.delete({
      where: {
        id
      }
    });

    return response.redirect("back");
  }
  public async activeted({ params, response }: HttpContextContract) {
    const id = params.id;
    await prisma.itinerary.update({
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

    await prisma.itinerary.update({
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

    await prisma.itinerary.delete({
      where: {
        id
      }
    });

    return response.redirect("back");
  }
}
