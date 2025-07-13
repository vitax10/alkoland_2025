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

    // This function contains all the steps for showing the final invitation
    function showInvitation() {
        videoContainer.style.display = 'none';
        document.body.classList.add('main-background');
        
        cairoMusic.pause();
        cairoMusic.currentTime = 0;
        
        // The applyGradientToLetters() function is no longer needed.
        invitationContainer.classList.add('visible');
    }

    // Add the action for the "Start Adventure" button click
    startButton.addEventListener('click', function() {
        entryScreen.style.display = 'none';      
        videoContainer.style.display = 'block';  
    
        // introVideo.muted = true; 
    
        cairoMusic.play();
        introVideo.play();

        // Use the video's 'ended' event to trigger the invitation
        introVideo.addEventListener('ended', showInvitation);

        // Or use this for debugging:
        //setTimeout(showInvitation, 1000); 
    });
};