import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
function Header() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [openDailog, setOpenDailog] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        console.log("👤 User from localStorage:", user);
        //console.log("🖼️ Profile picture:", user?.picture);
    }, []);

    const login = useGoogleLogin({
        onSuccess: tokenResponse => GetUserProfile(tokenResponse),
        onError: (error) => console.log(error)
    });
    const GetUserProfile = (tokenInfo) => {
        axios.get(` https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'Application/json'
            }
        }).then((resp) => {
            console.log(resp);
            localStorage.setItem('user', JSON.stringify(resp.data));
            setOpenDailog(false);
        })
    };
    const handleLogout = () => {
        googleLogout();
        localStorage.removeItem('user');
        window.location.reload(); // or navigate to login
    };
    return (
        <div className='bg-indigo-50 p-2 shadow-sm flex justify-between items-center'>
            <img src="/logo.svg" />
            <div>
                <b className='text-2xl '>TripMate.AI</b>
            </div>
            <div>
                {user ?
                    <div className='flex items-center gap-4'>
                        <a href='/create-trip'>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-3xl hover:bg-blue-700">
                                +Create Trip
                            </button>
                        </a>
                        <a href='/my-trips'>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-3xl hover:bg-blue-700">
                                My Trips
                            </button>
                        </a>
                        <div className="relative">
                            <img
                                src={user?.picture}
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="h-[40px] w-[40px] rounded-full cursor-pointer"
                                alt="Profile"
                            />
                            {showDropdown && (
                                <div className="absolute right-0 mt-2 bg-white border rounded shadow-md p-2 z-10">
                                    <button
                                        onClick={handleLogout}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>

                    </div> :
                    <button onClick={() => setOpenDailog(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Sign In
                    </button>
                }

            </div>
            {/* Dialog for login */}
            {
                openDailog && (
                    <div className="fixed inset-0 backdrop-blur-sm backdrop-brightness-50 flex justify-center items-center z-30">
                        <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                            <h2 className="text-xl font-semibold mb-4">Login Required</h2>
                            <p className="text-gray-700 mb-6">
                                You must be logged in with your Google account to generate a trip plan.
                            </p>
                            <button
                                onClick={() => login()}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
                            >
                                Sign in with Google 🚀
                            </button>
                        </div>
                    </div>
                )
            }
        </div >
    )
}

export default Header