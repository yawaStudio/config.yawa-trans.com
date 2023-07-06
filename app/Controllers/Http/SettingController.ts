import { prisma } from "@ioc:Adonis/Addons/Prisma";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";


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
