function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

window.addEventListener('load', function() {
  // Hide the preloader
  document.querySelector('.preloader').classList.add('hidden');
  
  // Enable scrolling
  document.body.style.overflow = 'auto';
  
  // Add a slight delay before showing content with fade-in effect
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 300);
});

document.addEventListener('DOMContentLoaded', function() {
  // Add scrolled class to navigation on scroll
  window.addEventListener('scroll', function() {
    const desktopNav = document.getElementById('desktop-nav');
    const hamburgerNav = document.getElementById('hamburger-nav');
    
    if (window.scrollY > 50) {
      desktopNav.classList.add('scrolled');
      hamburgerNav.classList.add('scrolled');
    } else {
      desktopNav.classList.remove('scrolled');
      hamburgerNav.classList.remove('scrolled');
    }
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
        
        // Close the mobile menu if it's open
        const menu = document.querySelector(".menu-links");
        const icon = document.querySelector(".hamburger-icon");
        if (menu.classList.contains("open")) {
          menu.classList.remove("open");
          icon.classList.remove("open");
        }
      }
    });
  });
  
  // Auto-play videos when they come into view
  const videos = document.querySelectorAll('video');
  
  if (videos.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.play();
        } else {
          entry.target.pause();
        }
      });
    }, { threshold: 0.5 });
    
    videos.forEach(video => {
      observer.observe(video);
    });
  }
  
  // Add scroll animations with staggered effect
  const animateElements = document.querySelectorAll('.title, .details-container, .section__pic-container, .text-container, .btn-container, article, .contact-info-container');
  
  if (animateElements.length > 0) {
    const animateObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add staggered delay based on index
          setTimeout(() => {
            entry.target.classList.add('animate');
          }, index * 150); // 150ms delay between each element
        }
      });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
      animateObserver.observe(element);
    });
  }
  
  // Add active state to nav links based on scroll position
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 150) { // Adjusted offset for better detection
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });
  
  // Add hover effect to project images
  const projectImages = document.querySelectorAll('.project-img, .project-video');
  
  projectImages.forEach(img => {
    img.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05) translateY(-10px)';
    });
    
    img.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
  
  // Add typing effect to section titles
  const titles = document.querySelectorAll('.title');
  
  titles.forEach(title => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          title.classList.add('typing-effect');
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(title);
  });
});

// Animate star ratings when experience section enters view
document.addEventListener("DOMContentLoaded", () => {
const stars = document.querySelectorAll(".stars");
const experienceSection = document.querySelector("#experience");

const observer = new IntersectionObserver(
    (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        stars.forEach(star => star.classList.add("animate-stars"));
        observer.unobserve(experienceSection); // Only run once
        }
    });
    },
    {
    threshold: 0.6,
    }
);

if (experienceSection) {
    observer.observe(experienceSection);
}
});

let lastScrollY = window.scrollY;
const footer = document.querySelector("footer");

window.addEventListener("scroll", () => {
  if (window.innerWidth > 768) return;

  if (window.scrollY > lastScrollY) {
    // Scrolling up
    footer.classList.add("show");
  } else {
    // Scrolling down
    footer.classList.remove("show");
  }

  lastScrollY = window.scrollY;
});
