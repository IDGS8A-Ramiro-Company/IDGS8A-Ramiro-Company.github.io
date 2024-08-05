document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        axios.post('http://54.163.22.51/api/v1/auth', {
            username: username,
            password: password
        })
        .then(response => {
            if (response.data.success) {
                // Guardar el token y la información del usuario en localStorage
                localStorage.setItem('user', JSON.stringify({
                    username: response.data.username,
                    token: response.data.token, // Suponiendo que el token es parte de la respuesta
                    role: response.data.role
                }));
                // Redirigir al usuario a la página correspondiente según su rol
                redirectToRolePage(response.data.role);
            } else {
                errorMessage.textContent = 'Credenciales incorrectas. Por favor, inténtelo de nuevo.';
            }
        })
        .catch(error => {
            console.error('Error al iniciar sesión:', error);
            errorMessage.textContent = 'Hubo un problema con el inicio de sesión. Por favor, inténtelo de nuevo más tarde.';
        });
    });
});

function redirectToRolePage(role) {
    switch (role) {
        case 'admin':
            window.location.href = 'admin-add-group.html';
            break;
        case 'teacher':
            window.location.href = 'teacher-dashboard.html';
            break;
        case 'student':
            window.location.href = 'student-dashboard.html';
            break;
        default:
            window.location.href = 'login.html'; // Redirigir al login si el rol es desconocido
    }
}
