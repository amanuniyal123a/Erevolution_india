<template>
  <section class="contact-section" id="contact">
    <div class="containerbox">
      <div class="contact-header">
        <h2><span class="highlight">Contact</span> Us</h2>
        <p class="contact-subtitle">
          Ready to start your next project? Get in touch with us today and let's bring your ideas to life.
        </p>
      </div>

      <form class="contact-form" @submit.prevent="submitForm" novalidate>
        <div class="form-grid">
          <!-- Name Field -->
          <div class="form-group" :class="{ 'error': errors.name }">
            <label for="name">
              <User class="field-icon" />
              Full Name *
            </label>
            <input 
              id="name"
              type="text" 
              v-model="form.name" 
              placeholder="Enter your full name"
              required
              :disabled="isSubmitting"
              @blur="validateField('name')"
            />
            <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
          </div>

          <!-- Phone Field -->
          <div class="form-group" :class="{ 'error': errors.phone }">
            <label for="phone">
              <Phone class="field-icon" />
              Phone Number *
            </label>
            <input 
              id="phone"
              type="tel" 
              v-model="form.phone" 
              placeholder="+91 98765 43210"
              required
              :disabled="isSubmitting"
              @blur="validateField('phone')"
            />
            <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
          </div>

          <!-- Email Field -->
          <div class="form-group" :class="{ 'error': errors.email }">
            <label for="email">
              <Mail class="field-icon" />
              Email Address *
            </label>
            <input 
              id="email"
              type="email" 
              v-model="form.email" 
              placeholder="your.email@example.com"
              required
              :disabled="isSubmitting"
              @blur="validateField('email')"
            />
            <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
          </div>

          <!-- Purpose Field -->
          <div class="form-group" :class="{ 'error': errors.purpose }">
            <label for="purpose">
              <Target class="field-icon" />
              Purpose to Connect *
            </label>
            <select 
              id="purpose"
              v-model="form.purpose" 
              required
              :disabled="isSubmitting"
              @blur="validateField('purpose')"
            >
              <option value="">Select Purpose to Connect</option>
              <option value="web-development">Web Development</option>
              <option value="mobile-apps">Mobile App Development</option>
              <option value="ai-solutions">AI & Machine Learning</option>
              <option value="consulting">IT Consulting</option>
              <option value="digital-marketing">Digital Marketing</option>
              <option value="partnership">Partnership</option>
              <option value="support">Support</option>
              <option value="other">Other</option>
            </select>
            <span v-if="errors.purpose" class="error-message">{{ errors.purpose }}</span>
          </div>

          <!-- Message Field -->
          <div class="form-group message" :class="{ 'error': errors.message }">
            <label for="message">
              <MessageSquare class="field-icon" />
              Message *
            </label>
            <textarea 
              id="message"
              v-model="form.message" 
              placeholder="Tell us about your project, requirements, or any questions you have..."
              required
              :disabled="isSubmitting"
              @blur="validateField('message')"
            ></textarea>
            <div class="textarea-footer">
              <span class="char-count">{{ form.message.length }}/1000</span>
              <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
            </div>
          </div>
        </div>

        <!-- reCAPTCHA Placeholder -->
        <div class="recaptcha-section">
          <div class="recaptcha-placeholder">
            <Shield class="recaptcha-icon" />
            <span>reCAPTCHA verification will be added here</span>
          </div>
        </div>

        <!-- Terms and Conditions -->
        <div class="checkbox-group" :class="{ 'error': errors.agree }">
          <div class="checkbox-wrapper">
            <input 
              type="checkbox" 
              id="agree"
              v-model="form.agree" 
              required
              :disabled="isSubmitting"
              @change="validateField('agree')"
            />
            <label for="agree" class="checkbox-label">
              I agree to be contacted based on the information I provided and accept the 
              <a href="/privacy" target="_blank" class="link">Privacy Policy</a> and 
              <a href="/terms" target="_blank" class="link">Terms of Service</a>
            </label>
          </div>
          <span v-if="errors.agree" class="error-message">{{ errors.agree }}</span>
        </div>

        <!-- Submit Button -->
        <div class="submit-section">
          <button 
            type="submit" 
            class="submit-btn" 
            :disabled="isSubmitting || !isFormValid"
          >
            <span v-if="!isSubmitting" class="btn-content">
              <Send class="btn-icon" />
              Send Message
            </span>
            <span v-else class="btn-content">
              <Loader class="btn-icon spinning" />
              Sending...
            </span>
          </button>
        </div>
      </form>

      <!-- Success Message -->
      <div v-if="submitSuccess" class="success-message">
        <CheckCircle class="success-icon" />
        <div class="success-content">
          <h3>Thank you for your message!</h3>
          <p>We've received your inquiry and will get back to you within 24 hours.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue';
