import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'

function PlaceCardItem({ place }) {
    const [PhotoUrl, setPhotoUrl] = useState();
    useEffect(() => {
        place && GetPlacePhoto();
    }, [place])

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: place.placeName
        }
        const result = await GetPlaceDetails(data).then(resp => {
            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
            setPhotoUrl(PhotoUrl);
        })
    }
    return (
        <div className='border rounded-xl p-3 mt-2 flex gap-5'>
            <img src={PhotoUrl ? PhotoUrl : '/image.png'}
                className='w-[130px] h-[130px] rounded-xl' />
            <div className='flex gap-5 mt-6'>
                <h2 className='font-medium text-xl'> {place.placeName}</h2>
                <p className='text-gray-400'>{place.placeDetails}</p>
                <h3 className='text-black font-medium'>💸{place.ticketPricing}</h3>
            </div>
        </div>
    )
}

export default PlaceCardItem