document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // CONFIGURAÇÃO CENTRALIZADA DO WHATSAPP
  // ==========================================
  // Altere o número abaixo (apenas números, com DDI + DDD). Exemplo: "5585988091816"
  const WHATSAPP_NUMBER = "5585988091816";
  // Formato de exibição legível no site. Exemplo: "(85) 98809-1816"
  const WHATSAPP_DISPLAY = "(85) 98809-1816";

  // Atualiza dinamicamente as referências de contato de WhatsApp na página
  const updateWhatsAppContacts = () => {
    // 1. Botão Flutuante
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
      whatsappFloat.setAttribute('href', `https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1%20JM%20Produ%C3%A7%C3%B5es!%20Gostaria%20de%20fazer%20um%20or%C3%A7amento%20para%20minha%20loja.`);
    }

    // 2. Info Item no Fale Conosco
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach(item => {
      const h3 = item.querySelector('h3');
      if (h3 && h3.textContent.includes('WhatsApp')) {
        const p = item.querySelector('p');
        if (p) p.textContent = WHATSAPP_DISPLAY;
      }
    });

    // 3. Link de rodapé social
    const footerSocials = document.querySelectorAll('.footer-social-link');
    footerSocials.forEach(link => {
      const i = link.querySelector('i');
      if (i && i.classList.contains('fa-whatsapp')) {
        link.setAttribute('href', `https://wa.me/${WHATSAPP_NUMBER}`);
      }
    });
  };
  
  updateWhatsAppContacts();

  // --- HERO VIDEO CONTROL LOGIC ---
  const heroVideo = document.getElementById('hero-video');
  const videoSoundBtn = document.getElementById('video-sound-btn');
  const videoPlayBtn = document.getElementById('video-play-btn');

  if (heroVideo) {
    // Tenta reproduzir automaticamente de forma mútua (garantido por políticas de navegadores)
    heroVideo.play().catch(err => {
      console.log("Autoplay bloqueado pelo navegador, aguardando interação.", err);
    });

    // Botão de alternar som
    if (videoSoundBtn) {
      videoSoundBtn.addEventListener('click', () => {
        heroVideo.muted = !heroVideo.muted;
        const icon = videoSoundBtn.querySelector('i');
        if (heroVideo.muted) {
          icon.className = 'fa-solid fa-volume-xmark';
          videoSoundBtn.setAttribute('aria-label', 'Ativar som');
        } else {
          icon.className = 'fa-solid fa-volume-high';
          videoSoundBtn.setAttribute('aria-label', 'Mutar som');
          if (videoPlayBtn) videoPlayBtn.style.display = 'none'; // esconde o play overlay
        }
      });
    }

    // Botão de Play Overlay ("Assistir com Som")
    if (videoPlayBtn) {
      videoPlayBtn.addEventListener('click', () => {
        heroVideo.muted = false;
        heroVideo.currentTime = 0;
        heroVideo.play();
        videoPlayBtn.style.display = 'none';
        
        // Atualiza ícone de som
        if (videoSoundBtn) {
          const icon = videoSoundBtn.querySelector('i');
          icon.className = 'fa-solid fa-volume-high';
        }
      });
    }
  }

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
      
      const startTrigger = rect.top - (viewHeight / 2);
      const timelineHeight = rect.height;
      
      let progress = 0;
      if (startTrigger < 0) {
        progress = Math.abs(startTrigger) / timelineHeight;
        progress = Math.min(Math.max(progress, 0), 1);
      }
      
      timelineProgress.style.height = `${progress * 100}%`;

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
      title: "5. Ajustes Finais, Calibração & Logo",
      desc: "Pronto! Calibramos a inclinação ideal de escoamento e, com a instalação completa, o logotipo oficial da JM Produções fica visível na lona premium."
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

    // Step-by-step assembly states
    // Step 1: Lasers active
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
      toldoFabric.classList.remove('show-logo');
    }

    // Step 2: Brackets installed, lasers off
    if (step >= 1) {
      laserGuideH.classList.remove('laser-active');
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

    // Step 5: Extend arms & show logo
    if (step >= 4) {
      toldoArms.classList.add('deployed');
      toldoFabric.classList.add('show-logo');
    }
  }

  function startSimulation() {
    isSimRunning = true;
    btnAction.innerHTML = '<span>⏸</span> Pausar Simulação';
    btnAction.style.background = 'linear-gradient(135deg, #e53935 0%, #c62828 100%)';
    btnAction.style.color = '#ffffff';

    if (currentSimStep >= 4) {
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

    stepDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        stopSimulation();
        updateSimulatorUI(idx);
      });
    });

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
        toldoFabric.style.clipPath = 'none';
        toldoFabric.style.borderRadius = '0 0 4px 4px';
        if (toldoArms) toldoArms.style.display = 'none';
      } else {
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

    portfolioCards.forEach(card => {
      card.addEventListener('click', () => {
        const img = card.querySelector('.portfolio-img');
        const title = card.querySelector('.portfolio-title').textContent;
        const categoryLabel = card.querySelector('.portfolio-category').textContent;

        if (img && lightbox && lightboxImg && lightboxCaption) {
          lightboxImg.src = img.src;
          lightboxCaption.textContent = `${categoryLabel} — ${title}`;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    if (lightboxClose && lightbox) {
      const closeBox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
      };
      
      lightboxClose.addEventListener('click', closeBox);
      
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          closeBox();
        }
      });

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
          closeBox();
        }
      });
    }
  }

  // --- TESTIMONIALS SYSTEM (7 SLIDES DYNAMICALLY RENDERED) ---
  const testimonialTrack = document.getElementById('testimonial-track');
  const carouselDotsContainer = document.querySelector('.carousel-dots');

  const testimonialData = [
    {
      name: "Carlos Mendonça",
      role: "Proprietário da Mecânica CM",
      text: "A nova fachada em ACM e os toldos ficaram fantásticos! Minha loja ganhou um destaque incrível na avenida e a equipe cumpriu o prazo perfeitamente.",
      stars: 5
    },
    {
      name: "Patrícia Alves",
      role: "Diretora do Salão Beauty Face",
      text: "Excelente atendimento! O simulador e o projeto 3D ajudaram muito a escolher a cor perfeita. Os toldos retráteis nos ajudam a proteger o salão nos horários mais quentes.",
      stars: 5
    },
    {
      name: "Felipe Rocha",
      role: "Fundador da Impacto Academia",
      text: "A equipe de instalação é super limpa e rápida. O fechamento lateral da lona ficou impecável e resiste muito bem a ventanias e chuvas.",
      stars: 5
    },
    {
      name: "Mariana Lemos",
      role: "Sorveteria Delícias do Ceará",
      text: "Os wind banners e os toldos amarelos chamaram muita atenção. Dobramos o movimento na primeira semana após a instalação!",
      stars: 5
    },
    {
      name: "Roberto Souza",
      role: "Diretor da Clínica Sorriso",
      text: "Fizemos a fachada em ACM preto com letras caixa em LED. O acabamento é impecável e o design moderno trouxe um ar super sofisticado para nossa recepção.",
      stars: 5
    },
    {
      name: "Sandra Medeiros",
      role: "Residencial Dunas",
      text: "Coloquei os toldos articulados retráteis na minha área de lazer. Ótima qualidade de material, acabamento perfeito e proteção térmica excepcional.",
      stars: 5
    },
    {
      name: "André Linhares",
      role: "Fundador do Brasa & Mar",
      text: "Toldos de alta durabilidade que resistem muito bem à maresia de Fortaleza. Atendimento excelente do início ao fim e equipe extremamente técnica.",
      stars: 5
    }
  ];

  if (testimonialTrack && carouselDotsContainer) {
    testimonialTrack.innerHTML = '';
    carouselDotsContainer.innerHTML = '';

    testimonialData.forEach((t, idx) => {
      const slide = document.createElement('div');
      slide.className = 'testimonial-slide';
      
      let starsHtml = '';
      for (let i = 0; i < t.stars; i++) {
        starsHtml += '<i class="fa-solid fa-star"></i> ';
      }

      slide.innerHTML = `
        <div class="testimonial-card">
          <div class="testimonial-rating">
            ${starsHtml}
          </div>
          <p class="testimonial-text">"${t.text}"</p>
          <div class="testimonial-author">
            <div class="author-info">
              <h4>${t.name}</h4>
              <p>${t.role}</p>
            </div>
          </div>
        </div>
      `;
      testimonialTrack.appendChild(slide);

      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      if (idx === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Ir para depoimento ${idx + 1}`);
      carouselDotsContainer.appendChild(dot);

      dot.addEventListener('click', () => {
        goToSlide(idx);
      });
    });

    const slides = document.querySelectorAll('.testimonial-slide');
    const carouselDots = document.querySelectorAll('.carousel-dot');
    let currentSlide = 0;

    function goToSlide(slideIdx) {
      currentSlide = slideIdx;
      testimonialTrack.style.transform = `translateX(-${slideIdx * 100}%)`;
      
      carouselDots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === slideIdx);
      });
    }

    let autoPlayInterval = setInterval(() => {
      let nextSlide = (currentSlide + 1) % slides.length;
      goToSlide(nextSlide);
    }, 6000);

    carouselDotsContainer.addEventListener('click', () => {
      clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(() => {
        let nextSlide = (currentSlide + 1) % slides.length;
        goToSlide(nextSlide);
      }, 6000);
    });
  }

  // --- FOOTER CONTACT FORM ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const phoneInput = document.getElementById('form-phone');
      const messageInput = document.getElementById('form-message');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        alert('Por favor, preencha todos os campos obrigatórios (*).');
        return;
      }

      const name = encodeURIComponent(nameInput.value.trim());
      const email = encodeURIComponent(emailInput.value.trim());
      const phone = encodeURIComponent(phoneInput.value.trim() || 'Não informado');
      const msg = encodeURIComponent(messageInput.value.trim());

      const whatsappText = `Olá JM Produções! Me chamo *${name}*.\n*E-mail:* ${email}\n*Telefone:* ${phone}\n*Mensagem:* ${msg}`;
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`;

      window.open(whatsappUrl, '_blank');
      contactForm.reset();
    });
  }

  // --- MODALS ENGINE (BUDGET POP-UP & TECHNICAL BLUEPRINT) ---
  const openModal = (modal) => {
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = (modal) => {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  };

  // 1. Budget Modal Logic
  const budgetModal = document.getElementById('budget-modal');
  const triggerBudgetButtons = document.querySelectorAll('.trigger-budget-modal');
  const closeBudgetBtn = document.querySelector('.budget-modal-close');
  const modalContactForm = document.getElementById('modal-contact-form');

  triggerBudgetButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(budgetModal);
    });
  });

  if (closeBudgetBtn && budgetModal) {
    closeBudgetBtn.addEventListener('click', () => closeModal(budgetModal));
    budgetModal.addEventListener('click', (e) => {
      if (e.target === budgetModal) closeModal(budgetModal);
    });
  }

  if (modalContactForm) {
    modalContactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('modal-form-name');
      const emailInput = document.getElementById('modal-form-email');
      const phoneInput = document.getElementById('modal-form-phone');
      const messageInput = document.getElementById('modal-form-message');

      const name = encodeURIComponent(nameInput.value.trim());
      const email = encodeURIComponent(emailInput.value.trim());
      const phone = encodeURIComponent(phoneInput.value.trim());
      const msg = encodeURIComponent(messageInput.value.trim());

      const whatsappText = `Olá JM Produções! Me chamo *${name}* (solicitação de orçamento).\n*E-mail:* ${email}\n*Telefone:* ${phone}\n*Mensagem:* ${msg}`;
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`;

      window.open(whatsappUrl, '_blank');
      closeModal(budgetModal);
      modalContactForm.reset();
    });
  }

  // 2. Technical Blueprint Modal Logic
  const blueprintModal = document.getElementById('blueprint-modal');
  const openBlueprintBtn = document.getElementById('open-blueprint-btn');
  const closeBlueprintBtn = document.querySelector('.blueprint-modal-close');
  const specItems = document.querySelectorAll('.spec-item');
  const zoomableImg = document.getElementById('zoomable-blueprint-img');

  if (openBlueprintBtn) {
    openBlueprintBtn.addEventListener('click', () => openModal(blueprintModal));
  }

  if (closeBlueprintBtn && blueprintModal) {
    closeBlueprintBtn.addEventListener('click', () => {
      closeModal(blueprintModal);
      if (zoomableImg) zoomableImg.style.transform = 'scale(1)';
    });
    
    blueprintModal.addEventListener('click', (e) => {
      if (e.target === blueprintModal) {
        closeModal(blueprintModal);
        if (zoomableImg) zoomableImg.style.transform = 'scale(1)';
      }
    });
  }

  specItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      specItems.forEach(i => i.classList.remove('highlighted'));
      item.classList.add('highlighted');

      const part = item.getAttribute('data-part');
      if (zoomableImg) {
        switch (part) {
          case 'casing':
            zoomableImg.style.transform = 'scale(1.2) translate(5%, 15%)';
            break;
          case 'motor':
            zoomableImg.style.transform = 'scale(1.35) translate(10%, -5%)';
            break;
          case 'brackets':
            zoomableImg.style.transform = 'scale(1.3) translate(15%, 5%)';
            break;
          case 'arms':
            zoomableImg.style.transform = 'scale(1.25) translate(-10%, -5%)';
            break;
          case 'fabric':
            zoomableImg.style.transform = 'scale(1.25) translate(-5%, -15%)';
            break;
          case 'slope':
            zoomableImg.style.transform = 'scale(1.3) translate(-15%, -20%)';
            break;
          default:
            zoomableImg.style.transform = 'scale(1)';
        }
      }
    });

    item.addEventListener('mouseleave', () => {
      item.classList.remove('highlighted');
      if (zoomableImg) zoomableImg.style.transform = 'scale(1)';
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(budgetModal);
      closeModal(blueprintModal);
      if (zoomableImg) zoomableImg.style.transform = 'scale(1)';
    }
  });
});
