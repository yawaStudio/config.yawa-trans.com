import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class AuthController {
    public async login({request, response, auth, session}: HttpContextContract) {
        const {email, password} = await request.all()
    
        try {
            await auth.attempt(email, password);

        } catch (error) {
          
          
            session.flash('login', 'Oups! Identifiants incorrects.')
        }


        return response.redirect("/");
      }
   
}
