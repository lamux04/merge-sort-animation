const vect = [3, 2, -4, 23, 34, 12, 0, -45, 32];

function mergeSort(vect) {
    if (vect.length > 1) {
        let medio = Math.floor(vect.length/2);

        let arrayIzquierda = mergeSort(vect.slice(0, medio));
        let arrayDerecha = mergeSort(vect.slice(medio));

        return merge(arrayIzquierda, arrayDerecha);
    } else return vect;
}

function merge(arrayIzquierda, arrayDerecha) {
    let vect = [];
    let i = 0, j = 0;

    while(i < arrayIzquierda.length && j < arrayDerecha.length) {
        if (arrayIzquierda[i] < arrayDerecha[j]) {
            vect.push(arrayIzquierda[i]);
            i++;
        } else {
            vect.push(arrayDerecha[j]);
            j++;
        }
    }

    if (arrayIzquierda.length === i) {
        for (j; j < arrayDerecha.length; j++) {
            vect.push(arrayDerecha[j]);
        }
    } else {
        for (i; i < arrayIzquierda.length; i++) {
            vect.push(arrayIzquierda[i]);
        }
    }

    return vect;
}

console.log(mergeSort(vect));