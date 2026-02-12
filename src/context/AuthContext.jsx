import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return !!storedUser;
    });

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Check if user is valid/token expired could go here
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            // Optional: Validate token
            setUser(parsedUser);
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await api.post('/auth/login', { email, password });

            // Add avatar if not present (backend doesn't send it currently, we can add it or rely on UI avatar)
            if (!data.avatar) {
                data.avatar = `https://ui-avatars.com/api/?name=${data.name}&background=FF6B00&color=fff`;
            }

            setIsAuthenticated(true);
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            return data;
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed';
            throw new Error(message);
        }
    };

    const signup = async (name, email, password) => {
        try {
            const { data } = await api.post('/auth/signup', { name, email, password });

            if (!data.avatar) {
                data.avatar = `https://ui-avatars.com/api/?name=${data.name}&background=FF6B00&color=fff`;
            }

            setIsAuthenticated(true);
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            return data;
        } catch (error) {
            const message = error.response?.data?.message || 'Signup failed';
            throw new Error(message);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('renton_auth'); // Clean up old key if exists
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
