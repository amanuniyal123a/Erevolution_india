# Erevolution India

Erevolution India is a modern, responsive web application built with **Laravel 12** backend and **Vue.js 3** frontend, featuring a comprehensive design system with **Sass** and **Tailwind CSS**. The project showcases a professional business website with interactive components, smooth animations, and a mobile-first responsive design.

## 🚀 Quick Start

### Prerequisites
- PHP 8.2 or higher
- Node.js 18 or higher
- Composer
- MySQL (or MySQL/PostgreSQL)

### Installation

1. **Clone the Project**
```bash
git clone https://github.com/amanuniyal123a/Erevolution_India.git
cd Erevolution_India
```

2. **Install PHP Dependencies**
```bash
composer install
```

3. **Install Node.js Dependencies**
```bash
npm install
```

4. **Environment Setup**
```bash
cp .env.example .env
php artisan key:generate
```

5. **Database Setup**
```bash
php artisan migrate
```

6. **Start Development Servers**
```bash
# Terminal 1: Start Laravel backend
php artisan serve

# Terminal 2: Start Vue.js frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:8000

## 📁 Project Structure
```
├── artisan                  # Laravel CLI
├── composer.json            # PHP dependencies
├── composer.lock            # PHP lock file
├── package.json             # Node.js dependencies
├── phpunit.xml              # PHPUnit config
├── vite.config.js           # Vite config
├── app/
│   ├── Http/
│   │   └── Controllers/     # Laravel controllers
│   ├── Models/              # Eloquent models
│   └── Providers/           # Service providers
├── bootstrap/               # Laravel bootstrap files
├── config/                  # App configuration
├── database/
│   ├── migrations/          # DB migrations
│   ├── seeders/             # DB seeders
│   └── database.sqlite      # SQLite DB (default)
├── public/
│   └── index.php            # Entry point
│   └── build/               # Frontend assets
├── resources/
│   ├── js/
│   │   ├── components/
│   │   │   ├── layouts/          # Layout components
│   │   │   ├── pages/            # Page components
│   │   │   ├── sections/         # Section components
│   │   │   └── ui/               # UI components
│   │   ├── router/               # Vue Router config
│   │   ├── App.vue               # Root Vue component
│   │   └── app.js                # App entry point
│   ├── sass/                     # Sass styles
│   └── views/                    # Blade templates
├── routes/
│   ├── api.php                   # API routes
│   ├── web.php                   # Web routes
│   └── console.php               # Console routes
├── storage/                      # File storage
├── tests/                        # PHPUnit tests
└── vendor/                       # Composer dependencies
```

> **Note:**
> - Backend logic is organized in `app/Http/Controllers`, `app/Models`, and `routes/`.
> - SQLite is used by default for local development, but you can configure MySQL/PostgreSQL in `config/database.php`.
> - Frontend assets are built into `public/build/`.
> - PHPUnit tests are in the `tests/` folder.

## 🛠️ Tech Stack

### Backend
- **Laravel 12.0** - PHP framework
- **Laravel Sanctum** - API authentication
- **SQLite** - Database (configurable)
- **Laravel UI** - Frontend scaffolding

### Frontend
- **Vue.js 3.2.37** - Progressive JavaScript framework
- **Vue Router 4.5.0** - Client-side routing
- **Sass 1.87.0** - CSS preprocessor
- **Tailwind CSS 4.0.0** - Utility-first CSS framework
- **Vite 5.2.0** - Build tool and dev server
- **Bootstrap 5.2.3** - UI component library
- **Lucide Vue Next** - Icon library

## 🎨 Design System

### Color Palette
- **Primary**: `#eaeef3` (Light gray)
- **Accent**: `#1f2937` (Dark gray)
- **Brand Colors**: 
  - Green: `#26d54c`
  - Teal: `#0da5aef5`
  - Purple: `#731f76`
  - Red: `#e63946`
  - Gold: `#deb444`

