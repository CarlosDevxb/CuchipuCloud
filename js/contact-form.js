/**
 * CUCHIPU CLOUD - Contact Form Module
 * Validación y manejo del formulario de contacto con EmailJS
 */

const ContactForm = (() => {
    'use strict';

    // EmailJS Configuration
    // Para configurar:
    // 1. Crear cuenta en https://www.emailjs.com/
    // 2. Crear un servicio de email (Gmail, Outlook, etc.)
    // 3. Crear un template de email
    // 4. Reemplazar los valores abaixo con tus credenciales
    const EMAILJS_CONFIG = {
        publicKey: 'J54b0Wfx5qaadL9gR',      // Reemplazar con tu Public Key
        serviceId: 'service_7q9vuap',      // Reemplazar con tu Service ID
        templateId: 'template_2jsjqry'     // Reemplazar con tu Template ID
    };

    // DOM Elements
    let form = null;
    let submitButton = null;
    let successMessage = null;

    // Form fields
    let fields = {};

    // Validation rules
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            maxLength: 100,
            pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
            messages: {
                required: 'El nombre es requerido',
                minLength: 'El nombre debe tener al menos 2 caracteres',
                maxLength: 'El nombre no puede exceder 100 caracteres',
                pattern: 'El nombre solo puede contener letras y espacios'
            }
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            messages: {
                required: 'El email es requerido',
                pattern: 'Por favor ingresa un email válido'
            }
        },
        service: {
            required: true,
            messages: {
                required: 'Por favor selecciona un servicio'
            }
        },
        message: {
            required: true,
            minLength: 10,
            maxLength: 1000,
            messages: {
                required: 'El mensaje es requerido',
                minLength: 'El mensaje debe tener al menos 10 caracteres',
                maxLength: 'El mensaje no puede exceder 1000 caracteres'
            }
        },
        terms: {
            required: true,
            messages: {
                required: 'Debes aceptar los términos y condiciones'
            }
        }
    };

    /**
     * Initialize contact form
     */
    function init() {
        form = document.getElementById('contactForm');
        if (!form) return;

        submitButton = form.querySelector('.form-submit-btn');
        successMessage = document.getElementById('formSuccess');

        // Get form fields
        fields = {
            name: form.querySelector('#name'),
            email: form.querySelector('#email'),
            service: form.querySelector('#service'),
            message: form.querySelector('#message'),
            terms: form.querySelector('#terms')
        };

        // Initialize EmailJS
        initEmailJS();
        setupEventListeners();
    }

    /**
     * Initialize EmailJS library
     */
    function initEmailJS() {
        // Load EmailJS script if not already loaded
        if (typeof emailjs === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
            script.onload = () => {
                emailjs.init(EMAILJS_CONFIG.publicKey);
            };
            document.head.appendChild(script);
        } else {
            emailjs.init(EMAILJS_CONFIG.publicKey);
        }
    }

    /**
     * Setup event listeners
     */
    function setupEventListeners() {
        // Form submission
        form.addEventListener('submit', handleSubmit);

        // Real-time validation
        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName];
            if (field) {
                // Validate on blur
                field.addEventListener('blur', () => {
                    validateField(fieldName);
                });

                // Clear error on input
                field.addEventListener('input', () => {
                    clearFieldError(fieldName);
                });
            }
        });
    }

    /**
     * Handle form submission
     */
    async function handleSubmit(e) {
        e.preventDefault();

        // Validate all fields
        const isValid = validateAllFields();

        if (!isValid) {
            // Focus on first error
            const firstError = form.querySelector('.form-input.error, .form-textarea.error, .form-select.error');
            if (firstError) {
                firstError.focus();
            }
            return;
        }

        // Show loading state
        setLoadingState(true);

        try {
            await sendEmail();
            showSuccess();
            resetForm();
        } catch (error) {
            console.error('Error sending email:', error);
            showError('Hubo un error al enviar el formulario. Por favor intenta nuevamente o contáctanos directamente a info@cuchipu.cloud');
        } finally {
            setLoadingState(false);
        }
    }

    /**
     * Send email via EmailJS
     */
    async function sendEmail() {
        const formData = getFormData();

        // Map service value to readable name
        const serviceNames = {
            'web': 'Desarrollo Web',
            'software': 'Desarrollo de Software',
            'cloud': 'Servicios Cloud',
            'redes': 'Redes e Infraestructura',
            'seguridad': 'Ciberseguridad',
            'consultoria': 'Consultoría IT'
        };

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            service: serviceNames[formData.service] || formData.service,
            message: formData.message,
            to_email: 'cuchinetworks@gmail.com'
        };

        // Check if EmailJS is configured
        if (EMAILJS_CONFIG.publicKey === 'TU_PUBLIC_KEY') {
            // Demo mode - simulate submission
            console.warn('EmailJS no configurado. Modo demo activado.');
            return simulateSubmission();
        }

        return emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            templateParams
        );
    }

    /**
     * Validate all fields
     */
    function validateAllFields() {
        let isValid = true;

        Object.keys(fields).forEach(fieldName => {
            if (!validateField(fieldName)) {
                isValid = false;
            }
        });

        return isValid;
    }

    /**
     * Validate a single field
     */
    function validateField(fieldName) {
        const field = fields[fieldName];
        const rules = validationRules[fieldName];

        if (!field || !rules) return true;

        // Handle checkbox validation differently
        const isCheckbox = field.type === 'checkbox';
        const value = isCheckbox ? field.checked : field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Required validation
        if (rules.required && (isCheckbox ? !value : !value)) {
            isValid = false;
            errorMessage = rules.messages.required;
        }
        // Min length validation (only for non-checkboxes)
        else if (!isCheckbox && rules.minLength && value.length < rules.minLength) {
            isValid = false;
            errorMessage = rules.messages.minLength;
        }
        // Max length validation (only for non-checkboxes)
        else if (!isCheckbox && rules.maxLength && value.length > rules.maxLength) {
            isValid = false;
            errorMessage = rules.messages.maxLength;
        }
        // Pattern validation (only for non-checkboxes)
        else if (!isCheckbox && rules.pattern && !rules.pattern.test(value)) {
            isValid = false;
            errorMessage = rules.messages.pattern;
        }

        // Update UI
        if (!isValid) {
            showFieldError(fieldName, errorMessage);
        } else {
            clearFieldError(fieldName);
        }

        return isValid;
    }

    /**
     * Show field error
     */
    function showFieldError(fieldName, message) {
        const field = fields[fieldName];
        const errorElement = document.getElementById(`${fieldName}Error`);

        if (field) {
            field.classList.add('error');
            field.style.borderColor = 'var(--error)';
        }

        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    /**
     * Clear field error
     */
    function clearFieldError(fieldName) {
        const field = fields[fieldName];
        const errorElement = document.getElementById(`${fieldName}Error`);

        if (field) {
            field.classList.remove('error');
            field.style.borderColor = '';
        }

        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }

    /**
     * Clear all errors
     */
    function clearAllErrors() {
        Object.keys(fields).forEach(fieldName => {
            clearFieldError(fieldName);
        });
    }

    /**
     * Set loading state
     */
    function setLoadingState(loading) {
        if (submitButton) {
            submitButton.disabled = loading;
            submitButton.innerHTML = loading ? 
                '<span class="spinner" style="width: 20px; height: 20px;"></span> Enviando...' : 
                'Enviar Mensaje <span>→</span>';
        }
    }

    /**
     * Show success message
     */
    function showSuccess() {
        if (successMessage) {
            successMessage.style.display = 'block';
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Hide after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    }

    /**
     * Show error message
     */
    function showError(message) {
        // Create temporary error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error-global';
        errorDiv.style.cssText = `
            background: var(--error);
            color: white;
            padding: var(--space-4);
            border-radius: var(--radius-lg);
            margin-bottom: var(--space-4);
            text-align: center;
        `;
        errorDiv.textContent = message;

        form.insertBefore(errorDiv, form.firstChild);

        // Remove after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    /**
     * Reset form
     */
    function resetForm() {
        form.reset();
        clearAllErrors();
    }

    /**
     * Simulate form submission (demo mode)
     */
    function simulateSubmission() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1500);
        });
    }

    /**
     * Get form data
     */
    function getFormData() {
        const data = {};
        Object.keys(fields).forEach(fieldName => {
            data[fieldName] = fields[fieldName].value.trim();
        });
        return data;
    }

    /**
     * Set form data
     */
    function setFormData(data) {
        Object.keys(data).forEach(key => {
            if (fields[key]) {
                fields[key].value = data[key];
            }
        });
    }

    // Public API
    return {
        init,
        validateAllFields,
        resetForm,
        getFormData,
        setFormData
    };
})();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactForm;
}
