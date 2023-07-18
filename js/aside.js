// Variables
const $asideBlock = document.querySelector('.aside');
const $openAside = document.querySelector('.menu-button');
const $closeAside = document.querySelector('.close');
const $form = document.querySelector('.speed-menu');
const $speedInput = document.querySelector('#speed-animation');
const $warning = document.querySelector('.warning');

// Open event listener
$openAside.addEventListener('click', (ev) => {
    let keyframe = [
        {transform: 'translate(-400px)'},
        {transform: 'translate(0)'}
    ]

    let timing = {
        duration: 300,
        iterations: 1
    }

    $asideBlock.style.display = 'block';
    $asideBlock.animate(keyframe, timing);
});

// Close event listener
$closeAside.addEventListener('click', () => {
    let keyframe = [
        {transform: 'translate(0)'},
        {transform: 'translate(-400px)'}
    ]

    let timing = {
        duration: 300,
        iterations: 1
    }
    
    $asideBlock.animate(keyframe, timing);
    setTimeout(() => {
        $asideBlock.style.display = 'none';
    }, timing.duration);
});

$form.addEventListener('submit', (ev) => {
    ev.preventDefault();

    // Validacion
    if ($speedInput.value.length === 0) {
        $warning.textContent = 'El input debe contener un numero';
        $warning.animate([
            {transform: 'scale(1)'},
            {transform: 'scale(1.05)'},
            {transform: 'scale(1)'}
        ], 500);
        return;
    }
    if (isNaN(Number($speedInput.value))) {
        $warning.textContent = 'El input debe contener un numero';
        $warning.animate([
            {transform: 'scale(1)'},
            {transform: 'scale(1.05)'},
            {transform: 'scale(1)'}
        ], 500);
        return;
    }
    if (Number($speedInput.value) > 0) {
        $warning.textContent = '';
        animationDuration = Number($speedInput.value);
        localStorage.setItem('speed-animation', animationDuration);
    } else {
        $warning.textContent = 'El input debe contener un numero mayor que 0';
        $warning.animate([
            {transform: 'scale(1)'},
            {transform: 'scale(1.05)'},
            {transform: 'scale(1)'}
        ], 500);
    }
})