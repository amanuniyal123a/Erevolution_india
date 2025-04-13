<template>
    <section class="products">
      <div class="container">
        <div class="header">
          <h2><span>Our</span> smartProducts</h2>
          <a href="#" class="view-all">View all</a>
        </div>
      </div>
  
      <div class="slider-wrapper">
        <div class="slider" ref="slider">
          <div
            class="product-card"
            v-for="(product, index) in products"
            :key="index"
          >
            <img :src="product.image" :alt="product.title" />
            <h3>{{ product.title }}</h3>
            <p>{{ product.description }}</p>
            <a href="#" class="read-more">Read More</a>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  const localHeroImage = new URL('@/assets/hero-img.jpg', import.meta.url).href;
  
  export default {
    name: 'SmartProducts',
    data() {
      return {
        products: [
        {
            title: 'smartBridge',
            description: 'smartBridge is a versatile application powered by advanced LLM technology, designed to simplify not just referral processes but all types of document generation. Effortlessly create referral letters, reports, and other...',
            image:localHeroImage
          },
          {
            title: 'smartTelehealth',
            description: 'The current crisis has demonstrated the relevance of telehealth and created an opening to modernize the care delivery system. This modernization will be achieved by embedding telehealth in the care continuum at scale...',
            image:localHeroImage
          },
          {
            title: 'smartHealth',
            description: 'smartHealth Application offers a comprehensive suite of features designed to streamline healthcare management for clinics, hospitals, and other agencies. With a SaaS-based architecture, it supports subscription-based access...',
            image: localHeroImage
          },
          {
            title: 'smartBridge',
            description: 'smartBridge is a versatile application powered by advanced LLM technology, designed to simplify not just referral processes but all types of document generation. Effortlessly create referral letters, reports, and other...',
            image:localHeroImage
          },
          {
            title: 'smartTelehealth',
            description: 'The current crisis has demonstrated the relevance of telehealth and created an opening to modernize the care delivery system. This modernization will be achieved by embedding telehealth in the care continuum at scale...',
            image:localHeroImage
          },
          {
            title: 'smartHealth',
            description: 'smartHealth Application offers a comprehensive suite of features designed to streamline healthcare management for clinics, hospitals, and other agencies. With a SaaS-based architecture, it supports subscription-based access...',
            image: localHeroImage
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped lang="scss">
  .products {
    padding: 2rem 0;
    font-family: 'Segoe UI', sans-serif;
  
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding: 0 1rem;
  
      h2 {
        font-size: 2rem;
        font-weight: 700;
  
        span {
          color: #e30613;
        }
      }
  
      .view-all {
        color: #e30613;
        font-weight: 600;
        text-decoration: none;
        font-size: 0.95rem;
      }
    }
  
    .slider-wrapper {
      overflow-x: auto;
      padding-left: 1rem;
      -webkit-overflow-scrolling: touch;
  
      .slider {
        display: flex;
        gap: 1.5rem;
        padding-bottom: 1rem;
        min-width: 100%;
      }
  
      .product-card {
        flex: 0 0 auto;
        width: 350px;
        background: #fff;
        border-radius: 1.25rem;
        box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: 0.3s ease;
  
        img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          border-radius: 1rem;
          margin-bottom: 1rem;
        }
  
        h3 {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #1d1d1d;
          text-align: center;
        }
  
        p {
          font-size: 0.95rem;
          color: #555;
          margin-bottom: 1rem;
          text-align: center;
        }
  
        .read-more {
          font-size: 0.9rem;
          color: #e30613;
          font-weight: 600;
          text-decoration: none;
          align-self: flex-start;
        }
  
        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
      }
    }
  }
  </style>
  