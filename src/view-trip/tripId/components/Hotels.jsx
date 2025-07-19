import { Hotel } from 'lucide-react'
import React from 'react';
import { Link } from 'react-router-dom';



function Hotels({ trip }) {
    return (
        <div>
            <div className='font-bold text-xl mt-5'>Hotel Recommendation</div>
            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-3'>
                {trip?.tripData?.hotels?.map((hotel, index) => (
                    <Link key={index} to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName + "," + hotel?.hotelAddress} target='_blank'>
                        <div className='hover:scale-110 cursor-pointer'>
                            <img src='/image.png' className='rounded-lg' />
                            <div className='my-2 flex flex-col gap-2'>
                                <h2 className='font-medium '>{hotel?.hotelName}</h2>
                                <h2 className='text-xs text-gray-700'>📍{hotel?.hotelAddress}</h2>
                                <h2 className='text-xs text-gray-500'>💰{hotel?.price}</h2>
                                <h2 className='text-xs text-gray-500'>⭐{hotel?.rating}</h2>
                            </div>
                        </div>
                    </Link>


                ))}
            </div>



        </div>




    )
}

export default Hotels