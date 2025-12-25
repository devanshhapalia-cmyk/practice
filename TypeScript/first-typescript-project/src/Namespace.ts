namespace App {
  export namespace Utils {
    export function log(msg: string): void {
      console.log(`[LOG]: ${msg}`);
    }

    export function error(msg: string): void {
      console.error(`[ERROR]: ${msg}`);
    }
  }

  export namespace Models {
    export interface User {
      id: number;
      name: string;
      email: string;
    }

    export class UserService {
      getUser(id: number): User {
        return { id:1, name: "John Doe", email: "john@example.com" };
      }
    }
  }
}

// Using nested namespaces
App.Utils.log("Application starting");

const userService = new App.Models.UserService();
const s1 = userService.getUser(1);

App.Utils.log(`User loaded: ${s1.name}`);