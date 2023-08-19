"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthController {
    async login({ request, response, auth, session }) {
        const { email, password } = await request.all();
        console.log('email ', email);
        try {
            await auth.use('web').attempt(email, password);
        }
        catch (error) {
            session.flashExcept(["password"]);
            session.flash('login', 'Oups! Identifiants incorrects.');
        }
        console.log('auth ', auth.use('web').isLoggedIn);
        return response.redirect("/");
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map