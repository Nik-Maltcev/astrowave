"use strict";

const matrixTraits = {
    1: {
        name: "Энергия и воля",
        low: "Добавьте физической активности, чтобы поднимать личную энергетику.",
        mid: "Хороший баланс, развивайте уверенность и решительность.",
        high: "Мощный поток энергии — направляйте его в долгосрочные проекты."
    },
    2: {
        name: "Обаяние и партнёрство",
        low: "Учитесь просить поддержку и говорить о чувствах.",
        mid: "Вы умеете слышать людей, используйте это в переговорах.",
        high: "Сильная дипломатия — подходящее время для объединений."
    },
    3: {
        name: "Самовыражение",
        low: "Давайте голосу и творчеству больше пространства.",
        mid: "Лёгкость в коммуникации помогает раскрывать идеи.",
        high: "Яркий харизматичный поток — делитесь вдохновением."
    },
    4: {
        name: "Практичность",
        low: "Лишний хаос? Настройте ритуалы и распорядок.",
        mid: "Умеете сочетать устойчивость и гибкость.",
        high: "Сильно выраженный фундамент — можно строить крупные планы."
    },
    5: {
        name: "Личность",
        low: "Задайте себе вопрос: что приносит радость? Возвращайтесь к себе.",
        mid: "Выдержанный внутренний стержень помогает держать курс.",
        high: "Яркий характер — будьте примером, вдохновляйте других."
    },
    6: {
        name: "Ответственность",
        low: "Завершайте начатое, даже если хочется отложить.",
        mid: "Хорошее чувство долга и надёжности.",
        high: "Вы способны вести команды и поддерживать семью."
    },
    7: {
        name: "Удача и духовность",
        low: "Поддерживайте связь с интуицией и символами.",
        mid: "Вы умеете ловить знаки и вдохновение.",
        high: "Сильная интуиция — прислушивайтесь к внутренним голосам."
    },
    8: {
        name: "Материализация",
        low: "Ставьте конкретные финансовые цели.",
        mid: "Умеете чувствовать баланс ресурсов.",
        high: "Высокий потенциал изобилия — планируйте инвестиции."
    },
    9: {
        name: "Миссия и гуманизм",
        low: "Определите, кому и чем хотите помогать.",
        mid: "Вы видите картину шире и чувствуете людей.",
        high: "Готовность вести за собой по пути служения."
    }
};

