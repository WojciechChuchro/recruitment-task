import {NextFunction, Request, Response} from "express";
import Users from "../database/models/users.model";
import {authentication, generateSessionToken, random} from "../helpers";
import jwt from "jsonwebtoken";
import Tasks from "../database/models/tasks.model";

export interface User {
  id?: number;
  email: string;
  name: string;
  surname: string;
  password: string;
  salt: string;
  sessionToken: string | null;
  role: UserRole
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user: Users = await Users.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const expectedHash = authentication(user.salt, password);

    if ((await Users.getHashedPassword(user.email)) !== expectedHash) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const sessionToken = generateSessionToken(user.id.toString());
    try {
      await Users.updateSessionToken(user, sessionToken);
    } catch (error) {
      return res.status(500).send({ message: "Internal server error" });
    }

    res.cookie("JsonWebToken", sessionToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json({ message: "login success" }).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, surname } = req.body;

    const user = await Users.getUserByEmail(email);

    if (user) {
      return res
        .status(404)
        .json({ message: "User with provided email already exists" });
    }

    const salt = random();

    const newUser: User = {
      name,
      surname,
      email,
      password,
      salt,
      sessionToken: null,
      role: UserRole.USER
    };

    try {
      await Users.createUser(newUser);

      return res.status(200).json({ message: "Register success" });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).send({ message: "Internal server error" });
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const validateJWT = (req: Request, res: Response): Response | void => {
  const { JsonWebToken } = req.cookies;

  if (!JsonWebToken) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Missing token", isValid: false });
  }

  const token: string = Array.isArray(JsonWebToken)
    ? JsonWebToken[0]
    : JsonWebToken;
  try {
    jwt.verify(token, process.env.SECRET_KEY as string);
    return res.status(200).json({ message: "Token is valid", isValid: true });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        message: "Unauthorized: Token has expired",
        isValid: false,
      });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid token", isValid: false });
    }
    return res
      .status(500)
      .json({ message: "Internal Server Error", isValid: false });
  }
};
export const validateAdministrator = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const {userId} = res.locals.jwt;
  const taskId = parseInt(req.params.id);

  try {
    const user = await Users.getUserById(userId);

    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    if (user.role != UserRole.ADMIN) {
      return res.status(403).json({message: 'Unauthorized: User is not an administrator'});
    }

    next();
  } catch (error) {
    console.error('Error validating creator:', error);
    return res.status(500).json({message: 'Internal Server Error'});
  }
};
export const validateCreator = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
  const { userId } = res.locals.jwt;
  const taskId = parseInt(req.params.id);

  try {
    const task = await Tasks.getTaskById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (parseInt(userId) !== task.creatorId) {
      return res.status(403).json({ message: 'Unauthorized: User is not the creator of the task' });
    }

    next();
  } catch (error) {
    console.error('Error validating creator:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const logout = async (
  req: Request,
  res: Response
): Promise<Response> => {
  res.cookie("JsonWebToken", "", {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json({ message: "Logged out successfully" });
};
