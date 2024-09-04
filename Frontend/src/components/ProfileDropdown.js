// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

// function ProfileDropdown() {
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const navigate = useNavigate();

//     const toggleDropdown = () => {
//         setDropdownOpen(!dropdownOpen);
//     };

//     const handleLogout = () => {
//         // Clear any authentication data (e.g., localStorage)
//         localStorage.removeItem('teacherId');
//         localStorage.removeItem('teacherName');
//         localStorage.removeItem('classId')
//         // Redirect to the landing page
//         navigate('/');
//     };

//     return (
//         <div className="relative">
//             <FontAwesomeIcon
//                 icon={faUserCircle}
//                 className="text-white text-3xl cursor-pointer"
//                 onClick={toggleDropdown}
//             />
//             {dropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
//                     <button
//                         onClick={handleLogout}
//                         className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
//                     >
//                         Logout
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default ProfileDropdown;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function ProfileDropdown() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        // Clear any authentication data (e.g., localStorage)
        localStorage.removeItem('teacherId');
        localStorage.removeItem('teacherName');
        localStorage.removeItem('classId');
        localStorage.removeItem('cstudentId');
        // Redirect to the landing page
        navigate('/');
    };

    return (
        <div className="relative">
            <FontAwesomeIcon
                icon={faUserCircle}
                className="text-white text-3xl cursor-pointer"
                onClick={toggleDropdown}
            />
            {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    >
                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProfileDropdown;
