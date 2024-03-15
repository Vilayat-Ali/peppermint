"use client";

// lib
import Link from 'next/link';
import Image from 'next/image';

// components
import WalletConnectionProvider from '@/web3/WalletConnectionProvider';
import { Button } from './ui/button';
import {Avatar, AvatarFallback, AvatarImage} from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// hooks
import useToggle from "@/hooks/useToggle";

// assets
import Logo from "@/assets/logo.png";

// icons
import { MdMenu, MdClose } from "react-icons/md";
import { RiWallet3Fill } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";



type MenuItem = {
    title: string;
    href: string;
}

const menuItems: MenuItem[] = [
    {
        title: 'Shop',
        href: '/shop'
    },
    {
        title: 'Mint',
        href: '/mint'
    },
    {
        title: 'Fav',
        href: '/favorites'
    }
];

const Navbar = () => {
    const [isMobileMenuOpen, toggleMobileMenu] = useToggle();
    const isAuthenticated: boolean = false;

    const handleLogout = () => console.log("logout")

    const treatWalletAddress = (walletAddress: string, visibleCount: number = 4): string => {
        return `${walletAddress.slice(0, visibleCount)}...${walletAddress.slice(walletAddress.length - visibleCount, walletAddress.length)}`;
    }

  return (
    <WalletConnectionProvider>
        <div className="flex flex-row justify-between items-center w-[100vw] h-[6vh] md:h-[8vh] px-[6vw] md:px-[2vw] shadow" onContextMenu={(e) => e.preventDefault()}>
            {/* Logo */}
            <Image className="w-[15vw] md:w-[4vw] h-[15vw] md:h-[4vw] py-[1vw] md:py-0 object-cover" src={Logo.src} width={100} height={100} alt="Peppermint-logo" />
            {/* Logo */}

            {/* Desktop Menubar */}
                {/* Desktop Menu */}
                <div className={`${isAuthenticated ? "flex" : "hidden"} flex-row items-center`}>
                    {
                        menuItems.map((item: MenuItem) => (
                            <Link className='ml-2' href={item.href} key={item.href}>
                                {item.title}
                            </Link>
                        ))
                    }
                </div>
                {/* Desktop Menu */}

                {/* Authentication Button */}
                {
                    !isAuthenticated ? (
                        <Button className="flex flex-row justify-center items-center px-2 py-6 bg-black rounded shadow cursor-pointer hover:bg-gray-700 text-white">
                            <RiWallet3Fill className='text-4xl'/>
                            <p className="ml-2 text-md">Connect Wallet</p>
                        </Button>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="flex flex-row justify-start items-center">
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>
                                            <CgProfile className="text-2xl" />
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="px-2 py-1 rounded-full bg-black text-white ml-2 cursor-pointer">{treatWalletAddress("0x123456789012334567890", 5)}</div>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[10vw] -ml-[2vw] mt-[1.2vh] text-4xl">
                                <Link href="/profile">
                                    <DropdownMenuItem className="cursor-pointer">
                                        <div className="flex flex-row justify-start items-center w-[100%]">
                                            <CgProfile />
                                            <p className="ml-2">Profile</p>
                                        </div>
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                                    <div className="flex flex-row justify-start items-center w-[100%] text-red-800">
                                        <IoIosLogOut />
                                        <p className="ml-2">Logout</p>
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
                }
            {/* Authentication Button */}
            {/* Desktop Menubar */}

            {/* Hamburger */}
            <div className="block md:hidden text-3xl" onClick={toggleMobileMenu}>
                { !isMobileMenuOpen ? <MdMenu /> : <MdClose /> }
            </div>
            {/* Hamburger */}

        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden flex-col w-[100vw]">
            {
                isMobileMenuOpen && menuItems.map((item: MenuItem) => (
                    <Link className='w-[100%] px-[6vw] py-[3vw] bg-black text-white' href={item.href} key={item.href}>
                        {item.title}
                    </Link>
                ))
            }
        </div>
        {/* Mobile Menu */}
    </WalletConnectionProvider>
  )
}

export default Navbar