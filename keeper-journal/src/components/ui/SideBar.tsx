import { Link } from "react-router-dom";

export default function SideBar() {
    return (
        <div className="sidebar fixed bg-gray-200 shadow h-screen w-60 top-20">
            <div className="sidebar-buttons flex flex-col absolute">
                <Link to="/">
                    <div className="w-60 h-15 bg-gray-200 hover:bg-gray-300 flex items-center justify-center shadow-md transition-all">
                        <svg className="w-15" fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" enableBackground="new 0 0 100 100" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M22.5,19.7h20c1.4,0,2.5,1.1,2.5,2.5v54.9c0,1.4-1.1,2.5-2.5,2.5h-20c-1.4,0-2.5-1.1-2.5-2.5V22.2 C20,20.8,21.1,19.7,22.5,19.7z"></path> <path d="M57.5,19.6h20c1.4,0,2.5,1.1,2.5,2.5V42c0,1.4-1.1,2.5-2.5,2.5h-20c-1.4,0-2.5-1.1-2.5-2.5V22.1 C55,20.7,56.1,19.6,57.5,19.6z"></path> <path d="M57.5,54.6h20c1.4,0,2.5,1.1,2.5,2.5v19.9c0,1.4-1.1,2.5-2.5,2.5h-20c-1.4,0-2.5-1.1-2.5-2.5V57.1 C55,55.8,56.1,54.6,57.5,54.6z"></path> </g></svg>                    
                        <h1 className="text-xl font-mono">Entries</h1>
                    </div>
                </Link>
                <Link to="/create">
                    <div className="w-60 h-15 bg-gray-200 hover:bg-gray-300 flex items-center justify-center shadow-md transition-all">
                        <svg className="feather feather-edit" fill="none" height="40" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="60" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        <h1 className="text-xl font-mono">Create</h1>
                    </div>
                </Link>
            </div>
        </div>
    );
}