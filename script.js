
'use strict';

//#region CONFIGURATION

const RENDER_URL = 'https://nature-animaux-vdi.onrender.com';
const HEALTH_URL = `${RENDER_URL}/api/health`;

const CHECK_INTERVAL = 3000;
const REQUEST_TIMEOUT = 8000;
const MIN_VIDEO_DURATION = 20000;
const MAX_ATTEMPTS = 30;

// Adresse du launcher
const LAUNCHER_URL = 'https://nature-animaux-launcher.onrender.com';

// Mode installation :
// https://nature-animaux-launcher.onrender.com/?install=1
const INSTALL_MODE = new URLSearchParams(window.location.search)
    .get('install') === '1';

const statusMessage = document.getElementById('statusMessage');
const retryButton = document.getElementById('retryButton');
const startupVideo = document.getElementById('startupVideo');

let running = false;

//#endregion

//#region OUTILS

function wait(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

function updateStatus(message) {
    if (statusMessage) {
        statusMessage.textContent = message;
    }
}

function playVideo() {
    if (!startupVideo) return;

    startupVideo.muted = true;

    const playback = startupVideo.play();

    if (playback && typeof playback.catch === 'function') {
        playback.catch(error => {
            console.warn('Lecture vidéo impossible :', error.message);
        });
    }
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

    if (retryButton) {
        retryButton.hidden = true;
    }

    playVideo();

    // Empêche la redirection pendant l'installation
    if (INSTALL_MODE) {
        updateStatus(
            'Installation Nature & Animaux VDI : utilisez le menu ⋮ de Chrome pour ajouter cette page à votre écran d’accueil.'
        );

        running = false;
        return;
    }

    updateStatus('Connexion à Nature & Animaux...');

    const startTime = Date.now();
    let attempts = 0;
    let serverReady = false;

    while (running) {

        if (!serverReady) {
            serverReady = await checkServer();

            if (!serverReady) {
                attempts++;
            }
        }

        const elapsed = Date.now() - startTime;
        const remaining = MIN_VIDEO_DURATION - elapsed;

        // Serveur prêt : attendre au minimum 20 secondes
        if (serverReady) {

            if (remaining > 0) {
                updateStatus(
                    'Application prête ! Ouverture dans quelques secondes...'
                );

                await wait(remaining);
            }

            updateStatus('Ouverture de Nature & Animaux VDI...');

            window.location.replace(RENDER_URL);
            return;
        }

        if (attempts >= 3) {
            updateStatus(
                'Réveil du serveur en cours... Merci de patienter.'
            );
        }

        if (attempts >= MAX_ATTEMPTS) {
            updateStatus(
                'Le serveur met plus de temps que prévu à démarrer.'
            );

            if (retryButton) {
                retryButton.hidden = false;
            }

            running = false;
            return;
        }

        await wait(CHECK_INTERVAL);
    }
}

//#endregion

//#region ÉVÉNEMENTS

if (retryButton) {
    retryButton.addEventListener('click', startLauncher);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startLauncher);
} else {
    startLauncher();
}

//#endregion
