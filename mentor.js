document.addEventListener('DOMContentLoaded', () => {
    const btnAnalyze = document.getElementById('btn-analyze');
    const mentorAvatar = document.getElementById('mentor-avatar');
    const mentorBox = document.getElementById('mentor-box');
    const mentorContent = document.getElementById('mentor-content');
    const typingCursor = document.getElementById('typing-cursor');

    if (btnAnalyze) {
        btnAnalyze.addEventListener('click', () => {
            // Hide button, show analyzing state
            btnAnalyze.style.display = 'none';
            mentorAvatar.classList.add('analyzing');
            mentorBox.style.display = 'block';
            mentorContent.innerHTML = '<p class="text-secondary text-center"><i>Accessing FITMOB database... analyzing metrics...</i></p>';
            
            // Simulate API / DB delay
            setTimeout(() => {
                mentorAvatar.classList.remove('analyzing');
                generateReport();
            }, 2500);
        });
    }

    function generateReport() {
        const username = localStorage.getItem('fitmob_user') || 'Athlete';
        const xp = parseInt(localStorage.getItem('fitmob_xp')) || 0;
        
        const dailyActivityRaw = localStorage.getItem('fitmob_daily_activity');
        let water = 0, sleep = 0, nutrition = 0, workout = false;
        if (dailyActivityRaw) {
            const daily = JSON.parse(dailyActivityRaw);
            water = daily.water || 0;
            sleep = daily.sleep || 0;
            nutrition = daily.nutrition || 0;
            workout = daily.workout > 0; // Ensure it correctly converts hours > 0 to a boolean
        }
        const nutritionTarget = parseInt(localStorage.getItem('fitmob_nutrition_target')) || 2500;

        // Build the text
        let reportText = `Greetings, <span class="highlight fw-bold">${username}</span>. I have analyzed your recent activity metrics.<br><br>`;
        
        // Hydration Logic
        if (water >= 8) {
            reportText += `💧 <strong>Hydration:</strong> Outstanding. You've hit your water intake goal. Proper hydration is the foundation of peak performance.<br><br>`;
        } else if (water >= 4) {
            reportText += `💧 <strong>Hydration:</strong> You are halfway to your daily water goal. Keep drinking to ensure your muscles recover properly.<br><br>`;
        } else {
            reportText += `💧 <strong>Hydration:</strong> WARNING. You are severely dehydrated today. Water transports nutrients to your muscles; drink immediately.<br><br>`;
        }

        // Sleep Logic
        if (sleep >= 7) {
            reportText += `💤 <strong>Recovery:</strong> Excellent rest last night. Your CNS (Central Nervous System) is primed for today's physical demands.<br><br>`;
        } else if (sleep > 0) {
            reportText += `💤 <strong>Recovery:</strong> Sub-optimal sleep detected. Sleep is when growth hormone is released. Prioritize at least 7 hours tonight.<br><br>`;
        } else {
            reportText += `💤 <strong>Recovery:</strong> You haven't logged your sleep yet. Remember, you grow in bed, not in the gym.<br><br>`;
        }

        // Workout Logic
        if (workout) {
            reportText += `💪 <strong>Activity:</strong> Workout logged! Consistency is the only metric that guarantees success. Well done.<br><br>`;
        } else {
            reportText += `💪 <strong>Activity:</strong> No workout logged yet today. Even 15 minutes of mobility work counts. Don't break the habit.<br><br>`;
        }

        // Nutrition Logic
        if (nutrition >= nutritionTarget) {
            reportText += `🍏 <strong>Nutrition:</strong> You have hit your caloric target of ${nutritionTarget} kcal! Fueling your body correctly is 80% of the battle.<br><br>`;
        } else if (nutrition > 0) {
            reportText += `🍏 <strong>Nutrition:</strong> You've logged ${nutrition} kcal so far. Keep tracking to ensure you hit your ${nutritionTarget} kcal target for optimal results.<br><br>`;
        } else {
            reportText += `🍏 <strong>Nutrition:</strong> You haven't logged any calories today. You can't out-train a bad diet. Start tracking!<br><br>`;
        }

        // Progression Logic
        const level = Math.floor(xp / 100) + 1;
        reportText += `🏆 <strong>Progression:</strong> You are currently Level ${level} with ${xp} total XP. Every small discipline adds up to massive results. Keep pushing.`;

        // Type it out
        typeOutText(reportText);
    }

    function typeOutText(htmlContent) {
        mentorContent.innerHTML = '';
        typingCursor.style.display = 'inline-block';
        
        // To handle HTML tags during typing effect, we can cheat by inserting the full HTML as invisible
        // and revealing it, or just use a simple regex approach. 
        // For visual flair, we'll just set innerHTML directly and use CSS animation, 
        // OR we can do a simple text-reveal by character but skip HTML tags.
        
        let i = 0;
        let isTag = false;
        let text = '';
        
        const speed = 15; // ms per char

        function type() {
            if (i < htmlContent.length) {
                let char = htmlContent.charAt(i);
                text += char;
                mentorContent.innerHTML = text;
                
                if (char === '<') isTag = true;
                if (char === '>') isTag = false;

                i++;
                
                if (isTag) {
                    type(); // skip delay for HTML tags
                } else {
                    setTimeout(type, speed);
                }
            } else {
                typingCursor.style.display = 'none';
                
                // Add a reset button
                mentorContent.innerHTML += `<div class="mt-4 text-center"><button id="btn-reset" class="btn btn-outline-primary btn-sm">Analyze Again</button></div>`;
                document.getElementById('btn-reset').addEventListener('click', () => {
                    location.reload();
                });
            }
        }
        
        type();
    }
});
