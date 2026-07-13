const initCardEffects = () => {
    document.querySelectorAll('.project-card').forEach(card => {
        let tagTimeouts = [];

        card.addEventListener('mouseenter', () => {
            card.classList.add('is-hovering');

            const tags = card.querySelectorAll('.tech-tag');
            tags.forEach((tag, index) => {
                const timeoutId = window.setTimeout(() => {
                    tag.style.transform = 'translateY(-3px) scale(1.05)';
                }, index * 50);
                tagTimeouts.push(timeoutId);
            });
        });

        card.addEventListener('mousemove', (event) => {
            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const px = (x / rect.width) * 100;
            const py = (y / rect.height) * 100;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = -(y - centerY) / 14;
            const rotateY = (x - centerX) / 14;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`;
            card.style.setProperty('--mx', `${px}%`);
            card.style.setProperty('--my', `${py}%`);
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('is-hovering');
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
            card.style.setProperty('--mx', '50%');
            card.style.setProperty('--my', '50%');

            tagTimeouts.forEach(timeoutId => window.clearTimeout(timeoutId));
            tagTimeouts = [];

            card.querySelectorAll('.tech-tag').forEach(tag => {
                tag.style.transform = 'translateY(0) scale(1)';
            });
        });
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCardEffects, { once: true });
} else {
    initCardEffects();
}