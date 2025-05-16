import React, { useState, useEffect } from 'react';
import { FaShieldAlt, FaHome, FaClipboardList, FaExclamationTriangle, FaBars } from 'react-icons/fa';
import Link from 'next/link';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLaptop, setIsLaptop] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsLaptop(window.innerWidth <= 1366); // Common laptop width
        };
        
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <nav className="relative flex flex-wrap justify-between items-center px-3 sm:px-4 lg:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#1a1f2c] to-[#2c3e50] text-white shadow-lg border-b-2 border-[#00ff9d]">
            <div className="flex items-center gap-1.5 sm:gap-2">
                <FaShieldAlt className="text-lg sm:text-xl lg:text-2xl text-[#00ff9d]" />
                <span className="text-base sm:text-lg lg:text-xl font-bold tracking-wider bg-gradient-to-r from-[#3cdb9e] to-[#00ff9d] bg-clip-text text-transparent">
                    SIEM Dashboard
                </span>
            </div>

            {/* Mobile/Laptop menu button */}
            <button 
                className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-[#00ff9d]/10"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <FaBars className="text-[#00ff9d] text-lg sm:text-xl" />
            </button>

            {/* Navigation links */}
            <ul className={`
                ${isMenuOpen ? 'flex' : 'hidden'} 
                lg:flex flex-col lg:flex-row
                absolute lg:relative
                top-full left-0
                w-full lg:w-auto
                mt-1 lg:mt-0
                bg-[#1a1f2c] lg:bg-transparent
                border-b lg:border-0 border-[#00ff9d]/20
                lg:gap-3 xl:gap-6 
                list-none m-0 p-0
                lg:items-center
                ${isLaptop ? 'text-sm' : 'text-base'}
            `}>
                <li className="w-full lg:w-auto">
                    <Link href="/" 
                        className="flex items-center gap-1.5 sm:gap-2 text-white no-underline text-xs sm:text-sm lg:text-base px-2 sm:px-3 py-1.5 sm:py-2 rounded transition-all duration-300 ease-in-out hover:bg-[#00ff9d]/10 hover:-translate-y-0.5"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <FaHome className="text-xs sm:text-sm lg:text-base text-[#00ff9d]" />
                        <span className='font-semibold'>Home</span>
                    </Link>
                </li>
                <li className="w-full lg:w-auto">
                    <Link href="/pages/logs" 
                        className="flex items-center gap-1.5 sm:gap-2 text-white no-underline text-xs sm:text-sm lg:text-base px-2 sm:px-3 py-1.5 sm:py-2 rounded transition-all duration-300 ease-in-out hover:bg-[#00ff9d]/10 hover:-translate-y-0.5"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <FaClipboardList className="text-xs sm:text-sm lg:text-base text-[#00ff9d]" />
                        <span className='font-semibold'>Logs</span>
                    </Link>
                </li>
                <li className="w-full lg:w-auto">
                    <Link href="/pages/threats" 
                        className="flex items-center gap-1.5 sm:gap-2 text-white no-underline text-xs sm:text-sm lg:text-base px-2 sm:px-3 py-1.5 sm:py-2 rounded transition-all duration-300 ease-in-out hover:bg-[#00ff9d]/10 hover:-translate-y-0.5"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <FaExclamationTriangle className="text-xs sm:text-sm lg:text-base text-[#00ff9d]" />
                        <span className='font-semibold'>System Health</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
