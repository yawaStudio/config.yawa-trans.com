import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class AuthController {
    public async login({request, response, auth, session}: HttpContextContract) {
        const {email, password} = await request.all()
        console.log('email ', email )
        try {
            await auth.use('web').attempt(email, password)
        } catch (error) {
          
            console.log('error ',  error) 
            session.flash('login', 'Oups! Identifiants incorrects.')
        }


            console.log('auth ',  auth.use('web').isLoggedIn)
        return response.redirect("/");
      }
   
}
