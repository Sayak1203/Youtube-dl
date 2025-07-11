document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('download-btn');
    const videoUrlInput = document.getElementById('video-url');
    const audioOnlyToggle = document.getElementById('audio-only');
    
    function isValidYouTubeUrl(url) {
        const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
        return pattern.test(url);
    }
    
    downloadBtn.addEventListener('click', async function() {
        const videoUrl = videoUrlInput.value.trim();
        
        if (!videoUrl) {
            showError('Please enter a YouTube URL');
            return;
        }
        
        if (!isValidYouTubeUrl(videoUrl)) {
            showError('Please enter a valid YouTube URL');
            return;
        }
        
        downloadBtn.disabled = true;
        downloadBtn.innerHTML = '<span class="button-text">Analyzing...</span><span class="button-icon"><i class="fas fa-spinner fa-spin"></i></span>';
        
        try {
            const response = await fetch('/api/info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    url: videoUrl,
                    audioOnly: audioOnlyToggle.checked
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch video info');
            }
            
            const data = await response.json();
            
            // Store data in session to use on download page
            sessionStorage.setItem('videoInfo', JSON.stringify(data));
            
            // Redirect to download page
            window.location.href = '/download';
        } catch (error) {
            console.error('Error:', error);
            showError('Failed to process video. Please try again.');

             document.addEventListener('DOMContentLoaded', function() {
   const downloadBtn = document.getElementById('download-btn');
   // ▼ RESET ON LOAD ▼
       downloadBtn.disabled = false;
    downloadBtn.innerHTML = '<span class="button-text">Analyze</span><span class="button-icon"><i class="fas fa-bolt"></i></span>';
});

        }
    });
    
    videoUrlInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            downloadBtn.click();
        }
    });
    
    function showError(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        const inputBox = document.querySelector('.input-box');
        inputBox.parentNode.insertBefore(errorElement, inputBox.nextSibling);
        
        setTimeout(() => {
            errorElement.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => errorElement.remove(), 300);
        }, 3000);
    }
});