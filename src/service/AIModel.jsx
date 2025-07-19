export const generateTripPlan = async (prompt) => {
    const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent';

    const requestBody = {
        contents: [
            {
                role: 'user',
                parts: [
                    { text: prompt }
                ]
            }
        ]
    };

    const response = await fetch(`${url}?key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    // ✅ DEFINE `text` BEFORE USING IT
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) throw new Error("Gemini response was empty or malformed.");

    //console.log("🟢 Raw Response from Gemini:\n", text);


    const cleanedText = text
        .replace(/```json|```/g, '')     // remove markdown code block
        .replace(/,\s*}/g, '}')          // remove trailing comma in objects
        .replace(/,\s*]/g, ']')          // remove trailing comma in arrays
        //.replace(/\/\/.*$/gm, '')           // 🆕 remove all comments like // ...
        .trim();
    return cleanedText;

    // try {
    //     const json = JSON.parse(cleanedText);
    //     console.log("✅ Parsed JSON:\n", json);
    //     return json;
    // } catch (e) {
    //     console.error("❌ Failed to parse JSON:", e.message);
    //     throw new Error("Gemini returned invalid JSON format.");
    // }
};
