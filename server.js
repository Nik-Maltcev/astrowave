require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('.'));

app.post('/api/tarot', async (req, res) => {
  if (!process.env.DEEPSEEK_API_KEY) {
    return res.status(500).json({ success: false, error: 'API ключ не настроен' });
  }
  
  try {
    const { name, birthDate, city } = req.body;
    const today = new Date().toLocaleDateString('ru-RU');
    
    const prompt = `Ты профессиональный таролог. Сделай расклад на день для ${name || 'человека'}, дата рождения ${birthDate}, город ${city || 'не указан'}. Сегодня ${today}.

Выполни расклад на 3 карты: Прошлое-Настоящее-Будущее.

Ответ в JSON:
{
  "card1": {"name": "название карты", "meaning": "значение для прошлого 80-120 слов"},
  "card2": {"name": "название карты", "meaning": "значение для настоящего 80-120 слов"},
  "card3": {"name": "название карты", "meaning": "значение для будущего 80-120 слов"},
  "summary": "общий совет на день 100-150 слов"
}`;

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: 'Ты эксперт по Таро. Отвечай на русском в JSON.' },
          { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' },
        temperature: 1.0
      })
    });

    const completion = await response.json();
    
    if (!response.ok) {
      return res.status(500).json({ success: false, error: 'Ошибка API' });
    }

    const result = JSON.parse(completion.choices[0].message.content);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Tarot API Error:', error);
    res.status(500).json({ success: false, error: 'Ошибка анализа' });
  }
});

app.post('/api/analyze-basic', async (req, res) => {
  if (!process.env.DEEPSEEK_API_KEY) {
    return res.status(500).json({ success: false, error: 'API ключ не настроен' });
  }
  
  try {
    const { type, data } = req.body;
    
    let prompt = '';
    if (type === 'personal') {
      prompt = `Дай краткий анализ матрицы судьбы для даты ${data}. Ответ в JSON: {"summary": "2-3 предложения о главном"}`;
    } else if (type === 'natal') {
      prompt = `Дай краткий анализ натальной карты для даты ${data.birthDate}. Ответ в JSON: {"summary": "2-3 предложения о главном"}`;
    } else if (type === 'child') {
      prompt = `Дай краткий анализ детской матрицы для даты ${data}. Ответ в JSON: {"summary": "2-3 предложения о главном"}`;
    } else if (type === 'compatibility') {
      prompt = `Дай краткую оценку совместимости для дат ${data.date1} и ${data.date2}. Ответ в JSON: {"summary": "2-3 предложения"}`;
    } else if (type === 'financial') {
      prompt = `Дай краткий финансовый прогноз для даты ${data}. Ответ в JSON: {"summary": "2-3 предложения"}`;
    }

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: 'Ты эксперт по нумерологии. Отвечай кратко на русском в JSON.' },
          { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' },
        temperature: 1.0,
        max_tokens: 150
      })
    });

    const completion = await response.json();
    
    if (!response.ok) {
      return res.status(500).json({ success: false, error: 'Ошибка API' });
    }

    const result = JSON.parse(completion.choices[0].message.content);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ success: false, error: 'Ошибка анализа' });
  }
});

