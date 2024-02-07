// Function to handle user login
document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }) // Send user's email and password
        });

        const data = await response.json();
        console.log(data); // Handle response from the server
    } catch (error) {
        console.error(error.message);
        // Handle error
    }
});




document.getElementById('signup-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, name, password }) // Send user's email, name, and password
        });

        const data = await response.json();
        console.log(data); // Handle response from the server
    } catch (error) {
        console.error(error.message);
        // Handle error
    }
});


// Add event listeners or use frameworks like React/Vue.js for handling user interactions
