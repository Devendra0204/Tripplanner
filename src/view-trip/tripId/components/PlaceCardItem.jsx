import React from 'react'

function PlaceCardItem({ place }) {
    return (
        <div className='border rounded-xl p-3 mt-2 flex gap-5'>
            <img src='/image.png'
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