
/*
    * jquery-text-tailor : v0.0.1
    * Copyright 2020, coredge
    * All rights reserved.
*/

(function ($) {

    if (typeof textTailor != 'undefined') return; 

    textTailor = {

        Options : {},

        init : function(arg) {

            textTailor['options'] = $.extend({
                transform: '...',
                lines: 2
            }, arg);

            var $body = $('body');
            textTailor.handleTextOverflow($body);
        },

        handleTextOverflow: function($ctx) {

            $ctx.find('[data-text-tailor]').each(function() {

                var $this = $(this);
        
                if ($this.data('init-text-tailor') == 'initialized') return;

                var argOptions = $this.data('text-tailor');
                var options = $.extend(textTailor['options'], argOptions);
                var timeStamp = new Date().getUTCMilliseconds();

                $('<em id="dummy_' + timeStamp + '" style="position:fixed;top:-9999px;left:-9999px;">' + $this.text() + '</em>').css({
                    'font-size': $this.css('font-size'),
                    'font-weight': $this.css('font-weight')
                }).appendTo('body');

                var $dummy = $('em#dummy_' + timeStamp);
                var paddings = parseInt($this.css('padding-left'))+parseInt($this.css('padding-right'));
                var textSpace = ($this.width()-paddings/2)*options['lines'] - parseInt($this.css('font-size'));
                

                if (textSpace < $dummy.width()) {
                    var dummyText = $dummy.text(),
                    genText = '',
                    exGenText = '',
                    sLink = '',
                    eLink = '';
                    
                    $dummy.text('');

                    for(var i = 0; i < dummyText.length; i++) {
                        genText = genText + dummyText[i];
                        $dummy.text(genText + options['transform']);

                        if (options['href']) {
                            sLink = '<a href="' 
                                    + options['href'] 
                                    + '"' 
                                    + (options['target']?(' target="' + options['target'] + '"'):'')
                                    + '>';
                            eLink = '</a>';
                        }
                        if (textSpace < $dummy.width()) {
                            $this.html(exGenText + sLink  + options['transform'] + eLink);
                            break;
                        }
                        exGenText = genText;
                    }
                }

                $dummy.remove();
                
                $this.data('init-text-tailor','initialized');

            });
        },

        BindingDomChangeEvts: function() {

            var jQueryEvtHookTimeout = null;

            $.map(['before', 'after', 'html', 'prepend', 'append'], function(evt) {

                var def = $.fn[evt];

                if (def) {

                    $.fn[evt] = function() {

                        var target = this;

                        if (jQueryEvtHookTimeout) {
                            clearTimeout(jQueryEvtHookTimeout);
                        }

                        jQueryEvtHookTimeout = setTimeout(function() {
                            textTailor.handleTextOverflow($(target));
                        },17);

                        return def.apply(this, arguments);
                    }
                    
                }
            }); 

        }

    };

    textTailor.BindingDomChangeEvts();

}(jQuery));
