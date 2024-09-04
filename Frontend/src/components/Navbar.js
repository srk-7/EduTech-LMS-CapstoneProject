import React from 'react';
import logo from '../assets/logo.png'; // Main logo
import ProfileDropdown from './ProfileDropdown'; // Import the ProfileDropdown component

function Navbar() {
    return (
        <nav className="bg-blue-400 p-4 flex justify-between items-center">
            <div className="flex-grow text-center">
                <img src={logo} alt="EduTech LMS Logo" className="h-16 inline-block" />
            </div>
            <ProfileDropdown /> {/* Replace the user icon with the ProfileDropdown component */}
        </nav>
    );
}

export default Navbar;


// import React from 'react';
// import logo from '../assets/logo.png'; // Main logo
// import ProfileDropdown from './ProfileDropdown'; // Import the ProfileDropdown component

// function Navbar() {
//     return (
//         <nav className="bg-gradient-to-r from-beige-300 to-beige-500 p-4 flex justify-between items-center shadow-lg">
//             <div className="flex items-center space-x-4">
//                 <img src={logo} alt="EduTech LMS Logo" className="h-14 w-14 rounded-full shadow-md transition-transform transform hover:scale-110 hover:rotate-6 duration-300" />
//                 <h1 className="text-beige-900 font-bold text-2xl tracking-wide">EduTech LMS</h1>
//             </div>
//             <ProfileDropdown /> {/* Replace the user icon with the ProfileDropdown component */}
//         </nav>
//     );
// }

// export default Navbar;
