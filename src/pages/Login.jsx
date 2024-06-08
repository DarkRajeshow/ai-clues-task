import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://staging-api.wonderfful.com/v1/rest-auth/login', {
                email,
                password,
            });
            setUser({
                ...response.data.data.user,
                skills: []
            }); // Assuming the response contains user data
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className=' bg-zinc-800 h-screen flex items-center justify-center'>
            <form onSubmit={handleLogin} className='flex flex-col gap-4 w-80 sm:w-96 px-4 py-8 backdrop-blur-md shadow-md bg-zinc-900/20 rounded-md'>
                <div className='flex flex-col justify-center gap-2 '>
                    <label className='text-white/70 font-semibold'>Enter Email</label>
                    <input
                        className='bg-zinc-900/40 text-white placeholder:text-zinc-600 rounded-md outline-none focus:bg-zinc-700/60 py-2 px-4'
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='flex flex-col justify-center gap-2'>
                    <label className='text-white/70 font-semibold'>Enter password</label>
                    <input
                        className='bg-zinc-900/40 text-white placeholder:text-zinc-600 rounded-md outline-none focus:bg-zinc-700/60 py-2 px-4'
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className='bg-green-500 hover:bg-green-600 rounded-md my-2 py-2 font-semibold' type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
