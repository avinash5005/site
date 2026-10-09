// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Portfolio Filtering
function filterProjects(category) {
    const cards = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => {
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.remove(
                'bg-slate-900', 'border', 'border-slate-800', 'text-slate-300'
            );
            btn.classList.add(
                'bg-brand-600', 'text-white', 'shadow-md', 'shadow-brand-600/20'
            );
        } else {
            btn.classList.remove(
                'bg-brand-600', 'text-white', 'shadow-md', 'shadow-brand-600/20'
            );
            btn.classList.add(
                'bg-slate-900', 'border', 'border-slate-800', 'text-slate-300'
            );
        }
    });

    cards.forEach(card => {
        if (
            category === 'all' ||
            card.getAttribute('data-category') === category
        ) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Modal Controls
function openModal(title, desc, imgSrc, category) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDescription').innerText = desc;
    document.getElementById('modalImage').src = imgSrc;
    document.getElementById('modalCategory').innerText = category;

    const modal = document.getElementById('projectModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('flex');
    modal.classList.add('hidden');
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('projectModal');

    if (e.target === modal) {
        closeModal();
    }
});

// Lead Form Submission Handler
function handleFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('clientName').value;
    const phone = document.getElementById('clientPhone').value;
    const bType = document.getElementById('businessType').value;
    const msg = document.getElementById('clientMessage').value;

    // Hide form and show success box
    document.getElementById('leadForm').classList.add('hidden');
    document.getElementById('successBox').classList.remove('hidden');

    console.log(`Lead Received: ${name}, ${phone}, ${bType}, ${msg}`);
}

function resetForm() {
    document.getElementById('leadForm').reset();
    document.getElementById('successBox').classList.add('hidden');
    document.getElementById('leadForm').classList.remove('hidden');
}