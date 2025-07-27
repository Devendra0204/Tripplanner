import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'

function HotelCardItem({ hotel }) {

    const [PhotoUrl, setPhotoUrl] = useState();
    useEffect(() => {
        hotel && GetPlacePhoto();
    }, [hotel])

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: hotel?.hotelName
        }
        const result = await GetPlaceDetails(data).then(resp => {

            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
            setPhotoUrl(PhotoUrl);
        })
    }
    return (

        <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName + "," + hotel?.hotelAddress} target='_blank'>
            <div className='hover:scale-110 cursor-pointer'>
                <img src={PhotoUrl} className='rounded-lg h-[180px] w-full object-cover flex justify-between ' />
                <div className='my-2 flex flex-col justify-between gap-2 mx-2'>
                    <h2 className='font-medium '>{hotel?.hotelName}</h2>
                    <h2 className='text-xs text-gray-700'>📍{hotel?.hotelAddress}</h2>
                    <h2 className='text-xs text-gray-500'>💰{hotel?.price}</h2>
                    <h2 className='text-xs text-gray-500'>⭐{hotel?.rating}</h2>
                </div>
            </div>
        </Link>

    )
}

export default HotelCardItem