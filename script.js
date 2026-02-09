// MOBILE MENU - EINFACH UND FUNKTIONIEREND
const menuButton = document.querySelector('.mobile-menu-btn');
const menuList = document.querySelector('nav ul');

menuButton.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    // Menu öffnen/schließen
    const isOpening = !menuList.classList.contains('show');
    menuList.classList.toggle('show');
    
    // Icon ändern
    const icon = this.querySelector('i');
    if (isOpening) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        document.body.style.overflow = 'hidden'; // Scrollen blockieren
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = 'auto'; // Scrollen erlauben
    }
});

// Menu schließen wenn außerhalb geklickt wird
document.addEventListener('click', function(e) {
    // Wenn der Klick NICHT auf dem Menu oder Menu-Button ist
    if (!e.target.closest('nav') && !e.target.closest('.mobile-menu-btn')) {
        if (menuList.classList.contains('show')) {
            menuList.classList.remove('show');
            const icon = menuButton.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = 'auto';
        }
    }
});

// Smooth Scroll für Navigation
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Impressum/Datenschutz Links überspringen
        if (this.id === 'impressum-link' || this.id === 'datenschutz-link') {
            return;
        }
        
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - headerHeight - 20;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        
        // Menu schließen
        if (menuList.classList.contains('show')) {
            menuList.classList.remove('show');
            const icon = menuButton.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = 'auto';
        }
    });
});

// Modal Funktionalität
const impressumLink = document.getElementById('impressum-link');
const datenschutzLink = document.getElementById('datenschutz-link');
const modals = document.querySelectorAll('.modal');
const closeBtns = document.querySelectorAll('.close-modal');

// Impressum öffnen
if (impressumLink) {
    impressumLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.getElementById('impressum-modal').style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Menu schließen falls offen
        if (menuList.classList.contains('show')) {
            menuList.classList.remove('show');
            const icon = menuButton.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Datenschutz öffnen
if (datenschutzLink) {
    datenschutzLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.getElementById('datenschutz-modal').style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Menu schließen falls offen
        if (menuList.classList.contains('show')) {
            menuList.classList.remove('show');
            const icon = menuButton.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Modals schließen mit X
closeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    });
});

// Modal schließen mit Klick außerhalb
window.addEventListener('click', function(e) {
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Modal schließen mit Escape-Taste
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// Vorher/Nachher Slider
document.querySelectorAll('[data-slider]').forEach(slider => {
    const range = slider.querySelector('.range');
    const after = slider.querySelector('.after');
    
    if (range && after) {
        // Initiale Position setzen
        after.style.clipPath = `inset(0 0 0 ${range.value}%)`;
        
        // Bei Änderung aktualisieren
        range.addEventListener('input', function() {
            after.style.clipPath = `inset(0 0 0 ${this.value}%)`;
        });
        
        // Touch Support für Mobile
        range.addEventListener('touchmove', function() {
            after.style.clipPath = `inset(0 0 0 ${this.value}%)`;
        });
        
        // Verhindere Bild-Drag
        const images = slider.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('dragstart', function(e) {
                e.preventDefault();
            });
            
            img.addEventListener('mousedown', function(e) {
                e.preventDefault();
            });
        });
    }
});

// Header Scroll-Effekt
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.padding = '0.7rem 0';
        header.style.background = 'rgba(15, 15, 15, 0.98)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.padding = '1rem 0';
        header.style.background = 'rgba(15, 15, 15, 0.95)';
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Kontaktformular
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Formular-Daten sammeln
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Hier könnte ein Fetch-Request an den Server erfolgen
        console.log('Formular gesendet:', data);
        
        // Erfolgs-Meldung
        alert('Vielen Dank für Ihre Nachricht! Wir melden uns bald bei Ihnen.');
        
        // Formular zurücksetzen
        this.reset();
    });
}

// Animation bei Scroll (fade-in Effekt für Sections)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Sections für Animation vorbereiten
document.querySelectorAll('section').forEach(section => {
    // Home Section sofort anzeigen
    if (section.id === 'home') {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
    } else {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    }
});

// Lazy Loading für Bilder (falls vorhanden)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialisierung
document.addEventListener('DOMContentLoaded', function() {
    console.log('EMKO-Fliesen Website erfolgreich geladen');
    
    // Setze aktiven Link basierend auf Scroll-Position
    function setActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
});