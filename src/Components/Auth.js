import Cookies from 'js-cookie';
import axios from 'axios';

const auth = async () => {
    try {
        const token = Cookies.get('authToken');

        if (!token) {
            throw new Error('Auth token not found');
        }

        const response = await axios.get(`http://localhost:4000/api/auth/${token}`);

        return response.data.userType;

    } catch (error) {
        console.error('Error in auth function:', error.message);
    }
};

export default auth;
