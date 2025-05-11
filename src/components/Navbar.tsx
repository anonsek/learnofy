"use client"
import { useState } from 'react';
import Link from 'next/link';
import ModeToggle from './ModeToggle';
import { Button } from './ui/button';
import { signOut } from 'next-auth/react';

const Navbar = ({ user }) => {
  console.log("🚀 ~ Navbar ~ user:", user)
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLinkClick = () => setIsOpen(false);

  return (
    <div className="navbar">
      <h1 className="logo">LEARNOFY</h1>

      <div className="nav_menu">
        <ul className={`menus ${isOpen ? 'active' : ''}`}>
          <Link href="/" passHref>
            <li onClick={handleLinkClick}>Home</li>
          </Link>
          <Link href="/blog" passHref>
            <li onClick={handleLinkClick}>Blogs</li>
          </Link>
          <Link href="/courses" passHref>
            <li onClick={handleLinkClick}>Courses</li>
          </Link>
          <Link href="/profile" passHref>
            <li onClick={handleLinkClick}>Profile</li>
          </Link>
          {
            user && user.role === 'admin' && (
              <Link href="/dashboard" passHref>
                <li onClick={handleLinkClick}>Admin</li>
              </Link>
            )
          }
          { user && <li onClick={() => signOut()}>Logout</li> }

        </ul>
        <div className="mode_btn">
          <ModeToggle />
          <Button className="toggle hammer" onClick={toggleMenu}>
            &#8801;
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
