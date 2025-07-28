import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { AI_PROMPT, SelectBudgetOptions, selectTravelesList } from '../constants/options';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { generateTripPlan } from '../service/AIModel';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';



function CreateTrip() {
    const [place, setPlace] = useState();

    const [formData, setFormData] = useState({});
    const [openDailog, setOpenDailog] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const GetUserProfile = (tokenInfo) => {
        axios.get(` https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'Application/json'
            }
        }).then((resp) => {
            console.log(resp);
            localStorage.setItem('user', JSON.stringify(resp.data));
            setOpenDailog(false);
            OnGenerateTrip();
        })
    };

    //Google One Tap Login Integration
    const login = useGoogleLogin({
        onSuccess: tokenResponse => GetUserProfile(tokenResponse),
        onError: (error) => console.log(error)
    });

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const OnGenerateTrip = async () => {
        //removing user in localstorage for testing
        //localStorage.removeItem('user');
        const user = localStorage.getItem('user');
        if (!user) {
            setOpenDailog(true);
            return;

        }
        setLoading(true);
        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', formData?.location?.label)
            .replace('{totalDays}', formData?.noOfDays)
            .replace('{traveler}', formData?.traveler)
            .replace('{budget}', formData?.budget)
            .replace('{totalDays}', formData?.noOfDays)

        //console.log("🧠 Final Prompt:\n", FINAL_PROMPT);

        try {
            const TripData = await generateTripPlan(FINAL_PROMPT); // <-- pass the prompt
            //console.log("Raw Response from Gemini:\n", TripData);
            await SaveAiTrip(TripData)
            // TODO: Use tripData to update your UI
        } catch (error) {
            console.error("❌ Gemini API Error:", error.message);
        }
        finally {
            //calling function to save data in firebase 
            setLoading(false);
        }
    };

    const SaveAiTrip = async (TripData) => {
        setLoading(true);
        //documentid should be unique so we are adding timestamp
        const docId = Date.now().toString()
        //user google account deatil stored in local storage when he login
        const user = JSON.parse(localStorage.getItem('user'));

        await setDoc(doc(db, "AItrips", docId), {
            id: docId,
            userSelection: formData,
            tripData: JSON.parse(TripData),
            userEmail: user?.email,
        });
        setLoading(false);
        navigate('/view-trip/' + docId)

    }



    useEffect(() => {
        //console.log(formData);
    }, [formData])

    return (
        <div className="sm:px-10 md:px-32 lg:px-64 ">
            <h2 className="mt-3 text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Tell us your travel preferences 🏕 🌴
            </h2>
            <p className="text-gray-600 pt-6">
                Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
            </p>
            <div>
                <div className="text-xl font-semibold pt-4 pb-3">
                    What is destination of choice?
                </div>
                <div>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            place,
                            onChange: (v) => {
                                setPlace(v);
                                handleInputChange('location', v);
                            }
                        }}
                    />
                </div>
                <div className="text-xl font-semibold pt-4 pb-3">
                    For how many days you are planning your trip?
                </div>
                <input
                    type="text"
                    placeholder="Ex.3"
                    className="w-full px-4 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                />
                <div>
                    <h2 className="text-xl my-3 font-medium pt-3">What is your budget?</h2>
                    <div className="grid grid-cols-3 gap-5 mt-5">
                        {SelectBudgetOptions.map((item, index) => (
                            <div key={index}
                                onClick={() => handleInputChange('budget', item.title)}
                                className={`p-4 border rounded-lg hover:shadow-lg
                                    ${formData?.budget == item.title && 'shadow-lg border-black border-3'}
    `}>
                                <h2 className='text-2xl'>{item.icon}</h2>
                                <h2 className="font-bold text-lg">{item.title}</h2>
                                <h2 className="text-sm text-gray-500">{item.desc}</h2>
                            </div>
                        ))
                        }
                    </div>

                </div>

                <div>
                    <h2 className="text-xl my-3 font-medium pt-3">With whom are you planning to travel?</h2>
                    <div className="grid grid-cols-3 gap-5 mt-5">
                        {selectTravelesList.map((item, index) => (
                            <div key={index}
                                onClick={() => handleInputChange('traveler', item.people)}
                                className={`p-4 border rounded-lg hover:shadow-lg
                                    ${formData?.traveler == item.people && 'shadow-lg border-black border-3'}
    `}>
                                <h2 className='text-2xl'>{item.icon}</h2>
                                <h2 className="font-bold text-lg">{item.title}</h2>
                                <h2 className="text-sm text-gray-500">{item.desc}</h2>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
            <div className='flex justify-end'>
                <button
                    disabled={loading}
                    onClick={OnGenerateTrip} className='my-5 border rounded-xl pt-1 pb-1.5 px-2 bg-blue-700 text-amber-50 text-xl'>
                    {loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate trip'}
                </button>
            </div>
            {/* Dialog for login */}
            {openDailog && (
                <div className="fixed inset-0 backdrop-blur-sm backdrop-brightness-50 flex justify-center items-center z-30">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                        <h2 className="text-xl font-semibold mb-4">Login Required</h2>
                        <p className="text-gray-700 mb-6">
                            You must be logged in with your Google account to generate a trip plan.
                        </p>
                        <button
                            onClick={() => login()}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
                        >
                            Sign in with Google 🚀
                        </button>
                    </div>
                </div>
            )}
        </div >
    )
}

export default CreateTrip