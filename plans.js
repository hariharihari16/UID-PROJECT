document.addEventListener('DOMContentLoaded', () => {
    
    // Schedule Data
    const schedules = {
        beginner: [
            { day: 'Mon', focus: 'Strength', class: 'focus-strength', icon: 'fa-dumbbell', color: '#ef4444' },
            { day: 'Tue', focus: 'Cardio', class: 'focus-cardio', icon: 'fa-running', color: '#38bdf8' },
            { day: 'Wed', focus: 'Rest', class: 'focus-rest', icon: 'fa-bed', color: '#9ca3af' },
            { day: 'Thu', focus: 'Strength', class: 'focus-strength', icon: 'fa-dumbbell', color: '#ef4444' },
            { day: 'Fri', focus: 'Rest', class: 'focus-rest', icon: 'fa-bed', color: '#9ca3af' },
            { day: 'Sat', focus: 'Mobility', class: 'focus-flexibility', icon: 'fa-child-reaching', color: '#a855f7' },
            { day: 'Sun', focus: 'Rest', class: 'focus-rest', icon: 'fa-bed', color: '#9ca3af' }
        ],
        intermediate: [
            { day: 'Mon', focus: 'Upper Body', class: 'focus-strength', icon: 'fa-dumbbell', color: '#ef4444' },
            { day: 'Tue', focus: 'Lower Body', class: 'focus-strength', icon: 'fa-dumbbell', color: '#ef4444' },
            { day: 'Wed', focus: 'Active Rest', class: 'focus-cardio', icon: 'fa-person-walking', color: '#38bdf8' },
            { day: 'Thu', focus: 'Upper Body', class: 'focus-strength', icon: 'fa-dumbbell', color: '#ef4444' },
            { day: 'Fri', focus: 'Lower Body', class: 'focus-strength', icon: 'fa-dumbbell', color: '#ef4444' },
            { day: 'Sat', focus: 'Mobility', class: 'focus-flexibility', icon: 'fa-child-reaching', color: '#a855f7' },
            { day: 'Sun', focus: 'Rest', class: 'focus-rest', icon: 'fa-bed', color: '#9ca3af' }
        ],
        advanced: [
            { day: 'Mon', focus: 'Push', class: 'focus-strength', icon: 'fa-dumbbell', color: '#ef4444' },
            { day: 'Tue', focus: 'Pull', class: 'focus-strength', icon: 'fa-dumbbell', color: '#ef4444' },
            { day: 'Wed', focus: 'Legs', class: 'focus-strength', icon: 'fa-dumbbell', color: '#ef4444' },
            { day: 'Thu', focus: 'Push', class: 'focus-strength', icon: 'fa-dumbbell', color: '#ef4444' },
            { day: 'Fri', focus: 'Pull', class: 'focus-strength', icon: 'fa-dumbbell', color: '#ef4444' },
            { day: 'Sat', focus: 'Legs', class: 'focus-strength', icon: 'fa-dumbbell', color: '#ef4444' },
            { day: 'Sun', focus: 'Rest', class: 'focus-rest', icon: 'fa-bed', color: '#9ca3af' }
        ]
    };

    // Detailed Workout Breakdowns
    const breakdowns = {
        beginner: [
            {
                title: 'Full Body A',
                icon: 'fa-dumbbell',
                exercises: [
                    { name: 'Bodyweight Squats', reps: '3 sets of 12' },
                    { name: 'Knee Push-ups', reps: '3 sets of 10' },
                    { name: 'Dumbbell Rows', reps: '3 sets of 12' },
                    { name: 'Plank', reps: '3 sets of 30s' }
                ]
            },
            {
                title: 'Full Body B',
                icon: 'fa-dumbbell',
                exercises: [
                    { name: 'Lunges', reps: '3 sets of 10/leg' },
                    { name: 'Dumbbell Overhead Press', reps: '3 sets of 10' },
                    { name: 'Glute Bridges', reps: '3 sets of 15' },
                    { name: 'Bird Dog', reps: '3 sets of 12' }
                ]
            }
        ],
        intermediate: [
            {
                title: 'Upper Body',
                icon: 'fa-arrow-up',
                exercises: [
                    { name: 'Bench Press', reps: '4 sets of 8' },
                    { name: 'Barbell Rows', reps: '4 sets of 8' },
                    { name: 'Overhead Press', reps: '3 sets of 10' },
                    { name: 'Lat Pulldowns', reps: '3 sets of 10' },
                    { name: 'Bicep Curls', reps: '3 sets of 12' },
                    { name: 'Tricep Extensions', reps: '3 sets of 12' }
                ]
            },
            {
                title: 'Lower Body',
                icon: 'fa-arrow-down',
                exercises: [
                    { name: 'Barbell Squats', reps: '4 sets of 8' },
                    { name: 'Romanian Deadlifts', reps: '3 sets of 10' },
                    { name: 'Leg Press', reps: '3 sets of 12' },
                    { name: 'Leg Curls', reps: '3 sets of 12' },
                    { name: 'Standing Calf Raises', reps: '4 sets of 15' },
                    { name: 'Hanging Leg Raises', reps: '3 sets of 15' }
                ]
            }
        ],
        advanced: [
            {
                title: 'Push Day',
                icon: 'fa-hand-fist',
                exercises: [
                    { name: 'Barbell Bench Press', reps: '4 sets of 5-8' },
                    { name: 'Overhead Press', reps: '3 sets of 8-10' },
                    { name: 'Incline Dumbbell Press', reps: '3 sets of 8-10' },
                    { name: 'Lateral Raises', reps: '4 sets of 12-15' },
                    { name: 'Tricep Pushdowns', reps: '3 sets of 10-12' },
                    { name: 'Overhead Tricep Extension', reps: '3 sets of 10-12' }
                ]
            },
            {
                title: 'Pull Day',
                icon: 'fa-hand-holding',
                exercises: [
                    { name: 'Deadlifts', reps: '1 set of 5 (Heavy)' },
                    { name: 'Pull-ups', reps: '3 sets to failure' },
                    { name: 'Barbell Rows', reps: '3 sets of 8-10' },
                    { name: 'Face Pulls', reps: '3 sets of 12-15' },
                    { name: 'Barbell Curls', reps: '3 sets of 10-12' },
                    { name: 'Hammer Curls', reps: '3 sets of 10-12' }
                ]
            },
            {
                title: 'Legs Day',
                icon: 'fa-shoe-prints',
                exercises: [
                    { name: 'Barbell Squats', reps: '4 sets of 5-8' },
                    { name: 'Bulgarian Split Squats', reps: '3 sets of 8-10/leg' },
                    { name: 'Leg Press', reps: '3 sets of 10-12' },
                    { name: 'Leg Extensions', reps: '3 sets of 12-15' },
                    { name: 'Seated Calf Raises', reps: '4 sets of 15-20' },
                    { name: 'Cable Crunches', reps: '3 sets of 15-20' }
                ]
            }
        ]
    };

    // Interactive Start Plan Buttons
    const startPlanBtns = document.querySelectorAll('.start-plan-btn');
    const scheduleGrid = document.getElementById('schedule-grid');
    const breakdownSection = document.getElementById('breakdown-section');
    const breakdownGrid = document.getElementById('breakdown-grid');

    function renderScheduleAndBreakdown(planType) {
        if (!scheduleGrid) return;
        
        const schedule = schedules[planType];
        const breakdownData = breakdowns[planType];
        
        if (!schedule || !breakdownData) return;

        // Fade out grid
        scheduleGrid.style.opacity = '0';
        scheduleGrid.style.transition = 'opacity 0.3s ease';

        if (breakdownSection) {
            breakdownSection.style.opacity = '0';
        }

        setTimeout(() => {
            // 1. Render Weekly Grid
            scheduleGrid.innerHTML = '';
            schedule.forEach(dayData => {
                const dayEl = document.createElement('div');
                dayEl.className = 'schedule-day';
                dayEl.innerHTML = `
                    <div class="day-name">${dayData.day}</div>
                    <span class="day-focus ${dayData.class}">${dayData.focus}</span>
                    <div class="day-icon"><i class="fas ${dayData.icon}" style="color: ${dayData.color};"></i></div>
                `;
                scheduleGrid.appendChild(dayEl);
            });

            // 2. Render Breakdown Cards
            if (breakdownGrid && breakdownSection) {
                breakdownGrid.innerHTML = '';
                
                breakdownData.forEach(cardData => {
                    let exercisesHtml = '';
                    cardData.exercises.forEach(ex => {
                        const query = encodeURIComponent('how to do ' + ex.name + ' exercise perfect form').replace(/%20/g, '+');
                        const videoUrl = 'https://www.youtube.com/results?search_query=' + query;
                        
                        exercisesHtml += `
                            <li>
                                <div class="exercise-left">
                                    <span class="exercise-name">${ex.name}</span>
                                    <a href="${videoUrl}" target="_blank" class="yt-link" title="Watch Tutorial"><i class="fab fa-youtube"></i></a>
                                </div>
                                <span class="exercise-reps">${ex.reps}</span>
                            </li>
                        `;
                    });

                    const cardEl = document.createElement('div');
                    cardEl.className = 'breakdown-card';
                    cardEl.innerHTML = `
                        <div class="breakdown-header">
                            <i class="fas ${cardData.icon} breakdown-icon"></i>
                            <h3 class="breakdown-title">${cardData.title}</h3>
                        </div>
                        <ul class="breakdown-exercises">
                            ${exercisesHtml}
                        </ul>
                    `;
                    breakdownGrid.appendChild(cardEl);
                });
                
                breakdownSection.style.display = 'block';
            }

            // Fade in
            scheduleGrid.style.opacity = '1';
            if (breakdownSection) {
                // small delay to ensure display:block applies before fading in
                setTimeout(() => {
                    breakdownSection.style.transition = 'opacity 0.5s ease';
                    breakdownSection.style.opacity = '1';
                }, 50);
            }
        }, 300);
    }

    // State persistence functions
    function activateButton(btn, planType) {
        btn.classList.add('active-plan');
        btn.textContent = 'Start Workout';
        btn.style.backgroundColor = '#4ade80'; // Green color for active
        btn.style.borderColor = '#4ade80';
        btn.style.color = '#050505'; // Dark text for contrast
    }

    function deactivateButton(btn, planType) {
        btn.classList.remove('active-plan');
        if (planType === 'intermediate') {
            btn.textContent = 'Start Plan';
            btn.style.backgroundColor = 'var(--accent-neon)';
            btn.style.color = 'var(--text-primary)';
            btn.style.borderColor = 'var(--accent-neon)';
        } else {
            btn.textContent = 'Start Plan';
            btn.style.backgroundColor = 'transparent';
            btn.style.color = 'var(--text-primary)';
            btn.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }
    }

    startPlanBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const planType = e.target.getAttribute('data-plan');
            
            // Toggle visual state of the button
            if (e.target.classList.contains('active-plan')) {
                // User wants to start the workout for this plan
                openWorkoutTimer(planType);
            } else {
                // User wants to start the plan
                
                // Remove active state from all other buttons
                startPlanBtns.forEach(otherBtn => {
                    if (otherBtn !== e.target && otherBtn.classList.contains('active-plan')) {
                        const otherType = otherBtn.getAttribute('data-plan');
                        deactivateButton(otherBtn, otherType);
                    }
                });

                activateButton(e.target, planType);
                localStorage.setItem('fitmob_active_plan', planType);
                
                // Render new schedule and detailed breakdown
                renderScheduleAndBreakdown(planType);
                
                // Scroll to schedule
                const scheduleSection = document.querySelector('.schedule-section');
                if (scheduleSection) {
                    scheduleSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                
                // Small delay for alert so scroll can start
                setTimeout(() => {
                    alert(`Awesome! You've successfully started the ${planType} plan. Let's get to work!`);
                }, 500);
            }
        });
    });

    // Check for saved plan on load
    const savedPlan = localStorage.getItem('fitmob_active_plan');
    if (savedPlan) {
        startPlanBtns.forEach(btn => {
            if (btn.getAttribute('data-plan') === savedPlan) {
                activateButton(btn, savedPlan);
                renderScheduleAndBreakdown(savedPlan);
            }
        });
    } else {
        // Default render
        renderScheduleAndBreakdown('beginner');
        if (breakdownSection) {
            breakdownSection.style.display = 'none';
        }
    }

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Workout Timer Logic
    const timerModal = document.getElementById('workout-timer-modal');
    const closeTimerBtn = document.querySelector('.close-timer-btn');
    const timerDisplay = document.getElementById('workout-time');
    const activePlanTitle = document.getElementById('active-plan-title');
    const activeExerciseList = document.getElementById('active-exercise-list');
    const btnTimerStart = document.getElementById('btn-timer-start');
    const btnTimerPause = document.getElementById('btn-timer-pause');
    const btnTimerStop = document.getElementById('btn-timer-stop');
    const btnFinishWorkout = document.getElementById('btn-finish-workout');

    let timerInterval;
    let secondsElapsed = 0;
    let isTimerRunning = false;

    function openWorkoutTimer(planType) {
        if (!timerModal) return;
        
        activePlanTitle.textContent = planType.charAt(0).toUpperCase() + planType.slice(1) + ' Plan';
        
        // Populate exercises based on plan type (just pull the first day's exercises for demo)
        if (breakdowns[planType] && breakdowns[planType][0]) {
            const exercises = breakdowns[planType][0].exercises;
            activeExerciseList.innerHTML = exercises.map(ex => `
                <li style="margin-bottom: 0.5rem;">
                    <label style="cursor:pointer;" class="d-flex align-items-center gap-2">
                        <input type="checkbox" class="ex-check form-check-input mt-0"> 
                        <span>${ex.name} <span class="text-secondary small">(${ex.reps})</span></span>
                    </label>
                </li>
            `).join('');
            
            // Listen to checkbox changes to enable Finish button
            const checks = activeExerciseList.querySelectorAll('.ex-check');
            checks.forEach(chk => {
                chk.addEventListener('change', () => {
                    const allChecked = Array.from(checks).every(c => c.checked);
                    btnFinishWorkout.disabled = !allChecked;
                });
            });
        }
        
        timerModal.style.display = 'flex';
        setTimeout(() => timerModal.classList.add('active'), 10);
    }

    function formatTime(totalSeconds) {
        const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const s = (totalSeconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    function startTimer() {
        if (isTimerRunning) return;
        isTimerRunning = true;
        btnTimerStart.style.display = 'none';
        btnTimerPause.style.display = 'inline-block';
        btnTimerStop.style.display = 'inline-block';
        
        timerInterval = setInterval(() => {
            secondsElapsed++;
            timerDisplay.textContent = formatTime(secondsElapsed);
        }, 1000);
    }

    function pauseTimer() {
        isTimerRunning = false;
        clearInterval(timerInterval);
        btnTimerStart.style.display = 'inline-block';
        btnTimerStart.innerHTML = '<i class="fas fa-play me-2"></i>Resume';
        btnTimerPause.style.display = 'none';
    }

    function stopTimer() {
        pauseTimer();
        secondsElapsed = 0;
        timerDisplay.textContent = '00:00';
        btnTimerStart.innerHTML = '<i class="fas fa-play me-2"></i>Start';
        btnTimerStart.style.display = 'inline-block';
        btnTimerStop.style.display = 'none';
    }

    function closeTimer() {
        stopTimer();
        timerModal.classList.remove('active');
        setTimeout(() => timerModal.style.display = 'none', 300);
        btnFinishWorkout.disabled = true;
    }

    if (btnTimerStart) btnTimerStart.addEventListener('click', startTimer);
    if (btnTimerPause) btnTimerPause.addEventListener('click', pauseTimer);
    if (btnTimerStop) btnTimerStop.addEventListener('click', stopTimer);
    if (closeTimerBtn) closeTimerBtn.addEventListener('click', closeTimer);
    
    if (btnFinishWorkout) {
        btnFinishWorkout.addEventListener('click', () => {
            // Award XP globally
            let currentXP = parseInt(localStorage.getItem('fitmob_xp')) || 0;
            localStorage.setItem('fitmob_xp', currentXP + 50);
            alert('Workout Completed! +50 XP awarded!');
            closeTimer();
        });
    }

});
