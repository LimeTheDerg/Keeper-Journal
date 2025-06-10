import { Link } from "react-router-dom";

interface ButtonProps {
    variant: 'signin' | 'signup'; // Variants for different button styles
}

function signInRedirect() {
    // Redirect to Sign In Page
}

function signUpRedirect() {
    // Redirect to Sign Up Page
}

function Button({ variant }: ButtonProps) {
    if (variant === 'signin') {
        return (
            <Link to="/signin">
            <button onClick={signInRedirect} className="
                btn-signin 
                bg-black 
                p-3 
                text-white 
                rounded-lg 
                hover:bg-white
                hover:text-black 
                hover:outline-3 
                text-4x1 
                font-mono 
                transition-all 
                ease-in-out">
                Sign In
            </button>
            </Link>
        );
    } else if (variant === 'signup') {
        return (
            <Link to="/signup">
            <button onClick={signUpRedirect} className="
                btn-signup
                bg-black 
                p-3 
                text-white 
                rounded-lg 
                hover:bg-white
                hover:text-black 
                hover:outline-3 
                text-4x1 
                font-mono   
                transition-all 
                ease-in-out">
                Sign Up
            </button>
            </Link>
        );
    }
}

export default Button;
