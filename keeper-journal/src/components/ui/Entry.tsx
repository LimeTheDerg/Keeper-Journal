import { Link } from "react-router-dom";

interface EntryProps {
    title: string;
    content: string;
    date: string;
    time: string;
    id: number;
}

export default function Entry(props : EntryProps) {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-7 w-full">
            <div className="inline-block">
                <div className="text-xl font-bold font-mono">
                <h3 className="inline-block">{props.title}</h3>
                <Link to={`/edit/${props.id}`}>
                <svg className="feather feather-edit inline-block" fill="none" height="20" stroke="grey" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="60" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </Link>
                </div>
                <p className="font-mono wrap-anywhere w-8/9">{props.content}</p>
            </div>
            <div className="inline-block absolute right-5 text-gray-400">
                <p>{props.date}</p>
                <p>{props.time}</p>
            </div>  
        </div>
    )
}