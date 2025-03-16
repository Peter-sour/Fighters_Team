 // Configure particles.js
 particlesJS('loading-spyder-js', {
    "particles": {
        "number": {
            "value": 100,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            }
        },
        "opacity": {
            "value": 0.5,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 2,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 140,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});

// Loading animation - Diubah untuk lebih cepat
let progress = 0;
const loadingBar = document.getElementById('loading-bar');
const loadingText = document.getElementById('loading-text');

function updateLoading() {
    progress += Math.random() * 8; // Ditingkatkan dari 3 ke 8 untuk progres lebih cepat
    if (progress > 100) progress = 100;
    
    loadingBar.style.width = progress + '%';
    loadingText.textContent = 'Initializing interface... ' + Math.floor(progress) + '%';
    
    if (progress < 100) {
        setTimeout(updateLoading, 70); // Dipercepat dari 150ms menjadi 70ms
    } else {
        loadingText.textContent = 'Interface loaded successfully!';
        setTimeout(() => {
            // Redirect to main page or reveal main content
            // window.location.href = 'main.html'; // Uncomment to redirect
            alert('Loading complete! Ready to enter the website.');
        }, 500); // Dipercepat dari 1000ms menjadi 500ms
    }
}

// Start loading
window.onload = function() {
    setTimeout(updateLoading, 200); // Dipercepat dari 500ms menjadi 200ms
};
