"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HomeController {
    async index({ view }) {
        return view.render('welcome', {
            greeting: 'Home'
        });
    }
}
exports.default = HomeController;
//# sourceMappingURL=HomeController.js.map