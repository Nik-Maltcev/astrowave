from playwright.sync_api import sync_playwright

def verify_neuro_landing():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the landing page
        page.goto("http://localhost:3000")

        # 1. Take a screenshot of the Hero/Landing
        page.screenshot(path="verification/landing_hero.png")
        print("Captured landing_hero.png")

        # 2. Fill out the form
        page.fill("#neuro-name", "Neo")
        page.fill("#neuro-date", "1999-03-31")
        page.fill("#neuro-city", "Zion")

        # Mock the API response to avoid hitting real DeepSeek API and waiting
        page.route("/api/neuro-horoscope", lambda route: route.fulfill(
            status=200,
            content_type="application/json",
            body='''{
                "success": true,
                "data": {
                    "theme": "Digital Renaissance",
                    "general": "2026 brings a fusion of biology and silicon. Your path aligns with data streams.",
                    "career": "Quantum computing needs your intuitive logic.",
                    "love": "Connect with someone who vibrates on the same frequency.",
                    "advice": "Follow the white rabbit."
                }
            }'''
        ))

        # Submit
        page.click("button[type='submit']")

        # Wait for result container
        page.wait_for_selector("#neuro-result", state="visible")

        # 3. Take a screenshot of the Result (Teaser + Locked)
        page.screenshot(path="verification/neuro_result_locked.png")
        print("Captured neuro_result_locked.png")

        # 4. Click Unlock (Simulate payment)
        page.click("#unlock-btn")

        # Wait for unlock animation/class (we added class 'unlocked')
        page.wait_for_selector(".neuro-content-locked.unlocked")

        # 5. Take screenshot of Unlocked state
        page.screenshot(path="verification/neuro_result_unlocked.png")
        print("Captured neuro_result_unlocked.png")

        browser.close()

if __name__ == "__main__":
    verify_neuro_landing()
