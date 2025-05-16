import React from 'react';
import { FaShieldAlt, FaHome, FaClipboardList, FaExclamationTriangle, FaCog } from 'react-icons/fa';
import Link from 'next/link';

function Navbar() {
    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-[#1a1f2c] to-[#2c3e50] text-white shadow-lg border-b-2 border-[#00ff9d]">
            <div className="flex items-center gap-3">
                <FaShieldAlt className="text-2xl text-[#00ff9d]" />
                <span className="text-2xl font-bold tracking-wider bg-gradient-to-r from-[#3cdb9e] to-[#00ff9d] bg-clip-text text-transparent">
                    SIEM Dashboard
                </span>
            </div>
            <ul className="flex gap-6 list-none m-0 p-0">
                <li>
                    <Link href="/" className="flex items-center gap-2 text-white no-underline text-base px-3 py-2 rounded transition-all duration-300 ease-in-out hover:bg-[#00ff9d]/10 hover:-translate-y-0.5">
                        <FaHome className="text-base text-[#00ff9d]" />
                        <span className='font-semibold'>Home</span>
                    </Link>
                </li>
                <li>
                    <Link href="/pages/logs" className="flex items-center gap-2 text-white no-underline text-base px-3 py-2 rounded transition-all duration-300 ease-in-out hover:bg-[#00ff9d]/10 hover:-translate-y-0.5">
                        <FaClipboardList className="text-base text-[#00ff9d]" />
                        <span className='font-semibold'>Logs</span>
                    </Link>
                </li>
                <li>
                    <Link href="/pages/threats" className="flex items-center gap-2 text-white no-underline text-base px-3 py-2 rounded transition-all duration-300 ease-in-out hover:bg-[#00ff9d]/10 hover:-translate-y-0.5">
                        <FaExclamationTriangle className="text-base text-[#00ff9d]" />
                        <span className='font-semibold'>System Health</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
