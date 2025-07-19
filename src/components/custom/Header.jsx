import React from 'react'
function Header() {
    return (
        <div className='p-2 shadow-sm flex justify-between items-center'>
            <img src="/logo.svg" />
            <div>
                <b className='text-2xl '>TripMate.AI</b>
            </div>
            <div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-black-700 transition duration-300">
                    Sign In
                </button>

            </div>
        </div>
    )
}

export default Header