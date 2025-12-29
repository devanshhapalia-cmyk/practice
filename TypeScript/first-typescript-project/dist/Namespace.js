"use strict";
var App;
(function (App) {
    let Utils;
    (function (Utils) {
        function log(msg) {
            console.log(`[LOG]: ${msg}`);
        }
        Utils.log = log;
        function error(msg) {
            console.error(`[ERROR]: ${msg}`);
        }
        Utils.error = error;
    })(Utils = App.Utils || (App.Utils = {}));
    let Models;
    (function (Models) {
        class UserService {
            getUser(id) {
                return { id: 1, name: "John Doe", email: "john@example.com" };
            }
        }
        Models.UserService = UserService;
    })(Models = App.Models || (App.Models = {}));
})(App || (App = {}));
// Using nested namespaces
App.Utils.log("Application starting");
const userService = new App.Models.UserService();
const s1 = userService.getUser(1);
App.Utils.log(`User loaded: ${s1.name}`);
//# sourceMappingURL=Namespace.js.map