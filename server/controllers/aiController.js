import { generateResponse } from "../services/geminiService.js";
import Flight from "../models/Flight.js";

export const chatWithAI = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ message: "Message is required" });
        }

        const match = message.match(
            /from\s+(.*?)\s+to\s+(.*)/i
        );

        let flights = [];

        if (match) {
            const fromCity = match[1].trim();
            const toCity = match[2].trim();

            flights = await Flight.find({
                from: {
                    $regex: fromCity,
                    $options: "i",
                },
                to: {
                    $regex: toCity,
                    $options: "i",
                }
            })
        }
        if (match && flights.length === 0) {
            return res.status(200).json({
                success: true,
                reply: `Sorry, no flights found from ${match[1]} to ${match[2]}.`,
            });
        }

        const prompt = `
            Available Flights:

            ${JSON.stringify(flights)}

            User Question:
            ${message}

            Rules:

            1. Answer ONLY from the flight data provided.
            2. If the answer cannot be found in the flight data, reply:
            "Sorry, I can only answer questions related to available flights in our system."
            3. Do not make up information.
            4. Do not answer general knowledge questions.
            `
        console.log(flights);
        const reply = await generateResponse(prompt);
        res.status(200).json({
            success: true,
            reply,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "AI service is currently unavailable. Please search flights directly." });
    }
}