### Typography
- **Primary Font**: Inter (Sans-serif)
- **Secondary Font**: Nunito (Sans-serif)
- **Base Font Size**: 0.9rem
- **Line Height**: 1.6

### Responsive Breakpoints
- **Mobile**: 768px and below
- **Tablet**: 1024px and below
- **Desktop**: 1200px and above

## 🎯 Key Features

### 🏠 Home Page Sections

#### 1. **Header Navigation**
- Sticky navigation with scroll effects
- Responsive mobile menu with hamburger icon
- Logo with brand identity
- Call-to-action button
- Smooth scroll navigation

#### 2. **Hero Section**
- Dynamic content slider with auto-play
- Touch/drag support for mobile
- Keyboard navigation (Arrow keys)
- Gradient text highlights
- Responsive image gallery
- Navigation dots for manual control

#### 3. **Service Statistics**
- Animated counters with staggered timing
- Glassmorphism design with backdrop blur
- Responsive grid layout (4→2→1 columns)
- Hover effects with shimmer animation
- Icon-based statistics display

#### 4. **Customer Testimonials**
- Responsive slider with auto-play
- Touch/drag functionality
- Navigation dots and arrows
- Card-based design with glassmorphism
- Customer photos and ratings

#### 5. **Services Showcase**
- Interactive service cards
- Responsive slider navigation
- Icon-based service representation
- Hover animations and effects
- Detailed service descriptions

#### 6. **Leadership Team**
- Team member profiles with photos
- Social media links (LinkedIn, Twitter, Email)
- Responsive slider with auto-play
- Professional bios and statistics
- Hover effects for social interactions

#### 7. **Contact Form**
- Real-time form validation
- Client-side error handling
- Loading states and success messages
- Responsive design
- Accessibility features

#### 8. **Footer**
- Newsletter signup with validation
- Social media links
- Quick navigation links
- Company information
- Back-to-top button

### 🎨 Design Features

#### **Responsive Design**
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interactions
- Optimized typography scaling

#### **Animations & Interactions**
- Smooth slide transitions
- Hover effects with CSS transforms
- Loading animations
- Staggered element animations
- Parallax-like effects

#### **Accessibility**
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- High contrast ratios

#### **Performance**
- Lazy loading for images
- Optimized CSS with Sass
- Efficient JavaScript bundling
- Minimal bundle size
- Fast page load times

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start Vite dev server
php artisan serve    # Start Laravel server

# Production
npm run build        # Build for production
php artisan optimize # Optimize Laravel

# Database
php artisan migrate  # Run migrations
php artisan seed     # Seed database
```

### Code Style
- **PHP**: Laravel Pint (PSR-12)
- **JavaScript**: ESLint with Vue.js rules
- **CSS**: Sass with BEM methodology
- **Vue**: Composition API with TypeScript-like structure

### File Naming Conventions
- **Components**: PascalCase (e.g., `HeroSection.vue`)
- **Files**: kebab-case (e.g., `contact-form.vue`)
- **Variables**: camelCase (e.g., `currentSlide`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)

## 📱 Responsive Features

### Mobile Optimizations
- Touch-friendly navigation
- Swipe gestures for sliders
- Optimized image loading
- Reduced animations for performance
- Simplified layouts

### Tablet Enhancements
- Adaptive grid layouts
- Optimized touch targets
- Balanced content density
- Enhanced readability

### Desktop Experience
- Full-featured interactions
- Hover effects and animations
- Multi-column layouts
- Advanced navigation options

## 🚀 Deployment

### Production Build
```bash
# Build frontend assets
npm run build

# Optimize Laravel
php artisan optimize
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Environment Variables
```env
APP_NAME="Erevolution India"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com

DB_CONNECTION=sqlite
DB_DATABASE=/path/to/database.sqlite
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

<!-- For support and questions:
- Email: support@erevolutionindia.com
- Website: https://erevolutionindia.com
- GitHub Issues: [Create an issue](https://github.com/amanuniyal123a/Erevolution_India/issues) -->

---

**Built with ❤️ by the Erevolution India Team**