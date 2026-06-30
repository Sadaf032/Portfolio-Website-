
console.log('🚀 Sadaf Portfolio is live!');

// ===== 1. NAVBAR SCROLL EFFECT =====

window.addEventListener('scroll',function(){
    const nav=document.querySelector('nav');
    if(window.scrollY> 50){
        nav.classList.add('scrolled');
    } else{
        nav.classList.remove('scrolled');
    }
}); 

// ===== 2. MOBILE MENU TOGGLE =====
const menuToggle= document.querySelector('.menu-toggle');
const navUl= document.querySelector('nav ul');

if(menuToggle){
    menuToggle.addEventListener('click', function(){
        this.classList.toggle('active');
        navUl.classList.toggle('active');
        document.body.style.overflow= navUl.classList.contains('active')? 'hidden' :'';
    });
}

// Close menu when clicking a link
document.querySelectorAll('nav ul li a').forEach(link=>{
    link.addEventListener('click',()=>{
        menuToggle.classList.remove('active');
        navUl.classList.remove('active');
        document.body.style.overflow='';
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('nav') && navUl?.classList.contains('active')) {
        menuToggle?.classList.remove('active');
        navUl.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== 3. TYPING EFFECT =====
const roles = ['Web Developer', 'UI/UX Designer', 'Creative Thinker', 'Problem Solver'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpan = document.querySelector('.typing-text span');

if (typingSpan) {
    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingSpan.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingSpan.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeEffect, 500);
            return;
        }
        
        const speed = isDeleting ? 50 : 120;
        setTimeout(typeEffect, speed);
    }
    
    setTimeout(typeEffect, 1000);
}

// ===== 4. SKILLS ANIMATION ON SCROLL =====
const skillsSection = document.getElementById('skills');
const progressBars = document.querySelectorAll('.progress');
let skillsAnimated = false;

function animateSkills() {
    if (!skillsSection || skillsAnimated) return;
    const rect = skillsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible) {
        skillsAnimated = true;
        progressBars.forEach((bar, index) => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 200 + (index * 150));
        });
    }
}

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// ===== 5. RESET SKILLS ANIMATION ON RE-ENTER =====
function resetSkillsAnimation() {
    if (!skillsSection) return;
    const rect = skillsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (!isVisible) {
        skillsAnimated = false;
    }
}

window.addEventListener('scroll', resetSkillsAnimation);

// ===== 6. SMOOTH SCROLL FOR ALL LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const navHeight = document.querySelector('nav')?.offsetHeight || 80;
            const targetPosition = target.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== 7. ACTIVE NAV LINK ON SCROLL (Scroll Spy) =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

function updateActiveLink() {
    let current = '';
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// ===== 8. FORM SUBMISSION =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = this.querySelector('.btn-primary');
        const originalText = btn.innerHTML;
        
        // Show loading state
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;
        
        // Simulate sending (you can replace with actual API call)
        setTimeout(() => {
            alert('✨ Thank you for your message, Sadaf! I will get back to you soon. 😊');
            this.reset();
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 1500);
    });
}

// ===== 9. PARALLAX EFFECT ON HERO (Optional) =====
const hero = document.querySelector('#home');
if (hero) {
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });
}

// ===== 10. REVEAL ANIMATION FOR PROJECT CARDS =====
const projectCards = document.querySelectorAll('.project-card');
let cardsAnimated = false;

function animateCards() {
    if (cardsAnimated) return;
    const rect = document.getElementById('projects')?.getBoundingClientRect();
    if (!rect) return;
    
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible) {
        cardsAnimated = true;
        projectCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 + (index * 150));
        });
    }
}

// Reset card animation
function resetCardsAnimation() {
    const rect = document.getElementById('projects')?.getBoundingClientRect();
    if (!rect) return;
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (!isVisible) {
        cardsAnimated = false;
    }
}

window.addEventListener('scroll', animateCards);
window.addEventListener('scroll', resetCardsAnimation);
window.addEventListener('load', animateCards);

// ===== 11. LOADING ANIMATION (Optional) =====
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===== 12. CONSOLE WELCOME =====
console.log('%c ✨ Sadaf Kareem Portfolio ✨ ', 'font-size: 20px; font-weight: bold; color: #9b59b6; background: #000021; padding: 10px 20px; border-radius: 10px;');
console.log('%c 🚀 Thanks for visiting! ', 'font-size: 14px; color: #ffffff; background: #9b59b6; padding: 5px 15px; border-radius: 5px;');

// ===== 13. KEYBOARD SHORTCUTS (For fun) =====
document.addEventListener('keydown', function(e) {
    // Press 'H' to go home
    if (e.key === 'h' && !e.ctrlKey && !e.metaKey) {
        document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
        e.preventDefault();
    }
    // Press 'C' for contact
    if (e.key === 'c' && !e.ctrlKey && !e.metaKey) {
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
        e.preventDefault();
    }
});

console.log('💡 Tip: Press "H" for Home, "C" for Contact!');