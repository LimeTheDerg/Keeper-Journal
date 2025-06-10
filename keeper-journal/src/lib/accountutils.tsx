interface SignUpData {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
}

interface SignInData {
    username: string;
    password: string;
}

export function validateSignUpData(data: SignUpData): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const containsNumber = /\d/;
    const containsSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    if (
        !data.firstName ||
        !data.lastName  ||
        containsNumber.test(data.firstName) ||
        containsNumber.test(data.lastName)  ||
        containsSpecialChar.test(data.firstName) ||
        containsSpecialChar.test(data.lastName)  ||
        !data.username  ||
        containsSpecialChar.test(data.username) ||
        !data.password  ||
        !data.email     || 
        !emailRegex.test(data.email)
    )return false;
    return true;
}

export function validateSignInData(data: SignInData): boolean {
    if (
        !data.username ||
        !data.password
    ) return false;
    return true;
}

export function createCookies(username: string, password: string){
    document.cookie = `user=${username}; max-age=604800`;
    document.cookie = `password=${password}; max-age=604800`;
    window.location.replace("/");
}

export function deleteCookies() {
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    window.location.replace("/");
}