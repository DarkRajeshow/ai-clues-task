import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'sonner';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ skills: [] });

    const addSkill = (skill) => {
        if (!user.first_name) {
            toast.error(`Must log in to add your skills.`)
            return;
        }
        setUser((prevState) => ({
            ...prevState,
            skills: [...prevState.skills, skill],
        }));
        toast.success(`The ${skill} is added to your skills.`)
    };

    const removeSkill = (skill) => {
        setUser((prevState) => ({
            ...prevState,
            skills: prevState.skills.filter((s) => s !== skill),
        }));
    };

    return (
        <UserContext.Provider value={{ user, setUser, addSkill, removeSkill }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};