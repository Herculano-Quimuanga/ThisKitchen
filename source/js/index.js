/**
 * ThisKitchen - Modern Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================================================
       1. STICKY HEADER WITH GLASS EFFECT ON SCROLL
       ========================================================================== */
    const header = document.querySelector('.header');
    const updateHeaderScroll = () => {
        if (!header) return;
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', updateHeaderScroll, { passive: true });
    updateHeaderScroll();

    /* ==========================================================================
       2. RESPONSIVE MOBILE NAVBAR
       ========================================================================== */
    const naveMenu = document.getElementById('nave-menu');
    const openMenu = document.getElementById('open-menu');
    const closeMenu = document.getElementById('close-menu');

    if (openMenu && closeMenu && naveMenu) {
        const toggleMenu = (show) => {
            if (show) {
                openMenu.style.display = 'none';
                closeMenu.style.display = 'flex';
                naveMenu.classList.add('show');
                document.body.classList.add('menu-open');
            } else {
                openMenu.style.display = 'flex';
                closeMenu.style.display = 'none';
                naveMenu.classList.remove('show');
                document.body.classList.remove('menu-open');
            }
        };

        // Initial state
        openMenu.style.display = 'flex';
        closeMenu.style.display = 'none';

        openMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu(true);
        });

        closeMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu(false);
        });

        // Close on nav-link click
        document.querySelectorAll('.nave-list .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 992) {
                    toggleMenu(false);
                }
            });
        });

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (naveMenu.classList.contains('show') && !naveMenu.contains(e.target) && !openMenu.contains(e.target)) {
                toggleMenu(false);
            }
        });
    }

    /* ==========================================================================
       3. HERO BANNER CAROUSEL (INDEX.HTML)
       ========================================================================== */
    const homeImages = document.querySelectorAll('.homeImage');
    if (homeImages.length > 0) {
        let currentSlide = 0;
        let slideInterval = null;

        // Create navigation dots dynamically if container exists
        const homeImagesContainer = document.querySelector('.home-images');
        let dotsWrap = document.querySelector('.hero-carousel-dots');
        if (!dotsWrap && homeImagesContainer) {
            dotsWrap = document.createElement('div');
            dotsWrap.className = 'hero-carousel-dots';
            homeImages.forEach((_, idx) => {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = `hero-dot ${idx === 0 ? 'active' : ''}`;
                dot.setAttribute('aria-label', `Slide ${idx + 1}`);
                dot.addEventListener('click', () => {
                    goToSlide(idx);
                    resetInterval();
                });
                dotsWrap.appendChild(dot);
            });
            homeImagesContainer.appendChild(dotsWrap);
        }

        const updateDots = (index) => {
            const dots = document.querySelectorAll('.hero-dot');
            dots.forEach((dot, idx) => {
                if (idx === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };

        const goToSlide = (nextIndex) => {
            homeImages.forEach(img => img.classList.remove('show'));
            currentSlide = (nextIndex + homeImages.length) % homeImages.length;
            homeImages[currentSlide].classList.add('show');
            updateDots(currentSlide);
        };

        const startInterval = () => {
            slideInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 5000);
        };

        const resetInterval = () => {
            if (slideInterval) clearInterval(slideInterval);
            startInterval();
        };

        startInterval();

        // Pause on mouse enter
        if (homeImagesContainer) {
            homeImagesContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
            homeImagesContainer.addEventListener('mouseleave', startInterval);
        }
    }

    /* ==========================================================================
       4. MODAL RESERVATION OPEN / CLOSE & ESC KEY
       ========================================================================== */
    const modalReserv = document.querySelector('.modal-reserv');
    const openModalBtns = document.querySelectorAll('#reserv-btn, .open-reserv-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const body = document.querySelector('.Body-app') || document.body;

    const openModal = () => {
        if (!modalReserv) return;
        modalReserv.classList.add('show');
        body.classList.add('modal-active');
        // Set default date to tomorrow and default time to 19:30 if empty
        const dateInput = document.getElementById('date');
        const timeInput = document.getElementById('time');
        if (dateInput && !dateInput.value) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            dateInput.value = tomorrow.toISOString().split('T')[0];
            dateInput.min = new Date().toISOString().split('T')[0];
        }
        if (timeInput && !timeInput.value) {
            timeInput.value = '19:30';
        }
    };

    const closeModal = () => {
        if (!modalReserv) return;
        modalReserv.classList.remove('show');
        body.classList.remove('modal-active');
    };

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (modalReserv) {
        modalReserv.addEventListener('click', (e) => {
            if (e.target === modalReserv) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalReserv && modalReserv.classList.contains('show')) {
            closeModal();
        }
    });

    /* ==========================================================================
       5. BUTTON LINKS & NEWS DETAIL NAVIGATION
       ========================================================================== */
    document.querySelectorAll('.goDetails').forEach(goLink => {
        goLink.style.cursor = 'pointer';
        goLink.addEventListener('click', () => {
            window.location.href = 'news.html';
        });
    });

    const goNewsBtn = document.getElementById('GoNews');
    if (goNewsBtn) {
        goNewsBtn.addEventListener('click', () => {
            window.location.href = 'news.html';
        });
    }

    const goMenuBtn = document.getElementById('GoMenu');
    if (goMenuBtn) {
        goMenuBtn.addEventListener('click', () => {
            window.location.href = 'menu.html';
        });
    }

    /* ==========================================================================
       6. NEWSLETTER SUBSCRIPTION INTERACTION
       ========================================================================== */
    const sendLatter = document.getElementById('SendLatter');
    if (sendLatter) {
        sendLatter.addEventListener('click', (e) => {
            e.preventDefault();
            const loadingLatter = document.getElementById('LoadingLatter');
            const chekLatter = document.getElementById('ChekLatter');
            const emailInput = document.getElementById('EmailLatter');
            const latterError = document.getElementById('latterError');

            if (!emailInput) return;
            const emailVal = emailInput.value.trim();

            if (latterError) latterError.textContent = '';

            if (emailVal === '') {
                if (latterError) latterError.textContent = 'Por favor, insira o seu email.';
                emailInput.focus();
                return;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
                if (latterError) latterError.textContent = 'Por favor, insira um endereço de email válido.';
                emailInput.focus();
                return;
            }

            // Valid submission simulation
            if (loadingLatter) loadingLatter.classList.add('show');

            setTimeout(() => {
                if (loadingLatter) loadingLatter.classList.remove('show');
                if (chekLatter) {
                    chekLatter.classList.add('show');
                    emailInput.value = '';
                    setTimeout(() => {
                        chekLatter.classList.remove('show');
                    }, 4000);
                }
            }, 1200);
        });
    }

    /* ==========================================================================
       7. CONTACT FORM VALIDATION & FEEDBACK
       ========================================================================== */
    const formContact = document.getElementById('FormContact');
    if (formContact) {
        formContact.addEventListener('submit', (event) => {
            event.preventDefault();

            const contactInputs = formContact.querySelectorAll('.ContatINput');
            const errorSpans = formContact.querySelectorAll('.ErrorContact');
            let isValid = true;

            errorSpans.forEach(span => span.textContent = '');

            // Name validation
            if (contactInputs[0] && contactInputs[0].value.trim().length < 3) {
                isValid = false;
                if (errorSpans[0]) errorSpans[0].textContent = 'Por favor, insira o seu nome completo.';
                contactInputs[0].focus();
            }

            // Phone validation
            if (contactInputs[1] && contactInputs[1].value.trim().length < 9) {
                if (isValid) {
                    isValid = false;
                    contactInputs[1].focus();
                }
                if (errorSpans[1]) errorSpans[1].textContent = 'Insira um telefone válido (+244 9xx xxx xxx).';
            }

            // Email validation
            if (contactInputs[2]) {
                const emailVal = contactInputs[2].value.trim();
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
                    if (isValid) {
                        isValid = false;
                        contactInputs[2].focus();
                    }
                    if (errorSpans[2]) errorSpans[2].textContent = 'Insira um endereço de email válido.';
                }
            }

            // Message validation
            if (contactInputs[3] && contactInputs[3].value.trim().length < 5) {
                if (isValid) {
                    isValid = false;
                    contactInputs[3].focus();
                }
                if (errorSpans[3]) errorSpans[3].textContent = 'Por favor, escreva a sua mensagem.';
            }

            if (isValid) {
                const submitBtn = formContact.querySelector('button[type="submit"]');
                const origText = submitBtn ? submitBtn.textContent : 'Enviar';
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Enviando...';
                }

                setTimeout(() => {
                    formContact.reset();
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = origText;
                    }

                    // Show success banner or toast
                    let successBox = document.querySelector('.contact-success-msg');
                    if (!successBox) {
                        successBox = document.createElement('div');
                        successBox.className = 'contact-success-msg';
                        successBox.innerHTML = `
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            <span>Mensagem enviada com sucesso! Entraremos em contacto brevemente.</span>
                        `;
                        formContact.prepend(successBox);
                    }
                    successBox.classList.add('show');
                    setTimeout(() => successBox.classList.remove('show'), 6000);
                }, 1000);
            }
        });
    }

    /* ==========================================================================
       8. MENU PAGE CATEGORY FILTER TABS (MENU.HTML)
       ========================================================================== */
    const filterTabs = document.querySelectorAll('.menu-filter-tab');
    if (filterTabs.length > 0) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetCat = tab.getAttribute('data-category');

                // Active tab state
                filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const menuSections = document.querySelectorAll('.menu-category-section');
                menuSections.forEach(section => {
                    const secCat = section.getAttribute('data-category');
                    if (targetCat === 'all' || secCat === targetCat) {
                        section.style.display = 'block';
                        // smooth fade
                        section.style.opacity = '0';
                        setTimeout(() => {
                            section.style.transition = 'opacity 0.4s ease';
                            section.style.opacity = '1';
                        }, 20);
                    } else {
                        section.style.display = 'none';
                    }
                });
            });
        });
    }
});
