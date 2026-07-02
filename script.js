// A simple function to check if an element is in view
function checkElementsInView(element) {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
}

// Makes the scrolling smooth and only fades in when the user sees it
const fadeItems = document.querySelectorAll(".fade-in");
function updateFadeItems() {
    fadeItems.forEach(item => {
        if (checkElementsInView(item)) {
            item.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", updateFadeItems);
window.addEventListener("resize", updateFadeItems);

updateFadeItems();
