'use strict';

// Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/medicine/sw.js')
        .then(function (registration) {
            console.log('Registration successful, scope is:', registration.scope);
        })
        .catch(function (error) {
            console.log('Service worker registration failed, error:', error);
        });
}

let installPromptEvent;

window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent Chrome <= 67 from automatically showing the prompt
    console.log('beforeinstallprompt triggered');
    event.preventDefault();
    // Stash the event so it can be triggered later.
    installPromptEvent = event;
    // Show the modal add to home screen dialog
    try {
        installPromptEvent.prompt();
        // Wait for the user to respond to the prompt
        installPromptEvent.userChoice.then((choice) => {
            if (choice.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            // Clear the saved prompt since it can't be used again
            installPromptEvent = null;
        });
    } catch (e) { }
});

window.addEventListener('appinstalled', (event) => {
    console.log('👍', 'appinstalled', event);
    // Clear the deferredPrompt so it can be garbage collected
    window.deferredPrompt = null;
});