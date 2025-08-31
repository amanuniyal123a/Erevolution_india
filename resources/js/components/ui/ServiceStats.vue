<template>
  <section class="stats-section">
    <div class="container">
      <div class="stats-container">
        <div class="stat-box" v-for="(stat, index) in animatedStats" :key="index">
          <div class="stat-icon">{{ getStatIcon(stat.label) }}</div>
          <h2 class="stat-number">{{ stat.display }}+ {{ stat.kbz || '' }}</h2>
          <p class="stat-label">{{ stat.label.replace(/[🚀🌍👥⏳]/g, '').trim() }}</p>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
import { ref, onMounted } from 'vue'

const rawStats = [
  { value: 10, label: '🚀 Projects Delivered' },
  { value: 2, label: '🌍 Locations Reached' },
  { value: 10, label: '👥 Team Size' },
  { value: 5, label: '⏳ Experience', kbz: "Years" },
]

const animatedStats = ref(rawStats.map(stat => ({
  ...stat,
  display: 0
})))

function getStatIcon(label) {
  if (label.includes('🚀')) return '🚀'
  if (label.includes('🌍')) return '🌍'
  if (label.includes('👥')) return '👥'
  if (label.includes('⏳')) return '⏳'
  return '📊'
}

onMounted(() => {
  // Delay animation to start after hero section
  setTimeout(() => {
    animatedStats.value.forEach((stat, index) => {
      let count = 0
      const increment = stat.value / 50 // Faster animation
      const delay = index * 200 // Staggered animation

      setTimeout(() => {
        const update = () => {
          if (count < stat.value) {
            count += increment
            animatedStats.value[index].display = Math.ceil(count)
            requestAnimationFrame(update)
          } else {
            animatedStats.value[index].display = stat.value
          }
        }
        update()
      }, delay)
    })
  }, 1000) // Start after 1 second
})
</script>

<style lang="scss" scoped>
@use '../../../../resources/sass/variables' as vars;

.stats-section {
  padding: 3rem 0;
  background: #08141E;
  position: relative;
  overflow: hidden;
  
  @media (max-width: vars.$tablet) {
    padding: 2.5rem 0;
  }
  
  @media (max-width: vars.$mobile) {
    padding: 2rem 0;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(vars.$brand-teal, 0.1) 0%, 
      rgba(vars.$brand-green, 0.05) 50%, 
      rgba(vars.$brand-purple, 0.1) 100%);
    pointer-events: none;
  }

  .container {
    max-width: vars.$container-wide;
    margin: 0 auto;
    padding: 0 2rem;
    position: relative;
    z-index: 1;
    
    @media (max-width: vars.$tablet) {
      padding: 0 1.5rem;
    }
    
    @media (max-width: vars.$mobile) {
      padding: 0 1rem;
    }
  }

  .stats-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    
    @media (max-width: vars.$tablet) {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }
    
    @media (max-width: vars.$mobile) {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }

  .stat-box {
    text-align: center;
    padding: 2rem 1.5rem;
    background: rgba(vars.$text-white, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(vars.$text-white, 0.1);
    border-radius: vars.$border-radius;
    transition: all vars.$transition-fast;
    position: relative;
    overflow: hidden;
    
    @media (max-width: vars.$tablet) {
      padding: 1.5rem 1rem;
    }
    
    @media (max-width: vars.$mobile) {
      padding: 1.25rem 1rem;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, 
        transparent, 
        rgba(vars.$brand-teal, 0.1), 
        transparent);
      transition: left 0.5s ease;
    }

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(vars.$brand-teal, 0.2);
      border-color: vars.$brand-teal;

      &::before {
        left: 100%;
      }
    }

    .stat-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      display: block;
      
      @media (max-width: vars.$tablet) {
        font-size: 2rem;
        margin-bottom: 0.75rem;
      }
      
      @media (max-width: vars.$mobile) {
        font-size: 1.75rem;
        margin-bottom: 0.5rem;
      }
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: 700;
      color: vars.$text-white;
      margin: 0 0 0.5rem 0;
      background: linear-gradient(135deg, vars.$brand-teal, vars.$brand-green);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      
      @media (max-width: vars.$tablet) {
        font-size: 2rem;
      }
      
      @media (max-width: vars.$mobile) {
        font-size: 1.75rem;
      }
    }

    .stat-label {
      font-size: 1rem;
      color: vars.$text-gray;
      margin: 0;
      font-weight: 500;
      
      @media (max-width: vars.$tablet) {
        font-size: 0.95rem;
      }
      
      @media (max-width: vars.$mobile) {
        font-size: 0.9rem;
      }
    }
  }
}

// Animation for stat boxes
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stat-box {
  animation: fadeInUp 0.6s ease-out;
  
  &:nth-child(1) { animation-delay: 0.1s; }
  &:nth-child(2) { animation-delay: 0.2s; }
  &:nth-child(3) { animation-delay: 0.3s; }
  &:nth-child(4) { animation-delay: 0.4s; }
}

// Responsive adjustments for better spacing
@media (max-width: 1200px) {
  .stats-section .stats-container {
    gap: 1.75rem;
  }
}

@media (max-width: 768px) {
  .stats-section {
    .stats-container {
      gap: 1.25rem;
    }
    
    .stat-box {
      padding: 1.25rem 1rem;
      
      .stat-icon {
        font-size: 1.75rem;
      }
      
      .stat-number {
        font-size: 1.75rem;
      }
      
      .stat-label {
        font-size: 0.9rem;
      }
    }
  }
}

@media (max-width: 480px) {
  .stats-section {
    .stats-container {
      gap: 1rem;
    }
    
    .stat-box {
      padding: 1rem 0.75rem;
      
      .stat-icon {
        font-size: 1.5rem;
      }
      
      .stat-number {
        font-size: 1.5rem;
      }
      
      .stat-label {
        font-size: 0.85rem;
      }
    }
  }
}

.stats-section .container .stats-container {
    background-color: #0b1a1d;
    border-radius: 1rem;
    padding: 2.5rem;
    color: #ffffff;
    display: flex
;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 2rem;
}

.stats-section[data-v-36df1a3e] {
    padding: 0rem 0;
    position: relative;
    overflow: hidden;
}


.stats-section .container[data-v-36df1a3e] {
    max-width: 100%;
    margin: 0rem auto;
    padding: 0;
    position: relative;
    z-index: 1;
}
</style>
