import { randomUUID } from 'node:crypto'
import { Database } from './database.js';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const { search } = req.query;
            const users = database.select('users', search ? {
                name: search,
                email: search
            } : undefined)
            return res.end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const { name, email } = req.body;
            console.log('create user', req.body);
            const user = database.insert('users', {
                id: randomUUID(),
                name,
                email
            })
            return res.writeHead(201).end();
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            const { id } = req.params;

            database.delete('users', id)
            return res.end();
        }
    }
]