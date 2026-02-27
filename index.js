const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

if (cursorDot && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorRing.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '1';
    });
}


const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});


const menuBtn = document.getElementById('menuopen');
const menu = document.getElementById('menu');

menuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    menu.classList.toggle('show');
    menuBtn.classList.toggle('active');
});

menu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        menu.classList.remove('show');
        menuBtn.classList.remove('active');
    }
});


const slider = document.querySelector('.slider');
const prevButton = document.getElementById('left-btn');
const nextButton = document.getElementById('right-btn');
const currentSlideEl = document.getElementById('current-slide');

let currentIndex = 0;
const totalItems = document.querySelectorAll('.p').length;

if (currentSlideEl) {
    document.getElementById('total-slides').textContent = totalItems;
}

let itemWidth;

function setItemWidth() {
    if (window.innerWidth <= 768) {
        itemWidth = 80;
    } else {
        itemWidth = 55;
    }
}

setItemWidth();
window.addEventListener('resize', setItemWidth);
window.addEventListener('orientationchange', setItemWidth);

function moveSliderLeft() {
    if (currentIndex > 0) {
        currentIndex--;
        updateSliderPosition();
    }
}

function moveSliderRight() {
    if (currentIndex < totalItems - 1) {
        currentIndex++;
        updateSliderPosition();
    }
}

function updateSliderPosition() {
    const gapVw = 2;
    const offset = -(currentIndex * (itemWidth + gapVw));
    slider.style.transform = `translateX(${offset}vw)`;
    if (currentSlideEl) currentSlideEl.textContent = currentIndex + 1;

    prevButton.style.opacity = currentIndex === 0 ? '0.3' : '1';
    nextButton.style.opacity = currentIndex === totalItems - 1 ? '0.3' : '1';
}

prevButton.addEventListener('click', moveSliderLeft);
nextButton.addEventListener('click', moveSliderRight);

let touchStartX = 0;
const containerSlider = document.querySelector('.container-slider');

if (containerSlider) {
    containerSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    containerSlider.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? moveSliderRight() : moveSliderLeft();
        }
    }, { passive: true });
}


function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current);
    }, 16);
}


const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.skill-fill');
            fills.forEach((fill) => {
                const width = fill.dataset.width;
                fill.style.setProperty('--target-width', width + '%');
                fill.classList.add('animated');
                fill.style.width = width + '%';
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-num');
            counters.forEach(animateCounter);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });


document.querySelectorAll('.service-card, .skill-item, .about-stat, .contact-detail').forEach((el) => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

document.querySelectorAll('.skills-grid').forEach((el) => skillObserver.observe(el));
document.querySelector('.hero-stats') && counterObserver.observe(document.querySelector('.hero-stats'));


emailjs.init("xBFCjhSQKdVUuBOgD");

const form = document.getElementById("form1");
const submitBtn = form.querySelector('.form-submit');
const btnText = submitBtn.querySelector('.btn-text');

form.addEventListener("submit", function (event) {
    event.preventDefault();

    btnText.textContent = 'Sending...';
    submitBtn.disabled = true;

    emailjs.sendForm("service_t4r5cde", "template_aeuurhx", this)
        .then(function () {
            btnText.textContent = 'Message Sent!';
            submitBtn.style.background = '#22c55e';
            form.reset();
            setTimeout(() => {
                btnText.textContent = 'Send Message';
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, function (error) {
            btnText.textContent = 'Failed — Try Again';
            submitBtn.style.background = '#ef4444';
            console.error(error);
            setTimeout(() => {
                btnText.textContent = 'Send Message';
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        });
});
