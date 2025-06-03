// ==UserScript==
// @name         Narrow.One Dot crosshair (improved from CN mod)
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  When pointer is locked, shows a dot crosshair in game.
// @author       Clipton
// @match        *://*.narrow.one/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const crosshair = document.createElement('div');
    crosshair.id = 'crosshairDot';
    document.body.appendChild(crosshair);

    const style = document.createElement('style');
    style.innerHTML = `
      #crosshairDot {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 10px;
        height: 10px;
        background: white;
        border: 2px solid black;
        border-radius: 50%;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 9999;
        box-sizing: border-box;
      }
    `;
    document.head.appendChild(style);

    function updateCrosshair() {
        if (document.pointerLockElement) {
            crosshair.style.opacity = '1';
        } else {
            crosshair.style.opacity = '0';
        }
    }

    document.addEventListener('pointerlockchange', updateCrosshair);
    setInterval(updateCrosshair, 500);
})();
