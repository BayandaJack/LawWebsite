//const { Router } = require("express");

window.onload = function() {
    window.scrollTo(0, 0);
};

let button = document.getElementById('formButton');
button.onclick = function() {
    const name = document.getElementById('userName').value;
    const cellno = document.getElementById('userNumber').value;
    const email = document.getElementById('userEmail').value;
    const legalproblem = document.getElementById('legalproblem').value;

    // Reset form after collecting the data
    document.getElementById('contact-form').reset();

    const req = {
        name,
        cellno,
        email,
        legalproblem
    };

    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
    })
    .then(res => res.json())
    .then(data => {
        console.log('Server response:', data);
        // Optionally show a success message to the user here
    })
    .catch(err => {
        console.error('Error sending request:', err);
        // Optionally show an error message to the user here
    });
}

