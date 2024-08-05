const apiUrl = 'http://54.163.22.51/api/v1/groups'; // Reemplaza con la URL de tu API

// Obtener y mostrar los grupos
function fetchGroups() {
    axios.get(apiUrl)
        .then(response => {
            const groups = response.data;
            const groupList = document.getElementById('group-list');
            groupList.innerHTML = '';
            groups.forEach(group => {
                const li = document.createElement('li');
                li.textContent = group.name;
                li.innerHTML += `
                    <button class="edit" onclick="editGroup(${group.id}, '${group.name}')">Editar</button>
                    <button class="delete" onclick="deleteGroup(${group.id})">Eliminar</button>
                `;
                groupList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error al obtener los grupos:', error);
        });
}

// Crear o actualizar un grupo
function saveGroup(event) {
    event.preventDefault();
    const id = document.getElementById('group-id').value;
    const name = document.getElementById('group-name').value;
    const method = id ? 'put' : 'post';
    const url = id ? `${apiUrl}/${id}` : apiUrl;

    axios[method](url, { name })
        .then(response => {
            fetchGroups();
            document.getElementById('group-form').reset();
        })
        .catch(error => {
            console.error(`Error al ${id ? 'actualizar' : 'crear'} el grupo:`, error);
        });
}

// Editar un grupo
function editGroup(id, name) {
    document.getElementById('group-id').value = id;
    document.getElementById('group-name').value = name;
}

// Eliminar un grupo
function deleteGroup(id) {
    axios.delete(`${apiUrl}/${id}`)
        .then(response => {
            fetchGroups();
        })
        .catch(error => {
            console.error('Error al eliminar el grupo:', error);
        });
}

// Configurar eventos
document.getElementById('group-form').addEventListener('submit', saveGroup);

// Cargar los grupos al inicio
fetchGroups();
