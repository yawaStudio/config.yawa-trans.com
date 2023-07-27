import { prisma } from "@ioc:Adonis/Addons/Prisma";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
var moment = require('moment');

export default class AppareilsController {
  public async index({ view }: HttpContextContract) {

    
    const devices = await prisma.deviceType.findMany({
      include: {
        _count: {
          select: { Device: true },
        },
      },
    })
    console.log(devices)
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
    return view.render("materiels.index", {
      devices,
      activated,
      blocked,
      all,

      sims
    });
  }
  public async device({ view }: HttpContextContract) {

    const devices = await prisma.device.findMany(
      {
        include:{
          device: true
        }
      },
    );
    const types = await prisma.deviceType.findMany();
    console.log(devices)
    

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
    return view.render("materiels.devices", {
      devices,
      activated,
      blocked,
      all,

      types
    });
  }
  public async store({ request, response }: HttpContextContract) {
    const data = await request.only(["type", "details", "quantity", "price"]);
    moment().format();
    moment.locale('fr');
    var count = Number(data.quantity)
    data.price = Number(data.price)
      var updatedAt = moment().format('LLLL');
    console.log(data);
    const type = await prisma.deviceType.create({
      data: {
        type: data.type,
        details: data.details,
        price: data.price,
        updatedAt: updatedAt,
      }
    })
    for (let i = 0; i < count; i++) {
    var uuid = Math.floor(1000 + Math.random() * 9000).toString();
      uuid = data.type + uuid
      await prisma.device.create({
        data: {
          code: uuid,
          typeId: type.id,
          price: data.price,
          updatedAt: updatedAt,
        },
      });
      
    }
    console.log ("Okk");
    
    return response.redirect("back");
  }
  public async add({ params, request, response }: HttpContextContract) {
    const id = params.id;
    const data = await request.only(["quantity"]);
    moment().format();
    moment.locale('fr');
    var count = Number(data.quantity) 
    const model = await prisma.deviceType.findUniqueOrThrow({
      where: {
        id
      }
    }) 
    var updatedAt = moment().format('LLLL');
    for (let i = 0; i < count; i++) {
      var uuid = Math.floor(1000 + Math.random() * 9000).toString();
        uuid = model.type  + uuid
        await prisma.device.create({
          data: {
            code: uuid,
            typeId: id,
            price: model.price,
            updatedAt: updatedAt,
          },
        });
        
      }

    return response.redirect("back");

  }
  public async edit({ params, request, response }: HttpContextContract) {
    const id = params.id;
    const data = await request.only(["price", "details"]);

    moment().format();
    moment.locale('fr');
    data.price = Number(data.price)
    var updatedAt = moment().format('LLLL');
    await prisma.deviceType.update({
      where: { id: id },
      data: { 
        price: data.price,
        details: data.details,
        updatedAt: updatedAt,
      },
    });

    await prisma.device.updateMany({
      where:{
        typeId: id 
      },
      data: {
        price: data.price,
        updatedAt:updatedAt
      }
    })

    return response.redirect("back");

  }

  public async sim({ params, request, response }: HttpContextContract) {
    const id = params.id;
    const data = await request.only(["simId"]);
    // Query returns device or null
    const appareil = await prisma.simDevice.update({
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
  public async delete({ params, response }: HttpContextContract) {
    const id = params.id;

    await prisma.deviceType.delete({
      where: {
        id
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
