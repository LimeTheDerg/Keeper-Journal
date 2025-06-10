import { useCookies } from "react-cookie";
import AccountNavBar from "../components/ui/AccountNavBar";
import SideBar from "../components/ui/SideBar";
import { useEffect, useState } from "react";
import { getUser, updateUser } from "../lib/axioscontainer";
import Loading from "../components/ui/Loading";
import { createCookies } from "../lib/accountutils";

export default function UserSettings() {
    const [cookies] = useCookies(['user', 'password']);
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await getUser(cookies.user, cookies.password);
                setData({
                    firstName: response.data.first_name,
                    lastName: response.data.last_name,
                    username: response.data.username,
                    email: response.data.email,
                    password: ''
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
                document.cookie = "";
            }
        }
        fetchUserData();
    }, []);
    
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.target.name;
        const value = event.target.value;
        setData({
            ...data,
            [name]: value
        });
    }

    if (data.firstName === '' && data.lastName === '' && data.username === '' && data.email === '') {
        return (<Loading></Loading>)
    }

    else 
    return (
        <>
            <div>
                <AccountNavBar username={cookies.user}></AccountNavBar>
                <SideBar></SideBar>
            </div>
            <div className="flex justify-center items-center h-screen">
                <div className="bg-white shadow-lg rounded-lg p-6 w-1/2">
                    <h2 className="text-2xl font-bold mb-4 font-mono">User Settings</h2>
                    <div className="mb-2">
                        <div className="flex space-x-2">
                            <div className="w-1/2">
                                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    defaultValue={data.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    defaultValue={data.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-2">
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                defaultValue={data.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                defaultValue={data.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        className="bg-black hover:bg-white text-white hover:text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all border-2 font-mono"
                        type="button"
                        onClick={() => {
                            if (data.password === '') {
                                data.password = cookies.password;
                            }
                            updateUser(cookies.user, cookies.password, data).then(() => {
                                createCookies(data.username, data.password)
                                window.location.href = "/"
                            });
                        }}
                    >
                        Update
                    </button>
                </div>
            </div>
        </>
    )
}
