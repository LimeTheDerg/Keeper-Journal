import { useEffect, useState } from "react";
import AccountNavBar from "../components/ui/AccountNavBar";
import SideBar from "../components/ui/SideBar";
import { getEntries, getUser } from "../lib/axioscontainer";
import { useCookies } from "react-cookie";
import Entry from "../components/ui/Entry";
import Loading from "../components/ui/Loading";

export default function Dashboard() {
    const [entries, setEntries] = useState<any[] | null>(null);
    const [firstName, setFirstName] = useState<string>("");
    const [cookies] = useCookies(['user', 'password']);
    const [page, setPage] = useState<number>(1);


    useEffect(() => {
        async function fetchData() {
            try {
                const [entries, user] = await Promise.all([
                    getEntries(cookies.user, cookies.password, page),
                    getUser(cookies.user, cookies.password)
                ]);

                setEntries(entries.data);
                setFirstName(user.data.first_name);
                
            } catch (err: any) {
                console.error("Error fetching data:", err);
                if (err.status === 404) {
                    setPage(page-1);
                }
            }
        }
        fetchData();
    }, [page]);

    function date(date: string):string {
        let newDate = new Date(date);
        date = newDate.toLocaleDateString();
        return date;
    }
    function time(time: string):string {
        let newDate = new Date(time);
        time = newDate.toLocaleTimeString();
        return time;
    }

    if (!entries || !firstName) return (<Loading></Loading>);

    return (
        <>
            <div>
                <AccountNavBar username={cookies.user} />
                <SideBar />
            </div>
            <div className="pl-60 pt-20 pb-10">
                <h1 className="font-mono h-50 flex items-center text-7xl pl-15 bg-gray-100 rounded-4xl shadow-xl">Welcome, {firstName}.</h1>
                <div className="flex flex-col mt-8">
                    <h2 className="text-4xl font-serif pl-10 font-bold">Entries</h2>
                    <div className="pl-10">
                        {entries.map((entry) => (
                            <Entry title={entry.title} content={entry.content} date={date(entry.created_at)} time={time(entry.created_at)} key={entry.id} id={entry.id}></Entry>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center mt-8 space-x-4">
                    <button
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 font-mono"
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2 font-mono text-lg">Page {page}</span>
                    <button
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 font-mono"
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}
