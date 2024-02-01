import { Model } from "objection";
import knex from "../config/database";
import Tasks from "./tasks.model";
import { User } from "./types";
import {authentication} from "../../helpers";

Model.knex(knex);
enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
class Users extends Model implements User {
  id: number;
  email: string;
  name: string;
  surname: string;
  password: string;
  salt: string;
  sessionToken: string | null;
  role: UserRole;

  static get Streets() {
    return {
      required: [
        "id",
        "email",
        "name",
        "surname",
        "password",
        "salt",
        "sessionToken",
        "role"
      ],
      properties: {
        id: { type: "integer" },
        email: { type: "string", length: 50 },
        name: { type: "string", length: 20 },
        surname: { type: "string", length: 30 },
        password: { type: "string", length: 255 },
        salt: { type: "string", length: 255 },
        sessionToken: { type: "string", length: 255 },
        role: { type: "string", enum: Object.values(UserRole) },
      },
    };
  }

  static get relationMappings() {
    return {
      tasks: {
        relation: Model.HasManyRelation,
        modelClass: Tasks,
        join: {
          from: "users.id",
          to: "tasks.userId",
        },
      },
    };
  }

  static get tableName(): string {
    return "users";
  }

  static async getUserByEmail(email: string): Promise<Users | null> {
    try {
      const user = await Users.query().where("email", email).first();
      return user || null;
    } catch (error) {
      console.error("Error getting user by email:", error);
      return null;
    }
  }

  static async getHashedPassword(email: string): Promise<string | null> {
    try {
      const user = await Users.query()
        .where("email", email)
        .select("password", "salt")
        .first();

      if (user) {
        return user.password;
      }

      return null;
    } catch (error) {
      console.error("Error getting hashed password by email:", error);
      return null;
    }
  }

  static async updateSessionToken(
    user: Users,
    sessionToken: string
  ): Promise<void> {
    try {
      await Users.query().findById(user.id).patch({ sessionToken });
    } catch (error) {
      console.error("Error updating session token:", error);
      throw error;
    }
  }
  static async createUser(User: User): Promise<void> {
    try {
      await Users.query().insert({...User, password: authentication(User.salt, User.password),});
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
}

export default Users;
