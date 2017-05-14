(function(_win, $){

    'use strict';

    /*global window: false */

    var utils = {};

    //initialize the applcation
    utils.init = function(){
        
        $(document).ready(function () {
            utils.start();
        });
    };

    //start the application
    utils.start = function(){
        utils.bindScrapeButton();
    };

    utils.setupHandlers = function () {
        utils.bindScrapeButton();
    };

    utils.bindScrapeButton = function () {
        $('#submit').on('click', function () {

            if (!$('#urlText').val() || $('#urlText').val() === ''){
                $('#submit').text('Please enter a URL!');

                setTimeout(function () {
                    $('#submit').text('Scrape');
                }, 1000);

                return;
            }

            $('#data-container').html('');
            $('#ajax-loader-container').show();

            $.ajax({
                url:  '/scrape',
                type: 'POST',
                data: {url:  $('#urlText').val() },
                success (jsonData) {
                    $('#ajax-loader-container').hide();

                    console.warn('HERE SUCCESS: ');
                    console.dir(JSON.parse(jsonData));
                    console.log(jsonData);

                    $('#data-container').JSONView(jsonData);
                },
                error (err) {
                    console.error('HERE error: ' + err);
                }
            });

        });
    };

    //initialize the applcation
    utils.init();
})(window, window.jQuery);