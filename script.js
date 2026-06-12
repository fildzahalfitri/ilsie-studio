document.addEventListener("DOMContentLoaded", () => {

    const appIcons = document.querySelectorAll(".app-icon");
    const modalOverlay = document.getElementById("modal-overlay");
    const closeButtons = document.querySelectorAll(".close-btn");
    const windows = document.querySelectorAll(".retro-window");

    appIcons.forEach(icon => {
        icon.addEventListener("click", (e) => {
            e.stopPropagation();
            const targetModalId = icon.getAttribute("data-target");
            const targetModal = document.getElementById(targetModalId);
            
            modalOverlay.style.display = "flex";
            targetModal.style.display = "block";
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            modalOverlay.style.display = "none";
            windows.forEach(win => win.style.display = "none");
        });
    });

    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.style.display = "none";
            windows.forEach(win => win.style.display = "none");
        }
    });

    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetTab = button.getAttribute("data-tab");

            tabButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            tabContents.forEach(content => {
                content.classList.remove("active");
                if (content.getAttribute("id") === `tab-${targetTab}`) {
                    content.classList.add("active");
                }
            });
        });
    });

    const nextButtons = document.querySelectorAll(".carousel-nav.next");
    const prevButtons = document.querySelectorAll(".carousel-nav.prev");

    nextButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const track = btn.parentElement.querySelector(".carousel-track");
            const cardWidth = track.querySelector(".retro-card").clientWidth;
            track.scrollBy({ left: cardWidth + 25, behavior: "smooth" });
        });
    });

    prevButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const track = btn.parentElement.querySelector(".carousel-track");
            const cardWidth = track.querySelector(".retro-card").clientWidth;
            track.scrollBy({ left: -(cardWidth + 25), behavior: "smooth" });
        });
    });

    const animatedElements = document.querySelectorAll(".animate-fade");

    const observerOptions = {
        root: null,
        threshold: 0.1, 
        rootMargin: "0px"
    };

    const entranceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => entranceObserver.observe(el));
});