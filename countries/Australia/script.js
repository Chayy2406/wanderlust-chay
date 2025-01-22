const parallax_el = document.querySelectorAll(".parallax");
const bg_img = document.querySelector(".bg-img");
const about_section = document.querySelector(".about-section");

let xValue = 0, 
    yValue = 0,
    rotateDegree = 0;

function update(cursorPosition) {
    const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    
    parallax_el.forEach((el) => {
        if (el.classList.contains('bg-img')) {
            // Apply blur based on scroll
            const blurValue = Math.min(scrollPercentage * 10, 5);
            el.style.filter = `blur(${blurValue}px)`;
            
            // Move background slightly
            el.style.transform = `translateX(calc(-50% + ${-xValue * el.dataset.speedx}px)) 
                                 translateY(calc(-50% + ${yValue * el.dataset.speedy}px))`;
            return;
        }

        if (el.classList.contains('text')) {
            // Fade out the title text as we scroll
            el.style.opacity = 1 - scrollPercentage * 2;
        }

        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        let speedz = el.dataset.speedz;
        let rotateSpeed = el.dataset.rotation;
        let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
        let zValue = (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

        // Move elements up based on scroll
        let scrollOffset = window.scrollY * 0.7;

        el.style.transform = `translateX(calc(-50% + ${-xValue * speedx}px)) 
                             translateY(calc(-50% + ${(yValue * speedy) - scrollOffset}px)) 
                             perspective(2300px) 
                             translateZ(${zValue * speedz}px) 
                             rotateY(${rotateDegree * rotateSpeed}deg)`;
    });

    // Fade in about section based on scroll
    if (scrollPercentage > 0.2) {
        about_section.style.opacity = Math.min((scrollPercentage - 0.2) * 2, 1);
    } else {
        about_section.style.opacity = 0;
    }
}

// Initialize
update(0);

// Mouse movement event
window.addEventListener("mousemove", (e) => {
    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;
    rotateDegree = (xValue / (window.innerWidth / 2)) * 20;
    update(e.clientX);
});

// Scroll event
window.addEventListener("scroll", () => {
    update(window.innerWidth / 2);
});

// Optional: Add smooth scrolling
document.documentElement.style.scrollBehavior = "smooth";


document.addEventListener('DOMContentLoaded', () => {
    // Create transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'page-transition';
    document.body.appendChild(overlay);

    // Remove preload div after everything is loaded
    window.addEventListener('load', () => {
        const preload = document.querySelector('.preload');
        if (preload) {
            preload.style.opacity = '0';
            setTimeout(() => {
                preload.remove();
            }, 500);
        }
        
        // Start entrance animation
        setTimeout(() => {
            overlay.style.opacity = '0';
        }, 100);
    });

    // Handle navigation clicks
    document.querySelectorAll('.nav-arrow').forEach(arrow => {
        arrow.addEventListener('click', (e) => {
            e.preventDefault();
            const href = e.currentTarget.getAttribute('href');
            
            // Ensure black background stays during transition
            document.body.style.backgroundColor = 'black';
            
            // Exit animation
            overlay.style.opacity = '1';
            
            // Navigate after exit animation
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });
});