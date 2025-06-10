import { Link } from "react-router-dom";
import Button from "./Button";

export default function NavBar() {
    return (
        <>
            <div className='navbar fixed bg-white shadow h-20 flex items-center w-full z-100'>
                <div className='navbar-title text-4xl font-serif text-black font-bold absolute left-6'>
                    <Link to="/">
                    Keeper Journal
                    </Link>
                </div>
                <div className='navbar-buttons flex gap-4 right-6 absolute'>
                    <Button variant="signin"></Button>
                    <Button variant="signup"></Button>
                </div>
            </div>
        </>
    );
};