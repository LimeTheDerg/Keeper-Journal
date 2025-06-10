import { Link } from "react-router-dom";
import Footer from "../components/ui/Footer";
import NavBar from "../components/ui/NavBar";

export default function HomePage() {
    return (
        <>
            <NavBar></NavBar>
            <img src="https://www.wolflair.com/wp-content/uploads/2017/01/placeholder.jpg" alt="heroimage" className='w-1/2 inline-block pt-20'/>
            <div className="inline-block font-serif pl-6">
                <h1 className="text-6xl font-bold">Keeper Journal</h1>
                <p className="pt-1 font-mono text-2xl">Journaling, Digitalized.</p>
                <p className="font-mono ">You are not signed in. 
                <Link to="/signin" className="pt-1 font-mono text-1xl hover:text-blue-500 transition-all ease-in-out"> Sign In </Link>
                or
                <Link to="/signup" className="pt-1 font-mono text-1xl hover:text-blue-500 transition-all ease-in-out"> Create Account</Link>
                </p>
            </div>
            <Footer></Footer>
        </>
    )
}