app.post('/api/analyze', async (req, res) => {
  if (!process.env.DEEPSEEK_API_KEY) {
    return res.status(500).json({ success: false, error: 'API ключ не настроен' });
  }
  
  try {
    const { type, data } = req.body;
    
    let prompt = '';
    if (type === 'personal') {
      prompt = `Ты профессиональный нумеролог и эксперт по матрице судьбы. Проанализируй матрицу судьбы для человека с датой рождения ${data}.

Выполни глубокий анализ:

1. ЖИЗНЕННОЕ ПРЕДНАЗНАЧЕНИЕ:
- Главная жизненная задача
- Кармические уроки
- Духовное предназначение

2. СИЛЬНЫЕ И СЛАБЫЕ СТОРОНЫ:
- Врожденные таланты
- Зоны роста
- Скрытые ресурсы

3. КАРЬЕРА И САМОРЕАЛИЗАЦИЯ:
- Подходящие профессии
- Путь к успеху
- Рекомендации по развитию

4. ОТНОШЕНИЯ:
- Тип партнера
- Особенности в отношениях
- Советы по личной жизни

Ответ в JSON: {"destiny": "подробно 250-350 слов", "strengths": "подробно 200-300 слов", "career": "подробно 200-300 слов", "relationships": "подробно 150-250 слов"}`;
    } else if (type === 'natal') {
      prompt = `Ты профессиональный астролог и эксперт по натальным картам. Проанализируй натальную карту для человека с датой рождения ${data.birthDate}, время ${data.birthTime || 'неизвестно'}, место ${data.place || 'неуказано'}.

Выполни детальный астрологический анализ:

1. СОЛНЕЧНЫЙ ЗНАК И АСЦЕНДЕНТ:
- Глубокий анализ солнечного знака
- Влияние на личность
- Жизненные задачи

2. ЛУНА И ЭМОЦИИ:
- Эмоциональный мир
- Потребности и желания
- Отношения с близкими

3. ПЛАНЕТЫ И ДОМА:
- Влияние ключевых планет
- Аспекты и их значение
- Дома и сферы жизни

4. ПРОГНОЗ И РЕКОМЕНДАЦИИ:
- Благоприятные периоды
- Рекомендации по развитию
- Практические советы

Ответ в JSON: {"sun_sign": "подробно 200-300 слов", "moon_emotions": "подробно 200-300 слов", "planets": "подробно 250-350 слов", "forecast": "подробно 200-300 слов"}`;
    } else if (type === 'child') {
      prompt = `Ты профессиональный нумеролог и эксперт по матрице судьбы. Проанализируй детскую матрицу для ребенка с датой рождения ${data}.

Выполни глубокий анализ по следующим аспектам:

1. ТАЛАНТЫ И СПОСОБНОСТИ:
- Врожденные таланты и сильные стороны
- Творческие способности и склонности
- Интеллектуальный потенциал
- Социальные навыки и коммуникация
- Физические данные и спортивные способности

2. РЕКОМЕНДАЦИИ ПО ВОСПИТАНИЮ:
- Оптимальный подход к обучению
- Как развивать сильные стороны
- Как работать со слабыми сторонами
- Стиль общения с ребенком
- Важные моменты в воспитании

3. ПОТЕНЦИАЛ И БУДУЩЕЕ:
- Перспективные направления развития
- Подходящие профессии и сферы деятельности
- Жизненные задачи и предназначение
- Возможные вызовы и как их преодолеть

Ответ в формате JSON: {"talents": "подробное описание 200-300 слов", "education": "подробные рекомендации 200-300 слов", "potential": "детальный анализ 200-300 слов"}`;
    } else if (type === 'compatibility') {
      prompt = `Ты профессиональный нумеролог и эксперт по отношениям. Проанализируй совместимость двух людей с датами рождения ${data.date1} и ${data.date2}.

Выполни детальный анализ по следующим аспектам:

1. ОЦЕНКА СОВМЕСТИМОСТИ:
- Общий уровень совместимости (оценка из 10)
- Энергетическая совместимость
- Эмоциональная связь
- Интеллектуальное взаимопонимание
- Физическое притяжение

2. СИЛЬНЫЕ СТОРОНЫ ПАРЫ:
- Что объединяет партнеров
- Общие ценности и цели
- Взаимодополняющие качества
- Зоны гармонии и поддержки
- Совместный потенциал роста

3. ВЫЗОВЫ И СЛОЖНОСТИ:
- Возможные конфликтные зоны
- Различия в характерах
- Потенциальные проблемы
- Кармические уроки пары

4. ПРАКТИЧЕСКИЕ СОВЕТЫ:
- Как укрепить отношения
- Рекомендации по общению
- Совместные активности
- Как преодолевать разногласия
- Долгосрочные перспективы

Ответ в формате JSON: {"score": "X/10 с кратким объяснением", "strengths": "подробный анализ 200-300 слов", "challenges": "детальное описание 150-200 слов", "advice": "практические рекомендации 200-300 слов"}`;
    } else if (type === 'financial') {
      prompt = `Ты профессиональный нумеролог и эксперт по финансовой астрологии. Проанализируй финансовую матрицу для человека с датой рождения ${data}.

Выполни глубокий финансовый анализ по следующим аспектам:

1. ФИНАНСОВЫЕ СИЛЬНЫЕ СТОРОНЫ:
- Природные способности к заработку
- Денежное мышление и отношение к деньгам
- Таланты, которые можно монетизировать
- Энергия изобилия и притяжения денег
- Удачные периоды для финансов

2. ВОЗМОЖНОСТИ И НАПРАВЛЕНИЯ:
- Перспективные источники дохода
- Подходящие виды бизнеса
- Инвестиционные направления
- Партнерства и коллаборации
- Пассивный доход и накопления
- Благоприятные сферы деятельности

3. РИСКИ И ПРЕДОСТЕРЕЖЕНИЯ:
- Финансовые слабости и уязвимости
- Типичные денежные ошибки
- Периоды финансовой осторожности
- Чего избегать в деньгах
- Кармические финансовые уроки

4. ПРАКТИЧЕСКИЕ РЕКОМЕНДАЦИИ:
- Стратегия увеличения дохода
- Как правильно управлять деньгами
- Инвестиционные советы
- Развитие финансового мышления
- План действий на ближайший год
- Аффирмации и практики для изобилия

Ответ в формате JSON: {"strengths": "подробный анализ 200-300 слов", "opportunities": "детальные возможности 250-350 слов", "risks": "важные предостережения 150-200 слов", "advice": "практический план действий 250-350 слов"}`;
    }

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: 'Ты эксперт по нумерологии и матрице судьбы. Отвечай на русском языке в формате JSON.' },
          { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' },
        temperature: 1.0
      })
    });

    const completion = await response.json();
    
    if (!response.ok) {
      console.error('DeepSeek API Error:', completion);
      return res.status(500).json({ success: false, error: 'Ошибка API' });
    }

    const result = JSON.parse(completion.choices[0].message.content);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ success: false, error: 'Ошибка анализа' });
  }
});

