import { Model } from 'objection';
import knex from '../config/database';
import Users from "./users.model";

Model.knex(knex);

class Tasks extends Model {
    static get Streets() {
        return {
            required: ['id', 'userId', 'isDone', 'description'],
            properties: {
                id: { type: 'integer' },
                userId: { type: 'integer' },
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
