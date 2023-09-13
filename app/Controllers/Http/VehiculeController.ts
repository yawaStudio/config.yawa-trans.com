
import { prisma } from "@ioc:Adonis/Addons/Prisma";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class VehiculeController {
  public async index({ view }: HttpContextContract) {

    const vehicules = await prisma.vehicule.findMany({

      include:{
        Companie: true,
        reseau:true,
        operator:true,
      }
    });
    const custumers= await prisma.companie.findMany()
    console.log(vehicules)
    var activated;
    var blocked;
    var all;
    all = await prisma.vehicule.aggregate({
      _count: { isActiveted: true },
    });
    all = all._count.isActiveted;

    activated = await prisma.vehicule.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: true },
    });
    activated = activated._count.isActiveted;

    blocked = await prisma.vehicule.aggregate({
      _count: { isActiveted: true },
      where: { isActiveted: false },
    });
    blocked = blocked._count.isActiveted;
    return view.render("reseaux.vehicules.index", {
      vehicules,
      activated,
      blocked,
      custumers,
      all,
    });
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.only([
      "matricule",
      "operatorId"
    ]);

    const op  = await prisma.operator.findFirstOrThrow({
      where:{
        id:data.operatorId
      }
    })
    await prisma.vehicule.create({
      data: {
        matricule: data.matricule,
        operatorId: data.operatorId,
        CompanieId: op.companieId,
        reseauId: op.reseauId
      }
    })
    return response.redirect("back");
  }

  
  public async edit({ params, request, response }: HttpContextContract) {
    const id = params.id;
    const data = await request.only([
      "matricule",
      "operatorId"
    ]);
    console.log('from data vehicule', data)
    const op  = await prisma.operator.findFirstOrThrow({
      where:{
        id:data.operatorId
      }
    })
    //console.log(op)
    await prisma.vehicule.update({
      where:{
        id
      },
      data: {
        matricule: data.matricule,
        operatorId: data.operatorId,
        CompanieId: op.companieId,
        reseauId: op.reseauId
      }
    })
    

    return response.redirect("back");

  }
  
  public async view({ params, view }: HttpContextContract) {
    const id = params.id;
    const item = await prisma.operator.findFirst({
      where: {
        id: id
      },
      include:{
        Companie: true,
        reseau:true,
        Vehicules: true,
        Device: true
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
    return view.render("reseaux.operators.view", {
      item,
      activated,
      blocked,
      all,
    });
  }
  public async activeted({ params, response }: HttpContextContract) {
    const id = params.id;
    await prisma.vehicule.update({
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

    await prisma.vehicule.update({
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

    await prisma.vehicule.delete({
      where: {
        id
      }
    });

    return response.redirect("back");
  }
}


