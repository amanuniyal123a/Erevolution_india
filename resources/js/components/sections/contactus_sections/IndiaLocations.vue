<template>
  <section class="locations-section">
    <div class="location-card-wrapper">
      <h2 class="title">
        <img :src="flagImage" alt="India Flag" class="flag" />
        India
      </h2>

      <div class="location-cards">
        <div class="card" v-for="location in locations" :key="location.city">
          <img :src="location.image" alt="Office Image" class="office-img" />
          <h3>{{ location.city }}</h3>
          <p>{{ location.address }}</p>
          <p class="phone">{{ location.phone }}</p>
          <button class="map-btn">Map 🗺️</button>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
const flagImage = new URL('@src/assets/india.jpg', import.meta.url).href;

const locations = [
  {
    city: "Kanchenjunga Tower (K-Tower), Mohali",
    address:
      "Plot No. I-23, Sector 83, JLPL Industrial Area, Sahibzada Ajit Singh Nagar, Punjab 140306",
    phone: "+91 172 4346363",
    image: new URL('@src/assets/AyeshaVerma.jpeg', import.meta.url).href
  },
  {
    city: "Nagpur Fuji Tower",
    address: "9 R, Mihan, Maharashtra - 441108 India (GMT+5:30)",
    phone: "+91 7104 668888",
    image: new URL('@src/assets/nagpur.jpg', import.meta.url).href 
  },
  {
    city: "Dehradun Kamet Tower",
    address:
      "2nd floor, Jyoti Palace, Sahastradhara Road, Uttarakhand - 248001, India (GMT+5:30)",
    phone: "+91 135 2781880",
    image: new URL('@src/assets/dehradun.jpg', import.meta.url).href // <-- Replace here too
  },
];
</script>

  
  <style lang="scss" scoped>
  .locations-section {
    background: #f9f9ed;
    padding: 4rem 1rem;
    display: flex;
    justify-content: center;
  
    .location-card-wrapper {
      max-width: 1200px;
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  
      .title {
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 2rem;
        font-weight:600;
        color: black;
        .flag {
          width: 24px;
          height: auto;
        }
      }
  
      .location-cards {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        justify-content: space-between;
  
        .card {
          flex: 1 1 calc(33% - 1.5rem);
          background: white;
          border-radius: 8px;
          text-align: left;
  
          .office-img {
            width: 100%;
            border-radius: 8px;
            object-fit: cover;
            height: 35vh;
          }
  
          h3 {
            font-size: 1.2rem;
            margin: 0.8rem 0 0.4rem;
          }
  
          p {
            margin: 0.2rem 0;
          }
  
          .phone {
            color: #e63946;
            font-weight: 600;
          }
  
          .map-btn {
            margin-top: 0.5rem;
            background: #f4f4f4;
            border: none;
            padding: 0.4rem 0.8rem;
            border-radius: 4px;
            cursor: pointer;
          }
        }
      }
    }
  }
  </style>
  