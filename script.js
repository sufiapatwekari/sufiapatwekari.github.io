
'use strict';

// 1. Typing animation
const typingElement = document.getElementById('typing');

const roles = [
    'Java Developer',
    'Full-Stack Developer',
    'Software Developer'
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeRole() {
    if (!typingElement) return;

    const currentRole = roles[roleIndex];
    typingElement.textContent = currentRole.slice(0, characterIndex);

    if (!deleting && characterIndex < currentRole.length) {
        characterIndex++;
        setTimeout(typeRole, 95);
    } else if (!deleting) {
        deleting = true;
        setTimeout(typeRole, 1350);
    } else if (characterIndex > 0) {
        characterIndex--;
        setTimeout(typeRole, 48);
    } else {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeRole, 300);
    }
}

typeRole();


// 2. Mobile navigation
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

function closeMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove('open');

    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');

    const icon = menuToggle.querySelector('i');

    if (icon) {
        icon.className = 'fas fa-bars';
    }
}

if (menuToggle && navLinks) {

    menuToggle.addEventListener('click', () => {

        const isOpen = navLinks.classList.toggle('open');

        menuToggle.setAttribute(
            'aria-expanded',
            String(isOpen)
        );

        menuToggle.setAttribute(
            'aria-label',
            isOpen ? 'Close navigation' : 'Open navigation'
        );

        const icon = menuToggle.querySelector('i');

        if (icon) {
            icon.className = isOpen
                ? 'fas fa-times'
                : 'fas fa-bars';
        }
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 700) {
            closeMenu();
        }
    });
}


// 3. Dark and light theme toggle
const themeToggle = document.getElementById('themeToggle');

const themeIcon = themeToggle
    ? themeToggle.querySelector('i')
    : null;

function setTheme(theme) {

    const light = theme === 'light';

    document.body.classList.toggle('light-theme', light);

    if (themeIcon) {
        themeIcon.className = light
            ? 'fas fa-sun'
            : 'fas fa-moon';
    }

    if (themeToggle) {
        themeToggle.setAttribute(
            'aria-label',
            light
                ? 'Switch to dark theme'
                : 'Switch to light theme'
        );
    }

    const themeColor = document.querySelector(
        'meta[name="theme-color"]'
    );

    if (themeColor) {
        themeColor.setAttribute(
            'content',
            light ? '#f5f7fc' : '#0b1020'
        );
    }
}


// Load saved theme
let savedTheme = 'dark';

try {
    savedTheme =
        localStorage.getItem('portfolio-theme') || 'dark';
} catch (_) {
    // Storage may be unavailable.
}

setTheme(savedTheme);


// Change theme on button click
if (themeToggle) {

    themeToggle.addEventListener('click', () => {

        const nextTheme =
            document.body.classList.contains('light-theme')
                ? 'dark'
                : 'light';

        setTheme(nextTheme);

        try {
            localStorage.setItem('portfolio-theme', nextTheme);
        } catch (_) {
            // Continue without persistence.
        }
    });
}


// 4. Scroll reveal animation
const revealItems = document.querySelectorAll(
    '.reveal, .skill-card, .project-card, .achievement-card, .timeline-item, .stat-card'
);

revealItems.forEach(item => {
    item.classList.add('reveal');
});

if ('IntersectionObserver' in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add('active');

                    observer.unobserve(entry.target);
                }
            });

        },
        {
            threshold: 0.12,
            rootMargin: '0px 0px -35px 0px'
        }
    );

    revealItems.forEach(item => {
        revealObserver.observe(item);
    });

} else {

    revealItems.forEach(item => {
        item.classList.add('active');
    });
}


// 5. Active navigation link on scroll
const sections = document.querySelectorAll('main section[id]');

if ('IntersectionObserver' in window) {

    const sectionObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    document.querySelectorAll('.nav-links a')
                        .forEach(link => {

                            link.classList.toggle(
                                'active',
                                link.getAttribute('href') ===
                                `#${entry.target.id}`
                            );

                        });
                }
            });

        },
        {
            rootMargin: '-35% 0px -55% 0px'
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}


// 6. Automatic footer year
const yearElement = document.getElementById('year');

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}
