import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InfoSection from './components/InfoSection';
import Hotels from './components/Hotels';
import PlacesToVisit from './components/PlacesToVisit';

function Viewtrip() {
    const { tripId } = useParams();
    useEffect(() => {
        tripId && GetTripData();
    }, [tripId]);
    //store data in trip(constant)
    const [trip, setTrip] = useState([]);
    // Use to get trip information from firebase
    const GetTripData = async () => {
        const docRef = doc(db, 'AItrips', tripId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document:", docSnap.data());
            setTrip(docSnap.data())
        }
        else {
            console.log("No such Document");
        }
    }
    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            {/* Information Section */}
            <InfoSection trip={trip} />




            {/* Recommendation Section */}

            <Hotels trip={trip} />





            {/* Place to visit */}

            <PlacesToVisit trip={trip} />





        </div>
    )
}

export default Viewtrip