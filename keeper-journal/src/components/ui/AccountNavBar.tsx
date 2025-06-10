import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteCookies } from "../../lib/accountutils";

interface AccountNavBarProps {
    username: string;
}

export default function AccountNavBar({ username }: AccountNavBarProps) {

    const [dropDown, setDropdown] = useState(<></>);

    const dropDownElement = 
        <div className="absolute right-6 top-20 bg-white shadow-lg rounded-md p-3"  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <ul>
                <Link to={"/settings"}>
                    <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer transition-all rounded-md">Settings</li>
                </Link>
                <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer transition-all rounded-md text-red-500" onClick={deleteCookies}>Sign Out</li>
            </ul>
        </div>;

    function handleMouseEnter() {
        setDropdown(dropDownElement);
    }
    
    function handleMouseLeave() {
        setDropdown(<></>);
    }
    return (
        <>
            <div className="fixed w-full h-20 shadow items-center flex bg-white z-100">
                <div className='navbar-title text-4xl font-serif text-black font-bold absolute left-6'>
                    <Link to="/">
                    Keeper Journal
                    </Link>
                </div>
                <div className="bg-white pr-2 h-20 flex items-center absolute right-6 hover:bg-gray-300 pl-5 transition-all" onMouseLeave={handleMouseLeave}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="40" height="40"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>
                    <h1 className="pl-4 font-mono text-xl">{username}</h1>
                    <div className="relative group ml-4">
                    <button className="flex items-center focus:outline-none" onMouseEnter={handleMouseEnter}>
                        <svg
                            className="transition-transform duration-200 transform group-hover:rotate-180"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M7 10l5 5 5-5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    </div>
                </div>
                {dropDown}
            </div>
        </>
    )
}