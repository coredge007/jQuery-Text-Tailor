# jquery-text-tailor

this is jQuery plugin for handling text overflow.
All you have to do is import files and add attribute named 'data-text-tailor' to each html elements and execute a javascript function. like below

        (function initPage($) {

            textTailor.init({
                transform: '...',
                lines: 2
            });

        }).apply(this, [jQuery]);
        
Also, You can give more option to each html element.

data-text-tailor='{"transform":"***","lines":"3"}'<br>
data-text-tailor='{"transform":"☆☆☆","lines":"4"}'<br>
data-text-tailor='{"transform":"♡♡♡","lines":"5"}'<br>
data-text-tailor='{"transform":"...viewMore▷","lines":"3","href":"http://www.google.com"}'<br>
data-text-tailor='{"transform":"...viewMore▷","lines":"3","href":"http://www.google.com","target":"_blank"}'

* Notice : this plugin do not response to window resize event.