import { 
  User, 
  Phone, 
  Mail, 
  Target, 
  MessageSquare, 
  Shield, 
  Send, 
  Loader, 
  CheckCircle 
} from 'lucide-vue-next';

const form = reactive({
  name: '',
  phone: '',
  email: '',
  purpose: '',
  message: '',
  agree: false,
});

const errors = reactive({
  name: '',
  phone: '',
  email: '',
  purpose: '',
  message: '',
  agree: '',
});

const isSubmitting = ref(false);
const submitSuccess = ref(false);

// Form validation
const validateField = (field) => {
  errors[field] = '';
  
  switch (field) {
    case 'name':
      if (!form.name.trim()) {
        errors.name = 'Name is required';
      } else if (form.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
      }
      break;
      
    case 'phone':
      if (!form.phone.trim()) {
        errors.phone = 'Phone number is required';
      } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(form.phone.replace(/\s/g, ''))) {
        errors.phone = 'Please enter a valid phone number';
      }
      break;
      
    case 'email':
      if (!form.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = 'Please enter a valid email address';
      }
      break;
      
    case 'purpose':
      if (!form.purpose) {
        errors.purpose = 'Please select a purpose';
      }
      break;
      
    case 'message':
      if (!form.message.trim()) {
        errors.message = 'Message is required';
      } else if (form.message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters';
      } else if (form.message.length > 1000) {
        errors.message = 'Message must be less than 1000 characters';
      }
      break;
      
    case 'agree':
      if (!form.agree) {
        errors.agree = 'You must agree to the terms and conditions';
      }
      break;
  }
};

// Validate all fields
const validateForm = () => {
  ['name', 'phone', 'email', 'purpose', 'message', 'agree'].forEach(validateField);
  return !Object.values(errors).some(error => error);
};

// Check if form is valid
const isFormValid = computed(() => {
  return form.name && form.phone && form.email && form.purpose && 
         form.message && form.agree && !Object.values(errors).some(error => error);
});

// Submit form
const submitForm = async () => {
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Show success message
    submitSuccess.value = true;
    
    // Reset form
    Object.keys(form).forEach(key => {
      if (key === 'agree') {
        form[key] = false;
      } else {
        form[key] = '';
      }
    });
    
    // Clear errors
    Object.keys(errors).forEach(key => {
      errors[key] = '';
    });
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      submitSuccess.value = false;
    }, 5000);
    
  } catch (error) {
    console.error('Form submission error:', error);
    // Handle error (show error message, etc.)
  } finally {
    isSubmitting.value = false;
  }
};

