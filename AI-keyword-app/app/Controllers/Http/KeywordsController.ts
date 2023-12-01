import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import OpenAI from "openai";
// import Env from '@ioc:Adonis/Core/Env'

// const OPENAI_SECRET_KEY: string = Env.get('OPENAI_SECRET_KEY')


export default class KeywordsController {
    public async create({request, response}: HttpContextContract) {
        const topic = request.input("topic");
        const keyword_number = request.input("keyword_number", 10)
        const content = `Identify ${keyword_number} SEO keywords related to ${topic}`
        try{
            const openai = new OpenAI();
            const result = await openai.chat.completions.create({
                messages: [{ role: 'user', content: content }],
                model: 'gpt-4',
              }).withResponse();
            return response.json(result)
        }catch(error){
            console.error(error)
            return response.status(500).json({ message: "AI service is not available now!" })
        }
    }
}