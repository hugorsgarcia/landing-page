// ===================================
// Dark Mode Toggle
// ===================================
const darkModeToggle = document.getElementById('darkModeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateDarkModeIcon(currentTheme);

darkModeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateDarkModeIcon(newTheme);
});

function updateDarkModeIcon(theme) {
    const icon = darkModeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ===================================
// Smooth Scroll
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// FAQ Accordion
// ===================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// ===================================
// Form Validation
// ===================================
const contatoForm = document.getElementById('contatoForm');
const formInputs = {
    nome: document.getElementById('nome'),
    email: document.getElementById('email'),
    telefone: document.getElementById('telefone'),
    mensagem: document.getElementById('mensagem')
};

// Real-time validation
Object.keys(formInputs).forEach(key => {
    const input = formInputs[key];
    
    input.addEventListener('blur', () => {
        validateField(input);
    });
    
    input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('error')) {
            validateField(input);
        }
    });
});

function validateField(input) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    let isValid = true;
    let message = '';
    
    // Remove previous states
    formGroup.classList.remove('error', 'success');
    
    // Check if field is required and empty
    if (input.hasAttribute('required') && !input.value.trim()) {
        isValid = false;
        message = 'Este campo é obrigatório';
    }
    
    // Email validation
    if (input.type === 'email' && input.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value.trim())) {
            isValid = false;
            message = 'Por favor, insira um e-mail válido';
        }
    }
    
    // Phone validation (basic)
    if (input.type === 'tel' && input.value.trim()) {
        const phoneRegex = /^[\d\s\(\)\-\+]+$/;
        if (!phoneRegex.test(input.value.trim()) || input.value.trim().length < 10) {
            isValid = false;
            message = 'Por favor, insira um telefone válido';
        }
    }
    
    // Name validation (minimum 3 characters)
    if (input.id === 'nome' && input.value.trim()) {
        if (input.value.trim().length < 3) {
            isValid = false;
            message = 'Nome deve ter pelo menos 3 caracteres';
        }
    }
    
    // Message validation (minimum 10 characters)
    if (input.id === 'mensagem' && input.value.trim()) {
        if (input.value.trim().length < 10) {
            isValid = false;
            message = 'Mensagem deve ter pelo menos 10 caracteres';
        }
    }
    
    if (!isValid) {
        formGroup.classList.add('error');
        errorMessage.textContent = message;
    } else if (input.value.trim()) {
        formGroup.classList.add('success');
    }
    
    return isValid;
}

function validateForm() {
    let isValid = true;
    
    Object.keys(formInputs).forEach(key => {
        const input = formInputs[key];
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Form submission
contatoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
        // Get form data
        const formData = {
            nome: formInputs.nome.value.trim(),
            email: formInputs.email.value.trim(),
            telefone: formInputs.telefone.value.trim(),
            empresa: document.getElementById('empresa').value.trim(),
            mensagem: formInputs.mensagem.value.trim()
        };
        
        // Simulate form submission (replace with actual API call)
        console.log('Dados do formulário:', formData);
        
        // Show success toast
        showToast('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        
        // Reset form
        contatoForm.reset();
        
        // Remove success/error classes
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error', 'success');
        });
    } else {
        showToast('Por favor, preencha todos os campos corretamente.', 'error');
    }
});

// ===================================
// Toast Notification
// ===================================
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const icon = toast.querySelector('i');
    
    // Update icon based on type
    if (type === 'error') {
        icon.classList.remove('fa-check-circle');
        icon.classList.add('fa-exclamation-circle');
        toast.style.background = 'linear-gradient(135deg, #dc3545, #c82333)';
    } else {
        icon.classList.remove('fa-exclamation-circle');
        icon.classList.add('fa-check-circle');
        toast.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
    }
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// ===================================
// Mobile Menu Toggle
// ===================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 968) {
            navMenu.style.display = 'none';
        }
    });
});

// ===================================
// Navbar Scroll Effect
// ===================================
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow on scroll
    if (scrollTop > 50) {
        navbar.style.boxShadow = 'var(--shadow-lg)';
    } else {
        navbar.style.boxShadow = 'var(--shadow-md)';
    }
    
    lastScrollTop = scrollTop;
});

// ===================================
// Newsletter Form
// ===================================
const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailRegex.test(email)) {
        console.log('Newsletter cadastrado:', email);
        showToast('Obrigado por se inscrever na nossa newsletter!');
        emailInput.value = '';
    } else {
        showToast('Por favor, insira um e-mail válido.', 'error');
    }
});

// ===================================
// Animate on Scroll (Simple)
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.servico-card, .stat-card, .faq-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===================================
// Phone Number Formatting
// ===================================
const telefoneInput = formInputs.telefone;

telefoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
        if (value.length <= 10) {
            // Format: (XX) XXXX-XXXX
            value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
        } else {
            // Format: (XX) XXXXX-XXXX
            value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
        }
        e.target.value = value;
    }
});

// ===================================
// Prevent form resubmission on refresh
// ===================================
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ===================================
// Active Navigation Link
// ===================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
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
});
