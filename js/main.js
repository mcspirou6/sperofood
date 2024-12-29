// Menu Data avec images
const menuItems = [
    {
        id: 1,
        name: "Classic Burger",
        category: "burgers",
        price: "12.99€",
        description: "Bœuf, cheddar, salade, tomate, oignon",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=500&q=80"
    },
    {
        id: 2,
        name: "Veggie Burger",
        category: "burgers",
        price: "11.99€",
        description: "Steak végétal, avocat, roquette, tomate",
        image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=500&q=80"
    },
    {
        id: 3,
        name: "Margherita",
        category: "pizzas",
        price: "10.99€",
        description: "Sauce tomate, mozzarella, basilic frais",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=500&q=80"
    },
    {
        id: 4,
        name: "Pepperoni",
        category: "pizzas",
        price: "13.99€",
        description: "Sauce tomate, mozzarella, pepperoni",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=500&q=80"
    },
    {
        id: 5,
        name: "Chicken Wrap",
        category: "wraps",
        price: "9.99€",
        description: "Poulet grillé, salade, tomate, sauce",
        image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=500&q=80"
    }
];

// Données des promotions
const promotions = [
    {
        id: 1,
        title: "Menu Duo",
        description: "2 Burgers + 2 Boissons + 1 Frite géante",
        originalPrice: "35.98€",
        discountedPrice: "29.99€",
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"
    },
    {
        id: 2,
        title: "Pizza Party",
        description: "Pizza XXL + 4 Boissons + 2 Desserts",
        originalPrice: "42.99€",
        discountedPrice: "34.99€",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"
    },
    {
        id: 3,
        title: "Menu Étudiant",
        description: "1 Burger + 1 Boisson + 1 Dessert",
        originalPrice: "18.99€",
        discountedPrice: "14.99€",
        image: "https://images.unsplash.com/photo-1551782450-17144efb9c50?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // Gestion du menu hamburger
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Fermer le menu quand on clique sur un lien
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Initialisation du menu
    filterMenu('all');
    
    // Navigation scroll smooth
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animation des sections au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animation spéciale pour les items du menu
                if (entry.target.classList.contains('menu-item')) {
                    entry.target.classList.add('show');
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section, .menu-item').forEach(section => {
        observer.observe(section);
    });

    // Filtres du menu avec animation
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Animation du bouton
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Animation de sortie des items actuels
            const menuItems = document.querySelectorAll('.menu-item');
            menuItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
            });
            
            // Attendre la fin de l'animation de sortie
            setTimeout(() => {
                filterMenu(btn.dataset.filter);
                
                // Animation d'entrée des nouveaux items
                document.querySelectorAll('.menu-item').forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('show');
                    }, index * 100);
                });
            }, 300);
        });
    });

    // Formulaire de contact amélioré
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
        
        // Animation des labels
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            if (validateEmail(email)) {
                showToast('Merci de votre inscription à notre newsletter!');
                newsletterForm.reset();
            } else {
                showToast('Veuillez entrer une adresse email valide.', 'error');
            }
        });
    }

    // Initialisation des promotions
    initPromotions();
});

// Fonction de filtrage du menu avec animations
function filterMenu(category) {
    const menuGrid = document.querySelector('.menu-grid');
    menuGrid.innerHTML = '';

    const items = category === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === category);

    items.forEach((item, index) => {
        const itemElement = createMenuItemElement(item);
        menuGrid.appendChild(itemElement);
        
        // Animation d'apparition progressive
        setTimeout(() => {
            itemElement.classList.add('show');
        }, index * 100);
    });
}

// Création d'un élément de menu avec animations
function createMenuItemElement(item) {
    const div = document.createElement('div');
    div.className = 'menu-item';
    div.innerHTML = `
        <div class="menu-item-image">
            <img src="${item.image}" alt="${item.name}" loading="lazy">
        </div>
        <div class="menu-item-content">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <span class="price">${item.price}</span>
            <button class="add-to-cart">
                <i class="fas fa-shopping-cart"></i>
                Ajouter au panier
            </button>
        </div>
    `;
    
    // Ajouter des événements de hover
    const image = div.querySelector('img');
    div.addEventListener('mouseenter', () => {
        image.style.transform = 'scale(1.1)';
    });
    
    div.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1)';
    });
    
    return div;
}

// Gestion du formulaire de contact avec animation
function handleContactSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    
    // Animation du bouton
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    // Simulation d'envoi
    setTimeout(() => {
        showToast('Message envoyé avec succès!');
        form.reset();
        submitBtn.innerHTML = `
            <span>Envoyer</span>
            <i class="fas fa-paper-plane"></i>
        `;
        submitBtn.disabled = false;
        
        // Réinitialiser les états des inputs
        form.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('focused');
        });
    }, 1500);
}

// Fonction utilitaire pour valider email
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Système de toast pour les notifications
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Animation d'entrée
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Animation de sortie
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Fonction pour initialiser les promotions
function initPromotions() {
    const promoCarousel = document.querySelector('.promo-carousel');
    promoCarousel.innerHTML = '';

    promotions.forEach(promo => {
        const promoCard = document.createElement('div');
        promoCard.className = 'promo-card';
        promoCard.innerHTML = `
            <img src="${promo.image}" alt="${promo.title}" class="promo-image">
            <div class="promo-content">
                <h3 class="promo-title">${promo.title}</h3>
                <p class="promo-description">${promo.description}</p>
                <div class="promo-price">
                    <span class="original-price">${promo.originalPrice}</span>
                    <span class="discounted-price">${promo.discountedPrice}</span>
                </div>
                <button class="add-to-cart" data-id="${promo.id}">
                    <i class="fas fa-shopping-cart"></i>
                    Ajouter au panier
                </button>
            </div>
        `;

        promoCard.querySelector('.add-to-cart').addEventListener('click', () => {
            addToCart(promo);
        });

        promoCarousel.appendChild(promoCard);
    });
}

// Fonction pour ajouter au panier
function addToCart(item) {
    showToast(`${item.title} ajouté au panier !`, 'success');
    // Ici vous pouvez ajouter la logique pour gérer le panier
}
