import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import * as argon2 from "argon2";
import Mail from '@ioc:Adonis/Addons/Mail';

export default class UsersController {
  public async index({view}: HttpContextContract) {
    const users = await prisma.user.findMany(
      {
        select: {
          email: true,
          name: true,
          role: true,
          isActiveted: true,
        },
      }
    )

    console.log(users)
    return view.render('users.index', {
      users: users
    })
  }

  public async create({view}: HttpContextContract) {
    return view.render('users.register')
  }

  public async store({request, response}: HttpContextContract) {
    const data = await request.only(['name', 'email', 'username', 'role' ])

    var uuid = Math.floor(100000 + Math.random() * 900000).toString()
    const hash = await argon2.hash(uuid);

    const user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          username: data.username,
          password: hash,
          role: data.role,

        },
    })

    if (user) {
      
        const url = '/verify/' + user.id
     
     

     
      return response.redirect('back')
    } else {
      return response.redirect('back')
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
