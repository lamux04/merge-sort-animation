let animationDuration = 1000;
if (localStorage.getItem('speed-animation') !== null) {
    animationDuration = parseInt(localStorage.getItem('speed-animation'));
}

// Animacion para dividir linea dado un contenedor
function dividirLinea ($container) {
    return new Promise((resolve, reject) => {
        let i, nuevoContenedorLeft, nuevoContenedorRight, j = 0;
        nuevoContenedorLeft = document.createElement('div');
        nuevoContenedorLeft.classList.add('container');
        nuevoContenedorRight = document.createElement('div');
        nuevoContenedorRight.classList.add('container');
        for (i = 0; i < $container.children.length; i++) {
            if (i < Math.floor($container.children.length / 2)) {
                nuevoContenedorLeft.appendChild($container.children[i].cloneNode());
                nuevoContenedorLeft.children[i].textContent = $container.children[i].textContent;
            } else {
                nuevoContenedorRight.appendChild($container.children[i].cloneNode());
                nuevoContenedorRight.children[j].textContent = $container.children[i].textContent;
                j++;
            }
        }

        $container.parentElement.appendChild(nuevoContenedorLeft);
        nuevoContenedorLeft.style.top = `${$container.getBoundingClientRect().top + 90}px`;
        nuevoContenedorLeft.style.left = `${$container.getBoundingClientRect().left - 35}px`;

        $container.parentElement.appendChild(nuevoContenedorRight);
        nuevoContenedorRight.style.top = `${$container.getBoundingClientRect().top + 90}px`;
        nuevoContenedorRight.style.left = `${nuevoContenedorLeft.getBoundingClientRect().right + 90}px`;

        // Animacion
        let keyframeLeft = [
            {transform: `translate(35px, -90px)`},
            {transform: `translate(0, 0)`}
        ];

        let keyframeRight = [
            {transform: `translate(-35px, -90px)`},
            {transform: `translate(0, 0)`}
        ]

        nuevoContenedorLeft.animate(keyframeLeft, animationDuration);
        nuevoContenedorRight.animate(keyframeRight, animationDuration);

        setTimeout(resolve, animationDuration);
    });
}

// Mover una caja de una altura a otra
function animateBox ($box, initialX, finalX) {
    return new Promise((resolve, reject) => {
        let keyframe = [
            {transform: `translate(0, 0)`},
            {transform: `translate(${finalX - initialX}px, -90px)`}
        ];

        $box.animate(keyframe, animationDuration);

        setTimeout(resolve, animationDuration);
    })
}

// Ordenar una linea completa
async function animateLine ($left, $right, $final) {
    let i = 0, j = 0, k = 0;

    while (i < $left.children.length && j < $right.children.length) {
        if (Number($left.children[i].textContent) < Number($right.children[j].textContent)) {
            // Movemos la caja de la izquierda
            await animateBox($left.children[i], $left.children[i].getBoundingClientRect().left, $final.children[k].getBoundingClientRect().left);
            $left.children[i].style.visibility = 'hidden';
            $final.children[k].textContent = $left.children[i].textContent;
            $final.children[k].style.backgroundColor = "green";
            i++;
        } else {
            // Movemos la caja de la derecha
            await animateBox($right.children[j], $right.children[j].getBoundingClientRect().left, $final.children[k].getBoundingClientRect().left);
            $right.children[j].style.visibility = 'hidden';
            $final.children[k].textContent = $right.children[j].textContent;
            $final.children[k].style.backgroundColor = "green";
            j++;
        }
        k++;
    }

    while (i < $left.children.length) {
        // Movemos la caja de la izquierda
        await animateBox($left.children[i], $left.children[i].getBoundingClientRect().left, $final.children[k].getBoundingClientRect().left);
        $left.children[i].style.visibility = 'hidden';
        $final.children[k].textContent = $left.children[i].textContent;
        $final.children[k].style.backgroundColor = "green";
        i++; k++;
    }

    while (j < $right.children.length) {
        // Movemos la caja de la derecha
        await animateBox($right.children[j], $right.children[j].getBoundingClientRect().left, $final.children[k].getBoundingClientRect().left);
        $right.children[j].style.visibility = 'hidden';
        $final.children[k].textContent = $right.children[j].textContent;
        $final.children[k].style.backgroundColor = "green";
        j++; k++;
    }
}