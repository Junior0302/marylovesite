document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksList = document.querySelectorAll('.nav-links li a');
    const header = document.querySelector('header');

    // Toggle mobile navigation
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.querySelector('i').classList.toggle('fa-bars');
        burger.querySelector('i').classList.toggle('fa-times');
    });

    // Close mobile nav when a link is clicked
    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.querySelector('i').classList.remove('fa-times');
                burger.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // Active link highlighting on page load
    const currentPage = window.location.pathname.split("/").pop() || 'index.html';
    navLinksList.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function navHighlighter() {
        let scrollY = window.pageYOffset;
        let currentSectionId = '';

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150; // Adjusted offset
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                currentSectionId = current.getAttribute('id');
            }
        });

        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', navHighlighter);
    navHighlighter(); // Initial call

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -20px 0px' // Trigger a little earlier
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Simple contact form handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.name.value;
            const phone = this.phone.value;

            // In a real application, you would send this data to a server.
            // For this demo, we'll just show an alert.
            alert(`Merci ${name} !\nVotre message a été reçu. Nous vous recontacterons bientôt au ${phone}.`);
            
            this.reset();
        });
    }

    // Make logo click go to home page
    const logo = document.querySelector('.logo');
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'index.html';
    });

    // Gallery Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Set active class on button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                item.classList.add('hide');
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                   // Use a timeout to allow the 'hide' animation to be seen
                   setTimeout(() => {
                        item.classList.remove('hide');
                   }, 10);
                }
            });
        });
    });
    
    // Video player custom play button
    const videoContainers = document.querySelectorAll('.video-container');
    videoContainers.forEach(container => {
        const video = container.querySelector('video');
        const playButton = container.querySelector('.play-button');

        if(playButton) {
            playButton.addEventListener('click', () => {
                video.play();
                video.setAttribute('controls', 'true');
            });
        }

        video.addEventListener('play', () => {
            video.setAttribute('controls', 'true');
        });
    });
});