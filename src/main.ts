// @ts-ignore
import AOS from 'aos';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Loader
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    });

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('bg-dark/80', 'backdrop-blur-md', 'border-b', 'border-white/10', 'py-2');
            navbar?.classList.remove('py-4');
        } else {
            navbar?.classList.remove('bg-dark/80', 'backdrop-blur-md', 'border-b', 'border-white/10', 'py-2');
            navbar?.classList.add('py-4');
        }
    });

    // 3. Particles Evaluation
    // @ts-ignore
    if (typeof particlesJS !== 'undefined') {
        // @ts-ignore
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#00f2ff" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#00f2ff", "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": { "repulse": { "distance": 100, "duration": 0.4 }, "push": { "particles_nb": 4 } }
            },
            "retina_detect": true
        });
    }

    // 4. Countdown Timer
    const targetDate = new Date('March 05, 2026 09:00:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        // Update Registration Timer
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minsEl = document.getElementById('minutes');

        if (daysEl) daysEl.innerText = d.toString().padStart(2, '0');
        if (hoursEl) hoursEl.innerText = h.toString().padStart(2, '0');
        if (minsEl) minsEl.innerText = m.toString().padStart(2, '0');

        // Update Hero Timer
        const heroDays = document.querySelector('.hero-days') as HTMLElement;
        const heroHours = document.querySelector('.hero-hours') as HTMLElement;
        const heroMinutes = document.querySelector('.hero-minutes') as HTMLElement;
        const heroSeconds = document.querySelector('.hero-seconds') as HTMLElement;

        if (heroDays) heroDays.innerText = d.toString().padStart(2, '0');
        if (heroHours) heroHours.innerText = h.toString().padStart(2, '0');
        if (heroMinutes) heroMinutes.innerText = m.toString().padStart(2, '0');
        if (heroSeconds) heroSeconds.innerText = s.toString().padStart(2, '0');
    };

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 5. Counters
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const animateCounters = () => {
        counters.forEach(counter => {
            const htmlCounter = counter as HTMLElement;
            const target = +htmlCounter.getAttribute('data-target')!;
            const count = +htmlCounter.innerText;
            const inc = target / speed;

            if (count < target) {
                htmlCounter.innerText = Math.ceil(count + inc).toString();
                setTimeout(animateCounters, 1);
            } else {
                htmlCounter.innerText = target.toString();
            }
        });
    };

    // Trigger counters when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const aboutSection = document.querySelector('#about');
    if (aboutSection) observer.observe(aboutSection);

    // 6. Back-to-Top
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop?.classList.remove('opacity-0', 'translate-y-10');
            backToTop?.classList.add('opacity-100', 'translate-y-0');
        } else {
            backToTop?.classList.add('opacity-0', 'translate-y-10');
            backToTop?.classList.remove('opacity-100', 'translate-y-0');
        }
    });

    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 7. Event Tab Switching
    const tabs = document.querySelectorAll('.event-tab');
    const categories = document.querySelectorAll('.event-category');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-category');

            // Update Tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update Categories
            categories.forEach(cat => {
                cat.classList.add('hidden');
                cat.classList.remove('show');
                if (cat.id === target) {
                    cat.classList.remove('hidden');
                    cat.classList.add('show');
                }
            });

            // Refresh AOS animations
            setTimeout(() => {
                AOS.refresh();
            }, 100);
        });
    });

    // 8. Mobile Menu
    const menuBtn = document.getElementById('menu-btn');
    const desktopMenu = document.querySelector('.hidden.md\\:flex');

    menuBtn?.addEventListener('click', () => {
        if (desktopMenu?.classList.contains('hidden')) {
            desktopMenu.classList.remove('hidden');
            desktopMenu.classList.add('flex', 'flex-col', 'absolute', 'top-full', 'left-0', 'w-full', 'bg-dark/95', 'p-6', 'gap-4', 'border-b', 'border-white/10');
        } else {
            desktopMenu?.classList.add('hidden');
            desktopMenu?.classList.remove('flex', 'flex-col', 'absolute', 'top-full', 'left-0', 'w-full', 'bg-dark/95', 'p-6', 'gap-4', 'border-b', 'border-white/10');
        }
    });
    // 9. Event Brochure Modal
    const eventModal = document.getElementById('event-modal');
    const modalContent = document.getElementById('modal-content');
    const closeModalBtn = document.getElementById('close-modal');
    const eventCards = document.querySelectorAll('.event-card');

    // Modal Elements
    const modalImage = document.getElementById('modal-image') as HTMLImageElement;
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalParticipants = document.getElementById('modal-participants');

    const openModal = (card: Element) => {
        const imgElement = card.querySelector('img');
        const img = imgElement ? (imgElement as HTMLImageElement).src : '';

        const titleElement = card.querySelector('h3');
        const title = titleElement ? titleElement.innerText : '';

        const descElement = card.querySelector('p');
        const desc = descElement ? descElement.innerText : '';

        const brochureLink = card.getAttribute('data-brochure');
        const brochureBtn = document.getElementById('modal-brochure-btn') as HTMLAnchorElement;

        // Text cleaning for participants
        const participantsList = card.querySelector('ul');
        const participants = participantsList ? (participantsList as HTMLElement).innerText.replace(/\n/g, ' ').trim() : 'TBA';

        if (eventModal && modalContent && img && title && desc) {
            if (modalImage) modalImage.src = img;
            if (modalTitle) modalTitle.innerText = title;
            if (modalDesc) modalDesc.innerText = desc;
            if (modalParticipants) {
                // Clear previous icon if any
                modalParticipants.innerHTML = '<i class="fas fa-users text-prime"></i> ' + participants;
            }

            if (brochureBtn) {
                if (brochureLink) {
                    brochureBtn.href = brochureLink;
                    brochureBtn.classList.remove('hidden');
                    brochureBtn.classList.add('flex');
                } else {
                    brochureBtn.href = '#';
                    brochureBtn.classList.add('hidden');
                    brochureBtn.classList.remove('flex');
                }
            }

            const registerBtn = document.getElementById('modal-register-btn');
            if (registerBtn) {
                registerBtn.addEventListener('click', () => {
                    closeModal();
                    const registerSection = document.getElementById('register');
                    if (registerSection) {
                        registerSection.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            }

            eventModal.classList.remove('hidden');
            // Small delay to allow display:block to apply before adding opacity
            setTimeout(() => {
                modalContent.classList.remove('scale-95', 'opacity-0');
                modalContent.classList.add('scale-100', 'opacity-100');
            }, 10);
        }
    };

    const closeModal = () => {
        if (eventModal && modalContent) {
            modalContent.classList.remove('scale-100', 'opacity-100');
            modalContent.classList.add('scale-95', 'opacity-0');

            setTimeout(() => {
                eventModal.classList.add('hidden');
            }, 300); // Match transition duration
        }
    };

    eventCards.forEach(card => {
        card.addEventListener('click', () => openModal(card));
    });

    closeModalBtn?.addEventListener('click', closeModal);

    // Close on click outside
    eventModal?.addEventListener('click', (e) => {
        if (e.target === eventModal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !eventModal?.classList.contains('hidden')) {
            closeModal();
        }
    });
});
