"use client";

import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

// components
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';

// hooks
import useToggle from "@/hooks/useToggle";

// icons
import { CiSearch } from "react-icons/ci";
import { MdMenu, MdClose } from "react-icons/md";

// assets
import Logo from "@/assets/vercel.svg";

interface MenuItem {
  title: string;
  href: string;
}

const MenuItems: MenuItem[] = [
  {
    title: "Explore",
    href: "/explore"
  },
  {
    title: "My NFTs",
    href: "/my-nfts"
  },
  {
    title: "Following",
    href: "/following"
  }
];

const Navbar = () => {
  const [isMenuOpen, toggleMenu] = useToggle(false);

  return (
    <>
      <div className='flex flex-row justify-between items-center px-[4vw] py-[3vw] md:py-[1vw]'>
        {/* Logo */}
        <Image className="" src={Logo.src} width={100} height={100} alt="Logo" />
        {/* Logo */}

        {/* Search Bar */}
          <div className='hidden md:flex flex-row justify-start items-center bg-[#1B1A21] px-2 w-[50vw] min-w-[10vw] rounded'>
            <CiSearch className="text-2xl font-bold text-white" />
            <Input placeholder='Search NFTs Here' />
          </div>
        {/* Search Bar */}

        {/* Desktop Menu */}
          <div className='hidden md:flex flex-row justify-between items-center min-w-[15vw] mx-[2vw]'>
              {
                MenuItems.map(({title, href}: MenuItem) => (
                  <Link className='font-semibold text-gray-400 hover:text-white' href={href} key={href}>
                    {title}
                  </Link>
                ))
              }
          </div>
        {/* Desktop Menu */}

        {/* Action Buttons */}
        <Button className="hidden md:block">Mint NFT</Button>
        
        <div className="hidden md:flex flex-row justify-center items-center w-40 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded cursor-pointer">
          <div className="flex flex-row justify-center items-center w-[96%] h-[85%] bg-[#24252D] rounded">
            <p className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">Connect Wallet</p>
          </div>
        </div>
        {/* Action Buttons */}

        {/* Menu Button */}
        <div className="block md:hidden text-3xl" onClick={toggleMenu}>
            {
              isMenuOpen ? <MdClose /> : <MdMenu />
            }
        </div>
        {/* Menu Button */}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="flex md:hidden flex-col justify-start items-start w-[100vw] bg-white">
          {
            MenuItems.map(({title, href}: MenuItem) => (
              <Link className='font-semibold text-gray-400 hover:text-white p-2' href={href} key={href}>
                <p className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">{title}</p>
              </Link>
            ))
          }
        </div>
      )}
      {/* Mobile Menu */}
    </>
  )
}

export default Navbar