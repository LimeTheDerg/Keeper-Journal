import { useRef, useState } from "react";
import { validateSignUpData, validateSignInData, createCookies } from "../../lib/accountutils";
import { authenticateUser, createUser } from "../../lib/axioscontainer";

interface AccountPanelProps {
    variant: 'signin' | 'signup'; // Variants for different button styles
}

export default function AccountPanel(Props: AccountPanelProps) {

    const errorMessagesSignUp = '*Invalid data, please revalidate and try again';
    const errorMessagesSignIn = '*Invalid username or password';

    let [error, setError] = useState('');

    let data = useRef({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: ''
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        data.current = {
            ...data.current,
            [name]: value
        }
    };

    const handleSubmit = () => { 
        if (Props.variant === 'signin' && validateSignInData(data.current)) {
            setError('');
            let response = authenticateUser(data.current.username, data.current.password)
            response
            .then((result) => {
                if (result.status === 200) {
                    createCookies(data.current.username, data.current.password);
                }
            })
            .catch((error) => {
                console.log(error);
                setError(errorMessagesSignIn);
            })
        } 
        else if (Props.variant === 'signup' && validateSignUpData(data.current)) {
            setError('');
            let response = createUser(data.current)
            response
            .then((result) => {
                if (result.status === 200) {
                    createCookies(data.current.username, data.current.password);
                }
            })
            .catch((error) => {
                console.log(error);
                setError(errorMessagesSignUp);
            })
        }
        else if (Props.variant === 'signin' && !validateSignUpData(data.current)) {
            setError(errorMessagesSignIn);
        }
        else if (Props.variant === 'signup' && !validateSignUpData(data.current)) {
            setError(errorMessagesSignUp);
        }
    }

    if (Props.variant === 'signin') {
        return (
            <div className="relative -z-0">
                <div className="flex flex-col items-center p-5 bg-gray-100 rounded-lg shadow-md w-100">
                    <h2 className="text-gray-800 mb-1 text-3xl font-semibold font-serif">Sign In</h2>
                    <p className="text-red-500 font-mono text-xs mb-3">{error}</p>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="w-full p-3 mb-3 border border-gray-300 rounded-md text-base"
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full p-3 mb-5 border border-gray-300 rounded-md text-base mt-2"
                        onChange={handleChange}
                    /> 
                    <button
                        className="px-5 py-2 font-mono bg-black text-white rounded-md hover:bg-white hover:text-black text-base hover:outline-3 transition-all ease-in-out"
                        onClick={handleSubmit}
                    >
                        Sign In
                    </button>
                </div>
            </div>
        );
    } else if (Props.variant === 'signup') {
        return (
            <div className="relative -z-0">
                <div className="flex flex-col items-center p-5 bg-gray-100 rounded-lg shadow-md w-100">
                    <h2 className="text-gray-800 mb-1 text-3xl font-semibold font-serif">Sign Up</h2>
                    <p className="text-red-500 font-mono text-xs mb-3">{error}</p>
                    <div className="flex w-full gap-3 mb-3">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            className="w-1/2 p-3 border border-gray-300 rounded-md text-base"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            className="w-1/2 p-3 border border-gray-300 rounded-md text-base"
                            onChange={handleChange}
                        />
                    </div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full p-3 mb-3 border border-gray-300 rounded-md text-base"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="w-full p-3 mb-1 border border-gray-300 rounded-md text-base"
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full p-3 mb-5 border border-gray-300 rounded-md text-base mt-2"
                        onChange={handleChange}
                    />
                    <button
                        className="px-5 py-2 font-mono bg-black text-white rounded-md hover:bg-white hover:text-black text-base hover:outline-3 transition-all ease-in-out"
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        );
    }
}