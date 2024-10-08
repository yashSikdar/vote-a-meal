'use client'; // Mark only the client-side part
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'; // Import the useAuth hook

function NavBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth(); // Get the login state and logout function

  const linkClasses = (path: string) =>
    pathname === path
      ? 'text-white bg-blue-500 hover:bg-blue-600 rounded px-3 py-2'
      : 'text-gray-300 hover:text-white rounded px-3 py-2';

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="bg-gray-800 p-4 sticky top-0 z-50">
      <nav className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex justify-between items-center w-full md:w-auto">
          <div className="text-white text-lg px-3 py-2"><Link href="/">VOTE YOUR MEAL</Link></div>
          <button
            className="text-white md:hidden"
            onClick={toggleMenu}
          >
            ☰
          </button>
        </div>
        <ul className={`flex flex-col md:flex-row md:space-x-4 ${isOpen ? 'block' : 'hidden'} md:flex md:items-center md:justify-center w-full md:w-auto`}>
          <li><Link href="/" className={linkClasses('/')} onClick={closeMenu}>Home</Link></li>
          {isLoggedIn ? (
            <>
              <li><Link href="/employee/add" className={linkClasses('/employee/add')} onClick={closeMenu}>Add New Employee</Link></li>
              <li><Link href="/restaurant/add" className={linkClasses('/restaurant/add')} onClick={closeMenu}>Add New Restaurant</Link></li>
              <li><Link href="/employee/get" className={linkClasses('/employee/get')} onClick={closeMenu}>Employee List</Link></li>
              <li><Link href="/restaurant/get" className={linkClasses('/restaurant/get')} onClick={closeMenu}>Restaurant List</Link></li>
              <li><Link href="/vote/get_all" className={linkClasses('/vote/get_all')} onClick={closeMenu}>Vote List</Link></li>
              <li><Link href="/vote" className={linkClasses('/vote')} onClick={closeMenu}>Vote</Link></li>
              <li><button onClick={() => { logout(); closeMenu(); }} className="text-gray-300 hover:text-white rounded px-3 py-2">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link href="/vote" className={linkClasses('/vote')} onClick={closeMenu}>Vote</Link></li>
              <li><Link href="/auth" className={linkClasses('/auth')} onClick={closeMenu}>Admin Login</Link></li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;