import express, { Request, Response } from "express";
import Tasks from "../database/models/tasks.model";

export interface User {
    id?: number;
    email: string;
    name: string;
    surname: string;
    password: string;
    salt: string;
    sessionToken: string | null;
}

export interface Task {
    id?: number;
    userId: number;
    creatorId: number;
    isDone: number;
    description: string;
}

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
}
export const createTask = async (req: Request, res: Response) => {
    const { userId } = res.locals.jwt;
    const {description} = req.body;

    const newTask: Task = {
        userId,
        creatorId: userId,
        description,
        isDone: 0,
    }

    try {
        await Tasks.createTask(newTask);
        return res.status(200).json({ message: 'Task created successfully' });
    } catch (err){
        return res.status(500).send({message: "Error occurred while creating task"})

    }
}
export const getTask = async (req: Request, res: Response) => {
    const taskId = parseInt(req.params.id);

    try {
        const task = await Tasks.getTaskById(1);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(200).json(task);

    } catch (err){
        console.error('Error getting task:', err);
        return res.status(500).json({ message: 'Internal Server Error' });

    }
}
export const getAllTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await Tasks.getAllTasks();

        res.status(200).json({ tasks });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};