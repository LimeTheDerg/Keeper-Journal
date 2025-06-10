import { useCookies } from "react-cookie";
import AccountNavBar from "../components/ui/AccountNavBar";
import { createEntry } from "../lib/axioscontainer";
import { useRef } from "react";
import SideBar from "../components/ui/SideBar";

export default function CreateEntryPage() {
    const [cookies] = useCookies(['user', 'password']);

    let data = useRef({
        title: '',
        content: '',
    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const name = event.target.name;
        const value = event.target.value;
        data.current = {
            ...data.current,
            [name]: value
        };
    }

    function makeData() {
        return data.current;
    }

    return (
        <>
        <div>
        <AccountNavBar username={cookies.user}></AccountNavBar>
        <SideBar></SideBar>
        </div>
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white shadow-lg rounded-lg p-6 w-1/2">
                <h2 className="text-2xl font-bold mb-4 font-mono">Create Entry</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange}/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">Content</label>
                        <textarea id="content" name="content" rows={5} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange}></textarea>
                    </div>
                    <button className="bg-black hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-all border-2 font-mono" onClick={() => {createEntry(cookies.user, cookies.password, makeData()).then(() => window.location.href = "/")}}>Create Entry</button>
            </div>
        </div>
        </>
    );
}