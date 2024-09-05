import React from 'react';
import logo from '../assets/logo.png';
import ProfileDropdown from './ProfileDropdown';

function Navbar() {
    return (
        <nav className="bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md p-4 flex justify-between items-center">
            <div className="flex items-center">
                <img src={logo} alt="EduTech LMS Logo" className="h-16 w-auto mr-4" />
            </div>
            <div className="flex items-center">
                <ProfileDropdown /> 
                
            </div>
        </nav>
    );
}

export default Navbar;