const zodiacProfiles = [
    {
        name: "Овен",
        start: "03-21",
        end: "04-19",
        element: "Огонь",
        ruler: "Марс",
        description: "Импульс лидера и желание врываться в новое.",
        focus: "Берите инициативу в руки, но дозируйте темп.",
        ritual: "Утренний список целей зарядит решимость.",
        talisman: "красная свеча, гранат"
    },
    {
        name: "Телец",
        start: "04-20",
        end: "05-20",
        element: "Земля",
        ruler: "Венера",
        description: "Стремление к стабильности и наслаждению жизнью.",
        focus: "Создайте уют и подкрепите намерения практичностью.",
        ritual: "Ранний завтрак в тишине — настройка на ресурсы.",
        talisman: "розовый кварц, аромат сандала"
    },
    {
        name: "Близнецы",
        start: "05-21",
        end: "06-20",
        element: "Воздух",
        ruler: "Меркурий",
        description: "Две стороны личности и жажда информации.",
        focus: "Обновите окружение, общайтесь с единомышленниками.",
        ritual: "Ведите дневник идей и инсайтов.",
        talisman: "александрит, перо"
    },
    {
        name: "Рак",
        start: "06-21",
        end: "07-22",
        element: "Вода",
        ruler: "Луна",
        description: "Глубокая эмпатия и потребность в безопасности.",
        focus: "Уделите внимание дому и близкому кругу.",
        ritual: "Вечер с ароматом ванили и свечами заземлит эмоции.",
        talisman: "лунный камень, семейный амулет"
    },
    {
        name: "Лев",
        start: "07-23",
        end: "08-22",
        element: "Огонь",
        ruler: "Солнце",
        description: "Блистательная харизма и стремление сиять.",
        focus: "Подготовьте сцену, где ваша энергия заметна.",
        ritual: "Аффирмации перед зеркалом активируют уверенность.",
        talisman: "янтарь, золотой кулон"
    },
    {
        name: "Дева",
        start: "08-23",
        end: "09-22",
        element: "Земля",
        ruler: "Меркурий",
        description: "Любовь к порядку и желание совершенства.",
        focus: "Оптимизируйте процессы, доводите детали.",
        ritual: "Планер с расстановкой задач снимет тревоги.",
        talisman: "яшма, евкалиптовый аромат"
    },
    {
        name: "Весы",
        start: "09-23",
        end: "10-22",
        element: "Воздух",
        ruler: "Венера",
        description: "Гармония и красота через взаимодействие.",
        focus: "Устанавливайте честный диалог и ищите баланс.",
        ritual: "Запишите благодарности для выравнивания энергии.",
        talisman: "лабродарит, парфюм с пионом"
    },
    {
        name: "Скорпион",
        start: "10-23",
        end: "11-21",
        element: "Вода",
        ruler: "Плутон",
        description: "Глубина, трансформация и мощный фокус.",
        focus: "Работайте с тем, что хочется изменить радикально.",
        ritual: "Медитация на отпускание прошлого очищает поле.",
        talisman: "обсидиан, чёрный турмалин"
    },
    {
        name: "Стрелец",
        start: "11-22",
        end: "12-21",
        element: "Огонь",
        ruler: "Юпитер",
        description: "Энергия смысла и открытия горизонтов.",
        focus: "Задайте амбициозную цель и сделайте шаг к ней.",
        ritual: "Утреннее чтение мотивационных текстов расширит взгляды.",
        talisman: "аметист, путевой дневник"
    },
    {
        name: "Козерог",
        start: "12-22",
        end: "01-19",
        element: "Земля",
        ruler: "Сатурн",
        description: "Дисциплина, статус и жажда результата.",
        focus: "Структурируйте проект и поставьте контрольные точки.",
        ritual: "Вечерний чек-лист успехов подпитывает мотивацию.",
        talisman: "гематит, часы"
    },
    {
        name: "Водолей",
        start: "01-20",
        end: "02-18",
        element: "Воздух",
        ruler: "Уран",
        description: "Свобода, оригинальность и будущие идеи.",
        focus: "Экспериментируйте и объединяйтесь с сообществами.",
        ritual: "Мозговой штурм с друзьями разгонит вдохновение.",
        talisman: "бирюза, символ молнии"
    },
    {
        name: "Рыбы",
        start: "02-19",
        end: "03-20",
        element: "Вода",
        ruler: "Нептун",
        description: "Мягкость, интуиция и сопереживание.",
        focus: "Включите творчество и практики исцеления.",
        ritual: "Музыка и дыхание помогут настроиться на волну.",
        talisman: "аквамарин, аромат лаванды"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("astro-form");
    const childForm = document.getElementById("child-form");
    const compatibilityForm = document.getElementById("compatibility-form");
    const financialForm = document.getElementById("financial-form");
    const matrixGrid = document.querySelector(".matrix-grid");
    const matrixHighlights = document.querySelector(".matrix-highlights");
    const natalSummary = document.querySelector(".natal-summary");
    const natalRecommendations = document.querySelector(".natal-recommendations");
    const premiumSection = document.querySelector(".premium-section");

    renderMatrixPlaceholder(matrixGrid);
    renderNatalPlaceholder(natalSummary, natalRecommendations);

    document.querySelectorAll('.matrix-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabType = tab.dataset.tab;
            document.querySelectorAll('.matrix-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.matrix-form').forEach(f => f.classList.remove('active'));
            tab.classList.add('active');
            document.querySelector(`[data-form="${tabType}"]`).classList.add('active');
            premiumSection.style.display = 'none';
        });
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const feedback = form.querySelector(".form-feedback");
        const birthDate = form["birth-date"].value;
        const birthTime = form["birth-time"].value;
        const name = form["name"].value.trim();
        const place = form["birth-place"].value.trim();

        if (!birthDate) {
            showFeedback(feedback, "Укажите дату рождения — без неё космос молчит.", "error");
            return;
        }

        const matrixData = buildDestinyMatrix(birthDate);
        renderMatrix(matrixGrid, matrixData);
        renderMatrixHighlights(matrixHighlights, matrixData, name);

        const natalData = buildNatalProfile(birthDate, birthTime, place, matrixData, name);
        renderNatalSummary(natalSummary, natalData);
        renderNatalRecommendations(natalRecommendations, natalData);

        showFeedback(feedback, "Расчёт обновлён. Космическая волна поймана!", "success");
        premiumSection.style.display = 'none';
    });

    childForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const feedback = childForm.querySelector(".form-feedback");
        const birthDate = childForm["child-date"].value;
        const name = childForm["child-name"].value.trim();

        if (!birthDate) {
            showFeedback(feedback, "Укажите дату рождения ребенка", "error");
            return;
        }

        const matrixData = buildDestinyMatrix(birthDate);
        renderMatrix(matrixGrid, matrixData);
        renderMatrixHighlights(matrixHighlights, matrixData, name || "ребенка");
        
        natalSummary.innerHTML = '<p style="color: var(--text-muted);">Базовый расчет выполнен</p>';
        natalRecommendations.innerHTML = '';

        showFeedback(feedback, "Базовый расчет готов", "success");
        showPremiumSection('child', birthDate);
    });

    compatibilityForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const feedback = compatibilityForm.querySelector(".form-feedback");
        const date1 = compatibilityForm["person1-date"].value;
        const date2 = compatibilityForm["person2-date"].value;

        if (!date1 || !date2) {
            showFeedback(feedback, "Укажите обе даты рождения", "error");
            return;
        }

        matrixGrid.innerHTML = '<p style="padding: 20px; text-align: center; color: var(--text-muted);">Базовый расчет совместимости</p>';
        matrixHighlights.innerHTML = '<div><dt>Даты</dt><dd>Первый: ' + date1 + '<br>Второй: ' + date2 + '</dd></div>';
        natalSummary.innerHTML = '';
        natalRecommendations.innerHTML = '';

        showFeedback(feedback, "Базовый расчет готов", "success");
        showPremiumSection('compatibility', { date1, date2 });
    });

    financialForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const feedback = financialForm.querySelector(".form-feedback");
        const birthDate = financialForm["financial-date"].value;
        const name = financialForm["financial-name"].value.trim();

        if (!birthDate) {
            showFeedback(feedback, "Укажите дату рождения", "error");
            return;
        }

        const matrixData = buildDestinyMatrix(birthDate);
        renderMatrix(matrixGrid, matrixData);
        matrixHighlights.innerHTML = '<div><dt>Финансовая матрица</dt><dd>Базовый расчет для ' + (name || 'пользователя') + '</dd></div>';
        natalSummary.innerHTML = '';
        natalRecommendations.innerHTML = '';

        showFeedback(feedback, "Базовый расчет готов", "success");
        showPremiumSection('financial', birthDate);
    });

    document.addEventListener('click', async (e) => {
        if (e.target.classList.contains('unlock-btn')) {
            const type = e.target.dataset.type;
            const data = e.target.dataset.data ? JSON.parse(e.target.dataset.data) : {};
            await unlockPremium(type, data);
        }
    });
});

