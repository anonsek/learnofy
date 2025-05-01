"use client";
import { useState } from 'react';
import Link from 'next/link';
import ModeToggle from './ModeToggle';
import { Button } from './ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Start closed

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false); // Close the navbar when a link is clicked
  };

  return (
    <div className="navbar">
      <h1 className="logo">LEARNOFY</h1>
      
      <div className={`nav_menu`}>
        <ul className={`menus ${isOpen ? 'active' : ''}`}>
          <Link href="./" passHref>
            <li onClick={handleLinkClick}>Home</li>
          </Link>
          <Link href="../blog" passHref>
            <li onClick={handleLinkClick}>Blogs</li>
          </Link>
          <Link href="../courses" passHref>
            <li onClick={handleLinkClick}>Courses</li>
          </Link>
          <Link href="../dashboard" passHref>
            <li onClick={handleLinkClick}>Admin</li>
          </Link>
        </ul>
        <div className='mode_btn'>
          <ModeToggle />
          <Button className="toggle hammer" onClick={toggleMenu}>&#8801;</Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
