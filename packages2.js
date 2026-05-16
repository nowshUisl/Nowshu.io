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

            e.preventDefault();// Stop the instant-jump default behavior

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
        let current = ""; // Tracks which section id is currently visible

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;// offset accounts for navbar
            const sectionHeight = section.clientHeight;
// If the scroll position falls inside this section
            if (window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });
 // Clear all active states first
        navLinks.forEach(link => {
            link.classList.remove("active");

            const href = link.getAttribute("href");
            if (href === "#" + current) {
                link.classList.add("active");
            }
        });
    });
// ── SCROLL ANIMATIONS ──
    // Fades elements in as they scroll into view
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                obs.unobserve(entry.target);// Stop watching after animation
            }
        });
    }, {
        threshold: 0.15
    });
// Elements to animate
    const animatedElements = document.querySelectorAll(".card, .section-title, .about");

    animatedElements.forEach(el => {
        el.classList.add("hidden");
        observer.observe(el);
    });
// ── SHRINKING NAVBAR ──
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("shrink");
        } else {
            navbar.classList.remove("shrink");
        }
    });

});