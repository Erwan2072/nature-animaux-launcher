
//#region CONFIGURATION

const RENDER_URL = 'https://nature-animaux-vdi.onrender.com';
const HEALTH_URL = `${RENDER_URL}/api/health`;

const CHECK_INTERVAL = 3000;
const REQUEST_TIMEOUT = 8000;

const statusMessage = document.getElementById('statusMessage');
const retryButton = document.getElementById('retryButton');

let running = false;

//#endregion

//#region OUTILS

function wait(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

function updateStatus(message) {
    statusMessage.textContent = message;
}

//#endregion

//#region VÉRIFICATION DU SERVEUR

async function checkServer() {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
        controller.abort();
    }, REQUEST_TIMEOUT);

    try {
        const response = await fetch(HEALTH_URL, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-store',
            credentials: 'omit',
            signal: controller.signal
        });

        if (!response.ok) {
            return false;
        }

        const data = await response.json();

        return data.status === 'ok';

    } catch (error) {
        console.warn('Serveur non disponible :', error.message);
        return false;

    } finally {
        clearTimeout(timeout);
    }
}

//#endregion

//#region DÉMARRAGE

async function startLauncher() {
    if (running) return;

    running = true;
    retryButton.hidden = true;

    updateStatus('Connexion à Nature & Animaux...');

    let attempts = 0;

    while (running) {
        const ready = await checkServer();

        if (ready) {
            updateStatus('Application prête !');

            window.location.replace(RENDER_URL);
            return;
        }

        attempts++;

        if (attempts >= 3) {
            updateStatus(
                'Réveil du serveur en cours... Merci de patienter.'
            );
        }

        if (attempts >= 30) {
            updateStatus(
                'Le serveur met plus de temps que prévu à démarrer.'
            );

            retryButton.hidden = false;
            running = false;
            return;
        }

        await wait(CHECK_INTERVAL);
    }
}

//#endregion

//#region ÉVÉNEMENTS

retryButton.addEventListener('click', startLauncher);

document.addEventListener('DOMContentLoaded', () => {
    startLauncher();
});

//#endregion
