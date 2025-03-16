 // Resource Filtering
 const filterButtons = document.querySelectorAll('.filter-button');
 const resourceCards = document.querySelectorAll('.resource-card');

if (filterButtons.length > 0) {
 filterButtons.forEach(button => {
     button.addEventListener('click', function() {
         // Remove active class from all buttons
         filterButtons.forEach(btn => btn.classList.remove('active'));
         // Add active class to clicked button
         this.classList.add('active');

         const filter = this.getAttribute('data-filter');

         resourceCards.forEach(card => {
             if (filter === 'all' || card.getAttribute('data-category') === filter) {
                 card.style.opacity = '1';
                 card.style.visibility = 'visible';
                 card.style.position = 'relative';
                 card.style.transition = 'opacity 0.3s ease-in-out';
             } else {
                 card.style.opacity = '0';
                 card.style.visibility = 'hidden';
                 card.style.position = 'absolute';
             }
         });
     });
 });
}