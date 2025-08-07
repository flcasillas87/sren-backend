import { fetchUsers } from '../services/userService.js';
export async function getUsers(req, res) {
    try {
        const users = await fetchUsers();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Error obteniendo usuarios' });
    }
}
