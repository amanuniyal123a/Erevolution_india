<template>
    <section class="contact-section">
        <div class="containerbox">
      <h2><span class="highlight">Contact</span> Us</h2>
      <form class="contact-form" @submit.prevent="submitForm">
        <div class="form-grid">
          <div class="form-group">
            <label>Name*</label>
            <input type="text" v-model="form.name" placeholder="Name" required />
          </div>
  
          <div class="form-group">
            <label>Phone*</label>
            <input type="tel" v-model="form.phone" placeholder="(201) 555-0123" required />
          </div>
  
          <div class="form-group">
            <label>Email*</label>
            <input type="email" v-model="form.email" placeholder="Email" required />
          </div>
  
          <div class="form-group">
            <label>Purpose to Connect*</label>
            <select v-model="form.purpose" required>
              <option value="">Select Purpose to Connect</option>
              <option value="support">Support</option>
              <option value="sales">Sales</option>
              <option value="partnership">Partnership</option>
            </select>
          </div>
  
          <div class="form-group message">
            <label>Message*</label>
            <textarea v-model="form.message" placeholder="Elaborate your message here" required></textarea>
          </div>
        </div>
  
        <div class="recaptcha">[reCAPTCHA goes here]</div>
  
        <div class="checkbox-group">
          <input type="checkbox" v-model="form.agree" required />
          <span>
            I agree to be contacted based on the information I provided. <a href="#">Privacy Policy</a>
          </span>
        </div>
  
        <button class="submit-btn" type="submit">Submit</button>
      </form>
    </div>
    </section>
  </template>
  
  <script setup>
  import { reactive } from 'vue';
  
  const form = reactive({
    name: '',
    phone: '',
    email: '',
    purpose: '',
    message: '',
    agree: false,
  });
  
  function submitForm() {
    console.log('Form submitted:', form);
    // Add your API logic here
  }
  </script>
  
  <style lang="scss" scoped>
  .contact-section {
    background: linear-gradient(to right, #424748, #0d3667);
    padding: 3rem;
    border-radius: 8px;
    .containerbox {
        margin-left: auto;
        margin-right: auto;
        max-width: 1623px;
    }
    h2 {
      font-size: 2rem;
      margin-bottom: 1.5rem;
      .highlight {
        color: #e63946;
        font-weight: bold;
      }
    }
  
    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
  
      .form-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
      }
  
      .form-group {
        display: flex;
        flex-direction: column;
  
        label {
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
  
        input,
        select,
        textarea {
          padding: 0.75rem 1rem;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 1rem;
        }
  
        textarea {
          min-height: 120px;
          resize: vertical;
        }
  
        &.message {
          grid-column: span 2;
        }
      }
  
      .recaptcha {
        background: #fff;
        padding: 1rem;
        border: 1px solid #ccc;
        width: fit-content;
      }
  
      .checkbox-group {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        font-size: 0.9rem;
  
        input[type='checkbox'] {
          margin-top: 0.2rem;
        }
  
        a {
          color: #e63946;
          font-weight: 600;
          text-decoration: none;
        }
      }
  
      .submit-btn {
        align-self: flex-end;
        background: #e63946;
        color: #fff;
        border: none;
        padding: 0.75rem 2rem;
        border-radius: 4px;
        font-weight: bold;
        cursor: pointer;
        transition: background 0.3s ease;
  
        &:hover {
          background: #c72b3a;
        }
      }
    }
  }
  </style>
  