app.post('/api/neuro-horoscope', async (req, res) => {
  if (!process.env.DEEPSEEK_API_KEY) {
    // Fallback Mock Data for Demo/Viral Preview
    console.log("Using Mock Data for Neuro-Horoscope (No API Key)");
    await new Promise(r => setTimeout(r, 3000)); // Simulate AI thinking time

    return res.json({
      success: true,
      data: {
        theme: "Год Внутренней Трансформации",
        general: "2026 год станет для тебя временем глубоких перемен. Транзит Сатурна через твой натальный сектор развития требует отпустить старое и открыться новому. Весной ожидай важные знакомства и возможности, которые изменят твой путь. Летние месяцы принесут период рефлексии — используй его для переосмысления целей. Осенью звёзды благоволят смелым решениям. Твоя интуиция в этом году будет особенно сильна — доверяй ей.",
        career: "В профессиональной сфере 2026 принесёт возможности для роста и признания. Март и сентябрь — ключевые месяцы для карьерных решений. Юпитер поддержит финансовые начинания во второй половине года. Не бойся браться за новые проекты — твои усилия будут вознаграждены. Избегай крупных трат в период ретроградного Меркурия (апрель, август).",
        love: "Для одиноких 2026 открывает двери к судьбоносным встречам — особенно в мае и октябре. Венера благоволит романтике и новым знакомствам. Тем, кто в отношениях, предстоит важный этап: честные разговоры укрепят союз, а замалчивание проблем — разрушит. Лето идеально для совместных путешествий и обновления чувств.",
        advice: "Отпусти страх перемен — то, что уходит, освобождает место для лучшего."
      }
    });
  }

  try {
    const { name, birthDate, city } = req.body;

    const prompt = `Ты — мудрый астролог с 20-летним стажем. Составь персональный прогноз на 2026 год.

Данные человека:
- Имя: ${name || 'Путешественник'}
- Дата рождения: ${birthDate}
- Город: ${city || 'Не указан'}

ВАЖНЫЕ ПРАВИЛА:
1. Прогноз должен быть УНИВЕРСАЛЬНЫМ — подходить для любого человека, любой профессии
2. НЕ упоминай конкретные сферы вроде IT, кибербезопасности, программирования, ИИ
3. Говори о жизненных сферах в целом: работа, отношения, здоровье, саморазвитие, творчество
4. Используй астрологические термины: транзиты планет, ретроградный Меркурий, влияние Юпитера и т.д.
5. Стиль: мистический, вдохновляющий, но конкретный

Ответ строго в формате JSON:
{
  "theme": "Главная тема года — короткая метафоричная фраза (3-5 слов)",
  "general": "Общий прогноз на 2026 (100-150 слов). Опиши энергетику года, ключевые периоды, на что обратить внимание. Без привязки к конкретной профессии.",
  "career": "Карьера и финансы (80-120 слов). Универсальный прогноз про работу, доход, возможности роста. Укажи благоприятные месяцы.",
  "love": "Личная жизнь и отношения (80-120 слов). Для одиноких и тех, кто в паре. Периоды романтики, важные решения.",
  "advice": "Самый важный совет на год — одно ёмкое, запоминающееся предложение"
}`;

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: 'Ты эксперт по астрологии и футурологии. Отвечай на русском языке в формате JSON.' },
          { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.8
      })
    });

    const completion = await response.json();

    if (!response.ok) {
      console.error('DeepSeek API Error:', completion);
      return res.status(500).json({ success: false, error: 'Ошибка API' });
    }

    const result = JSON.parse(completion.choices[0].message.content);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Neuro-Horoscope API Error:', error);
    res.status(500).json({ success: false, error: 'Ошибка генерации гороскопа' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});