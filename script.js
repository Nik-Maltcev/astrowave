"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const neuro2026Form = document.getElementById("neuro2026-form");
    const neuroResult = document.getElementById("neuro-result");
    const neuroContentFree = document.getElementById("neuro-content-free");

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
        
        neuroResult.style.display = "none";
        
        // Visualization Elements
        const loadingOverlay = document.getElementById('loading-overlay');
        const progressBar = document.getElementById('progress-bar');
        const loadingPercent = document.getElementById('loading-percent');
        const loadingStatus = document.getElementById('loading-status');
        
        // Show Overlay
        loadingOverlay.classList.add('active');
        let progress = 0;
        let progressInterval;

        // Progress Animation Logic
        const statuses = [
            "Инициализация нейро-протокола...",
            "Сканирование звездных карт...",
            "Синхронизация с эгрегором 2026...",
            "Расшифровка планетарных транзитов...",
            "Генерация персональной стратегии...",
            "Финальная калибровка данных..."
        ];

        // Simulate progress up to 90% while waiting
        progressInterval = setInterval(() => {
            if (progress < 90) {
                // Non-linear progress: slows down as it gets higher
                let increment = Math.max(0.5, (90 - progress) / 20);
                progress += increment;

                progressBar.style.width = `${Math.min(progress, 90)}%`;
                loadingPercent.textContent = `${Math.round(Math.min(progress, 90))}%`;

                // Change status text based on progress
                const statusIndex = Math.floor((progress / 90) * statuses.length);
                if (statuses[statusIndex]) {
                    loadingStatus.textContent = statuses[statusIndex];
                }
            }
        }, 100);

        try {
            const response = await fetch('/api/neuro-horoscope', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, birthDate, city })
            });

            const result = await response.json();

            // Finish progress
            clearInterval(progressInterval);
            progressBar.style.width = '100%';
            loadingPercent.textContent = '100%';
            loadingStatus.textContent = "Готово!";

            await new Promise(r => setTimeout(r, 500)); // Short pause at 100%

            if (result.success) {
                renderNeuroResult(result.data);
                neuroResult.style.display = "block";

                // Hide overlay
                loadingOverlay.classList.remove('active');

                // Scroll to result
                setTimeout(() => {
                    neuroResult.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 100);

                showFeedback(feedback, "", "success"); // Clear feedback
            } else {
                loadingOverlay.classList.remove('active');
                showFeedback(feedback, "Ошибка: " + result.error, "error");
            }
        } catch (error) {
            console.error('API Error:', error);
            clearInterval(progressInterval);
            loadingOverlay.classList.remove('active');
            showFeedback(feedback, "Ошибка соединения. Попробуйте позже.", "error");
        } finally {
            submitBtn.disabled = false;
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

        // CTA block - Персональная стратегия с таймером
        const ctaBlock = document.createElement('div');
        ctaBlock.className = 'strategy-cta';
        ctaBlock.innerHTML = `
            <div class="strategy-cta__glow"></div>
            <div class="strategy-cta__content">
                <div class="strategy-cta__urgent">
                    <span class="urgent-icon">🔥</span>
                    <span class="urgent-text">АКЦИЯ ИСТЕКАЕТ ЧЕРЕЗ</span>
                    <div class="countdown" id="countdown">
                        <div class="countdown__item">
                            <span class="countdown__number" id="countdown-min">15</span>
                            <span class="countdown__label">мин</span>
                        </div>
                        <span class="countdown__sep">:</span>
                        <div class="countdown__item">
                            <span class="countdown__number" id="countdown-sec">00</span>
                            <span class="countdown__label">сек</span>
                        </div>
                    </div>
                </div>
                
                <div class="strategy-cta__badge-row">
                    <span class="strategy-cta__badge">🤖 AI-АСТРОЛОГ</span>
                    <span class="strategy-cta__badge strategy-cta__badge--hot">🔥 ОСТАЛОСЬ 3 МЕСТА</span>
                </div>
                
                <h3 class="strategy-cta__title">Персональная Стратегия-План<br>на 2026 год</h3>
                
                <p class="strategy-cta__subtitle">от Нейро-Астролога, обученного на всех школах астрологии, нумерологии и таро</p>
                
                <div class="strategy-cta__features">
                    <div class="strategy-feature">
                        <span class="strategy-feature__icon">📅</span>
                        <span class="strategy-feature__text">Помесячный план действий</span>
                    </div>
                    <div class="strategy-feature">
                        <span class="strategy-feature__icon">⭐</span>
                        <span class="strategy-feature__text">Благоприятные даты для решений</span>
                    </div>
                    <div class="strategy-feature">
                        <span class="strategy-feature__icon">⚠️</span>
                        <span class="strategy-feature__text">Опасные периоды и как их пройти</span>
                    </div>
                    <div class="strategy-feature">
                        <span class="strategy-feature__icon">🎯</span>
                        <span class="strategy-feature__text">Личные точки роста и ресурсы</span>
                    </div>
                    <div class="strategy-feature">
                        <span class="strategy-feature__icon">💫</span>
                        <span class="strategy-feature__text">Ритуалы и практики под твою карту</span>
                    </div>
                </div>
                
                <div class="strategy-cta__price-block">
                    <div class="strategy-cta__price-old">
                        <span class="price-label">Обычная цена:</span>
                        <span class="price-value">1 999₽</span>
                    </div>
                    <div class="strategy-cta__price-new">
                        <span class="price-label">Сейчас всего:</span>
                        <span class="price-value">299₽</span>
                        <span class="price-save">-85%</span>
                    </div>
                </div>
                
                <a href="https://t.me/nikmaltcev" target="_blank" class="btn btn--gold strategy-cta__btn">
                    <span class="btn-icon">💬</span>
                    Написать "ПРОГНОЗ" в Telegram
                </a>
                
                <p class="strategy-cta__instruction">
                    👆 Нажми кнопку и напиши слово <strong>«ПРОГНОЗ»</strong> — получишь стратегию за 299₽
                </p>
                
                <div class="strategy-cta__trust">
                    <span>✓ Ответ в течение 5 минут</span>
                    <span>✓ Оплата после консультации</span>
                    <span>✓ Гарантия возврата</span>
                </div>
            </div>
        `;
        resultContent.appendChild(ctaBlock);

        // Start countdown timer
        startCountdown();
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

    // Countdown timer for urgency
    function startCountdown() {
        const minEl = document.getElementById('countdown-min');
        const secEl = document.getElementById('countdown-sec');
        if (!minEl || !secEl) return;

        let totalSeconds = 15 * 60; // 15 minutes

        function tick() {
            if (totalSeconds <= 0) {
                minEl.textContent = '00';
                secEl.textContent = '00';
                // Restart timer for continuous urgency
                totalSeconds = 15 * 60;
            }

            const mins = Math.floor(totalSeconds / 60);
            const secs = totalSeconds % 60;

            minEl.textContent = mins.toString().padStart(2, '0');
            secEl.textContent = secs.toString().padStart(2, '0');

            totalSeconds--;
        }

        tick();
        setInterval(tick, 1000);
    }
});
