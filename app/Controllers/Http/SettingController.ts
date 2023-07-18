import { prisma } from "@ioc:Adonis/Addons/Prisma";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
var moment = require('moment');
import Application from '@ioc:Adonis/Core/Application'
export default class SettingController {
  public async index({ view }: HttpContextContract) {

    const roles = await prisma.role.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    //console.log(users)
    return view.render("settings.index", {
      roles,
    });
  }
  public async config({view}: HttpContextContract) {
    const config = await prisma.appConfig.findFirst()
    console.log('config', JSON.parse(JSON.stringify(config)))
    var statut = true
    if (config == null) {
      statut = false
    }
    console.log(statut)
    return view.render("settings.index", {
      config,
      statut
    }); 
  }
  public async init({ request, response }: HttpContextContract) {
    const data = await request.only([
      "name", 
      "ninea",
      "rccm",
      "phone",
      "email",
      "adress",
      "webSite",
      "version",
      "manager"
    ]);
    moment().format();
    moment.locale('fr');
    var createdAt = moment().format('L');
    var updatedAt = moment().format('L');
    try {
      await prisma.appConfig.create({
        data: {
          name: data.name,
          ninea: data.ninea,
          rccm: data.rccm,
          phone: data.phone,
          email: data.email,
          adress: data.adress,
          webSite: data.webSite,
          version: data.version,
          manager: data.manager,
          createdAt: createdAt,
          updatedAt: updatedAt,
        },
      });
    } catch (error) {
      throw new Error(`Error creating device ${JSON.stringify(error)}`);
    }
    return response.redirect("back");
  }
  public async store({ request, response }: HttpContextContract) {
    const data = await request.only(["name",]);

    try {
      await prisma.role.create({
        data: {
          name: data.name,
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
      "name", 
      "ninea",
      "rccm",
      "phone",
      "email",
      "adress",
      "webSite",
      "version",
      "manager"
    ]);
    moment().format();
    moment.locale('fr');
    var updatedAt = moment().format('LLLL');
    await prisma.appConfig.update({
      where: { id: id },
      data: {
        name: data.name,
        ninea: data.ninea,
        rccm: data.rccm,
        phone: data.phone,
        email: data.email,
        adress: data.adress,
        webSite: data.webSite,
        version: data.version,
        manager: data.manager,
        updatedAt: updatedAt,
      },
    });

    return response.redirect("back");

  }
  public async logo({ params, request, response }: HttpContextContract) {
    const id = params.id;
   
    const coverImage = request.file('cover_image')

    if (coverImage) {
      await coverImage.move(Application.tmpPath('uploads'))
    }
    console.log('logo', coverImage)
    moment().format();
    moment.locale('fr');
    var updatedAt = moment().format('LLLL');
    

    return response.redirect("back");

  }
  public async update({ params, request, response }: HttpContextContract) {
    const id = params.id;
    const data = await request.only(["name",]);
    await prisma.role.update({
      where: { id: id },
      data: {
        name: data.name,
      },
    });

    return response.redirect("back");

  }

}
