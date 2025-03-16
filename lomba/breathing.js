 // Elements
 const openModalBtn = document.getElementById('openModalBtn');
 const closeModalBtn = document.getElementById('closeModalBtn');
 const modalOverlay = document.getElementById('modalOverlay');
 const breathingCircle = document.getElementById('breathingCircle');
 const circleText = document.getElementById('circleText');
 const loadingRing = document.getElementById('loadingRing');
 const startButton = document.getElementById('startButton');
 const achievement = document.getElementById('achievement');
 
 // States
 let isBreathing = false;
 let breathState = 'idle';
 
 // Event Listeners
 openModalBtn.addEventListener('click', openModal);
 closeModalBtn.addEventListener('click', closeModal);
 modalOverlay.addEventListener('click', function(e) {
     if (e.target === modalOverlay) {
         closeModal();
     }
 });
 startButton.addEventListener('click', startBreathing);
 breathingCircle.addEventListener('click', startBreathing); // Tambahkan event listener untuk klik pada lingkaran
 
 // Functions
 function openModal() {
     modalOverlay.classList.add('active');
     resetBreathing();
 }
 
 function closeModal() {
     if (isBreathing) return; // Prevent closing during breathing exercise
     modalOverlay.classList.remove('active');
 }
 
 function startBreathing() {
     if (isBreathing) return;
     
     isBreathing = true;
     loadingRing.style.opacity = 1;
     startButton.style.display = 'none';
     
     // Single breathing cycle
     breathingCycle();
 }
 
 function breathingCycle() {
     // Breath In
     breathState = 'in';
     circleText.textContent = 'Inhale';
     breathingCircle.classList.add('breath-in');
     breathingCircle.classList.remove('breath-out', 'breath-hold');
     
     // Breath Hold
     setTimeout(() => {
         breathState = 'hold';
         circleText.textContent = 'Hold';
         breathingCircle.classList.add('breath-hold');
     }, 4000);
     
     // Breath Out
     setTimeout(() => {
         breathState = 'out';
         circleText.textContent = 'Exhale';
         breathingCircle.classList.remove('breath-in', 'breath-hold');
         breathingCircle.classList.add('breath-out');
     }, 8000);
     
     // Complete cycle
     setTimeout(() => {
         isBreathing = false;
         breathState = 'complete';
         circleText.textContent = 'Finish';
         
         // Show achievement
         achievement.classList.add('show-achievement');
         
         // Close modal after delay
         setTimeout(() => {
             achievement.classList.remove('show-achievement');
             closeModal();
         }, 3000);
     }, 16000);
 }
 
 function resetBreathing() {
     breathState = 'idle';
     circleText.textContent = 'Click to Start';
     loadingRing.style.opacity = 0;
     startButton.style.display = 'block';
     breathingCircle.classList.remove('breath-in', 'breath-hold', 'breath-out');
     achievement.classList.remove('show-achievement');
     isBreathing = false;
}