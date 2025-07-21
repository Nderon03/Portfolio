function toggleMenu(){
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open")
    icon.classList.toggle("open")

}

// Animate star ratings when experience section enters view
document.addEventListener("DOMContentLoaded", () => {
const stars = document.querySelectorAll(".stars");
const experienceSection = document.querySelector("#experience");

const observer = new IntersectionObserver(
    (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        stars.forEach(star => star.classList.add("animate-stars"));
        observer.unobserve(experienceSection); // Only run once
        }
    });
    },
    {
    threshold: 0.6,
    }
);

if (experienceSection) {
    observer.observe(experienceSection);
}
});