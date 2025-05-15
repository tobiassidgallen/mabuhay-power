// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper
    const servicesSwiper = new Swiper('.services-swiper', {
        // Optional parameters
        slidesPerView: 1,
        spaceBetween: 30,
        loop: false,
        centeredSlides: false,
        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            disabledClass: 'swiper-button-disabled',
        },
        breakpoints: {
            // when window width is >= 640px
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            // when window width is >= 1024px
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        },
        // Ensure navigation works properly
        observer: true,
        observeParents: true,
        watchOverflow: true,
        preventInteractionOnTransition: true,
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: contactForm.name.value,
                email: contactForm.email.value,
                phone: contactForm.phone.value,
                message: contactForm.message.value
            };

            try {
                // Try ports 3000-3010
                let response = null;
                let error = null;

                for (let port = 3000; port <= 3010; port++) {
                    try {
                        response = await fetch(`http://localhost:${port}/api/contact`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(formData)
                        });
                        if (response.ok) break;
                    } catch (err) {
                        error = err;
                        continue;
                    }
                }

                if (!response) {
                    throw error || new Error('Could not connect to server');
                }

                const data = await response.json();

                if (response.ok) {
                    alert('Message sent successfully! We will get back to you soon.');
                    contactForm.reset();
                } else {
                    throw new Error(data.message || 'Something went wrong');
                }
            } catch (error) {
                alert('Error sending message. Please try again later.');
                console.error('Error:', error);
            }
        });
    }
});
