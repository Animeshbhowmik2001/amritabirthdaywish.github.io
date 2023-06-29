// Create a canvas element
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array to store confetti particles
const confettiParticles = [];

// Function to create a confetti particle
function createConfettiParticle() {
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  return {
    x: Math.random() * canvas.width,    // Random x-coordinate
    y: -20,                             // Start above the canvas
    radius: Math.random() * 6 + 2,      // Random size
    dx: Math.random() * 2 - 1,          // Random horizontal speed
    dy: Math.random() * 3 + 2,          // Random vertical speed
    color: color                        // Random color
  };
}

// Function to draw a confetti particle
function drawConfettiParticle(particle) {
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
  ctx.fillStyle = particle.color;
  ctx.fill();
}

// Function to update the confetti particles
function updateConfettiParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < confettiParticles.length; i++) {
    const particle = confettiParticles[i];
    
    particle.y += particle.dy;
    particle.x += particle.dx;
    
    // If the particle goes off the screen, remove it
    if (particle.y > canvas.height) {
      confettiParticles.splice(i, 1);
      i--;
    }
    
    drawConfettiParticle(particle);
  }
  
  requestAnimationFrame(updateConfettiParticles);
}

// Function to create confetti particles periodically
function createConfetti() {
  const particle = createConfettiParticle();
  confettiParticles.push(particle);
  
  // Create a new particle every 200 milliseconds
  setTimeout(createConfetti, 200);
}

// Start the animation
createConfetti();
updateConfettiParticles();
