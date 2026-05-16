// Wait for the page to fully load before running anything
document.addEventListener("DOMContentLoaded", () => {

 // ── SMOOTH SCROLLING ──
 // Makes nav links scroll to sections instead of jumping to them
    const links = document.querySelectorAll(".nav-links a");

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();// Stop the default jump-to-anchor behavior

            const targetId = link.getAttribute("href");
            const targetSection = document.querySelector(targetId);
// Only scroll if the section actually exists on the page   
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

   // ── SCROLL ANIMATIONS ──
    // Watches for elements entering the viewport, then fades them in
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");// CSS handles the actual animation
            }
        });
    }, {
        threshold: 0.15 // Triggers when 15% of the element is visible
    });
// Apply the animation to cards, titles, and the about section
    const hiddenElements = document.querySelectorAll(".card, .section-title, .about");
    hiddenElements.forEach(el => {
        el.classList.add("hidden");// Start hidden (defined in CSS)
        observer.observe(el);// Start watching each element
    });

// ── SHRINKING NAVBAR ──
    // Adds a darker, smaller style to the navbar once the user scrolls down a bit
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("shrink");
        } else {
            navbar.classList.remove("shrink");// Goes back to normal at the top
        }
    });

});
// ── ACTIVE NAV LINK HIGHLIGHT ──
// Tracks which section is currently in view and highlights the matching nav link
// Note: this runs outside DOMContentLoaded, so it starts as soon as the script loads
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";// Will hold the id of the section currently on screen

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Small offset so it triggers a bit early  
        const sectionHeight = section.clientHeight;
// Check if the scroll position is inside this section
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });
// Remove active from all links, then add it only to the matching one
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});