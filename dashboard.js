document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Greeting
    const dashUsername = document.getElementById('dash-username');
    const currentUser = localStorage.getItem('fitmob_user');
    
    if (currentUser) {
        dashUsername.textContent = currentUser;
    } else {
        dashUsername.textContent = 'Guest';
    }

    // 2. Calendar-Aware Tracker Logic
    const daysArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const now = new Date();
    const todayStr = daysArr[now.getDay()];

    // Find the Monday of the current week
    const dayOfWeek = now.getDay() === 0 ? 6 : now.getDay() - 1; // 0 = Mon, 6 = Sun
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - dayOfWeek);
    startOfWeek.setHours(0,0,0,0);
    const weekStartKey = startOfWeek.toISOString().split('T')[0];

    // Check for week/day reset
    const storedWeekKey = localStorage.getItem('fitmob_current_week');
    if (storedWeekKey !== weekStartKey) {
        localStorage.setItem('fitmob_current_week', weekStartKey);
        localStorage.setItem('fitmob_weekly_progress', JSON.stringify({}));
        localStorage.setItem('fitmob_weekly_review', JSON.stringify({}));
        localStorage.setItem('fitmob_daily_activity', JSON.stringify({ water: 0, workout: 0, sleep: 0, nutrition: 0 }));
        localStorage.setItem('fitmob_last_active_day', todayStr);
    } else {
        const lastActiveDay = localStorage.getItem('fitmob_last_active_day');
        if (lastActiveDay !== todayStr) {
            localStorage.setItem('fitmob_daily_activity', JSON.stringify({ water: 0, workout: 0, sleep: 0, nutrition: 0 }));
            localStorage.setItem('fitmob_last_active_day', todayStr);
        }
    }

    const dayBoxes = document.querySelectorAll('.day-box');
    const streakCounter = document.getElementById('streak-counter');
    
    let weeklyProgress = JSON.parse(localStorage.getItem('fitmob_weekly_progress') || '{}');
    let totalStreak = parseInt(localStorage.getItem('fitmob_total_streak') || '0');
    let weeklyReview = JSON.parse(localStorage.getItem('fitmob_weekly_review') || '{}');
    let dailyActivity = JSON.parse(localStorage.getItem('fitmob_daily_activity') || '{ "water": 0, "workout": 0, "sleep": 0, "nutrition": 0 }');

    // Ensure today exists in weekly review
    if (!weeklyReview[todayStr]) {
        weeklyReview[todayStr] = dailyActivity;
    }

    // Initialize day boxes
    dayBoxes.forEach(box => {
        const day = box.getAttribute('data-day');
        if (weeklyProgress[day]) {
            box.classList.add('completed');
        }

        box.addEventListener('click', () => {
            const isCompleted = box.classList.toggle('completed');
            weeklyProgress[day] = isCompleted;
            
            if (isCompleted) {
                totalStreak++;
            } else {
                totalStreak--;
                if (totalStreak < 0) totalStreak = 0;
            }
            
            localStorage.setItem('fitmob_weekly_progress', JSON.stringify(weeklyProgress));
            localStorage.setItem('fitmob_total_streak', totalStreak.toString());
            updateStreak();
        });
    });

    function updateStreak() {
        streakCounter.textContent = `${totalStreak} Days`;
    }
    updateStreak();

    // 3. Daily Activities Logic
    function saveActivity() {
        localStorage.setItem('fitmob_daily_activity', JSON.stringify(dailyActivity));
        weeklyReview[todayStr] = dailyActivity;
        localStorage.setItem('fitmob_weekly_review', JSON.stringify(weeklyReview));
        checkDailyCompletion();
    }

    function checkDailyCompletion() {
        const waterHit = dailyActivity.water >= 8;
        const sleepHit = dailyActivity.sleep >= 8;
        const workoutHit = dailyActivity.workout >= 1; // 1 hour is enough for success
        let nutritionTarget = parseInt(localStorage.getItem('fitmob_nutrition_target')) || 2500;
        const nutritionHit = dailyActivity.nutrition >= nutritionTarget;

        let goalsHit = 0;
        if (waterHit) goalsHit++;
        if (sleepHit) goalsHit++;
        if (workoutHit) goalsHit++;
        if (nutritionHit) goalsHit++;

        // Auto-complete day if at least 2 major goals are hit
        if (goalsHit >= 2 && !weeklyProgress[todayStr]) {
            weeklyProgress[todayStr] = true;
            localStorage.setItem('fitmob_weekly_progress', JSON.stringify(weeklyProgress));
            
            const todayBox = document.querySelector(`.day-box[data-day="${todayStr}"]`);
            if (todayBox) todayBox.classList.add('completed');

            totalStreak++;
            localStorage.setItem('fitmob_total_streak', totalStreak.toString());
            updateStreak();
            awardXP(100); // Bonus XP for completing the day
        }
    }

    // Run once on load to catch up if goals were already hit
    checkDailyCompletion();

    function awardXP(amount) {
        let currentXP = parseInt(localStorage.getItem('fitmob_xp')) || 0;
        currentXP += amount;
        localStorage.setItem('fitmob_xp', currentXP);
    }

    // Water
    const btnWater = document.getElementById('btn-water');
    const waterText = document.getElementById('water-text');
    const waterBar = document.getElementById('water-bar');
    
    function updateWaterUI() {
        waterText.textContent = `${dailyActivity.water} / 8 Glasses`;
        waterBar.style.width = `${(dailyActivity.water / 8) * 100}%`;
        if (dailyActivity.water >= 8) {
            btnWater.textContent = 'Goal Reached!';
            btnWater.disabled = true;
            btnWater.style.opacity = '0.5';
            btnWater.style.cursor = 'not-allowed';
        }
    }
    updateWaterUI();

    btnWater.addEventListener('click', () => {
        if (dailyActivity.water < 8) {
            dailyActivity.water++;
            saveActivity();
            awardXP(10);
            updateWaterUI();
        }
    });

    // Workout
    const btnWorkout = document.getElementById('btn-workout');
    const workoutText = document.getElementById('workout-text');
    const workoutBar = document.getElementById('workout-bar');

    function updateWorkoutUI() {
        workoutText.textContent = `${dailyActivity.workout} / 2 Hours`;
        workoutBar.style.width = `${(dailyActivity.workout / 2) * 100}%`;
        if (dailyActivity.workout >= 2) {
            btnWorkout.textContent = 'Goal Reached!';
            btnWorkout.disabled = true;
            btnWorkout.style.opacity = '0.5';
            btnWorkout.style.cursor = 'not-allowed';
        }
    }
    updateWorkoutUI();

    btnWorkout.addEventListener('click', () => {
        if (dailyActivity.workout < 2) {
            dailyActivity.workout++;
            saveActivity();
            awardXP(50);
            updateWorkoutUI();
        }
    });

    // Sleep
    const btnSleep = document.getElementById('btn-sleep');
    const sleepText = document.getElementById('sleep-text');
    const sleepBar = document.getElementById('sleep-bar');

    function updateSleepUI() {
        sleepText.textContent = `${dailyActivity.sleep} / 8 Hours`;
        sleepBar.style.width = `${(dailyActivity.sleep / 8) * 100}%`;
        if (dailyActivity.sleep >= 8) {
            btnSleep.textContent = 'Fully Rested!';
            btnSleep.disabled = true;
            btnSleep.style.opacity = '0.5';
            btnSleep.style.cursor = 'not-allowed';
        }
    }
    updateSleepUI();

    btnSleep.addEventListener('click', () => {
        if (dailyActivity.sleep < 8) {
            dailyActivity.sleep++;
            saveActivity();
            awardXP(20);
            updateSleepUI();
        }
    });

    // Nutrition
    const btnNutrition = document.getElementById('btn-nutrition');
    const nutritionText = document.getElementById('nutrition-text');
    const nutritionBar = document.getElementById('nutrition-bar');
    const editNutritionBtn = document.getElementById('edit-nutrition-target-btn');
    const saveNutritionBtn = document.getElementById('save-nutrition-target-btn');
    const nutritionTargetDisplay = document.getElementById('nutrition-target-display');
    const nutritionTargetInputContainer = document.getElementById('nutrition-target-input-container');
    const nutritionTargetInput = document.getElementById('nutrition-target-input');

    let nutritionTarget = parseInt(localStorage.getItem('fitmob_nutrition_target')) || 2500;
    if (nutritionTargetInput) {
        nutritionTargetInput.value = nutritionTarget;
    }

    // Make sure old state objects that didn't have nutrition initialized don't error
    if (typeof dailyActivity.nutrition === 'undefined') {
        dailyActivity.nutrition = 0;
    }

    function updateNutritionUI() {
        nutritionText.innerHTML = `${dailyActivity.nutrition} / <span id="nutrition-target-display">${nutritionTarget}</span> kcal`;
        nutritionBar.style.width = `${(dailyActivity.nutrition / nutritionTarget) * 100}%`;
        
        if (dailyActivity.nutrition >= nutritionTarget) {
            btnNutrition.textContent = 'Target Hit!';
            btnNutrition.disabled = true;
            btnNutrition.style.opacity = '0.5';
            btnNutrition.style.cursor = 'not-allowed';
        } else {
            btnNutrition.textContent = 'Log 500 kcal';
            btnNutrition.disabled = false;
            btnNutrition.style.opacity = '1';
            btnNutrition.style.cursor = 'pointer';
        }
    }
    updateNutritionUI();

    btnNutrition.addEventListener('click', () => {
        if (dailyActivity.nutrition < nutritionTarget) {
            dailyActivity.nutrition += 500;
            if (dailyActivity.nutrition > nutritionTarget) dailyActivity.nutrition = nutritionTarget;
            saveActivity();
            awardXP(5);
            updateNutritionUI();
        }
    });

    if (editNutritionBtn && saveNutritionBtn) {
        editNutritionBtn.addEventListener('click', () => {
            nutritionText.style.display = 'none';
            nutritionTargetInputContainer.style.display = 'block';
            nutritionTargetInput.focus();
        });

        saveNutritionBtn.addEventListener('click', () => {
            const newTarget = parseInt(nutritionTargetInput.value);
            if (!isNaN(newTarget) && newTarget > 0) {
                nutritionTarget = newTarget;
                localStorage.setItem('fitmob_nutrition_target', nutritionTarget.toString());
                updateNutritionUI();
            }
            nutritionTargetInputContainer.style.display = 'none';
            nutritionText.style.display = 'block';
        });
    }
});
