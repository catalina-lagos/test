// Function to add a new group dynamically
function addGroup() {
    const identityMap = document.getElementById("identityMap");

    // Create a new group (similar structure as existing boxes)
    const newGroup = document.createElement("div");
    newGroup.classList.add("map-item");

    newGroup.innerHTML = `
        <div class="big-bubble"><textarea></textarea></div>
        <button class="remove-btn" onclick="removeGroup(this)">x</button>
        <img src="symb-b.svg" alt="">
        <div class="small-bubbles">
          <div class="small-bubble"><textarea></textarea></div>
          <div class="small-bubble"><textarea></textarea></div>
        </div>
    `;

    // Append the new group to the container
    identityMap.appendChild(newGroup);

    enforceMinimumBoxes();  // Recheck minimum box count
}

// Function to remove a group when the remove button is clicked
function removeGroup(button) {
    const group = button.closest(".map-item"); // Find the parent group
    const identityMap = document.getElementById("identityMap");
    const totalGroups = identityMap.children.length;

    // Prevent deletion if there will be fewer than 6 boxes remaining
    if (totalGroups <= 6) {
        showWarningMessage("You must maintain at least 6 boxes.");
        return; // Prevent deletion if fewer than 6 boxes remain
    }

    // Remove the group
    group.remove();

    enforceMinimumBoxes(); // Recheck minimum box count after deletion
}

// Enforce the minimum number of 6 boxes on page load
function enforceMinimumBoxes() {
    const identityMap = document.getElementById("identityMap");
    const currentBoxes = identityMap.children.length;

    // Ensure at least 6 boxes remain on the page
    while (currentBoxes < 6) {
        addGroup();
    }

    // Hide warning message if minimum box count is met
    hideWarningMessage();
}

// Function to display warning message
function showWarningMessage(message) {
    const warningMessageElement = document.getElementById("warningMessage");
    warningMessageElement.innerText = message;
    warningMessageElement.style.display = "block";
}

// Function to hide warning message
function hideWarningMessage() {
    const warningMessageElement = document.getElementById("warningMessage");
    warningMessageElement.style.display = "none";
}

// Enforce the initial state with 8 boxes
function enforceInitialState() {
    const identityMap = document.getElementById("identityMap");
    const currentBoxes = identityMap.children.length;

    // Ensure at least 8 boxes are present at the start
    while (currentBoxes < 8) {
        addGroup();
    }
}

// Call this function on page load to ensure the minimum number of boxes
window.onload = () => {
    enforceInitialState();
    enforceMinimumBoxes();
};

// Check if all the blue bubbles are filled before submitting
function checkFormCompletion(event) {
    const blueBubbles = document.querySelectorAll('.map-item .big-bubble textarea');
    let allFilled = true;
  
    // Check if all blue bubbles are filled
    blueBubbles.forEach(bubble => {
      if (bubble.value.trim() === '') {
        allFilled = false;
      }
    });
  
    // Get the warning message container
    const warningMessage = document.getElementById('warningMessage');
  
    // If not all blue bubbles are filled, prevent submission and show the warning
    if (!allFilled) {
      event.preventDefault(); // Prevent form submission
      warningMessage.style.display = 'block'; // Show the warning message
    } else {
      warningMessage.style.display = 'none'; // Hide the warning message if everything is filled
    }
}
  
// Attach the checkFormCompletion function to the submit button
const submitButton = document.querySelector('.button-container a');
submitButton.addEventListener('click', checkFormCompletion);
