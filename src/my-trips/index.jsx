import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, useNavigation } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {
    const navigate = useNavigate();
    const [userTrips, setUserTrips] = useState([]);
    useEffect(() => {
        GetUserTrips();
    }, [])
    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            navigate('/');
            return;
        }
        setUserTrips([]);
        const q = query(collection(db, "AItrips"), where('userEmail', '==', user?.email));
        const querySnapshot = await getDocs(q);
        setUserTrips([]);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setUserTrips(prevVal => [...prevVal, doc.data()])
        });
    }
    return (
        <div className='sm:px-10 md:px-32 lg:px-64 xl:px-72 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>MyTrips</h2>
            <div className='mt-10 grid grid-cols-2 md:grid-cols-3 gap-5'>
                {userTrips.map((trip, index) => (
                    <UserTripCardItem trip={trip} />
                ))}
            </div>

        </div>
    )
}

export default MyTrips