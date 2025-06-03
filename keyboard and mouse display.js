// ==UserScript==
// @name         Keyboard and Mouse visualizer for narrow.one (improved, takes up less space)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Keyboard visualizer inputs for yt vids or cinematic content. (or just everday use, idk)
// @match        narrow.one
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const style = document.createElement('style');
    style.textContent = `
#overlay {
    position: fixed;
    bottom: 10px;
    right: 100px;
    z-index: 9999;
    font-family: sans-serif;
    display: grid;
    grid-template-columns: repeat(3, 44px); /* 40px key + 4px margin approx */
    grid-template-rows: 44px 44px 44px; /* 3 rows */
    gap: 0px 0px;
    pointer-events: none;
    background: transparent;
}
.key {
    width: 40px;
    height: 40px;
    margin: 2px;
    background: #ccc;
    color: #000;
    text-align: center;
    line-height: 40px;
    border-radius: 4px;
    font-weight: bold;
    transition: background 0.2s;
    user-select: none;
}
.key.pressed {
    background: #4CAF50;
    color: #fff;
}

/* Q and W keys in first row */
#key-q {
    grid-column: 1;
    grid-row: 1;
}
#key-w {
    grid-column: 2;
    grid-row: 1;
}

/* A, S, D keys in second row */
#key-a {
    grid-column: 1;
    grid-row: 2;
}
#key-s {
    grid-column: 2;
    grid-row: 2;
}
#key-d {
    grid-column: 3;
    grid-row: 2;
}

/* Spacebar spans all columns in third row */
#key-space {
    grid-column: 1 / span 3;
    grid-row: 3;
    width: auto;
    margin: 2px;
    background: #ccc;
    border-radius: 4px;
}

/* Mouse icon fixed bottom right */
#mouse {
    position: fixed;
    bottom: 20px;
    right: 10px;
    width: 60px;
    height: 80px;
    background: #ddd;
    border: 2px solid #999;
    border-radius: 30px;
    z-index: 9999;
}
.mouse-btn {
    height: 30%;
    width: 50%;
    position: absolute;
    top: 0;
    background: #aaa;
    user-select: none;
}
#left-btn {
    left: 0;
    border-top-left-radius: 30px;
}
#right-btn {
    right: 0;
    border-top-right-radius: 30px;
}
.mouse-btn.pressed {
    background: #2196F3;
}
`;
    document.head.appendChild(style);

    // Create kb
    const overlay = document.createElement('div');
    overlay.id = 'overlay';

    // Keys: Q, W, A, S, D, SPACE
    const keys = ['q', 'w', 'a', 's', 'd', ' '];
    keys.forEach(k => {
        const keyDiv = document.createElement('div');
        keyDiv.className = 'key';
        keyDiv.id = k === ' ' ? 'key-space' : `key-${k}`;
        keyDiv.textContent = k === ' ' ? 'SPACE' : k.toUpperCase();
        overlay.appendChild(keyDiv);
    });

    document.body.appendChild(overlay);

    // Mouse icon
    const mouse = document.createElement('div');
    mouse.id = 'mouse';

    const leftBtn = document.createElement('div');
    leftBtn.id = 'left-btn';
    leftBtn.className = 'mouse-btn';

    const rightBtn = document.createElement('div');
    rightBtn.id = 'right-btn';
    rightBtn.className = 'mouse-btn';

    mouse.appendChild(leftBtn);
    mouse.appendChild(rightBtn);
    document.body.appendChild(mouse);

    // Key press tracking
    const keyMap = {
        'q': 'key-q',
        'w': 'key-w',
        'a': 'key-a',
        's': 'key-s',
        'd': 'key-d',
        ' ': 'key-space'
    };

    document.addEventListener('keydown', e => {
        const key = keyMap[e.key.toLowerCase()];
        if (key) document.getElementById(key)?.classList.add('pressed');
    });

    document.addEventListener('keyup', e => {
        const key = keyMap[e.key.toLowerCase()];
        if (key) document.getElementById(key)?.classList.remove('pressed');
    });

    // Mouse click detection
    document.addEventListener('mousedown', e => {
        if (e.button === 0) leftBtn.classList.add('pressed');
        if (e.button === 2) rightBtn.classList.add('pressed');
    });

    document.addEventListener('mouseup', e => {
        if (e.button === 0) leftBtn.classList.remove('pressed');
        if (e.button === 2) rightBtn.classList.remove('pressed');
    });
})();
