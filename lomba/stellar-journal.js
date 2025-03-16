    // Elements
    const journalEntry = document.getElementById('journalEntry');
    const saveEntryBtn = document.getElementById('saveEntryBtn');
    const entriesList = document.getElementById('entriesList');
    const currentPrompt = document.getElementById('currentPrompt');
    const saveSuccess = document.getElementById('saveSuccess');
    const journalModal = document.getElementById('stellarJournalModal');
    const deleteEntryBtn = document.getElementById('deleteEntryBtn');

    // Variable to track currently selected entry
    let currentEntryId = null;

    // Cosmic prompts array
    const cosmicPrompts = [
        "If your emotions were celestial bodies, which ones would be the brightest today? Describe why they shine so brightly in your inner sky.",
        "Imagine your mind as a vast galaxy. What stars, planets, or phenomena exist there today?",
        "If you could send a message in a space capsule to your future self, what would it say?",
        "Visualize a supernova of emotions. What feeling is exploding within you, and what new elements might it create?",
        "If your thoughts were constellations, what patterns would they form in your mental sky?",
        "Imagine you're an astronaut looking back at Earth. How does this perspective change how you feel about your current challenges?"
    ];

    // Get a random prompt
    function getRandomPrompt() {
        const randomIndex = Math.floor(Math.random() * cosmicPrompts.length);
        return cosmicPrompts[randomIndex];
    }

    // Load entries from localStorage
    function loadEntries() {
        const entries = getEntriesFromStorage();
        entriesList.innerHTML = '';
        
        if (entries.length === 0) {
            entriesList.innerHTML = '<p class="text-center text-light opacity-75">Your cosmic journey has not yet begun. Create your first entry!</p>';
            return;
        }
        
        // Sort entries by date (newest first)
        entries.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        entries.forEach(entry => {
            const entryElement = document.createElement('div');
            entryElement.className = 'entry-item';
            entryElement.dataset.id = entry.id;
            entryElement.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <div class="entry-date">${formatDate(entry.date)}</div>
                    <button class="btn btn-sm text-danger delete-btn" title="Delete entry">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button>
                </div>
                <div class="entry-preview">${entry.content.substring(0, 50)}${entry.content.length > 50 ? '...' : ''}</div>
            `;
            
            // Click to load entry
            entryElement.addEventListener('click', function(e) {
                // Ignore click if it's on the delete button
                if (e.target.closest('.delete-btn')) return;
                
                currentEntryId = entry.id;
                journalEntry.value = entry.content;
                currentPrompt.textContent = entry.prompt;
                
                // Show delete button
                if (deleteEntryBtn) {
                    deleteEntryBtn.style.display = 'block';
                }
                
                // Switch to write tab
                const writeTab = document.getElementById('write-tab');
                bootstrap.Tab.getOrCreateInstance(writeTab).show();
            });
            
            // Set up delete button
            const deleteBtn = entryElement.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent triggering the parent click event
                deleteEntry(entry.id);
            });
            
            entriesList.appendChild(entryElement);
        });
    }

    // Format date nicely
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Get entries from localStorage
    function getEntriesFromStorage() {
        const entriesJSON = localStorage.getItem('stellarJournalEntries');
        return entriesJSON ? JSON.parse(entriesJSON) : [];
    }

    // Save entry to localStorage
    function saveEntry(content, prompt) {
        const entries = getEntriesFromStorage();
        
        if (currentEntryId) {
            // Update existing entry
            const entryIndex = entries.findIndex(entry => entry.id === currentEntryId);
            if (entryIndex !== -1) {
                entries[entryIndex].content = content;
                entries[entryIndex].prompt = prompt;
                entries[entryIndex].updated = new Date().toISOString();
            }
        } else {
            // Create new entry
            const newEntry = {
                id: Date.now(),
                date: new Date().toISOString(),
                content: content,
                prompt: prompt
            };
            
            // Add to entries array
            entries.push(newEntry);
        }
        
        // Save back to localStorage
        localStorage.setItem('stellarJournalEntries', JSON.stringify(entries));
        
        // Show success notification
        saveSuccess.style.display = 'block';
        setTimeout(() => {
            saveSuccess.style.display = 'none';
        }, 3000);
        
        // Reset current entry
        currentEntryId = null;
        if (deleteEntryBtn) {
            deleteEntryBtn.style.display = 'none';
        }
        
        // Clear the textarea
        journalEntry.value = '';
        
        // Set new prompt
        setNewPrompt();
        
        // Reload entries list
        loadEntries();
    }

    // Delete entry from localStorage
    function deleteEntry(id) {
        if (!confirm('Are you sure you want to delete this entry?')) return;
        
        let entries = getEntriesFromStorage();
        entries = entries.filter(entry => entry.id !== id);
        
        // Save back to localStorage
        localStorage.setItem('stellarJournalEntries', JSON.stringify(entries));
        
        // If we're viewing this entry, clear the form
        if (currentEntryId === id) {
            journalEntry.value = '';
            currentEntryId = null;
            if (deleteEntryBtn) {
                deleteEntryBtn.style.display = 'none';
            }
            setNewPrompt();
        }
        
        // Reload entries list
        loadEntries();
        
        // Show notification
        saveSuccess.textContent = 'Entry deleted successfully';
        saveSuccess.style.display = 'block';
        setTimeout(() => {
            saveSuccess.style.display = 'none';
            saveSuccess.textContent = 'Journal entry saved successfully!';
        }, 3000);
    }

    // Set a new random prompt
    function setNewPrompt() {
        currentPrompt.textContent = getRandomPrompt();
    }

    // Event Listeners
    saveEntryBtn.addEventListener('click', () => {
        const content = journalEntry.value.trim();
        if (content) {
            saveEntry(content, currentPrompt.textContent);
        }
    });

    // Add delete button functionality if it exists
    if (deleteEntryBtn) {
        deleteEntryBtn.addEventListener('click', () => {
            if (currentEntryId) {
                deleteEntry(currentEntryId);
            }
        });
    }

    // When the modal is shown
    journalModal.addEventListener('shown.bs.modal', () => {
        loadEntries();
        
        // If no content in the textarea, set a random prompt
        if (!journalEntry.value) {
            setNewPrompt();
            currentEntryId = null;
            if (deleteEntryBtn) {
                deleteEntryBtn.style.display = 'none';
            }
        }
    });

    // Document ready - initial load
    document.addEventListener('DOMContentLoaded', () => {
        loadEntries();
    });