function showPremiumSection(type, data) {
    const premiumSection = document.querySelector('.premium-section');
    const unlockBtn = premiumSection.querySelector('.unlock-btn');
    unlockBtn.dataset.type = type;
    unlockBtn.dataset.data = JSON.stringify(data);
    premiumSection.style.display = 'block';
    premiumSection.querySelector('.premium-content').style.display = 'none';
    premiumSection.querySelector('.premium-preview').style.display = 'block';
}

async function unlockPremium(type, data) {
    const premiumSection = document.querySelector('.premium-section');
    const premiumContent = premiumSection.querySelector('.premium-content');
    const premiumPreview = premiumSection.querySelector('.premium-preview');

    premiumPreview.innerHTML = '<p style="color: var(--text-muted);">⏳ Генерируем анализ...</p>';

    try {
        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type, data })
        });

        const result = await response.json();

        if (result.success) {
            premiumPreview.style.display = 'none';
            premiumContent.style.display = 'block';
            
            let html = '';
            Object.entries(result.data).forEach(([key, value]) => {
                html += `<div style="margin-bottom: 20px;"><h4>${formatKey(key)}</h4><p>${value}</p></div>`;
            });
            premiumContent.innerHTML = html;
        } else {
            premiumPreview.innerHTML = '<p style="color: var(--danger);">❌ ' + result.error + '</p>';
        }
    } catch (error) {
        premiumPreview.innerHTML = '<p style="color: var(--danger);">❌ Ошибка подключения к серверу</p>';
    }
}

