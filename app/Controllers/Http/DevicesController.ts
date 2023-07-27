
import { prisma } from "@ioc:Adonis/Addons/Prisma";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";


export default class DevicesController {
  public async index({ view }: HttpContextContract) {

    const operators = await prisma.deviceAttribution.findMany({

      include:{
        Companie: true,
        reseau:true,
        vehicule:true,
        device:true
      }
    });
    const custumers= await prisma.operator.findMany()
    console.log(operators)
    var activated;
    var blocked;
    var all;
    all = await prisma.operator.aggregate({
      _count: { isActiveted: true },
    });
    all = all._count.isActiveted;

    activated = await prisma.operator.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: true },
    });
    activated = activated._count.isActiveted;

    blocked = await prisma.operator.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: false },
    });
    blocked = blocked._count.isActiveted;
    return view.render("reseaux.devices.index", {
      operators,
      activated,
      blocked,
      custumers,
      all,
    });
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.only([
      "deviceId",
      "vehiculeId",
    ]);
    console.log(data)
    const companie = await prisma.vehicule.findFirstOrThrow({
      where: {
        id : data.vehiculeId
      },
      include:{
        reseau: true,
        operator: true,
        Companie: true
      }
    })
    const device = await prisma.device.findFirstOrThrow({
      where:{
        id: data.deviceId
      }
    })
    console.log(companie)
    try {
      const save = await prisma.deviceAttribution.create({
        data: {
          deviceId: data.deviceId,
          deviceCode: device.code,
          operatorId: companie.operator.id,
          vehiculeId: data.vehiculeId,
          CompanieId: companie.Companie.id,
          reseauId: companie.reseau.id,
        },
      });
      if (save) {
        await prisma.device.update({
          where:{
            id: data.deviceId
          },
          data:{
            isActiveted:true
          }
        })
        await prisma.vehicule.update({
          where:{
            id: data.vehiculeId
          },
          data:{
            isActiveted:true
          }
        })      
      }
    } catch (error) {
      throw new Error(`Error creating device ${JSON.stringify(error)}`);
    }
    return response.redirect("back");
  }

  public async edit({ params, request, response }: HttpContextContract) {
    const id = params.id;
    const data = await request.only([
      "deviceId",
      "vehiculeId",
    ]);

    const dev = await prisma.deviceAttribution.findFirstOrThrow({
      where:{id}
    })
    const device = await prisma.device.findFirstOrThrow({
      where:{
        id: data.deviceId
      }
    })
    const companie = await prisma.vehicule.findFirstOrThrow({
      where: {
        id : data.vehiculeId
      },
      include:{
        reseau: true,
        operator: true,
        Companie: true
      }
    })
    await prisma.device.update({
      where:{
        id: dev.deviceId
      },
      data:{
        isActiveted:false
      }
    })
    await prisma.vehicule.update({
      where:{
        id: dev.vehiculeId
      },
      data:{
        isActiveted:false
      }
    })     
   const save = await prisma.deviceAttribution.update({
      where: { id: id },
      data: {
        deviceId: data.deviceId,
          operatorId: companie.operator.id,
          vehiculeId: data.vehiculeId,
          deviceCode: device.code,
          CompanieId: companie.Companie.id,
          reseauId: companie.reseau.id,
      },
    });
    if (save) {
      await prisma.device.update({
        where:{
          id: data.deviceId
        },
        data:{
          isActiveted:true
        }
      })
    }
    return response.redirect("back");

  }
  
  
  public async view({ params, view }: HttpContextContract) {
    const id = params.id;
    const item = await prisma.deviceAttribution.findFirst({
      where: {
        id: id
      },
      include:{
        Companie: true,
        reseau:true,
        vehicule: true,
        device: true
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
    return view.render("reseaux.devices.view", {
      item,
      activated,
      blocked,
      all,
    });
  }
  public async activeted({ params, response }: HttpContextContract) {
    const id = params.id;
    await prisma.deviceAttribution.update({
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

    await prisma.deviceAttribution.update({
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
    const device = await prisma.deviceAttribution.findFirstOrThrow({
      where: {
        id
      },
      }
    );
  
      await prisma.device.update({
        where:{
          id: device.deviceId
        },
        data:{
          isActiveted:false
        }
      })
      await prisma.vehicule.update({
        where:{
          id: device.vehiculeId
        },
        data:{
          isActiveted:false
        }
      })      
      await prisma.deviceAttribution.delete({
        where: {
          id
        },
       
      });
    return response.redirect("back");
  }
}


