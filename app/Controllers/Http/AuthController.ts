import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'

export default class AuthController {
    public async login({request, response, auth}: HttpContextContract) {
        const {email, password} = await request.all()
    
        try {
          const user =  await auth.attempt(email, password);

          console.log(user)
        } catch (error) {
            console.log(error)
        }


        return response.redirect("/");
      }
   
}
