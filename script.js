// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        
        if (href === '#') {
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            const target = document.querySelector(href);
            if (target) {
                const offset = 100; // Offset for navbar
                const targetPosition = target.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.feature-card, .materi-card, .value-card, .mission-card, .author-card, .methodology-section'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});

// Add parallax effect to hero section
if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-content, .wave-bg');
        
        parallaxElements.forEach(el => {
            const speed = el.classList.contains('wave-bg') ? 0.5 : 0.3;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Dynamic greeting based on time
const setDynamicGreeting = () => {
    const hour = new Date().getHours();
    const greetingElements = document.querySelectorAll('.page-header p');
    
    if (greetingElements.length > 0 && window.location.pathname.includes('index')) {
        let greeting = '';
        if (hour >= 5 && hour < 12) {
            greeting = 'Selamat pagi! ';
        } else if (hour >= 12 && hour < 15) {
            greeting = 'Selamat siang! ';
        } else if (hour >= 15 && hour < 18) {
            greeting = 'Selamat sore! ';
        } else {
            greeting = 'Selamat malam! ';
        }
    }
};

setDynamicGreeting();

// Add hover effect to feature cards
const featureCards = document.querySelectorAll('.feature-card, .value-card');

featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Counter animation for statistics (if added in future)
const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
};

// Lazy loading for images (if images are added)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add reading progress bar for materi page
if (window.location.pathname.includes('materi')) {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #6f42c1, #8b5fd6);
        z-index: 9999;
        transition: width 0.1s ease;
        width: 0;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.pageYOffset;
        const progress = (scrolled / documentHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
}

// Add smooth reveal for list items
const revealListItems = () => {
    const lists = document.querySelectorAll('.styled-list');
    
    lists.forEach(list => {
        const items = list.querySelectorAll('li');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = `all 0.5s ease ${index * 0.1}s`;
        });
        
        const listObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('li');
                    items.forEach(item => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    });
                    listObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        listObserver.observe(list);
    });
};

document.addEventListener('DOMContentLoaded', revealListItems);

// Add ripple effect to buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation style
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Back to top button
const createBackToTop = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #6f42c1, #8b5fd6);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(111, 66, 193, 0.4);
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    document.body.appendChild(button);
};

document.addEventListener('DOMContentLoaded', createBackToTop);

// Add typing effect for hero title (optional)
const typeEffect = (element, text, speed = 100) => {
    if (!element) return;
    
    let i = 0;
    element.textContent = '';
    
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
};

// Console message
console.log('%c🕌 Dakwah Ramah Milenial', 'color: #6f42c1; font-size: 24px; font-weight: bold;');
console.log('%cMenyebarkan cahaya Islam dengan penuh kasih sayang', 'color: #8b5fd6; font-size: 14px;');

// Hide all materi content on page load (only on materi.html)
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('materi') || window.location.href.includes('materi')) {
        const contentSection = document.querySelector('.content-section');
        const materiCards = document.querySelectorAll('.materi-card');
        
        if (contentSection && materiCards.length > 0) {
            // Hide content section initially
            if (!window.location.hash) {
                contentSection.style.display = 'none';
            } else {
                // Show content if there's a hash in URL
                contentSection.style.display = 'block';
                materiCards.forEach(card => {
                    card.style.display = 'none';
                });
                const targetCard = document.querySelector(window.location.hash);
                if (targetCard) {
                    targetCard.style.display = 'block';
                }
            }
        }
    }
});

// Show materi content when card is clicked
document.querySelectorAll('.materi-card-preview').forEach(card => {
    card.addEventListener('click', function() {
        const contentSection = document.querySelector('.content-section');
        if (contentSection) {
            contentSection.style.display = 'block';
            
            // Hide all materi cards
            document.querySelectorAll('.materi-card').forEach(c => {
                c.style.display = 'none';
            });
        }
    });
});

// Back to materi list functionality
document.querySelectorAll('.back-to-materi').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const contentSection = document.querySelector('.content-section');
        const materiOverview = document.querySelector('.materi-overview');
        
        if (contentSection) {
            contentSection.style.display = 'none';
        }
        
        if (materiOverview) {
            materiOverview.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Remove hash from URL
        history.pushState("", document.title, window.location.pathname + window.location.search);
    });
});