document.addEventListener('DOMContentLoaded', () => {
    // 1. Load User Profile Data
    const displayUsername = document.getElementById('display-username');
    
    // Check if user is logged in
    const currentUser = localStorage.getItem('fitmob_user');
    
    if (currentUser) {
        displayUsername.textContent = currentUser;
    } else {
        // Fallback if accessed without signing in
        displayUsername.textContent = 'Guest User';
    }

    // 1.2 Load Dashboard Stats
    const profileStreakVal = document.getElementById('profile-streak-val');
    if (profileStreakVal) {
        const totalStreak = localStorage.getItem('fitmob_total_streak') || '0';
        profileStreakVal.textContent = `${totalStreak} Days`;
    }

    const dailyActivity = JSON.parse(localStorage.getItem('fitmob_daily_activity') || '{ "water": 0, "workout": 0, "sleep": 0 }');
    const weeklyReview = JSON.parse(localStorage.getItem('fitmob_weekly_review') || '{}');

    let totalWater = 0;
    let totalWorkout = 0;
    let totalSleep = 0;

    for (const day in weeklyReview) {
        totalWater += weeklyReview[day].water || 0;
        totalWorkout += weeklyReview[day].workout || 0;
        totalSleep += weeklyReview[day].sleep || 0;
    }

    const profileWaterText = document.getElementById('profile-water-text');
    const profileWaterBar = document.getElementById('profile-water-bar');
    if (profileWaterText && profileWaterBar) {
        profileWaterText.textContent = `${totalWater} / 56 Glasses`;
        profileWaterBar.style.width = `${(totalWater / 56) * 100}%`;
    }

    const profileWorkoutText = document.getElementById('profile-workout-text');
    const profileWorkoutBar = document.getElementById('profile-workout-bar');
    if (profileWorkoutText && profileWorkoutBar) {
        profileWorkoutText.textContent = `${totalWorkout} / 14 Hours`;
        profileWorkoutBar.style.width = `${(totalWorkout / 14) * 100}%`;
    }

    const profileSleepText = document.getElementById('profile-sleep-text');
    const profileSleepBar = document.getElementById('profile-sleep-bar');
    if (profileSleepText && profileSleepBar) {
        profileSleepText.textContent = `${totalSleep} / 56 Hours`;
        profileSleepBar.style.width = `${(totalSleep / 56) * 100}%`;
    }

    const profileGoalsVal = document.getElementById('profile-goals-val');
    if (profileGoalsVal) {
        let goals = 0;
        for (const day in weeklyReview) {
            if (weeklyReview[day].water >= 8) goals++;
            if (weeklyReview[day].sleep >= 8) goals++;
            if (weeklyReview[day].workout >= 1) goals++; 
        }
        profileGoalsVal.textContent = goals;
    }

    // 1.5 Profile Editing Logic
    const editProfileBtn = document.getElementById('edit-profile-btn');
    
    // Value spans
    const valAge = document.getElementById('val-age');
    const valHeight = document.getElementById('val-height');
    const valWeight = document.getElementById('val-weight');
    
    // Input fields
    const inputAge = document.getElementById('input-age');
    const inputHeight = document.getElementById('input-height');
    const inputWeight = document.getElementById('input-weight');

    // Load saved profile data if it exists
    const savedProfile = JSON.parse(localStorage.getItem('fitmob_profile_stats') || 'null');
    if (savedProfile) {
        if(valAge) valAge.textContent = savedProfile.age;
        if(inputAge) inputAge.value = savedProfile.age;
        
        if(valHeight) valHeight.textContent = savedProfile.height;
        if(inputHeight) inputHeight.value = savedProfile.height;
        
        if(valWeight) valWeight.textContent = savedProfile.weight;
        if(inputWeight) inputWeight.value = savedProfile.weight;
    }

    let isEditingProfile = false;

    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', () => {
            if (!isEditingProfile) {
                // Switch to Edit Mode
                isEditingProfile = true;
                editProfileBtn.textContent = 'Save Profile';
                editProfileBtn.style.background = 'var(--accent-neon)';
                editProfileBtn.style.color = 'var(--bg-darker)';
                
                valAge.style.display = 'none';
                inputAge.style.display = 'inline-block';
                
                valHeight.style.display = 'none';
                inputHeight.style.display = 'inline-block';
                
                valWeight.style.display = 'none';
                inputWeight.style.display = 'inline-block';
            } else {
                // Switch to Save Mode
                isEditingProfile = false;
                editProfileBtn.textContent = 'Edit Profile';
                editProfileBtn.style.background = 'transparent';
                editProfileBtn.style.color = 'var(--accent-neon)';
                
                // Update UI values
                valAge.textContent = inputAge.value;
                valHeight.textContent = inputHeight.value;
                valWeight.textContent = inputWeight.value;
                
                // Switch display back
                inputAge.style.display = 'none';
                valAge.style.display = 'inline-block';
                
                inputHeight.style.display = 'none';
                valHeight.style.display = 'inline-block';
                
                inputWeight.style.display = 'none';
                valWeight.style.display = 'inline-block';
                
                // Save to localStorage
                const newProfile = {
                    age: inputAge.value,
                    height: inputHeight.value,
                    weight: inputWeight.value
                };
                localStorage.setItem('fitmob_profile_stats', JSON.stringify(newProfile));
            }
        });
    }



    // Load XP & Level
    const profileLevel = document.getElementById('profile-level');
    const profileXpText = document.getElementById('profile-xp-text');
    const profileXpBar = document.getElementById('profile-xp-bar');

    if (profileLevel && profileXpText && profileXpBar) {
        let xp = parseInt(localStorage.getItem('fitmob_xp')) || 0;
        let level = Math.floor(xp / 100) + 1;
        let currentLevelXp = xp % 100;
        
        profileLevel.textContent = level;
        profileXpText.textContent = `${currentLevelXp} / 100 XP`;
        profileXpBar.style.width = `${currentLevelXp}%`;
    }

    // 2. Feedback Form Validation
    const feedbackForm = document.getElementById('feedback-form');
    const feedbackName = document.getElementById('feedback-name');
    const feedbackEmail = document.getElementById('feedback-email');
    const feedbackMessage = document.getElementById('feedback-message');
    const feedbackError = document.getElementById('feedback-error');

    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic Validation
            if (feedbackName.value.trim() === '') {
                showError('Please enter your name.');
                return;
            }
            
            if (feedbackEmail.value.trim() === '' || !feedbackEmail.value.includes('@')) {
                showError('Please enter a valid email address.');
                return;
            }
            
            if (feedbackMessage.value.trim().length < 10) {
                showError('Please enter a message (at least 10 characters).');
                return;
            }

            // Success simulation
            feedbackError.style.display = 'none';
            alert(`Thanks for your feedback, ${feedbackName.value.trim()}! We'll review it shortly.`);
            feedbackForm.reset();
        });
    }

    function showError(msg) {
        if(feedbackError) {
            feedbackError.textContent = msg;
            feedbackError.style.display = 'block';
        }
    }

    // 3. Animate Progress Bars on Load
    // Add a slight delay for a nice staggered animation effect
    setTimeout(() => {
        const fills = document.querySelectorAll('.progress-fill');
        fills.forEach(fill => {
            // The width is already set inline, but triggering a re-flow or 
            // relying on CSS transition when the page loads makes it smooth.
            // (Our CSS transition on width handles this automatically on render).
        });
    }, 100);
});
