document.addEventListener('DOMContentLoaded', function() {
    const backBtn = document.getElementById('back-btn');
    
    backBtn.addEventListener('click', function() {
        window.location.href = '/';
    });
    
    // Get video info from session storage
    const videoInfo = JSON.parse(sessionStorage.getItem('videoInfo'));
    
    if (!videoInfo) {
        showError('No video information found. Please go back and try again.');
        return;
    }
    
    // Display video info
    document.getElementById('video-title').textContent = videoInfo.title;
    document.getElementById('video-thumbnail').src = videoInfo.thumbnail;
    
    // Populate formats
    const videoFormatsContainer = document.getElementById('video-formats');
    const audioFormatsContainer = document.getElementById('audio-formats');
    
    videoFormatsContainer.innerHTML = '';
    audioFormatsContainer.innerHTML = '';
    
    if (videoInfo.videoFormats && videoInfo.videoFormats.length > 0) {
        videoInfo.videoFormats.forEach(format => {
            const formatElement = createFormatElement(format, 'video');
            videoFormatsContainer.appendChild(formatElement);
        });
    } else {
        document.querySelector('.section-title:nth-of-type(1)').style.display = 'none';
        videoFormatsContainer.innerHTML = '<div class="no-formats">No video formats available</div>';
    }
    
    if (videoInfo.audioFormats && videoInfo.audioFormats.length > 0) {
        videoInfo.audioFormats.forEach(format => {
            const formatElement = createFormatElement(format, 'audio');
            audioFormatsContainer.appendChild(formatElement);
        });
    } else {
        document.querySelector('.section-title:nth-of-type(2)').style.display = 'none';
        audioFormatsContainer.innerHTML = '<div class="no-formats">No audio formats available</div>';
    }
    
    function createFormatElement(format, type) {
        const formatElement = document.createElement('div');
        formatElement.className = 'format-item';
        
        formatElement.innerHTML = `
            <div>
                <span class="format-type">${type.toUpperCase()}</span>
                <span class="format-quality">${format.quality}</span>
            </div>
            <div class="format-size">${format.size}</div>
            <a href="/api/download?itag=${format.itag}" class="download-link" download>
                Download <i class="fas fa-download"></i>
            </a>
        `;
        
        return formatElement;
    }
    
    
    function showError(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        const videoInfoDiv = document.querySelector('.video-info');
        videoInfoDiv.appendChild(errorElement);
    }
});