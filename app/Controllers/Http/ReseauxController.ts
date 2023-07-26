
import { prisma } from "@ioc:Adonis/Addons/Prisma";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import * as argon2 from "argon2";

export default class ReseauxController {
  public async index({ view }: HttpContextContract) {

    const reseaux = await prisma.reseau.findMany({
      
      include:{
        Companie: true,
        Config:true,
        _count: {
          select: { Vehicule: true, Operator:true, Companie:true },
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
            name: 'AGENT CETUD'
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
      },
      include:{
        Operator:true,
        Vehicule:true,
        Itinerary:{
          include: {
            coordinates: true,
            rates: true
          }
        }
      }
    });
    
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
      activated,
      blocked,
      all,
    });
  }
  public async op({ params, view }: HttpContextContract) {
    const id = params.id;
    const item = await prisma.reseau.findFirstOrThrow({
      where: {
        id: id
      },
      include:{
        Operator: {
          include:{
            Companie: true,
            reseau:true,
            Vehicules:true,
            _count: {
              select: { Vehicules: true, Device:true },
            },
          }
        },
      }
    });
    const custumers= await prisma.companie.findMany({
      where:{
        ReseauId: id
      }
    })
    var activated;
    var blocked;
    var all;
    all = await prisma.operator.aggregate({
      where: { reseauId: id },
      _count: { isActiveted: true },
    });
    all = all._count.isActiveted;

    activated = await prisma.operator.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: true, reseauId: id },
    });
    activated = activated._count.isActiveted;

    blocked = await prisma.operator.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: false, reseauId: id },
    });
    blocked = blocked._count.isActiveted;
    console.log(item)
    return view.render("reseaux.operators.index", {
      item,
      activated,
      blocked,
      custumers,
      all,
    });
  }
  public async bus({ params, view }: HttpContextContract) {
    const id = params.id;
    const item = await prisma.reseau.findFirst({
      where: {
        id: id
      },
      include:{
        Vehicule:{
          include:{
            Companie: true,
            reseau:true,
            operator:true,
          }
        },
      }
    });
    const operators = await prisma.operator.findMany({
      where:{
        reseauId: id
      }
    }) 
    var activated;
    var blocked;
    var all;
    all = await prisma.vehicule.aggregate({
      where: { reseauId: id },
      _count: { isActiveted: true },
    });
    all = all._count.isActiveted;

    activated = await prisma.vehicule.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: true, reseauId: id },
    });
    activated = activated._count.isActiveted;

    blocked = await prisma.vehicule.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: false, reseauId: id },
    });
    blocked = blocked._count.isActiveted;
    console.log(item)
    return view.render("reseaux.vehicules.index", {
      item,
      activated,
      blocked,
      all,
      operators
    });
  }
  public async controllers({ params, view }: HttpContextContract) {
    const id = params.id;
    const item = await prisma.reseau.findFirst({
      where: {
        id: id
      },
      include:{
        Controller:{
          select: {name: true, id:true, password: true, phone: true, isActiveted: true},
          
        },
      }
    });
    
    var activated;
    var blocked;
    var all;
    all = await prisma.controller.aggregate({
      where: { ReseauId: id },
      _count: { isActiveted: true },
    });
    all = all._count.isActiveted;

    activated = await prisma.controller.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: true, ReseauId: id },
    });
    activated = activated._count.isActiveted;

    blocked = await prisma.controller.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: false, ReseauId: id },
    });
    blocked = blocked._count.isActiveted;
    console.log(item)
    return view.render("reseaux.controller.index", {
      item,
      activated,
      blocked,
      all,
    });
  }
  public async regulators({ params, view }: HttpContextContract) {
    const id = params.id;
    const item = await prisma.reseau.findFirst({
      where: {
        id: id
      },
      include:{
        Regulator:{
          select: {name: true, id:true, password: true, phone: true, isActiveted: true},
          
        },
      }
    });
    
    var activated;
    var blocked;
    var all;
    all = await prisma.regulator.aggregate({
      where: { ReseauId: id },
      _count: { isActiveted: true },
    });
    all = all._count.isActiveted;

    activated = await prisma.regulator.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: true, ReseauId: id },
    });
    activated = activated._count.isActiveted;

    blocked = await prisma.regulator.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: false, ReseauId: id },
    });
    blocked = blocked._count.isActiveted;
    console.log(item)
    return view.render("reseaux.regulators.index", {
      item,
      activated,
      blocked,
      all,
    });
  }
  public async device({ params, view }: HttpContextContract) {
    const id = params.id;
    const item = await prisma.reseau.findFirst({
      where: {
        id: id
      },
      include:{
        Device: {
          include:{
            Companie: true,
            device:true,
            operator:{
              include:{
                Companie: true
              }
            },
            reseau:true,
            vehicule: true
          }
        },
      }
    });
    const devices = await prisma.device.findMany({
      where:{
        isActiveted: false
      }
    })
    const vehicules = await prisma.vehicule.findMany({
      where:{
        reseauId: id,
        isActiveted: false
      },
      include:{
        operator:{
          include:{
            Companie:true
          }
        }
      }
    })
    var activated;
    var blocked;
    var all;
    all = await prisma.deviceAttribution.aggregate({
      where: { reseauId: id },
      _count: { isActiveted: true },
    });
    all = all._count.isActiveted;

    activated = await prisma.deviceAttribution.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: true, reseauId: id },
    });
    activated = activated._count.isActiveted;

    blocked = await prisma.deviceAttribution.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: false, reseauId: id },
    });
    blocked = blocked._count.isActiveted;
    console.log(item)
    return view.render("reseaux.devices.index", {
      item,
      activated,
      blocked,
      all,
      devices,
      vehicules
    });
  }
  public async seller({ params, view }: HttpContextContract) {
    const id = params.id;
    const item = await prisma.reseau.findFirst({
      where: {
        id: id
      },
      include:{
        Sellers: {
          include:{
            vehicule:{
              include:{
                Companie: true,
                operator:true
              }
            },
          }
        },
      }
    });
    const vehicules = await prisma.vehicule.findMany({
      where:{
        reseauId: id,
      },
      include:{
        operator:{
          include:{
            Companie:true
          }
        }
      }
    })
    var activated;
    var blocked;
    var all;
    all = await prisma.seller.aggregate({
      where: { ReseauId: id },
      _count: { isActiveted: true },
    });
    all = all._count.isActiveted;

    activated = await prisma.seller.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: true, ReseauId: id },
    });
    activated = activated._count.isActiveted;

    blocked = await prisma.seller.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: false, ReseauId: id },
    });
    blocked = blocked._count.isActiveted;
    console.log(item)
    return view.render("reseaux.sellers.index", {
      item,
      activated,
      blocked,
      all,
      vehicules
    });
  }
  public async driver({ params, view }: HttpContextContract) {
    const id = params.id;
    const item = await prisma.reseau.findFirst({
      where: {
        id: id
      },
      include:{
        Driver: {
          include:{
            vehicule:{
              include:{
                Companie: true,
                operator:true
              }
            },
          }
        },
      }
    });
    const vehicules = await prisma.vehicule.findMany({
      where:{
        reseauId: id,
      },
      include:{
        operator:{
          include:{
            Companie:true
          }
        }
      }
    })
    var activated;
    var blocked;
    var all;
    all = await prisma.driver.aggregate({
      where: { ReseauId: id },
      _count: { isActiveted: true },
    });
    all = all._count.isActiveted;

    activated = await prisma.driver.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: true, ReseauId: id },
    });
    activated = activated._count.isActiveted;

    blocked = await prisma.driver.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: false, ReseauId: id },
    });
    blocked = blocked._count.isActiveted;
    console.log(item)
    return view.render("reseaux.drivers.index", {
      item,
      activated,
      blocked,
      all,
      vehicules
    });
  }
  public async rubrics({ params, view }: HttpContextContract) {
    const id = params.id;
    const item = await prisma.reseau.findFirst({
      where: {
        id: id
      },
      include:{
        Rubrics:true
      }
    });
    
    var activated;
    var blocked;
    var all;
    all = await prisma.rubrics.aggregate({
      where: { reseauId: id },
      _count: { isActiveted: true },
    });
    all = all._count.isActiveted;

    activated = await prisma.rubrics.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: true, reseauId: id },
    });
    activated = activated._count.isActiveted;

    blocked = await prisma.rubrics.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: false, reseauId: id },
    });
    blocked = blocked._count.isActiveted;
    console.log(item)
    return view.render("reseaux.rubrics.index", {
      item,
      activated,
      blocked,
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


