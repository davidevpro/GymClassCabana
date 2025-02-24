// Manejador de formulario de registro
document.getElementById('register-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: newUsername, password: newPassword })
        });

        if (response.ok) {
            alert('Registro exitoso. Ahora puedes iniciar sesión.');
            toggleForms(false); // Volver al formulario de login
        } else {
            alert('El usuario ya existe.');
        }
    } catch (error) {
        console.error('Error al registrar:', error);
    }
});