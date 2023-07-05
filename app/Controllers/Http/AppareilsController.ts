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
    console.log('from prisma ', appareils)
    return view.render("stocks.appareils.index", {
      appareils,
  
      sims
    });
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.only(["type"]);

    console.log(data);
    data;
    try {
      const save = await prisma.device.create({
        data: {
          code: "",
          type: data.type,
        },
      });
      const code = data.type + save.id;
      const updated = await prisma.device.update({
        where: { id: save.id },
        data: { code: code },
      });
      await prisma.deviceSim.create({
        data: {deviceId: save.id },
      });
      console.dir(updated, { depth: Infinity });
    } catch (error) {
      throw new Error(`Error creating device ${JSON.stringify(error)}`);
    }
    return response.redirect("back");
  }

  public async edit({ params, request, response }: HttpContextContract) {
    const id = Number(params.id);
    const data = await request.only(["type"]);
    // Query returns User or null
    const appareil = await prisma.device.findUniqueOrThrow({
      where: {
        id,
      },
    });

    const code = data.type + appareil.id;
    await prisma.device.update({
      where: { id: appareil.id },
      data: { code: code },
    });
    console.log(appareil);
    
      return response.redirect("back");
   
  }

  public async sim({ params, request, response }: HttpContextContract) {
    const id = Number(params.id);
    const data = await request.only(["simId"]);
    // Query returns device or null
    const appareil = await prisma.device.findUniqueOrThrow({
      where: {
        id
      },
    })
    data.simId = Number(data.simId)
    const sim = await prisma.sim.findUniqueOrThrow({
        where: {
          id: data.simId
        },
      });
    const save = await prisma.deviceSim.update({
      where:{
        deviceId: id
      },
      data: { 
        simId: sim.id, 
        number: sim.number, 
        imsi: sim.imsi
    },
    });

    if (save) {
      await prisma.sim.update({
        where: {
          id: data.simId
        },
        data:{
          isActiveted: true
        }
      })
    }
    console.log(appareil);

    return response.redirect("back");
  }

  public async activeted({ params, response }: HttpContextContract) {
    const id = Number(params.id);
    
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
    const id = Number(params.id);
    
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
    const id = Number(params.id);
    
   await prisma.device.delete({
        where: {
          id
        }
      });
    
    return response.redirect("back");
  }
}
