function typeEffect(element, speed, callback) {
    // Store original text and calculate height
    const originalText = element.textContent.trim();
    const originalHeight = element.scrollHeight;
    
    // Set fixed height and clear content
    element.style.height = originalHeight + 'px';
    element.style.overflow = 'hidden';
    element.textContent = '';
    
    // Create cursor
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    element.appendChild(cursor);
    
    // Make element visible just before animation starts
    element.style.opacity = "1";
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < originalText.length) {
            // Insert text before cursor
            const textNode = document.createTextNode(originalText.charAt(i));
            element.insertBefore(textNode, cursor);
            i++;
        } else {
            clearInterval(timer);
            
            // Remove cursor and reset styles
            element.removeChild(cursor);
            element.style.height = 'auto';
            element.style.overflow = 'visible';
            
            if (callback) callback();
            
            // Special cursor effect for conclusion (only if it's the conclusion element)
            if (element.id === 'conclusion') {
                const endCursor = document.createElement('span');
                endCursor.className = 'cursor';
                element.appendChild(endCursor);
            }
        }
    }, speed);
}

// Initialize the effect
function initTypewriter() {
    const speed = 35;
    const shaderIntroElements = document.querySelectorAll('.shader-container .shader-intro');
    const conclusion = document.querySelector('#conclusion');
    
    // Reset all elements - set initial state to hidden
    document.querySelectorAll('.shader-intro, #conclusion').forEach(el => {
        el.style.opacity = "0";  // Start hidden
        el.style.height = '';
        el.style.overflow = '';
        
        // Remove any existing cursors
        const cursor = el.querySelector('.cursor');
        if (cursor) el.removeChild(cursor);
    });
    
    // Type elements sequentially
    function typeAllElements(elements, index) {
        if (index < elements.length) {
            typeEffect(elements[index], speed, () => {
                typeAllElements(elements, index + 1);
            });
        } else {
            // Only type the conclusion if it hasn't been typed already
            if (!conclusion.querySelector('.cursor')) {
                typeEffect(conclusion, speed);
            }
        }
    }
    
    // Start with the first element
    typeAllElements(Array.from(shaderIntroElements), 0);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
});
