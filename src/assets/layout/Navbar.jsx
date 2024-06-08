import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Navbar = () => {
    const { user, setUser } = useContext(UserContext);

    const isAuthenticated = user.first_name ? true : false;
    const location = useLocation();

    return (
        <nav className="bg-zinc-800 backdrop-blur-md border-b-2 border-b-white/40">
            <div className="sm:text-base text-sm  container mx-auto px-4 py-5 font-semibold">
                <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                        <Link to="/" className={`text-white hover:text-blue-200 ${location.pathname == '/' && 'border-b-2 border-b-white'}`}>
                            Home
                        </Link>
                        <Link to="/skills" className={`text-white hover:text-blue-200 ${location.pathname == '/skills' && 'border-b-2 border-b-white'}`}>
                            Skills
                        </Link>
                    </div>
                    <div className="flex space-x-4">
                        {isAuthenticated ? (
                            <>
                                <p className="text-white flex items-center justify-center gap-0.5 sm:gap-1 bg-zinc-100/20 px-2 sm:px-3 py-0.5 sm:py-1 rounded-md shadow-[3px_3px_0_0] shadow-white hover:shadow-none transition-all cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 sm:size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                    <span className='font-normal'> {user.first_name + " " + user.last_name}</span>
                                </p>
                                <button className="bg-red-300 text-black px-2 py-1 rounded-md shadow-[3px_3px_0_0] shadow-white hover:shadow-nones" onClick={() => { setUser({ skills: [] }) }}>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className={`bg-blue-300 text-black py-1 px-2 rounded-md shadow-[3px_3px_0_0] shadow-white hover:shadow-none transition-all`}>
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
