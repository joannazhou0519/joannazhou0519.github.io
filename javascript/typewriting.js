function typeEffect(element, speed, callback) {
    var text = element.innerHTML.trim(); // Trim to remove any leading or trailing whitespace
    element.innerHTML = ""; // Clear the content

    var cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.innerHTML = '|';
    element.appendChild(cursor);

    var i = 0;
    var timer = setInterval(function(){
        if (i < text.length){
            element.insertBefore(document.createTextNode(text.charAt(i)), cursor);
            i++;
        } else {
            clearInterval(timer);
            if (callback) callback();

            // After typing is complete, keep cursor blinking if it's the conclusion element
            if (element.id === 'conclusion') {
                setInterval(function() {
                    cursor.style.display = (cursor.style.display === 'none' ? '' : 'none');
                }, 500); // Adjust blinking speed as needed (500ms here)
            } else {
                cursor.style.display = "none"; // Hide cursor after typing for other elements
            }
        }
    }, speed);

    
}

var speed = 35; // Speed of the typewriting effect
var shaderIntroElements = document.querySelectorAll('.shader-container .shader-intro'); // Select all 'shader-intro' paragraphs inside the 'shader-container'
var conclusion = document.querySelector('#conclusion'); // Select the element with id 'conclusion'

// Initially set all elements to opacity 0
shaderIntroElements.forEach(function(element) {
    element.style.opacity = "0";
});
conclusion.style.opacity = "0";

// Function to type all elements sequentially
function typeAllElements(elements, index) {
    if (index < elements.length) {
        elements[index].style.opacity = "1"; // Make the element visible before typing
        typeEffect(elements[index], speed, function() {
            typeAllElements(elements, index + 1);
        });
    } else {
        conclusion.style.opacity = "1"; // Make the conclusion element visible before typing
        if (conclusion.innerHTML.trim() === '') {
            // Check if conclusion content is empty, then only type it
            typeEffect(conclusion, speed); // Typing the conclusion
        } else {
            // If conclusion already has content, just start blinking the cursor
            var cursor = conclusion.querySelector('.cursor');
            if (cursor) {
                setInterval(function() {
                    cursor.style.display = (cursor.style.display === 'none' ? '' : 'none');
                }, 500); // Adjust blinking speed as needed (500ms here)
            }
        }
    }
}

// Start the typewriting effect from the first element
typeAllElements(shaderIntroElements, 0);
