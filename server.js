require('dotenv').config();
const express = require('express');
const path = require('path');
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

let openai;
if (process.env.DEEPSEEK_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: 'https://api.deepseek.com'
  });
}

app.use(express.json());
app.use(express.static('.'));

app.post('/api/analyze', async (req, res) => {
  if (!openai) {
    return res.status(500).json({ success: false, error: 'API ключ не настроен' });
  }
  
  try {
    const { type, data } = req.body;
    
    let prompt = '';
    if (type === 'child') {
      prompt = `Проанализируй детскую матрицу судьбы для ребенка с датой рождения ${data}. Дай краткие рекомендации по воспитанию, талантам и потенциалу. Ответ в формате JSON: {"talents": "...", "education": "...", "potential": "..."}`;
    } else if (type === 'compatibility') {
      prompt = `Проанализируй совместимость двух людей с датами рождения ${data.date1} и ${data.date2}. Дай оценку совместимости и рекомендации. Ответ в JSON: {"score": "...", "strengths": "...", "challenges": "...", "advice": "..."}`;
    } else if (type === 'financial') {
      prompt = `Проанализируй финансовую матрицу для человека с датой рождения ${data}. Дай рекомендации по заработку и инвестициям. Ответ в JSON: {"strengths": "...", "opportunities": "...", "risks": "...", "advice": "..."}`;
    }

    const completion = await openai.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: 'Ты эксперт по нумерологии и матрице судьбы. Отвечай на русском языке в формате JSON.' },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 1.0
    });

    const result = JSON.parse(completion.choices[0].message.content);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ success: false, error: 'Ошибка анализа' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});