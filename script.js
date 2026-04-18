
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero animations
    const heroTimeline = gsap.timeline();
    heroTimeline
        .to('.hero-badge', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .to('.hero-title', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.4')
        .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .to('.hero-cta', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .to('.hero-stats', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4');
    
    // Counter animation
    const counters = document.querySelectorAll('.stat-counter');
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const isDecimal = target % 1 !== 0;
        
        gsap.to(counter, {
            innerHTML: target,
            duration: 2,
            snap: { innerHTML: isDecimal ? 0.1 : 1 },
            scrollTrigger: {
                trigger: counter,
                start: 'top 80%',
                once: true
            },
            onUpdate: function() {
                if (isDecimal) {
                    counter.innerHTML = parseFloat(this.targets()[0].innerHTML).toFixed(1);
                } else {
                    counter.innerHTML = Math.round(this.targets()[0].innerHTML);
                }
                if (counter.innerHTML.includes('79')) counter.innerHTML += 'M';
                if (counter.innerHTML.includes('4.5')) counter.innerHTML += 'B';
                if (counter.innerHTML.includes('25')) counter.innerHTML += '%';
            }
        });
    });
    
    // Section headers animation
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                once: true
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });
    });
    
    // Problem cards stagger
    gsap.from('.problem-card', {
        scrollTrigger: {
            trigger: '#problems',
            start: 'top 60%',
            once: true
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
    });
    
    // Smooth scroll function
    window.scrollToSection = function(id) {
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    };
    
    // Toggle details function
    window.toggleDetails = function(card) {
        const details = card.querySelector('.hidden-details');
        const isHidden = details.classList.contains('hidden');
        
        // Close all other details
        document.querySelectorAll('.hidden-details').forEach(d => d.classList.add('hidden'));
        
        if (isHidden) {
            details.classList.remove('hidden');
            gsap.from(details, { height: 0, opacity: 0, duration: 0.3 });
        }
    };
    
    // Solution highlight
    window.highlightSolution = function(index) {
        // Update stats
        const stats = [
            { value: '85%', label: 'Reduction in Corruption' },
            { value: '70%', label: 'Case Backlog Decrease' },
            { value: '90%', label: 'Budget Transparency' }
        ];
        
        document.getElementById('solution-stat').textContent = stats[index].value;
        document.getElementById('solution-label').textContent = stats[index].label;
        
        // Update orbits
        document.querySelectorAll('.solution-orbit').forEach((orbit, i) => {
            if (i === index) {
                orbit.classList.remove('hidden');
                gsap.from(orbit, { scale: 0, rotation: -180, duration: 0.6, ease: 'back.out' });
            } else {
                orbit.classList.add('hidden');
            }
        });
        
        // Highlight item
        document.querySelectorAll('.solution-item').forEach((item, i) => {
            if (i === index) {
                item.classList.add('border-[#4C9F38]', 'bg-white/10');
            } else {
                item.classList.remove('border-[#4C9F38]', 'bg-white/10');
            }
        });
    };
    
    // Initialize first solution
    highlightSolution(0);
    
    // Parallax effect for hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-bg');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});
