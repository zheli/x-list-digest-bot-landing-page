// Modal Management
const signupModal = document.getElementById('signup-modal');
const loginModal = document.getElementById('login-modal');
const signupBtns = document.querySelectorAll('#signup-btn, #hero-cta, .signup-trigger');
const loginBtn = document.getElementById('login-btn');
const closeBtns = document.querySelectorAll('.close');
const switchToLogin = document.getElementById('switch-to-login');
const switchToSignup = document.getElementById('switch-to-signup');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Open modals
signupBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(signupModal);
    });
});

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(loginModal);
});

// Close modals
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        closeModal(signupModal);
        closeModal(loginModal);
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === signupModal) {
        closeModal(signupModal);
    }
    if (e.target === loginModal) {
        closeModal(loginModal);
    }
});

// Switch between modals
switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(signupModal);
    openModal(loginModal);
});

switchToSignup.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(loginModal);
    openModal(signupModal);
});

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

function openModal(modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    
    // Reset forms when closing
    const form = modal.querySelector('form');
    if (form) {
        form.reset();
        clearErrors(form);
    }
}

// Form Validation
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');

// Validation rules
const validationRules = {
    name: {
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-Z\s]+$/,
        messages: {
            required: 'Name is required',
            minLength: 'Name must be at least 2 characters',
            maxLength: 'Name must be less than 50 characters',
            pattern: 'Name can only contain letters and spaces'
        }
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        messages: {
            required: 'Email is required',
            pattern: 'Please enter a valid email address'
        }
    },
    password: {
        required: true,
        minLength: 8,
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        messages: {
            required: 'Password is required',
            minLength: 'Password must be at least 8 characters',
            pattern: 'Password must contain uppercase, lowercase, and number'
        }
    },
    confirmPassword: {
        required: true,
        match: 'password',
        messages: {
            required: 'Please confirm your password',
            match: 'Passwords do not match'
        }
    }
};

// Signup form submission
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm(signupForm)) {
        const formData = new FormData(signupForm);
        const data = Object.fromEntries(formData);
        
        // Simulate API call
        console.log('Signup data:', data);
        
        // Show success message
        showSuccessMessage(signupModal, 'Account created successfully! Please check your email to verify your account.');
        
        // Close modal after 2 seconds
        setTimeout(() => {
            closeModal(signupModal);
        }, 2000);
    }
});

// Login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm(loginForm)) {
        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData);
        
        // Simulate API call
        console.log('Login data:', data);
        
        // Show success message
        showSuccessMessage(loginModal, 'Login successful! Redirecting...');
        
        // Close modal after 2 seconds
        setTimeout(() => {
            closeModal(loginModal);
        }, 2000);
    }
});

// Real-time validation
signupForm.querySelectorAll('input').forEach(input => {
    input.addEventListener('blur', () => {
        validateField(input);
    });
    
    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            validateField(input);
        }
    });
});

loginForm.querySelectorAll('input').forEach(input => {
    input.addEventListener('blur', () => {
        validateField(input);
    });
    
    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            validateField(input);
        }
    });
});

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(input) {
    const name = input.name;
    const value = input.value.trim();
    const rules = validationRules[name];
    
    if (!rules) return true;
    
    // Clear previous error
    clearFieldError(input);
    
    // Required validation
    if (rules.required && !value) {
        showFieldError(input, rules.messages.required);
        return false;
    }
    
    // Skip other validations if field is empty and not required
    if (!value && !rules.required) {
        return true;
    }
    
    // MinLength validation
    if (rules.minLength && value.length < rules.minLength) {
        showFieldError(input, rules.messages.minLength);
        return false;
    }
    
    // MaxLength validation
    if (rules.maxLength && value.length > rules.maxLength) {
        showFieldError(input, rules.messages.maxLength);
        return false;
    }
    
    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value)) {
        showFieldError(input, rules.messages.pattern);
        return false;
    }
    
    // Match validation (for confirm password)
    if (rules.match) {
        const matchInput = input.form.querySelector(`[name="${rules.match}"]`);
        if (matchInput && value !== matchInput.value) {
            showFieldError(input, rules.messages.match);
            return false;
        }
    }
    
    return true;
}

function showFieldError(input, message) {
    input.classList.add('error');
    const errorElement = input.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearFieldError(input) {
    input.classList.remove('error');
    const errorElement = input.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function clearErrors(form) {
    form.querySelectorAll('input').forEach(input => {
        clearFieldError(input);
    });
}

function showSuccessMessage(modal, message) {
    const form = modal.querySelector('form');
    const existingMessage = modal.querySelector('.success-message');
    
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        background: #10b981;
        color: white;
        padding: 1rem;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        text-align: center;
        font-weight: 500;
    `;
    successDiv.textContent = message;
    
    form.insertAdjacentElement('beforebegin', successDiv);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's a modal switch link
        if (href === '#' || this.id === 'switch-to-login' || this.id === 'switch-to-signup') {
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
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
document.querySelectorAll('.feature-card, .step, .pricing-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Handle password confirmation validation when password changes
const signupPassword = document.getElementById('signup-password');
const signupConfirmPassword = document.getElementById('signup-confirm-password');

if (signupPassword && signupConfirmPassword) {
    signupPassword.addEventListener('input', () => {
        if (signupConfirmPassword.value) {
            validateField(signupConfirmPassword);
        }
    });
}
