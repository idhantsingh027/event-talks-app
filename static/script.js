document.addEventListener('DOMContentLoaded', () => {
    const refreshBtn = document.getElementById('refresh-btn');
    const refreshIcon = document.getElementById('refresh-icon');
    const spinner = document.getElementById('loading-spinner');
    const notesContainer = document.getElementById('notes-container');

    const fetchNotes = async () => {
        // Show loading state
        refreshIcon.classList.add('spin-anim');
        if (notesContainer.innerHTML === '') {
            spinner.classList.remove('hidden');
        }

        try {
            const response = await fetch('/api/notes');
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            renderNotes(data);
        } catch (error) {
            console.error('Error fetching notes:', error);
            notesContainer.innerHTML = '<p style="color: #ef4444; text-align: center;">Failed to load release notes. Please try again.</p>';
        } finally {
            // Hide loading state
            refreshIcon.classList.remove('spin-anim');
            spinner.classList.add('hidden');
        }
    };

    const renderNotes = (notes) => {
        notesContainer.innerHTML = '';
        
        if (notes.length === 0) {
            notesContainer.innerHTML = '<p style="text-align: center; color: var(--date-color);">No release notes found.</p>';
            return;
        }

        notes.forEach(note => {
            const card = document.createElement('div');
            card.className = 'note-card';

            const date = new Date(note.published).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
            });

            // Extract text from summary to use in tweet
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = note.summary;
            let plainTextSummary = tempDiv.textContent || tempDiv.innerText || '';
            
            // Truncate for tweet if too long
            if (plainTextSummary.length > 150) {
                plainTextSummary = plainTextSummary.substring(0, 147) + '...';
            }

            const tweetText = encodeURIComponent(`BigQuery Update: ${note.title}\n\n${plainTextSummary}\n\nRead more: ${note.link}`);
            const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

            card.innerHTML = `
                <div class="note-header">
                    <h2 class="note-title">${note.title}</h2>
                    <span class="note-date">${date}</span>
                </div>
                <div class="note-content">
                    ${note.summary}
                </div>
                <div class="note-actions">
                    <a href="${tweetUrl}" target="_blank" rel="noopener noreferrer" class="tweet-btn">
                        <i class="fab fa-twitter"></i> Tweet
                    </a>
                </div>
            `;
            notesContainer.appendChild(card);
        });
    };

    // Initial fetch
    fetchNotes();

    // Refresh button click
    refreshBtn.addEventListener('click', fetchNotes);
});