function formatKey(key) {
    const map = {
        talents: 'Таланты',
        education: 'Воспитание',
        potential: 'Потенциал',
        score: 'Оценка совместимости',
        strengths: 'Сильные стороны',
        challenges: 'Вызовы',
        advice: 'Рекомендации',
        opportunities: 'Возможности',
        risks: 'Риски'
    };
    return map[key] || key;
}

function renderMatrixPlaceholder(container) {
    const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    container.innerHTML = "";
    digits.forEach((digit) => {
        const cell = document.createElement("div");
        cell.className = "matrix-cell";
        cell.innerHTML = `
            <span class="matrix-cell__digit">${digit}</span>
            <span class="matrix-cell__value">—</span>
        `;
        container.appendChild(cell);
    });
}

function renderNatalPlaceholder(summaryContainer, recommendationsContainer) {
    summaryContainer.innerHTML = `
        <div class="natal-summary__item">
            <span class="natal-summary__label">Готовность карты</span>
            <span class="natal-summary__value">Ожидаем данные</span>
            <span class="natal-summary__hint">Введите дату и время рождения, чтобы увидеть расшифровку.</span>
        </div>
    `;
    recommendationsContainer.innerHTML = `
        <div class="recommendation-card">
            <strong>Совет</strong>
            <span>Поймайте момент вдохновения, запишите намерение в блокнот — это станет точкой отсчёта.</span>
        </div>
    `;
}

function buildDestinyMatrix(isoDate) {
    const cleanDigits = isoDate.replace(/\D/g, "").split("").map(Number);
    const day = Number(isoDate.slice(8, 10));
    const dayFirstDigit = Number(String(day)[0]);
    const s1 = cleanDigits.reduce((acc, digit) => acc + digit, 0);
    const s2 = reduceNumber(s1);
    const s3 = Math.abs(s1 - 2 * dayFirstDigit);
    const s4 = reduceNumber(s3);

    const allDigits = [
        ...cleanDigits,
        ...splitNumber(s1),
        ...splitNumber(s2),
        ...splitNumber(s3),
        ...splitNumber(s4)
    ];

    const counts = Object.fromEntries(Array.from({ length: 9 }, (_, i) => [i + 1, 0]));
    allDigits.forEach((digit) => {
        if (digit >= 1 && digit <= 9) {
            counts[digit] += 1;
        }
    });

    const lifePath = reduceNumber(s1);
    const birthNumber = reduceNumber(day);
    const month = Number(isoDate.slice(5, 7));
    const maturityNumber = reduceNumber(day + month + Number(isoDate.slice(0, 4)));

    const strong = Object.keys(counts).filter((digit) => counts[digit] >= 3).map(Number);
    const latent = Object.keys(counts).filter((digit) => counts[digit] === 0).map(Number);

    return {
        counts,
        lifePath,
        birthNumber,
        maturityNumber,
        strong,
        latent
    };
}

function renderMatrix(container, data) {
    container.innerHTML = "";
    for (let digit = 1; digit <= 9; digit += 1) {
        const cell = document.createElement("div");
        cell.className = "matrix-cell";
        const count = data.counts[digit];
        const value = count > 0 ? String(digit).repeat(count) : "—";
        cell.innerHTML = `
            <span class="matrix-cell__digit">${digit}</span>
            <span class="matrix-cell__value">${value}</span>
        `;
        container.appendChild(cell);
    }
}

