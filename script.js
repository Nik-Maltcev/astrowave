"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const neuro2026Form = document.getElementById("neuro2026-form");
    const neuroResult = document.getElementById("neuro-result");
    const neuroContentFree = document.getElementById("neuro-content-free");
    const neuroContentLocked = document.getElementById("neuro-content-locked");
    const neuroContentBlurred = document.getElementById("neuro-content-blurred");
    const unlockBtn = document.getElementById("unlock-btn");

    // Generate animated stars
    generateStars();
    
    // Animate stats counter
    animateCounter();

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

    function renderNeuroResult(data) {
        const resultContent = document.getElementById("neuro-content-free");
        resultContent.innerHTML = '';

        // Theme block
        const themeBlock = document.createElement('div');
        themeBlock.className = 'neuro-item';
        themeBlock.innerHTML = `
            <span class="neuro-section-title">Главная тема 2026</span>
            <h2 class="neuro-main-theme">«${data.theme}»</h2>
            <div class="neuro-text-block">${data.general}</div>
        `;
        resultContent.appendChild(themeBlock);

        // Career block
        const careerBlock = createSection('Карьера и Финансы', '💼', data.career, '#8b5cf6');
        resultContent.appendChild(careerBlock);

        // Love block
        const loveBlock = createSection('Любовь и Отношения', '💜', data.love, '#ec4899');
        resultContent.appendChild(loveBlock);

        // Advice block
        const adviceBlock = createSection('Секретный Совет', '🗝️', data.advice, '#c9a227', true);
        resultContent.appendChild(adviceBlock);

        // CTA block - Персональная стратегия
        const ctaBlock = document.createElement('div');
        ctaBlock.className = 'strategy-cta';
        ctaBlock.innerHTML = `
            <div class="strategy-cta__glow"></div>
            <div class="strategy-cta__content">
                <span class="strategy-cta__badge">🌟 ЭКСКЛЮЗИВ</span>
                <h3 class="strategy-cta__title">Персональная стратегия-план на 2026</h3>
                <p class="strategy-cta__desc">Получи детальный пошаговый план действий на каждый месяц года: когда начинать проекты, когда отдыхать, благоприятные даты для важных решений</p>
                <ul class="strategy-cta__list">
                    <li>✓ Помесячный план действий</li>
                    <li>✓ Благоприятные и опасные даты</li>
                    <li>✓ Персональные ритуалы и практики</li>
                    <li>✓ PDF-файл навсегда</li>
                </ul>
                <div class="strategy-cta__price">
                    <span class="strategy-cta__old-price">599₽</span>
                    <span class="strategy-cta__new-price">299₽</span>
                </div>
                <a href="#" class="btn btn--gold strategy-cta__btn" id="buy-strategy-btn">
                    Получить стратегию ✨
                </a>
                <p class="strategy-cta__note">🔒 Безопасная оплата • Мгновенная доставка на email</p>
            </div>
        `;
        resultContent.appendChild(ctaBlock);
    }

    function createSection(title, icon, content, color, isHighlight = false) {
        const div = document.createElement('div');
        div.className = 'neuro-section-block' + (isHighlight ? ' neuro-section-block--highlight' : '');

        div.innerHTML = `
            <h4 class="neuro-block-title" style="color: ${color}">
                <span>${icon}</span> ${title}
            </h4>
            <p class="neuro-block-text">${content}</p>
        `;

        return div;
    }

    function showFeedback(container, message, type) {
        container.textContent = message;
        container.className = 'form-feedback'; // Reset
        if (type) {
            container.classList.add(`form-feedback--${type}`);
        }
    }

    // Generate starfield
    function generateStars() {
        const starsContainer = document.getElementById('stars');
        if (!starsContainer) return;
        
        const starCount = 80;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Random position
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            
            // Random size
            if (Math.random() > 0.8) star.classList.add('large');
            if (Math.random() > 0.9) star.classList.add('bright');
            
            // Random animation delay
            star.style.animationDelay = Math.random() * 3 + 's';
            star.style.animationDuration = (2 + Math.random() * 3) + 's';
            
            starsContainer.appendChild(star);
        }
    }

    // Animate counter on page load
    function animateCounter() {
        const counter = document.getElementById('stats-counter');
        if (!counter) return;
        
        const target = 14832;
        const duration = 2000;
        const start = Date.now();
        
        function update() {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            
            counter.textContent = current.toLocaleString('ru-RU');
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        update();
    }
});
