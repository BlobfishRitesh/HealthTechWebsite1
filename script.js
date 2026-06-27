// Get the button element
const button = document.getElementById('myButton');

// Add click event listener
button.addEventListener('click', function() {
    console.log('Button clicked!');
    
    // Toggle the active class
    button.classList.toggle('active');
    
    // Show an alert
    alert('Button was clicked!');
});

// Optional: Add smooth scrolling to navigation links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Log page load
window.addEventListener('load', function() {
    console.log('Page loaded successfully!');
});
