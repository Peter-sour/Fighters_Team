      // Wait for the DOM to be fully loaded
      document.addEventListener('DOMContentLoaded', function() {
        // Mobile Menu Toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                this.classList.toggle('active');
            });
        }
        
        // Mood Tracker Functionality
        const moodOptions = document.querySelectorAll('.mood-option');
        const trackMoodBtn = document.getElementById('track-mood');
        let selectedMood = null;
        
        if (moodOptions.length > 0) {
            moodOptions.forEach(option => {
                option.addEventListener('click', function() {
                    // Remove active class from all options
                    moodOptions.forEach(opt => opt.classList.remove('active'));
                    // Add active class to selected option
                    this.classList.add('active');
                    selectedMood = this.getAttribute('data-mood');
                });
            });
        }
        
        if (trackMoodBtn) {
            trackMoodBtn.addEventListener('click', function() {
                if (selectedMood) {
                    // Store mood in localStorage
                    const today = new Date().toISOString().split('T')[0];
                    const moodData = JSON.parse(localStorage.getItem('moodData') || '{}');
                    moodData[today] = selectedMood;
                    localStorage.setItem('moodData', JSON.stringify(moodData));
                    
                    // Show confirmation message
                    alert(`Your mood has been tracked as: ${selectedMood}`);
                    
                    // Update UI to reflect mood tracking
                    updateMoodTrackingUI();
                } else {
                    alert('Please select a mood first');
                }
            });
        }
    });   