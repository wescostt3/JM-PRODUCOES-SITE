document.addEventListener('DOMContentLoaded', () => {
  // --- NAVBAR SCROLL EFFECT ---
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- MOBILE NAV MENU ---
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close mobile menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // --- SCROLL REVEAL ANIMATION ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- SCROLL TIMELINE PROGRESS ---
  const timeline = document.querySelector('.timeline');
  const timelineProgress = document.querySelector('.timeline-progress');
  const timelineItems = document.querySelectorAll('.timeline-item');

  if (timeline && timelineProgress) {
    window.addEventListener('scroll', () => {
      const rect = timeline.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      
      // Calculate how much of the timeline has passed the middle of the screen
      const startTrigger = rect.top - (viewHeight / 2);
      const timelineHeight = rect.height;
      
      let progress = 0;
      if (startTrigger < 0) {
        progress = Math.abs(startTrigger) / timelineHeight;
        progress = Math.min(Math.max(progress, 0), 1); // Clamp between 0 and 1
      }
      
      timelineProgress.style.height = `${progress * 100}%`;

      // Activate timeline items based on scroll
      timelineItems.forEach(item => {
        const itemRect = item.getBoundingClientRect();
        if (itemRect.top < viewHeight / 1.4) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    });
  }

  // --- INTERACTIVE TOLDO SIMULATOR ---
  const simSteps = [
    {
      title: "1. Medição e Alinhamento",
      desc: "Nossa equipe utiliza níveis a laser digitais para marcar com precisão cirúrgica os pontos de fixação estruturais da fachada comercial."
    },
    {
      title: "2. Instalação dos Suportes",
      desc: "Suportes reforçados de aço carbono são chumbados quimicamente na estrutura da alvenaria, garantindo estabilidade contra ventos e chuvas fortes."
    },
    {
      title: "3. Encaixe da Estrutura",
      desc: "A estrutura de alumínio anodizado/aço galvanizado do toldo é elevada e encaixada com segurança nos suportes, travada por parafusos inoxidáveis."
    },
    {
      title: "4. Instalação e Tensionamento da Lona",
      desc: "A lona náutica com proteção UV é montada e tensionada de forma uniforme para evitar rugas e acúmulo de água de chuva."
    },
    {
      title: "5. Ajustes Finais e Calibração",
      desc: "Testamos os braços articulados retráteis (ou fixações estáticas) e regulamos a inclinação perfeita de caimento do toldo. Pronto para uso!"
    }
  ];

  let currentSimStep = 0;
  let isSimRunning = false;
  let simInterval = null;

  const btnAction = document.getElementById('sim-action-btn');
  const simStepTitle = document.getElementById('sim-step-title');
  const simStepDesc = document.getElementById('sim-step-desc');
  const stepDots = document.querySelectorAll('.sim-step-dot');
  const simProgressBar = document.getElementById('sim-progress-bar');
  
  // Simulator Visual elements
  const laserGuideH = document.querySelector('.laser-h');
  const laserGuideVL = document.querySelector('.laser-v-l');
  const laserGuideVR = document.querySelector('.laser-v-r');
  const brackets = document.querySelectorAll('.sim-bracket');
  const toldoContainer = document.querySelector('.sim-toldo-container');
  const toldoFabric = document.querySelector('.sim-toldo-fabric');
  const toldoArms = document.querySelector('.sim-toldo-arms');

  function updateSimulatorUI(step) {
    currentSimStep = step;
    
    // Update texts
    simStepTitle.textContent = simSteps[step].title;
    simStepDesc.textContent = simSteps[step].desc;
    
    // Update dots
    stepDots.forEach((dot, idx) => {
      dot.classList.remove('active', 'completed');
      if (idx === step) {
        dot.classList.add('active');
      } else if (idx < step) {
        dot.classList.add('completed');
      }
    });

    // Update progress bar
    const progressWidths = [0, 25, 50, 75, 100];
    simProgressBar.style.width = `${progressWidths[step]}%`;

    // Reset visual elements states first and apply incrementally
    // Step 1: Lasers
    if (step >= 0) {
      laserGuideH.classList.add('laser-active');
      laserGuideVL.classList.add('laser-active');
      laserGuideVR.classList.add('laser-active');
    }
    if (step < 1) {
      brackets.forEach(b => b.classList.remove('installed'));
    }
    if (step < 2) {
      toldoContainer.classList.remove('mounted');
    }
    if (step < 3) {
      toldoFabric.classList.remove('deployed');
    }
    if (step < 4) {
      toldoArms.classList.remove('deployed');
    }

    // Step 2: Brackets
    if (step >= 1) {
      laserGuideH.classList.remove('laser-active'); // turn off laser as reference is done
      laserGuideVL.classList.remove('laser-active');
      laserGuideVR.classList.remove('laser-active');
      brackets.forEach(b => b.classList.add('installed'));
    }

    // Step 3: Mount structure
    if (step >= 2) {
      toldoContainer.classList.add('mounted');
    }

    // Step 4: Deploy fabric
    if (step >= 3) {
      toldoFabric.classList.add('deployed');
    }

    // Step 5: Extend arms (Ajustes finais)
    if (step >= 4) {
      toldoArms.classList.add('deployed');
    }
  }

  function startSimulation() {
    isSimRunning = true;
    btnAction.innerHTML = '<span>⏸</span> Pausar Simulação';
    btnAction.style.background = 'linear-gradient(135deg, #e53935 0%, #c62828 100%)';
    btnAction.style.color = '#ffffff';

    if (currentSimStep >= 4) {
      // Loop reset
      updateSimulatorUI(0);
    }

    simInterval = setInterval(() => {
      if (currentSimStep < 4) {
        updateSimulatorUI(currentSimStep + 1);
      } else {
        stopSimulation();
      }
    }, 2800);
  }

  function stopSimulation() {
    isSimRunning = false;
    clearInterval(simInterval);
    btnAction.innerHTML = '<span>▶</span> Iniciar Simulação';
    btnAction.style.background = 'linear-gradient(135deg, var(--accent) 0%, var(--accent-vibrant) 100%)';
    btnAction.style.color = 'var(--bg-primary)';
  }

  if (btnAction) {
    btnAction.addEventListener('click', () => {
      if (isSimRunning) {
        stopSimulation();
      } else {
        startSimulation();
      }
    });

    // Let user click dots to jump steps manually
    stepDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        stopSimulation();
        updateSimulatorUI(idx);
      });
    });

    // Initialize Simulator at Step 0
    updateSimulatorUI(0);
  }

  // Simulator Customizer options
  const colorDots = document.querySelectorAll('.color-dot');
  colorDots.forEach(dot => {
    dot.addEventListener('click', () => {
      colorDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      
      const colorMap = {
        'color-yellow': '#FFD400',
        'color-black': '#1a1a1a',
        'color-red': '#e53935',
        'color-green': '#2e7d32'
      };

      const selectedClass = Array.from(dot.classList).find(c => c.startsWith('color-'));
      if (selectedClass && colorMap[selectedClass] && toldoFabric) {
        toldoFabric.style.backgroundColor = colorMap[selectedClass];
      }
    });
  });

  const styleOptions = document.querySelectorAll('.style-option');
  styleOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      styleOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');

      if (opt.textContent.trim() === 'Fixo') {
        // Toldo Fixo (straight bottom)
        toldoFabric.style.clipPath = 'none';
        toldoFabric.style.borderRadius = '0 0 4px 4px';
        if (toldoArms) toldoArms.style.display = 'none';
      } else {
        // Toldo Retrátil (rippled wavy clip-path)
        toldoFabric.style.clipPath = 'polygon(0 0, 100% 0, 100% 85%, 95% 100%, 90% 85%, 85% 100%, 80% 85%, 75% 100%, 70% 85%, 65% 100%, 60% 85%, 55% 100%, 50% 85%, 45% 100%, 40% 85%, 35% 100%, 30% 85%, 25% 100%, 20% 85%, 15% 100%, 10% 85%, 5% 100%, 0 85%)';
        toldoFabric.style.borderRadius = '0 0 10px 10px';
        if (toldoArms) toldoArms.style.display = 'block';
      }
    });
  });

  // --- PORTFOLIO DYNAMIC FILTERING & LIGHTBOX ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (filterBtns.length > 0 && portfolioCards.length > 0) {
    // Filter portfolio cards
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        portfolioCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (category === 'all' || cardCat === category) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });

    // Lightbox modal trigger
    portfolioCards.forEach(card => {
      card.addEventListener('click', () => {
        const img = card.querySelector('.portfolio-img');
        const title = card.querySelector('.portfolio-title').textContent;
        const categoryLabel = card.querySelector('.portfolio-category').textContent;

        if (img && lightbox && lightboxImg && lightboxCaption) {
          lightboxImg.src = img.src;
          lightboxCaption.textContent = `${categoryLabel} — ${title}`;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden'; // Lock background scroll
        }
      });
    });

    // Close Lightbox
    if (lightboxClose && lightbox) {
      const closeBox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Unlock scroll
      };
      
      lightboxClose.addEventListener('click', closeBox);
      
      // Close on clicking outside container
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          closeBox();
        }
      });

      // Close on ESC key press
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
          closeBox();
        }
      });
    }
  }

  // --- TESTIMONIALS SLIDER ---
  const testimonialTrack = document.querySelector('.testimonial-track');
  const carouselDotsContainer = document.querySelector('.carousel-dots');
  const slides = document.querySelectorAll('.testimonial-slide');

  if (testimonialTrack && slides.length > 0) {
    let currentSlide = 0;
    
    // Generate navigation dots dynamically
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      if (idx === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Ir para depoimento ${idx + 1}`);
      carouselDotsContainer.appendChild(dot);

      dot.addEventListener('click', () => {
        goToSlide(idx);
      });
    });

    const carouselDots = document.querySelectorAll('.carousel-dot');

    function goToSlide(slideIdx) {
      currentSlide = slideIdx;
      testimonialTrack.style.transform = `translateX(-${slideIdx * 100}%)`;
      
      carouselDots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === slideIdx);
      });
    }

    // Auto-advance slide every 6 seconds
    let autoPlayInterval = setInterval(() => {
      let nextSlide = (currentSlide + 1) % slides.length;
      goToSlide(nextSlide);
    }, 6000);

    // Reset autoplay on user click
    carouselDotsContainer.addEventListener('click', () => {
      clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(() => {
        let nextSlide = (currentSlide + 1) % slides.length;
        goToSlide(nextSlide);
      }, 6000);
    });
  }

  // --- CONTACT FORM REAL-TIME VALIDATION & SUBMISSION ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const phoneInput = document.getElementById('form-phone');
    const messageInput = document.getElementById('form-message');

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simple validation checks
      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        alert('Por favor, preencha todos os campos obrigatórios (*).');
        return;
      }

      // Format WhatsApp Message
      const name = encodeURIComponent(nameInput.value.trim());
      const email = encodeURIComponent(emailInput.value.trim());
      const phone = encodeURIComponent(phoneInput.value.trim() || 'Não informado');
      const msg = encodeURIComponent(messageInput.value.trim());

      const whatsappText = `Olá JM Produções! Me chamo *${name}*.\n*E-mail:* ${email}\n*Telefone:* ${phone}\n*Mensagem:* ${msg}`;
      const whatsappUrl = `https://wa.me/5585988091816?text=${whatsappText}`;

      // Open whatsapp window
      window.open(whatsappUrl, '_blank');

      // Reset form
      contactForm.reset();
    });
  }
});
