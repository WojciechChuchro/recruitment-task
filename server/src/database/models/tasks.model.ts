import {Model} from 'objection';
import knex from '../config/database';
import Users from "./users.model";
import {Task} from "../../controllers/tasks";

Model.knex(knex);

class Tasks extends Model implements Task {
    id: number;
    userId: number;
    creatorId: number;
    isDone: number;
    description: string;

    static get Streets() {
        return {
            required: ['id', 'userId', 'isDone', 'description', 'creatorId'],
            properties: {
                id: { type: 'integer' },
                userId: { type: 'integer' },
                creatorId: { type: 'integer' },
                isDone: {type: 'boolean' },
                description: { type: 'string', length: 50 },
            },
        };
    }

    static get relationMappings() {
        return {
            creator: {
                relation: Model.BelongsToOneRelation,
                modelClass: Users,
                join: {
                    from: 'tasks.userId',
                    to: 'users.id',
                },
            },
            users: {
                relation: Model.HasManyRelation,
                modelClass: Users,
                join: {
                    from: 'tasks.userId',
                    to: 'users.id',
                },
            },


        };
    }

    static get tableName(): string {
        return 'tasks';
    }

    static async createTask(Task: Task) {
        try {
            await Tasks.query().insert(Task);
        } catch (error) {
            console.error('Error creating task:', error);
            throw error;
        }
    }

    static async getTaskById(id: number): Promise<Task>{
        try {
            return await Tasks.query().findById(id);
        } catch (error) {
            console.error('Error getting task:', error);
            throw error;
        }
    }
    static async getAllTasks(): Promise<Tasks[]> {
        try {
            return await Tasks.query();
        } catch (error) {
            console.error('Error getting all tasks:', error);
            throw error;
        }
    }
}

export default Tasks;
