import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import OpenAI from "openai";

const OPENAI_API_KEY= process.env.OPENAI_API_KEY
const kEYWORD_NUMBER= process.env.kEYWORD_NUMBER

export default class KeywordsController {
    public async create({request, response}: HttpContextContract) {
        const topic = request.input("topic");

        const content = `Identify ${kEYWORD_NUMBER} SEO keywords related to ${topic}`
        if (!OPENAI_API_KEY) {
            return response.status(500).json({ message: 'OpenAI API key is missing.' });
        }
        try{  
            const openai = new OpenAI({apiKey: OPENAI_API_KEY});
            const result = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ role: 'user', content: content }],
              });
            console.log(result)
            const seoKeywords = result.choices[0].message.content;
            return response.status(200).json(seoKeywords)
        }catch(error){
            console.error(error)
            return response.status(500).json({ message: "AI service is not available now!" })
        }
    }
}