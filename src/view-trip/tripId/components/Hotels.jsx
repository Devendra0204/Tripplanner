import { Hotel } from 'lucide-react'
import React from 'react';
import { Link } from 'react-router-dom';
import HotelCardItem from './HotelCardItem';



function Hotels({ trip }) {
    return (
        <div>
            <div className='font-bold text-xl mt-5'>Hotel Recommendation</div>
            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-3'>
                {trip?.tripData?.hotels?.map((hotel, index) => (
                    <HotelCardItem hotel={hotel} />


                ))}
            </div>



        </div>




    )
}

export default Hotels