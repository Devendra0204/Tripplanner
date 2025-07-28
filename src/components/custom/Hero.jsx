import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
    return (
        <div className="min-h-screen flex items-center justify-center  px-4" >
            <section className="text-center max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800">
                    Plan Your Perfect Trip <br />
                    <span className="text-purple-500">With AI Assistance</span>
                </h1>
                <p className="text-gray-600 text-lg mb-8">
                    Your personal trip planner and travel curator,creating custom itineraries tailored to your interest and budget
                </p>
                <Link to={'create-trip'}>
                    <button className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition duration-300">
                        Start Planning
                    </button>
                </Link>

            </section>
        </div>
    )
}

export default Hero