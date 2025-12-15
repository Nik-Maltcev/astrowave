"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const neuro2026Form = document.getElementById("neuro2026-form");
    const neuroResult = document.getElementById("neuro-result");
    const neuroContentFree = document.getElementById("neuro-content-free");
    const neuroContentLocked = document.getElementById("neuro-content-locked");
    const neuroContentBlurred = document.getElementById("neuro-content-blurred");
    const unlockBtn = document.getElementById("unlock-btn");

    // Preload sound effects or analytics if needed

    neuro2026Form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const feedback = neuro2026Form.querySelector(".form-feedback");
        const submitBtn = neuro2026Form.querySelector("button[type='submit']");

        const name = neuro2026Form["neuro-name"].value.trim();
        const birthDate = neuro2026Form["neuro-date"].value;
        const city = neuro2026Form["neuro-city"].value.trim();

        if (!birthDate) {
            showFeedback(feedback, "Пожалуйста, укажите дату рождения", "error");
            return;
        }

        // Lock form during submission
        submitBtn.disabled = true;
        submitBtn.querySelector(".btn-text").textContent = "Нейросеть думает...";
        submitBtn.classList.add("pulse");
        
        neuroResult.style.display = "none";
        
        // Reset locked state
        neuroContentLocked.classList.remove("unlocked");
        
        try {
            showFeedback(feedback, "Соединение с AI-сервером...", "success");

            // Artificial delay for "processing" feel
            await new Promise(r => setTimeout(r, 1500));

            const response = await fetch('/api/neuro-horoscope', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, birthDate, city })
            });

            const result = await response.json();

            if (result.success) {
                renderNeuroResult(result.data);
                neuroResult.style.display = "block";

                // Scroll to result
                setTimeout(() => {
                    neuroResult.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 100);

                showFeedback(feedback, "", "success"); // Clear feedback
            } else {
                showFeedback(feedback, "Ошибка: " + result.error, "error");
            }
        } catch (error) {
            console.error('API Error:', error);
            showFeedback(feedback, "Ошибка соединения. Попробуйте позже.", "error");
        } finally {
            submitBtn.disabled = false;
            submitBtn.querySelector(".btn-text").textContent = "Сгенерировать будущее";
            submitBtn.classList.remove("pulse");
        }
    });

    unlockBtn.addEventListener("click", async () => {
        unlockBtn.disabled = true;
        unlockBtn.textContent = "Обработка платежа...";

        // Simulate payment processing
        await new Promise(r => setTimeout(r, 1500));

        neuroContentLocked.classList.add("unlocked");
        unlockBtn.textContent = "Успешно!";

        // Populate the blurred content with real data if it was hidden,
        // or just reveal it if it was already there but blurred.
        // In this implementation, we will reveal the already rendered (but hidden/blurred) content.
    });

    function renderNeuroResult(data) {
        // Clear previous
        neuroContentFree.innerHTML = '';
        neuroContentBlurred.innerHTML = '';

        // 1. Visible Content (Theme + General Vibe)
        const themeBlock = document.createElement('div');
        themeBlock.className = 'neuro-item';
        themeBlock.innerHTML = `
            <span class="neuro-section-title">Главная тема 2026</span>
            <h2 class="neuro-main-theme">«${data.theme}»</h2>
            <div class="neuro-text-block">${data.general}</div>
        `;
        neuroContentFree.appendChild(themeBlock);

        // 2. Locked Content (Career, Love, Advice) - Rendered but blurred
        // We render this immediately into the blurred container

        const careerBlock = createLockedSection('Карьера и Финансы 🚀', data.career, '#7e4bf4');
        const loveBlock = createLockedSection('Любовь и Отношения ❤️', data.love, '#dd5f5f');
        const adviceBlock = createLockedSection('Секретный Совет 🗝', data.advice, '#d4af37', true);

        neuroContentBlurred.appendChild(careerBlock);
        neuroContentBlurred.appendChild(loveBlock);
        neuroContentBlurred.appendChild(adviceBlock);
    }

    function createLockedSection(title, content, color, isItalic = false) {
        const div = document.createElement('div');
        div.style.marginBottom = '24px';

        const h4 = document.createElement('h4');
        h4.style.color = color;
        h4.style.fontSize = '18px';
        h4.style.marginBottom = '12px';
        h4.style.textTransform = 'uppercase';
        h4.style.letterSpacing = '0.05em';
        h4.textContent = title;

        const p = document.createElement('p');
        p.style.lineHeight = '1.8';
        p.style.color = 'var(--text-muted)';
        p.textContent = content;

        if (isItalic) {
            p.style.fontStyle = 'italic';
            p.style.borderLeft = `3px solid ${color}`;
            p.style.paddingLeft = '16px';
            p.style.background = 'rgba(255,255,255,0.03)';
            p.style.padding = '16px';
            p.style.borderRadius = '0 8px 8px 0';
        }

        div.appendChild(h4);
        div.appendChild(p);
        return div;
    }

    function showFeedback(container, message, type) {
        container.textContent = message;
        container.className = 'form-feedback'; // Reset
        if (type) {
            container.classList.add(`form-feedback--${type}`);
        }
    }
});
