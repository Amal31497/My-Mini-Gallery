import axios from 'axios';

const signup = (user) => axios.post('/api/users', user);
const login = (user) => axios.post('/api/login', user);

export {
    signup,
    login
}