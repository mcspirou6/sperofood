// Configuration Three.js
let scene, camera, renderer;
let food3DObjects = [];

function init() {
    // Création de la scène
    scene = new THREE.Scene();
    
    // Configuration de la caméra
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Configuration du renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // Ajout du renderer au conteneur
    const container = document.getElementById('threejs-container');
    if (container) {
        container.appendChild(renderer.domElement);
    }

    // Ajout de lumières
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Création des objets 3D
    createFood3DObjects();

    // Animation
    animate();

    // Gestion du redimensionnement
    window.addEventListener('resize', onWindowResize, false);
}

function createFood3DObjects() {
    // Création d'un burger stylisé
    const burgerGeometry = new THREE.CylinderGeometry(1, 1, 0.3, 32);
    const burgerMaterial = new THREE.MeshPhongMaterial({ color: 0xff9933 });
    const burger = new THREE.Mesh(burgerGeometry, burgerMaterial);
    burger.position.set(-2, 0, 0);
    scene.add(burger);
    food3DObjects.push(burger);

    // Création d'une pizza stylisée
    const pizzaGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.1, 32);
    const pizzaMaterial = new THREE.MeshPhongMaterial({ color: 0xff6666 });
    const pizza = new THREE.Mesh(pizzaGeometry, pizzaMaterial);
    pizza.position.set(2, 0, 0);
    scene.add(pizza);
    food3DObjects.push(pizza);

    // Création d'une boisson stylisée
    const drinkGeometry = new THREE.CylinderGeometry(0.3, 0.3, 1.5, 32);
    const drinkMaterial = new THREE.MeshPhongMaterial({ color: 0x66ccff });
    const drink = new THREE.Mesh(drinkGeometry, drinkMaterial);
    drink.position.set(0, -1, 0);
    scene.add(drink);
    food3DObjects.push(drink);
}

function animate() {
    requestAnimationFrame(animate);

    // Animation des objets
    food3DObjects.forEach((obj, index) => {
        obj.rotation.y += 0.01;
        obj.position.y = Math.sin(Date.now() * 0.001 + index) * 0.2;
    });

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Initialisation de la scène 3D
document.addEventListener('DOMContentLoaded', init);
