import { Knex } from 'knex';
import { faker } from '@faker-js/faker';
import {UserRole} from "../../controllers/tasks";
import {User} from "../models/users.model";

export async function seed(knex: Knex): Promise<void> {
  const users: User[] = [];

  users.push({
    email: "admin@gmail.com",
    name: "admin",
    surname: "admin",
    role: UserRole.ADMIN,
    password: '6770ab7146ab13bc54e8b9f940151bfd6452fd52cfbf20e542239b14755985be',
    salt: 'T5JIHi2UoE1j8padWRG6Ar4omfviDhJ8oQXDu1AqYbR9T/Y9sgkSoajdAliccQ4WfV0dyzAl4YLOK6FE4Hb0daOkTchjZE6VeJMylUPkKDcuba6BADs2vODZH+USNvpgG49OvtIKEOWi6gJOqWWZ4b/vSmoQ57IyOa5AqVJKhWk=',
    sessionToken: null,
  })

  users.push({
    email: "user@gmail.com",
    name: "user",
    surname: "user",
    role: UserRole.USER,
    password: '7613e59e870c07a7ecf9704eeb5eb12c278a0d9d8822ddb6710b17fe65098731',
    salt: 'yCCaB3DiWQntndlvZDtYYX9lhQQGobKRbsQGqsfrWCX6lTjOl4OzfZn7df5Udr6JfCYXovk4ZMpVT8xVavVEz4gWQIC8MLq2EkyF7XWxtb+oEhuJNIikPIfhp7tIMCHt2tno6fY40tMHBJTHi5o2y4h2ihF+myU0wGYCxwBHdb0=',
    sessionToken: null,
  })

  await knex('users').del();
  await knex('users').insert(users);
}
