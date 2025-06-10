export default function Loading() {
    return (
    <div className="flex items-center justify-center h-screen">
        <h1 className="text-6xl font-serif z-100">Loading</h1>
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg" className="animate-spin">
            <circle cx="50" cy="50" r="40"></circle>
            <circle cx="50" cy="50" r="28" fill="white"></circle>
            <rect x="0" y="50" width="200" height="100" fill="white"></rect>
        </svg>
    </div>)
}