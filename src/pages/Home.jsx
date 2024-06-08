import { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const Home = () => {
    const [skills, setSkills] = useState([]);
    // const [displaySkills, setDisplaySkills] = useState(false);
    const [filteredSkills, setFilteredSkills] = useState([]);
    const { user, addSkill } = useContext(UserContext);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await axios.get('https://staging-api.wonderfful.com/v1/tables/all-skills');
                setSkills(response.data.data.skills);
                setFilteredSkills(response.data.data.skills);
            } catch (error) {
                console.error('Failed to fetch skills:', error);
            }
        };
        fetchSkills();
    }, []);

    const handleSearchChange = useCallback(() => {
        const tempFilteredSkills = skills.filter(skill =>
            skill.display_name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredSkills(tempFilteredSkills);
    }, [skills, search])

    // const handleFocus = () => {
    //     setDisplaySkills(true);
    // };

    // const handleBlur = () => {

    //     setTimeout(() => {
    //         setDisplaySkills(false);
    //     }, 200)
    // };


    useEffect(() => {
        handleSearchChange();
    }, [search, handleSearchChange])

    return (
        <div className='flex pt-20 sm:pt-0 sm:items-center justify-center h-screen bg-zinc-800 text-white/80'>
            <form className='bg-zinc-900/20 w-80 sm:w-96 rounded-md h-96'>
                <div className='px-4 py-4'>
                    <input
                        className='w-full focus:bg-zinc-700/20 outline-none py-2 px-4 rounded-md focus:border-b border-b-gray-200/20 bg-zinc-900/40'
                        type="text"
                        placeholder="Search for skills..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    // onFocus={handleFocus}
                    // onBlur={handleBlur}
                    />
                </div>
                <ul className='my-1 px-2 rounded-md h-60 overflow-auto flex flex-col gap-1'>
                    {filteredSkills.map(skill => {
                        if (!user.skills.includes(skill.display_name)) {
                            return (
                                <li className='cursor-pointer rounded-md px-4 py-1 bg-zinc-600/10 hover:bg-blue-200/5 mx-2' key={skill.display_name} onClick={() => {
                                    addSkill(skill.display_name);
                                    setSearch("");
                                }}>{skill.display_name}</li>
                            )
                        }
                    })}
                    {
                        filteredSkills.length === 0 && 
                        (
                            <div className='flex items-center justify-center w-full h-full'>
                                <span className='text-white text-sm w-52 text-center'>No skills found with <span className='text-blue-400 font-semibold'>{search}</span>.</span>
                            </div>
                        )
                    }
                </ul>
            </form>

        </div>
    );
};

export default Home;
