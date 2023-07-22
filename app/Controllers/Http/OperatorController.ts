
import { prisma } from "@ioc:Adonis/Addons/Prisma";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import * as argon2 from "argon2";

export default class OperatorController {
  public async index({ view }: HttpContextContract) {

    const operators = await prisma.operator.findMany({

      include:{
        Companie: true,
        reseau:true,
        Vehicules:true,
        _count: {
          select: { Vehicules: true, Device:true },
        },
      }
    });
    const custumers= await prisma.companie.findMany()
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
    return view.render("reseaux.operators.index", {
      operators,
      activated,
      blocked,
      custumers,
      all,
    });
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.only([
      "name",
      "email",
      "phone",
      "companieId"
    ]);

    const companie = await prisma.companie.findFirstOrThrow({
      where: {
        id : data.companieId
      }
    })
    try {
      const save = await prisma.operator.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          companieId: data.companieId,
          reseauId: companie.ReseauId,
        },
      });

      if (save) {
        

        const hash = await argon2.hash("123456");
        const role = await prisma.role.findFirstOrThrow({
          where: {
            name: 'OPERATEUR'
          }
        })
        const user = await prisma.user.create({
          data: {
            name: data.name,
            email: data.phone,
            password: hash,
            roleId: role.id,
          },
        });

        if (user) {
          const account = await prisma.account.create({
            data: {
              userId: user.id,
              name: data.name,
              phone: data.phone
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
    const data = await request.only([
      "name",
      "email",
      "phone",
      "companieId"
    ]);

    const companie = await prisma.companie.findFirstOrThrow({
      where: {
        id : data.companieId
      }
    })
    await prisma.operator.update({
      where: { id: id },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        companieId: data.companieId,
        reseauId: companie.ReseauId,
      },
    });

    return response.redirect("back");

  }
  public async addAuto({ params, request, response }: HttpContextContract) {
    const id = params.id;
    const data = await request.only([
      "matricule"
    ]);

    const op  = await prisma.operator.findFirstOrThrow({
      where:{
        id
      }
    })
    await prisma.vehicule.create({
      data: {
        matricule: data.matricule,
        operatorId: id,
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
    await prisma.operator.update({
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

    await prisma.operator.update({
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

    await prisma.operator.delete({
      where: {
        id
      }
    });

    return response.redirect("back");
  }
}


