// import PropTypes from 'prop-types'; // Import PropTypes for validation
// import { createContext, useState } from 'react';

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//     const [user, setUser] = useState(null);

//     return (
//         <UserContext.Provider value={{ user, setUser }}>
//             {children}
//         </UserContext.Provider>
//     );
// };

// // Add propTypes validation for 'children'
// UserProvider.propTypes = {
//     children: PropTypes.node.isRequired,  // Ensures that 'children' is a valid React node
// };

// export default UserContext;


import PropTypes from "prop-types";
import { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Add propTypes validation for 'children'
UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UserContext;
