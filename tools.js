document.addEventListener('DOMContentLoaded', () => {
    
    // --- BMI Calculator Logic ---
    const bmiForm = document.getElementById('bmi-form');
    const bmiHeightInput = document.getElementById('bmi-height');
    const bmiWeightInput = document.getElementById('bmi-weight');
    const bmiResultBox = document.getElementById('bmi-result-box');
    const bmiValDisplay = document.getElementById('bmi-value');
    const bmiCatDisplay = document.getElementById('bmi-category');

    if (bmiForm) {
        bmiForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const heightCm = parseFloat(bmiHeightInput.value);
            const weightKg = parseFloat(bmiWeightInput.value);

            if (heightCm > 0 && weightKg > 0) {
                // Calculate BMI: weight (kg) / (height (m))^2
                const heightM = heightCm / 100;
                const bmi = weightKg / (heightM * heightM);
                
                // Display result rounded to 1 decimal place
                bmiValDisplay.textContent = bmi.toFixed(1);

                // Determine category and color
                let category = '';
                let colorClass = '';

                if (bmi < 18.5) {
                    category = 'Underweight';
                    colorClass = 'cat-underweight';
                } else if (bmi >= 18.5 && bmi < 24.9) {
                    category = 'Normal Weight';
                    colorClass = 'cat-normal';
                } else if (bmi >= 25 && bmi < 29.9) {
                    category = 'Overweight';
                    colorClass = 'cat-overweight';
                } else {
                    category = 'Obese';
                    colorClass = 'cat-obese';
                }

                // Reset classes
                bmiCatDisplay.className = 'result-category';
                // Add specific color class
                bmiCatDisplay.classList.add(colorClass);
                bmiCatDisplay.textContent = category;

                // Show the result box with animation
                bmiResultBox.classList.remove('show');
                // Trigger reflow
                void bmiResultBox.offsetWidth;
                bmiResultBox.classList.add('show');
            }
        });
    }


    // --- Calorie Calculator Logic ---
    const calorieForm = document.getElementById('calorie-form');
    const genderBtns = document.querySelectorAll('.gender-btn');
    const calAgeInput = document.getElementById('cal-age');
    const calHeightInput = document.getElementById('cal-height');
    const calWeightInput = document.getElementById('cal-weight');
    const calActivitySelect = document.getElementById('cal-activity');
    const calResultBox = document.getElementById('cal-result-box');
    const calValDisplay = document.getElementById('cal-value');

    let selectedGender = 'male';

    // Gender toggle logic
    genderBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            genderBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');
            selectedGender = btn.getAttribute('data-gender');
        });
    });

    if (calorieForm) {
        calorieForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const age = parseFloat(calAgeInput.value);
            const heightCm = parseFloat(calHeightInput.value);
            const weightKg = parseFloat(calWeightInput.value);
            const activityMultiplier = parseFloat(calActivitySelect.value);

            if (age > 0 && heightCm > 0 && weightKg > 0 && activityMultiplier > 0) {
                
                // Mifflin-St Jeor Equation for BMR
                // Men: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
                // Women: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
                
                let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
                
                if (selectedGender === 'male') {
                    bmr += 5;
                } else {
                    bmr -= 161;
                }

                // Calculate TDEE (Total Daily Energy Expenditure)
                const tdee = bmr * activityMultiplier;

                // Animate number counting up (simple visual flair)
                animateValue(calValDisplay, 0, Math.round(tdee), 1000);

                // Show the result box
                calResultBox.classList.remove('show');
                void calResultBox.offsetWidth;
                calResultBox.classList.add('show');
            }
        });
    }

    // Number animation helper
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Easing function (easeOutQuad)
            const easeOutProgress = 1 - (1 - progress) * (1 - progress);
            obj.innerHTML = Math.floor(easeOutProgress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = end; // Ensure exact final value
            }
        };
        window.requestAnimationFrame(step);
    }
});
