// Variables
const $changeThemeButton = document.querySelector('.change-theme');

// Variables de control
dark = 'false';

// Actualizamos variables de control con localstorage y agregamos las clases correspondientes
if (localStorage.getItem('dark-theme') !== null) {
    dark = localStorage.getItem('dark-theme');

    if (dark === 'true') {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
    } else {
        document.body.classList.add('light');
        document.body.classList.remove('dark');
    }
}

// Guardar variables de control en localstorate
function saveTheme (dark) {
    localStorage.setItem('dark-theme', dark);
}

// Event listener
$changeThemeButton.addEventListener('click', () => {
    if (dark === 'false') {
        dark = 'true';
        saveTheme(dark);
        document.body.classList.add('dark');
        document.body.classList.remove('light');
    } else {
        dark = 'false';
        saveTheme(dark);
        document.body.classList.add('light');
        document.body.classList.remove('dark');
    }
})