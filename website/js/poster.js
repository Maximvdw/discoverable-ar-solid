// Get the URL search parameters
const urlParams = new URLSearchParams(window.location.search);
const modal = document.getElementById('arModal');
const backdrop = document.querySelector('.modal-backdrop');

// Check if the 'qr' parameter exists
if (urlParams.has('qr')) {
    // Show the Bootstrap modal
    modal.classList.add('show');
    backdrop.classList.add('show');
    modal.style.display = 'block';
}

const observer = new MutationObserver(function(mutationsList) {
    for (let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            backdrop.parentNode.removeChild(backdrop);
        }
    }
});

observer.observe(modal, { attributes: true });

function closeModal() {
    modal.classList.remove('show');
    modal.style.display = 'none';
    window.history.replaceState({}, document.title, window.location.pathname);
}

function redirect() {
    window.location.href = 'https://adobeaero.app.link/lx3Aw7sWJIb';
}
