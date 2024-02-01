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
            user: {
                relation: Model.BelongsToOneRelation,
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
}

export default Tasks;
