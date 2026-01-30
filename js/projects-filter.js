// Project Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  // Check if filter buttons exist (only on projects page)
  if (filterButtons.length === 0) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filterValue = this.getAttribute('data-filter');

      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Filter project cards
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        // Remove existing animation classes
        card.classList.remove('show', 'hide');

        if (filterValue === 'all') {
          // Show all cards
          card.classList.add('show');
        } else if (cardCategory === filterValue) {
          // Show matching cards
          card.classList.add('show');
        } else {
          // Hide non-matching cards
          card.classList.add('hide');
        }
      });
    });
  });

  // Initialize - show all cards on page load
  projectCards.forEach(card => {
    card.classList.add('show');
  });
});