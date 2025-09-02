# Sherin Joseph Roy - Portfolio Website

A minimalistic, responsive portfolio website built with HTML, CSS, and JavaScript. Designed to showcase projects, skills, and professional information.

## 🌟 Features

- **Minimalistic Design**: Clean and professional appearance with subtle colors
- **Responsive Layout**: Optimized for all devices (desktop, tablet, mobile)
- **Smooth Animations**: Subtle hover effects and scroll animations
- **Fast Loading**: Lightweight and optimized for performance
- **SEO Friendly**: Proper meta tags and semantic HTML structure

## 📁 File Structure

```
my-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🚀 Deployment to GitHub Pages

### Method 1: Automatic Deployment (Recommended)

1. **Create a new repository** on GitHub
   - Go to [GitHub](https://github.com) and click "New repository"
   - Name it `yourusername.github.io` (replace `yourusername` with your actual GitHub username)
   - Make it public
   - Don't initialize with README (we already have one)

2. **Upload your files**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/yourusername.github.io.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository settings
   - Scroll down to "GitHub Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

### Method 2: Manual Upload

1. Create a new repository on GitHub
2. Upload the files directly through GitHub's web interface
3. Enable GitHub Pages in repository settings

## 🎨 Customization

### Personal Information

Edit `index.html` to update your personal information:

```html
<!-- Update your name -->
<h1 class="hero-title">Your Name</h1>

<!-- Update your email -->
<a href="mailto:your.email@example.com">your.email@example.com</a>

<!-- Update social media links -->
<a href="https://linkedin.com/in/yourprofile" class="social-link" title="LinkedIn">
    <i class="fab fa-linkedin"></i>
</a>
```

### Projects Section

Replace the placeholder projects with your actual projects:

```html
<div class="project-card">
    <div class="project-content">
        <h3 class="project-title">Your Project Name</h3>
        <p class="project-description">
            Description of your project and what it does.
        </p>
        <div class="project-tech">
            <span class="tech-tag">Technology Used</span>
        </div>
        <div class="project-links">
            <a href="https://github.com/yourusername/project" class="project-link">
                <i class="fab fa-github"></i> Code
            </a>
            <a href="https://yourproject.com" class="project-link">
                <i class="fas fa-external-link-alt"></i> Live
            </a>
        </div>
    </div>
</div>
```

### Skills Section

Update the skills in the About section:

```html
<div class="skills-grid">
    <span class="skill-tag">Your Skill 1</span>
    <span class="skill-tag">Your Skill 2</span>
    <!-- Add more skills as needed -->
</div>
```

### Colors and Styling

The website uses a minimalistic color palette. You can customize colors in `styles.css`:

```css
/* Primary colors */
--primary-color: #2d3748;
--secondary-color: #4a5568;
--background-color: #ffffff;
--accent-color: #f7fafc;
```

## 📱 Responsive Design

The website is fully responsive and includes:

- Mobile-first design approach
- Hamburger menu for mobile devices
- Flexible grid layouts
- Optimized typography for all screen sizes

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## 📞 Contact

For questions or support, please contact:
- Email: sherin.joseph2217@gmail.com
- LinkedIn: https://www.linkedin.com/in/sherin-roy-deepmost/
- GitHub: https://github.com/Sherin-SEF-AI

---

**Built with ❤️ and lots of ☕** 
