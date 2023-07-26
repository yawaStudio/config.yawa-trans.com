
import { prisma } from "@ioc:Adonis/Addons/Prisma";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";


export default class DriversController {
  public async index({ view }: HttpContextContract) {

    const sellers = await prisma.driver.findMany({

      include:{
        vehicule:{
          include:{
            Companie:true
          }
        },
      }
    });
    
    var activated;
    var blocked;
    var all;
    all = await prisma.driver.aggregate({
      _count: { isActiveted: true },
    });
    all = all._count.isActiveted;

    activated = await prisma.driver.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: true },
    });
    activated = activated._count.isActiveted;

    blocked = await prisma.driver.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: false },
    });
    blocked = blocked._count.isActiveted;
    return view.render("reseaux.drivers.index", {
      sellers,
      activated,
      blocked,
      all,
    });
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.only([
      "ReseauId",
      "vehiculeId",
      "name",
      "phone"
    ]);
    

    
    try {
      const save = await prisma.driver.create({
        data: {
          vehiculeId: data.vehiculeId,
          name: data.name,
          phone: data.phone,
          ReseauId: data.ReseauId,
        },
      });
        
      
    } catch (error) {
      throw new Error(`Error creating device ${JSON.stringify(error)}`);
    }
    return response.redirect("back");
  }

  public async edit({ params, request, response }: HttpContextContract) {
    const id = params.id;
    const data = await request.only([
      "ReseauId",
      "vehiculeId",
      "name",
      "phone"
    ]);

    
    
   const save = await prisma.driver.update({
      where: { id: id },
      data: {
        name: data.name,
          phone: data.phone,
          vehiculeId: data.vehiculeId,
          ReseauId: data.ReseauId,
      },
    });
    
    return response.redirect("back");

  }
  
  
  public async view({ params, view }: HttpContextContract) {
    const id = params.id;
    const item = await prisma.driver.findFirst({
      where: {
        id: id
      },
      include:{
        vehicule: true,
        Selling: true
      }
    });
    
    
    return view.render("reseaux.drivers.view", {
      item,
    });
  }
  public async activeted({ params, response }: HttpContextContract) {
    const id = params.id;
    await prisma.driver.update({
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

    await prisma.driver.update({
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
    
      await prisma.driver.delete({
        where: {
          id
        },
       
      });
    return response.redirect("back");
  }
}


