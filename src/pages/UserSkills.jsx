import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const UserSkills = () => {
    const { user, removeSkill } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.first_name) {
            console.log(user);
            toast.warning("Login to view this page.");
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className='bg-zinc-800 h-screen flex items-center justify-center'>
            <div className='flex flex-col text-white/90 h-80 sm:h-96 p-2 pb-6 sm:p-6 w-80 sm:w-[500px] rounded-md bg-zinc-900/40 backdrop-blur-md'>
                <h1 className='font-semibold text-base sm:text-xl my-2 mx-2'>Your Skills</h1>

                <div className='overflow-auto px-2 h-full'>
                    <ul className='flex flex-col gap-1.5'>
                        {user.skills.map((skill, index) => (
                            <li key={index} className='flex bg-zinc-800 py-2.5 px-3 rounded-md text-sm sm:text-base sm:font-semibold'>
                                <span className='w-4'>{index + 1}.</span>
                                <div className='flex justify-between w-full'>
                                    <span className='text-blue-200'>{skill}</span>
                                    <button className='text-xs sm:text-sm text-red-500' onClick={() => removeSkill(skill)}>Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {
                        user.skills.length === 0 && (
                            <div className='flex items-center justify-center h-full w-full bg-zinc-600/10 rounded-md flex-col gap-1'>
                                <span>No skills are added.</span>
                                <Link className='text-blue-400 hover:text-blue-500 text-sm font-semibold' to={"/"}>Add skills here!</Link>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default UserSkills;
