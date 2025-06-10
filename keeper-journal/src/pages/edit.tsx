import { useCookies } from "react-cookie";
import AccountNavBar from "../components/ui/AccountNavBar";
import SideBar from "../components/ui/SideBar";
import { useEffect, useState } from "react";
import { deleteEntry, getSingleEntry, updateEntry } from "../lib/axioscontainer";
import Loading from "../components/ui/Loading";

export default function edit() {
    const [cookies] = useCookies(['user', 'password']);
    const [data, setData] = useState({
        title: '',
        content: '',
    });
    const entryId = parseInt(window.location.pathname.split('/').pop() || "0");

    useEffect(() => {
        async function fetchData() {
            try {
                const responseData = await getSingleEntry(cookies.user, cookies.password, entryId);
                setData(responseData.data);
            }
            catch (err: any) {
                console.error("Error fetching data:", err);
                if (err.status === 404) {
                    window.location.href = "/";
                }
            }
        }
        fetchData();
    }, [])
    
    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const name = event.target.name;
        const value = event.target.value;
        setData({
            ...data,
            [name]: value
        });
    }

    function makeData() {
        return data;
    }

    if (data.title === '' && data.content === '') return (<Loading></Loading>);
    else
    return (
        <>
            <div>
            <AccountNavBar username={cookies.user}></AccountNavBar>
            <SideBar></SideBar>
            </div>
            <div className="flex justify-center items-center h-screen">
                <div className="bg-white shadow-lg rounded-lg p-6 w-1/2">
                    <h2 className="text-2xl font-bold mb-4 font-mono">Update Entry</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
                            <input type="text" id="title" name="title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange} defaultValue={data.title}/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">Content</label>
                            <textarea id="content" name="content" rows={5} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange} defaultValue={data.content}></textarea>
                        </div>
                        <button className="bg-black hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-all border-2 font-mono" onClick={() => {updateEntry(cookies.user, cookies.password, entryId, makeData()).then(() => window.location.href = "/")}}>Update Entry</button>
                        <button
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-all border-2 font-mono float-right"
                            style={{ marginLeft: "auto", display: "block" }}
                            onClick={async () => {
                                if (window.confirm("Are you sure you want to delete this entry?")) {
                                    deleteEntry(cookies.user, cookies.password, entryId)
                                    window.location.href = "/";
                                }
                            }}
                        >
                            Delete Entry
                        </button>
                </div>
            </div>
        </>
    );
}