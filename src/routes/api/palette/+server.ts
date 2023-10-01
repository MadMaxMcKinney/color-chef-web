import type { RequestHandler } from './$types';
import { OPEN_AI_KEY } from '$env/static/private';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: OPEN_AI_KEY
});

export const GET: RequestHandler = async ({ url }) => {
    let prompt = url.searchParams.get('prompt');
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: 'system',
                content:
                    'You are a color specialist. You help people find colors that will work well based on a prompt explaining how they will use the colors. You will respond only with an array of color objects, where each object has a field named hex for the hex value of the color, and another field named name for the name of the color. You will always provide only 5 color objects.'
            },
            {
                role: 'user',
                content: prompt
            }
        ],
        model: 'gpt-3.5-turbo'
    });
    return Response.json(completion.choices[0]);
};