function renderMatrixHighlights(container, data, rawName) {
    const name = rawName ? capitalize(rawName) : "космический путешественник";
    const strongText = data.strong.length
        ? data.strong.map((digit) => matrixTraits[digit].name).join(", ")
        : "Баланс без ярко выраженных линий, сила распределена равномерно.";
    const latentText = data.latent.length
        ? data.latent.map((digit) => matrixTraits[digit].name.toLowerCase()).join(", ")
        : "Все качества активны — поддерживайте их практикой.";

    const destinyAdvice = interpretLifePath(data.lifePath);

    container.innerHTML = `
        <div>
            <dt>Число судьбы ${name}</dt>
            <dd>${data.lifePath}. ${destinyAdvice}</dd>
        </div>
        <div>
            <dt>Сильные стороны</dt>
            <dd>${strongText}</dd>
        </div>
        <div>
            <dt>Зоны роста</dt>
            <dd>${latentText}</dd>
        </div>
        <div>
            <dt>Число зрелости</dt>
            <dd>${data.maturityNumber}. Это вибрация, к которой вы приходите осознанно — используйте её как компас.</dd>
        </div>
    `;
}

function buildNatalProfile(isoDate, time, place, matrixData, rawName) {
    const sunProfile = getZodiacProfile(isoDate);
    const now = new Date();
    const currentYear = now.getFullYear();
    const month = Number(isoDate.slice(5, 7));
    const day = Number(isoDate.slice(8, 10));
    const personalYear = reduceNumber(day + month + currentYear);
    const soulfulNumber = matrixData.birthNumber;
    const name = rawName ? capitalize(rawName) : "Гость Astro Wave";

    return {
        name,
        sun: sunProfile,
        lifePath: matrixData.lifePath,
        personalYear,
        soulfulNumber,
        timeEnergy: interpretTimeEnergy(time),
        place: place || "где родился свет",
        elementMessage: getElementMessage(sunProfile.element),
        rulerMessage: `${sunProfile.ruler} помогает ${sunProfile.focus.toLowerCase()}.`,
        recommendations: [
            { title: "Стихия", text: getElementMessage(sunProfile.element) },
            { title: "Фокус недели", text: sunProfile.focus },
            { title: "Ритуал", text: sunProfile.ritual },
            { title: "Талисман", text: `Возьмите ${sunProfile.talisman} — они усиливают вибрацию знака.` }
        ]
    };
}

function renderNatalSummary(container, data) {
    container.innerHTML = `
        <div class="natal-summary__item">
            <span class="natal-summary__label">Солнечный знак</span>
            <span class="natal-summary__value">${data.sun.name}</span>
            <span class="natal-summary__hint">${data.sun.description}</span>
        </div>
        <div class="natal-summary__item">
            <span class="natal-summary__label">Личное солнце</span>
            <span class="natal-summary__value">Число судьбы ${data.lifePath}</span>
            <span class="natal-summary__hint">${interpretLifePath(data.lifePath)}</span>
        </div>
        <div class="natal-summary__item">
            <span class="natal-summary__label">Личный год</span>
            <span class="natal-summary__value">${data.personalYear}</span>
            <span class="natal-summary__hint">В этом году важно: ${interpretPersonalYear(data.personalYear)}.</span>
        </div>
        <div class="natal-summary__item">
            <span class="natal-summary__label">Энергия времени</span>
            <span class="natal-summary__value">${data.timeEnergy.title}</span>
            <span class="natal-summary__hint">${data.timeEnergy.message}</span>
        </div>
    `;
}

function renderNatalRecommendations(container, data) {
    container.innerHTML = "";
    data.recommendations.forEach((item) => {
        const card = document.createElement("div");
        card.className = "recommendation-card";
        card.innerHTML = `
            <strong>${item.title}</strong>
            <span>${item.text}</span>
        `;
        container.appendChild(card);
    });
}

function describeTrait(digit, count) {
    const trait = matrixTraits[digit];
    if (!trait) {
        return "";
    }
    if (count === 0) {
        return trait.low;
    }
    if (count <= 2) {
        return trait.mid;
    }
    return trait.high;
}
function showFeedback(container, message, type) {
    container.textContent = message;
    container.classList.remove("form-feedback--error", "form-feedback--success");
    if (type === "error") {
        container.classList.add("form-feedback--error");
    }
    if (type === "success") {
        container.classList.add("form-feedback--success");
    }
}

