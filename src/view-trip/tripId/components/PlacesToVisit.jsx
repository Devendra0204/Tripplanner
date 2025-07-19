import React from 'react'
import PlaceCardItem from './PlaceCardItem'
import { Link } from 'react-router-dom';


function PlacesToVisit({ trip }) {
    return (
        <div>
            <h2 className='font-bold text-xl mb-2'>Places To Visit</h2>

            <div>
                {trip.tripData?.itinerary.map((item, index) => (
                    <div>
                        <h2 className='font-medium underline'>{item.day}</h2>

                        <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-5'>
                            {
                                item.places.map((place, index) => (
                                    <div className='my-3'>
                                        <h3 className='font-medium text-sm text-orange-400 mb-4'>{place.bestTimeToVisit}</h3>
                                        <Link key={index} to={'https://www.google.com/maps/search/?api=1&query=' + place?.placeName} target='_blank'>

                                            <div className='hover:scale-105 cursor-pointer'>

                                                <PlaceCardItem place={place} />
                                            </div>
                                        </Link>
                                    </div>


                                ))
                            }
                        </div>
                    </div>
                ))}
            </div>


        </div >
    )
}

export default PlacesToVisit