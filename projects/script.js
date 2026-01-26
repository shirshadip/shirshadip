const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'revealOnScroll 0.6s ease-out forwards';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

// Parallax effect on mouse move
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.project-card');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    cards.forEach((card, index) => {
        const speed = (index + 1) * 0.5;
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;

        card.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});

// Reset transform on card hover
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-12px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translate(0, 0)';
    });
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Tech tag stagger animation on hover
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        const tags = this.querySelectorAll('.tech-tag');
        tags.forEach((tag, index) => {
            setTimeout(() => {
                tag.style.transform = 'translateY(-3px) scale(1.05)';
            }, index * 50);
        });
    });

    card.addEventListener('mouseleave', function () {
        const tags = this.querySelectorAll('.tech-tag');
        tags.forEach(tag => {
            tag.style.transform = 'translateY(0) scale(1)';
        });
    });
});