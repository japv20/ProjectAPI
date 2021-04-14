// strict mode
"use strict";

const starReset = document.getElementById('svg-pic');
const tsukkiLogo = document.getElementById('behind-logo');
const textAnimation = document.getElementById('text');
starReset.addEventListener('click', function(event) {
    event.preventDefault();

    tsukkiLogo.classList.remove('animation-behind-logo');
    // keeps the width of the element.
    void tsukkiLogo.offsetWidth;
    tsukkiLogo.classList.add('animation-behind-logo');

    textAnimation.classList.remove('typewriter');
    void textAnimation.offsetWidth;
    textAnimation.classList.add('typewriter');

}, false);