export const selectTravelesList = [
    {
        id: 1,
        icon: "🧍",
        title: 'Just me',
        desc: 'A sole traveles in exploration',
        people: '1'
    },

    {
        id: 2,
        icon: "💑",
        title: 'A couple',
        desc: 'Two traveles in tandem',
        people: '2 people'
    },

    {
        id: 3,
        icon: "👨‍👩‍👧‍👦",
        title: 'Family',
        desc: 'A group of fun loving adv',
        people: 'group of 3 to 5 people'
    },

    {
        id: 4,
        icon: "🧑‍🤝‍🧑",
        title: 'Friends',
        desc: 'A bunch of thrill-seeks',
        people: '5 to 10 people'
    },

]


export const SelectBudgetOptions = [
    {
        id: 1,
        icon: "💵",
        title: 'cheap',
        desc: 'stay conscious of cost',
    },

    {
        id: 2,
        title: 'Moderate',
        desc: 'keep cost on average side',
        icon: '💰',
    },
    {
        id: 3,
        icon: '	💸',
        title: 'luxury',
        desc: 'dont worry about cost',
    },
]

export const AI_PROMPT = `Generate a travel plan for the following details:
- Location: {location}
- Duration: {totalDays} Days
- Number of travelers: {traveler}
- Budget: {budget}

Respond with a valid JSON object containing two main keys:

1. "hotels": An array of hotel options. Each hotel should include:
   - hotelName
   - hotelAddress
   - price
   - hotelImageUrl
   - geoCoordinates (latitude and longitude)
   - rating
   - description

2. "itinerary": An array of days (length = {totalDays}). Each day should be an object with:
   - day: Day number (e.g., "Day 1")
   - places: An array of places to visit. Each place should include:
     - placeName
     - placeDetails
     - placeImageUrl
     - geoCoordinates (latitude and longitude)
     - ticketPricing
     - bestTimeToVisit
     - travelTimeToReach (from previous location or hotel)

Respond with only valid JSON. Do not include any notes, markdown, or explanations.`;

