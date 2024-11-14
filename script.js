// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 800 / 800, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 800);
document.body.appendChild(renderer.domElement);

// Create a simple object (sphere) for the bouncing effect
const geometry = new THREE.SphereGeometry(30); // A sphere with radius 30
const material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // White color material
const dvdMesh = new THREE.Mesh(geometry, material);
scene.add(dvdMesh);

// Set initial position at the origin
dvdMesh.position.set(0, 0, 0);

// Set up camera position
camera.position.z = 500;

// Initialize velocities
let vx = 1.5; // Slight horizontal velocity (smaller than vy)
let vy = 1.1; // Slight vertical velocity (smaller than vx)

// Variables for screen boundaries
const boundaryX = 400; // Half of 800 width
const boundaryY = 400; // Half of 800 height

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Move the DVD logo (or sphere)
  dvdMesh.position.x += vx;
  dvdMesh.position.y += vy;

  // Change direction when the logo hits the screen boundaries
  if (dvdMesh.position.x >= boundaryX || dvdMesh.position.x <= -boundaryX) {
    vx = -vx; // Reverse horizontal velocity
    changeColorAndSize(); // Change color and size on bounce
  }
  
  if (dvdMesh.position.y >= boundaryY || dvdMesh.position.y <= -boundaryY) {
    vy = -vy; // Reverse vertical velocity
    changeColorAndSize(); // Change color and size on bounce
  }

  // Render the scene
  renderer.render(scene, camera);
}

// Function to change color and size of the object
function changeColorAndSize() {
  // Change color randomly
  dvdMesh.material.color.setRGB(Math.random(), Math.random(), Math.random());

  // Shrink the size of the object
  let newSize = dvdMesh.scale.x * 0.95; // Reduce size by 5%
  dvdMesh.scale.set(newSize, newSize, newSize); // Keep it uniform
}

// Start the animation
animate();
