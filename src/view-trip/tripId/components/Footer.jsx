import React from 'react';

function Footer() {
    return (
        <footer className=" text-gray-800 py-6 transition-opacity duration-700 ease-in opacity-100">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 px-4">

                {/* Developer Image */}
                <img
                    src="/dev.jpg"
                    alt="Devendra Ghuge"
                    className="h-30 w-30 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300"
                />

                {/* Developer Text */}
                <p className="text-lg text-gray-600 font-semibold text-center">
                    “Crafted with ❤️ by <span className="text-gray-500">Devendra Ghuge</span>
                </p>

            </div>
        </footer>
    );
}

export default Footer;
