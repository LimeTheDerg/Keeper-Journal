import AccountPanel from "../components/ui/AccountPanel";
import Footer from "../components/ui/Footer";
import NavBar from "../components/ui/NavBar";

export default function SignUp() {
    return (
        <>
            <NavBar></NavBar>
            <div className="flex flex-row justify-center items-center pt-20">
                <img 
                    src="https://www.wolflair.com/wp-content/uploads/2017/01/placeholder.jpg" 
                    alt="heroimage" 
                    className="w-1/2"
                />
                <div className="w-1/2 h-auto flex justify-center items-center relative">
                    <AccountPanel variant="signup"></AccountPanel>
                </div>
            </div>
            
            <Footer></Footer>
        </>
    );
}
