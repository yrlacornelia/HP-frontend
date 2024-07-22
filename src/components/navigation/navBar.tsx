'use client'
import Link from "next/link";
import Image from 'next/image'
import { arapey } from "@/app/(home)/fonts";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";
import { fetchCsrfToken } from "@/app/utils/api";
const NavBar = () => {
    const navigation = usePathname();
    const isHomePage = navigation === '/';
    const backgroundClass = isHomePage ? "bg-hpbg h-screen" : "bg-gray-dark";
    const overlayStyle = isHomePage ? "position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1" : "";
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        const getCsrfToken = async () => {
            const token = await fetchCsrfToken();
            setCsrfToken(token);
        };
        getCsrfToken();
    }, []);
    const handleLogout = async (event:any) => {
        event.preventDefault;
        console.log('Initiating logout process...');
        try {
            const response = await fetch('http://localhost:8080/logout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'X-CSRF-TOKEN': csrfToken
                }
            });
    
            if (response.ok) {
                console.log('Logout successful.');
                setCsrfToken('');
                window.location.href = '/';
            } else {
                console.error('Logout failed:', response.statusText);
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
    

    return (
        <div className={`text-yellow-light ${backgroundClass}`} style={{ fontFamily: arapey.className }}>
            {isHomePage && <div className={`absolute inset-0 bg-opacity-60 bg-black ${overlayStyle}`}  ></div>}
            <ul className="flex justify-between items-center p-10 relative z-10">
                <li>
                    <Link href={"/"}>Home</Link>
                </li>
                <li>
                    <Link href={"/shop"}>Shop</Link>
                </li>
                <li className="flex flex-col items-center">
                    <Image width={100} height={100} src={'/images/logo.png'} alt="Picture of the author" />
                    <p>Hogwarts</p><p>School of Witchcraft and Wizardry</p>
                </li>
                <li>
                    <Link href={"/chat"}>Community</Link>
                </li>
                <li className="relative group text-black">
            <div className="flex items-center cursor-pointer">
                <svg className="border rounded-full p-1" width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8 7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7C16 8.06087 15.5786 9.07828 14.8284 9.82843C14.0783 10.5786 13.0609 11 12 11C10.9391 11 9.92172 10.5786 9.17157 9.82843C8.42143 9.07828 8 8.06087 8 7ZM8 13C6.67392 13 5.40215 13.5268 4.46447 14.4645C3.52678 15.4021 3 16.6739 3 18C3 18.7956 3.31607 19.5587 3.87868 20.1213C4.44129 20.6839 5.20435 21 6 21H18C18.7956 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7956 21 18C21 16.6739 20.4732 15.4021 19.5355 14.4645C18.5979 13.5268 17.3261 13 16 13H8Z" fill="white" />
                </svg>
            </div>
            <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:scale-100 transform scale-95 transition-opacity duration-150 ease-in-out">
                <li className="px-4 py-2 hover:bg-gray-100">
                <Link href="/profile">
                        <p>Settings</p>
                    </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                <button onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </li>
            </ul>
        </div>
    );
};

export default NavBar;