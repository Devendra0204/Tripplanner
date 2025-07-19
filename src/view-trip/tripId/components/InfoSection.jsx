import React from 'react'

function InfoSection({ trip }) {
    return (
        <div>
            <img src='/image.png' className='h-[340px] w-full object-cover rounded-xl' />

            <div>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                </div>
                <div className='flex gap-5'>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🗓️{trip.userSelection?.noOfDays} Days</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💸 {trip.userSelection?.budget} Budget</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🧍No. of Traveler: {trip.userSelection?.traveler}</h2>
                </div>
            </div>
        </div>
    )
}

export default InfoSection