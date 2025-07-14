window.onload = function() {

    // Get all necessary elements from the HTML
    const entryScreen = document.getElementById('entry-screen');
    const startButton = document.getElementById('start-button');
    const cairoMusic = document.getElementById('cairo-theme');
    const videoContainer = document.getElementById('video-container');
    const introVideo = document.getElementById('intro-video');
    const invitationContainer = document.querySelector('.poster-container');
    const guestNameElement = document.getElementById('guest-name');

    // Prepare the personalized guest name from the URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('name')?.replace(/\+/g, ' ') || 'Jméno Příjmení';
    if (guestNameElement) {
        guestNameElement.textContent = guestName;
    }

    // MODIFIED: Function to fade out audio with a customizable duration
    function fadeOutAudio(audioElement) {
        // --- SET YOUR DESIRED DURATION HERE (in seconds) ---
        const fadeDurationInSeconds = 15;
        // ----------------------------------------------------

        const intervalDelay = 50; // How often the volume is lowered (in milliseconds)
        const numberOfSteps = (fadeDurationInSeconds * 1000) / intervalDelay;
        const volumeReductionPerStep = 1.0 / numberOfSteps;
        let currentVolume = audioElement.volume;

        const fadeInterval = setInterval(function() {
            currentVolume -= volumeReductionPerStep;

            if (currentVolume >= 0) {
                audioElement.volume = currentVolume;
            } else {
                // When fade is complete, stop everything
                audioElement.pause();
                audioElement.currentTime = 0;
                audioElement.volume = 1; // Reset volume for the next time it plays
                clearInterval(fadeInterval);
            }
        }, intervalDelay);
    }

    // This function contains all the steps for showing the final invitation
    function showInvitation() {
        videoContainer.style.display = 'none';
        document.body.classList.add('main-background');
        
        // Start the audio fade-out
        fadeOutAudio(cairoMusic);
        
        invitationContainer.classList.add('visible');
    }

    // Add the action for the "Start Adventure" button click
    startButton.addEventListener('click', function() {
        entryScreen.style.display = 'none';
        videoContainer.style.display = 'block';
    
        cairoMusic.play();
        introVideo.play();

        // Use the video's 'ended' event to trigger the invitation
        introVideo.addEventListener('ended', showInvitation);
    });
};