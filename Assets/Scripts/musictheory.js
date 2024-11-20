// @input Component.AudioComponent[] noteSounds
// @input SceneObject[] noteBalls

var currentNoteIndex = -1;

// Function to play a random note
function playRandomNote() {
    currentNoteIndex = Math.floor(Math.random() * script.noteSounds.length);
    script.noteSounds[currentNoteIndex].play(1);
}

// Function to check if the selected ball is correct
function checkSelection(selectedIndex) {
    if (selectedIndex === currentNoteIndex) {
        print("Correct!");
        playRandomNote(); // Play next note
    } else {
        print("Try again!");
    }
}

// Assign touch events to each ball
for (var i = 0; i < script.noteBalls.length; i++) {
    (function(index) {
        script.noteBalls[index].getComponent("Component.ToggleButton").addTouchStartEvent(function() {
            checkSelection(index);
        });
    })(i);
}

// Start the game by playing the first note
playRandomNote();