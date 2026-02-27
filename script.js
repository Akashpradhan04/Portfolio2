document.addEventListener("DOMContentLoaded", () => {
    
    /* ================= 1. LOADER ================= */
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 2500);

    /* ================= 2. CUSTOM CURSOR ================= */
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const linksAndButtons = document.querySelectorAll('a, button, .project-card, .skill-card');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Slight delay for follower
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 50);
    });

    linksAndButtons.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    /* ================= 3. MOBILE NAVBAR ================= */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        hamburger.classList.toggle('toggle');
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            hamburger.classList.remove('toggle');
        });
    });

    /* ================= 4. SCROLL REVEAL & PROGRESS BARS ================= */
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        let windowHeight = window.innerHeight;
        let revealPoint = 100;

        reveals.forEach(reveal => {
            let revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
                
                // Trigger Progress Bars when Skills section is revealed
                if(reveal.classList.contains('skill-card')) {
                    const progress = reveal.querySelector('.progress');
                    if(progress) {
                        progress.style.width = progress.getAttribute('data-width');
                    }
                }
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    /* ================= 5. CONTACT FORM VALIDATION ================= */
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic frontend validation passed (handled by HTML5 'required' and 'pattern')
        const name = document.getElementById('name').value;
        const mobile = document.getElementById('mobile').value;
        
        formStatus.style.color = "var(--neon-cyan)";
        formStatus.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Initializing transmission...`;
        
        // Simulate API call delay
        setTimeout(() => {
            formStatus.style.color = "#00ff88"; // Success green
            formStatus.innerHTML = `Transmission successful, ${name}. I will contact you at ${mobile} shortly.`;
            form.reset();
            
            setTimeout(() => { formStatus.innerHTML = ''; }, 5000);
        }, 1500);
    });

    /* ================= 6. BACK TO TOP BUTTON ================= */
    const backToTopBtn = document.getElementById('backToTop');
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ================= 7. PARALLAX BACKGROUND EFFECT ================= */
    document.addEventListener("mousemove", parallax);
    function parallax(e) {
        document.querySelectorAll(".bg-shape").forEach(function(move) {
            var moving_value = move.getAttribute("data-value") || 5;
            var x = (e.clientX * moving_value) / 250;
            var y = (e.clientY * moving_value) / 250;

            move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
        });
    }
});

