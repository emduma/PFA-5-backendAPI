document.getElementById('addUserBtn').addEventListener('click', addUser);

async function addUser() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const newUser = { username, email, password };

    try {
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });

        const data = await response.json();
        console.log('User added successfully with ID:', data.id);
    } catch (error) {
        console.error('Error adding user:', error);
    }
}