function reduceNumber(number) {
    let value = number;
    while (value > 22 || (value > 9 && value !== 11 && value !== 22)) {
        value = splitNumber(value).reduce((acc, digit) => acc + digit, 0);
    }
    return value;
}

function splitNumber(number) {
    return String(Math.abs(number)).split("").map(Number);
}

function getZodiacProfile(isoDate) {
    const monthDay = isoDate.slice(5);
    return zodiacProfiles.find((profile) => isWithinRange(monthDay, profile.start, profile.end));
}

function isWithinRange(monthDay, start, end) {
    if (start <= end) {
        return monthDay >= start && monthDay <= end;
    }
    // Диапазон через новый год (например, Козерог)
    return monthDay >= start || monthDay <= end;
}

function interpretLifePath(lifePath) {
    const interpretations = {
        1: "Быть первопроходцем и вести за собой.",
        2: "Строить мосты и объединять людей.",
        3: "Вдохновлять через творчество и идеи.",
        4: "Создавать устойчивые системы и фундамент.",
        5: "Исследовать новое и делиться опытом.",
        6: "Заботиться и создавать гармонию вокруг.",
        7: "Познавать глубину и искать истину.",
        8: "Управлять ресурсами и создавать изобилие.",
        9: "Служить миру и расширять горизонты души.",
        11: "Проводить свет и вдохновение для других.",
        22: "Материализовывать масштабные мечты."
    };
    return interpretations[lifePath] || "Следуйте зову сердца и наблюдайте за циклами.";
}

function interpretPersonalYear(number) {
    const mapping = {
        1: "закладывать новое и смело стартовать",
        2: "укреплять союзы и искать союзников",
        3: "проявляться творчески и делиться голосом",
        4: "строить структуру и финансовый фундамент",
        5: "менять формат жизни и путешествовать",
        6: "заботиться о близких и улучшать пространство",
        7: "учиться, медитировать и исследовать внутренний мир",
        8: "работать с карьерой и ресурсами",
        9: "завершать проекты и готовиться к новому циклу",
        11: "слушать интуицию и делиться вдохновением",
        22: "масштабировать идеи и строить долгосрочные проекты"
    };
    return mapping[number] || "проживать год в исследовательском режиме";
}

function getElementMessage(element) {
    const messages = {
        "Огонь": "Поддерживайте тело в тонусе — смелые шаги зажигают удачу.",
        "Земля": "Ставьте конкретные цели и закрепляйте результаты на практике.",
        "Воздух": "Делитесь идеями и окружайте себя людьми, которые вдохновляют.",
        "Вода": "Позвольте себе чувствовать — интуиция подскажет верный вектор."
    };
    return messages[element] || "Прислушивайтесь к природным ритмам — они подскажут направление.";
}

function interpretTimeEnergy(time) {
    if (!time) {
        return {
            title: "Интуитивный режим",
            message: "Нет точного времени? Ведите себя по ощущениям — интуиция выведет на нужный темп."
        };
    }
    const [hourString] = time.split(":");
    const hour = Number(hourString);
    if (hour >= 5 && hour < 11) {
        return {
            title: "Энергия рассвета",
            message: "Утренняя концентрация даёт преимущество — планируйте стратегию и ставьте намерения."
        };
    }
    if (hour >= 11 && hour < 17) {
        return {
            title: "Энергия дня",
            message: "Вы заряжены на социальные контакты и деловые встречи — используйте время для переговоров."
        };
    }
    if (hour >= 17 && hour < 22) {
        return {
            title: "Энергия заката",
            message: "Лучшее время, чтобы подвести итоги, уделить внимание близким и себе."
        };
    }
    return {
        title: "Энергия полуночи",
        message: "Вы тонко чувствуете невидимые процессы — медитируйте, записывайте сны и инсайты."
    };
}

function capitalize(text) {
    if (!text) {
        return text;
    }
    return text.charAt(0).toUpperCase() + text.slice(1);
}






