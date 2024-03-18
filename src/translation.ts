// translation.ts

import axios from 'axios';

// ChatGPT API配置
const GPT_ENDPOINT = 'https://api.openai.com/v1/engines/davinci/completions';
const GPT_API_KEY = 'YOUR_API_KEY_HERE'; // 替换为你的ChatGPT API密钥

// 使用ChatGPT进行翻译
export async function translateText(text: string): Promise<string> {
    try {
        const response = await axios.post(GPT_ENDPOINT, {
            prompt: text,
            max_tokens: 50 // 设置最大生成的文本长度
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GPT_API_KEY}`
            }
        });

        // 提取ChatGPT生成的文本
        const generatedText = response.data.choices[0].text.trim();

        return generatedText;
    } catch (error) {
        console.error('Failed to translate text:', error);
        throw new Error('Failed to translate text');
    }
}