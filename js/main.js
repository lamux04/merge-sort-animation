// Variables (elementos de html)
const $changeNumbersButton = document.querySelector('#changeNumbers');
const $boxContainer = document.querySelector('.box-container');
const $sortButton = document.querySelector('#bSort');
const $unsortButton = document.querySelector('#bUnsort');

// Variables de control
let vect = [3, 5, 9, 7, 8, -2, 1, 0, -13];
let sorted = false;


// Change numbers options
$changeNumbersButton.addEventListener('click', () => {
    let aux = prompt('Introduce los numeros separados por comas (3,2,34,56,3,2)', '');

    aux = aux.replace(' ', '');

    let vectAux = aux.split(',');

    // Comprobamos si todos son numeros
    vectAux.forEach((n, i) => {
        if (!isNaN(Number(n))) vectAux[i] = Number(n);
        else {
            alert('La informacion introducida no es correcta');
            return;
        }
    });

    vect = [...vectAux];
    sorted = false;

    renderVect (vect);
});

// Renderizar numeros
function renderVect (vect) {
    // Creamos la linea y borramos todo el box container
    $boxContainer.innerHTML = '';
    let linea = document.createElement('div');
    linea.classList.add('container');
    $boxContainer.appendChild(linea);

    vect.forEach((el, i) => {
        // Creamos el elemento
        let nuevaCaja = document.createElement('div');
        nuevaCaja.classList.add('box');
        nuevaCaja.setAttribute('data-id', i);
        nuevaCaja.textContent = el;

        linea.appendChild(nuevaCaja);
    });
}

// Merge sort function
async function mergeSort ($container) {
    if ($container.children.length > 1) {
        await dividirLinea($container);
        
        let $left = $boxContainer.children[$boxContainer.children.length - 2];
        let $rigth = $boxContainer.children[$boxContainer.children.length - 1];

        
        await mergeSort($left);
        await mergeSort($rigth);

        await animateLine($left, $rigth, $container);
        $left.remove();
        $rigth.remove();
    }
}

$sortButton.addEventListener('click', async () => {
    if (!sorted) {
        sorted = true;
        await mergeSort($boxContainer.firstElementChild);
    }
});

$unsortButton.addEventListener('click', () => {
    sorted = false;
    renderVect(vect);
})