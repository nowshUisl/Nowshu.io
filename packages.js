// Wait until the page is fully loaded before touching anything
document.addEventListener("DOMContentLoaded", () => {

     // ── SMOOTH SCROLLING ──
    // Makes the navbar anchor links scroll smoothly instead of jumping
    const navLinks = document.querySelectorAll(".navbar a");
 
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
// Skip if the link goes to another page
            if (!targetId || !targetId.startsWith("#")) return;

            e.preventDefault(); // Stop the instant-jump default behavior

            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
// ── ACTIVE NAV HIGHLIGHT ──
    // Watches the scroll position and underlines the nav link for the section in view
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
        let current = "";// Tracks which section id is currently visible

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;//offset accounts for the fixed navbar height
            const sectionHeight = section.clientHeight;
// If the scroll position falls inside this section, mark it as current
            if (window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });
// Clear all active states first, then apply to the matching link only
        navLinks.forEach(link => {
            link.classList.remove("active");

            const href = link.getAttribute("href");
            if (href === "#" + current) {
                link.classList.add("active");
            }
        });
    });
 // ── SCROLL ANIMATIONS ──
    // Fades elements in as they scroll into view — runs once per element then stops watching
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                obs.unobserve(entry.target);// Stop watching once it's appeared
            }
        });
    }, {
        threshold: 0.15// Triggers when 15% of the element is on screen
    });
// These are the elements we want to animate in on scroll
    const animatedElements = document.querySelectorAll(".card, .section-title, .about");

    animatedElements.forEach(el => {
        el.classList.add("hidden");// Hide them first (CSS handles the invisible state)
        observer.observe(el);// Start watching each one 
    });
 // ── SHRINKING NAVBAR ──
    // Adds a compact style to the navbar once the user scrolls past
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("shrink");
        } else {
            navbar.classList.remove("shrink");// Resets when back at the top
        }
    });

});