// Auto-resize textarea
const autoResizeTextarea = () => {
  const textarea = document.querySelector('textarea');
  if (textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
};

onMounted(() => {
  // Watch for message changes to auto-resize textarea
  const textarea = document.querySelector('textarea');
  if (textarea) {
    textarea.addEventListener('input', autoResizeTextarea);
  }
});
</script>

<style lang="scss" scoped>
@use '../../../../resources/sass/variables' as vars;

.contact-section {
  background: vars.$primary-bg;
  padding: 4rem 2rem;
  border-radius: vars.$border-radius;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, vars.$brand-teal, vars.$brand-purple);
  }
  
  @media (max-width: vars.$mobile) {
    padding: 2rem 1rem;
    margin: 1rem;
  }
  
  .containerbox {
    margin-left: auto;
    margin-right: auto;
    max-width: vars.$container-wide;
  }
  
  // Contact Header
  .contact-header {
    text-align: center;
    margin-bottom: 3rem;
    
    h2 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: vars.$text-white;
      
      .highlight {
        color: vars.$brand-red;
        font-weight: bold;
      }
    }
    
    .contact-subtitle {
      color: vars.$text-gray;
      font-size: 1.1rem;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }
  }

  // Contact Form
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      
      @media (max-width: vars.$mobile) {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    }

    .form-group {
      display: flex;
      flex-direction: column;
      position: relative;

      label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
        color: vars.$text-white;
        
        .field-icon {
          width: 18px;
          height: 18px;
          color: vars.$brand-teal;
        }
      }

      input,
      select,
      textarea {
        padding: 1rem 1rem 1rem 3rem;
        border-radius: vars.$border-radius;
        border: 2px solid rgba(vars.$text-white, 0.2);
        font-size: 1rem;
        background-color: rgba(vars.$text-white, 0.1);
        color: vars.$text-white;
        transition: all vars.$transition-fast;
        position: relative;
        
        &::placeholder {
          color: rgba(vars.$text-white, 0.6);
        }
        
        &:focus {
          outline: none;
          border-color: vars.$brand-teal;
          background-color: rgba(vars.$text-white, 0.15);
          box-shadow: 0 0 0 3px rgba(vars.$brand-teal, 0.1);
        }
        
        &:hover:not(:focus) {
          border-color: rgba(vars.$text-white, 0.4);
        }
        
        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }

      textarea {
        min-height: 120px;
        resize: vertical;
        font-family: inherit;
      }

      &.message {
        grid-column: span 2;
        
        @media (max-width: vars.$mobile) {
          grid-column: span 1;
        }
        
        .textarea-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.5rem;
          
          .char-count {
            font-size: 0.85rem;
            color: vars.$text-gray;
          }
        }
      }
      
      &.error {
        input,
        select,
        textarea {
          border-color: vars.$brand-red;
          box-shadow: 0 0 0 3px rgba(vars.$brand-red, 0.1);
        }
      }
      
      .error-message {
        color: vars.$brand-red;
        font-size: 0.85rem;
        margin-top: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
    }

    // reCAPTCHA Section
    .recaptcha-section {
      .recaptcha-placeholder {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1.5rem;
        background: rgba(vars.$text-white, 0.05);
        border: 2px dashed rgba(vars.$text-white, 0.3);
        border-radius: vars.$border-radius;
        color: vars.$text-gray;
        
        .recaptcha-icon {
          width: 24px;
          height: 24px;
          color: vars.$brand-teal;
        }
      }
    }

    // Checkbox Group
    .checkbox-group {
      .checkbox-wrapper {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        
        input[type='checkbox'] {
          margin-top: 0.25rem;
          accent-color: vars.$brand-teal;
          width: 18px;
          height: 18px;
        }
        
        .checkbox-label {
          color: vars.$text-white;
          font-size: 0.95rem;
          line-height: 1.5;
          cursor: pointer;
          
          .link {
            color: vars.$brand-teal;
            text-decoration: none;
            font-weight: 600;
            
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
      
      &.error {
        .checkbox-label {
          color: vars.$brand-red;
        }
      }
      
      .error-message {
        color: vars.$brand-red;
        font-size: 0.85rem;
        margin-top: 0.5rem;
      }
    }

    // Submit Section
    .submit-section {
      display: flex;
      justify-content: center;
      
      .submit-btn {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        background: linear-gradient(135deg, vars.$brand-red, darken(vars.$brand-red, 10%));
        color: vars.$text-white;
        border: none;
        padding: 1rem 2.5rem;
        border-radius: vars.$border-radius;
        font-weight: 600;
        font-size: 1.1rem;
        cursor: pointer;
        transition: all vars.$transition-fast;
        box-shadow: 0 4px 15px rgba(vars.$brand-red, 0.3);
        position: relative;
        overflow: hidden;
        
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }
        
        &:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(vars.$brand-red, 0.4);
          
          &::before {
            left: 100%;
          }
          
          .btn-icon {
            transform: translateX(3px);
          }
        }
        
        &:focus {
          outline: 2px solid vars.$text-white;
          outline-offset: 2px;
        }
        
        &:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        
        .btn-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .btn-icon {
          width: 20px;
          height: 20px;
          transition: transform vars.$transition-fast;
          
          &.spinning {
            animation: spin 1s linear infinite;
          }
        }
      }
    }
  }

  // Success Message
  .success-message {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
    background: rgba(vars.$brand-green, 0.1);
    border: 2px solid vars.$brand-green;
    border-radius: vars.$border-radius;
    margin-top: 2rem;
    
    .success-icon {
      width: 32px;
      height: 32px;
      color: vars.$brand-green;
      flex-shrink: 0;
    }
    
    .success-content {
      h3 {
        color: vars.$brand-green;
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
      }
      
      p {
        color: vars.$text-gray;
        margin: 0;
        line-height: 1.5;
      }
    }
  }
}

// Animations
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.contact-section .contact-header[data-v-70a5b40c] {
    text-align: center;
    margin-bottom: 3rem;
    margin-top: 4%;
}

option {
    background: #17223b;
    border-radius: 26px;
}
</style>
  