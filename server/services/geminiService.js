import ai from "../config/gemini.js";

export const generateResponse=async(message)=>{
    const response=await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents:message,
    });
    return response.text;
};