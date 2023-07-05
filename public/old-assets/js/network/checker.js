"use strict";
$(document).ready(function() {

    window.addEventListener('offline', (e) => {
        console.log('offline');
    });

    window.addEventListener('online', (e) => {
        console.log('online');
    });



});
