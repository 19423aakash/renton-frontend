import React, { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux'; // Assuming token in auth slice

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/users`, {
                method: 'GET',
                // In protected routes, browser usually sends cookies automatically if configured.
                // Otherwise we might need to attach Authorization header if using Bearer token strategy alongside cookies?
                // The backend 'protect' middleware checks req.cookies.jwt. So automatic.
            });
            const data = await response.json();
            if (response.ok) {
                setUsers(data);
            }
        } catch (error) {
            console.error('Failed to fetch users', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/users/${id}`, { method: 'DELETE' });
            if (response.ok) {
                setUsers(users.filter(user => user._id !== id));
            }
        } catch (error) {
            console.error('Failed to delete user', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Manage Users</h2>
            <div className="bg-dark-900 border border-white/5 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-gray-400">
                    <thead className="bg-white/5 text-white uppercase text-sm">
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Joined</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {users.map(user => (
                            <tr key={user._id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 font-bold text-white">{user.name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${user.role === 'admin' ? 'bg-brand-orange/20 text-brand-orange' : 'bg-blue-500/20 text-blue-500'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4">
                                    <button onClick={() => deleteUser(user._id)} className="text-red-500 hover:text-red-400">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;
