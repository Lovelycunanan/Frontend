document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');
    const confirmation = document.getElementById('confirmation');

    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault(); 

        const formData = new FormData(registrationForm);
        const id = formData.get('id');
        const fullName = formData.get('fullName');
        const address = formData.get('address');
        const status = formData.get('status');

        console.log('Form Data:', { id, fullName, address, status }); // Log form data to console

        fetch('https://backend-rd3w.onrender.com/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, fullName, address, status })
        })
        .then(response => {
            console.log('Network Response:', response); // Log network response to console
            return response.json();
        })
        .then(data => {
            console.log('Response Data:', data); // Log response data to console

            const { user, fee } = data;
            const confirmationMessage = `
                <p>ID: ${user.id}</p>
                <p>Full Name: ${user.fullName}</p>
                <p>Address: ${user.address}</p>
                <p>Status: ${user.status}</p>
                <p>Fee: $${fee}</p>
            `;
            confirmation.innerHTML = confirmationMessage;
            confirmation.classList.remove('hidden');
        })
        .catch(error => {
            console.error('Error:', error);
            confirmation.innerText = 'An error occurred. Please try again.'; // Display error message in confirmation div
        });
    });
});
