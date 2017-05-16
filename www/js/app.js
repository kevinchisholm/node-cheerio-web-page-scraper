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
        //when the submit button is clicked
        $('#submit').on('click', function () {

            //if the text box is empty
            if (!$('#urlText').val() || $('#urlText').val() === ''){
                //warn the user
                $('#submit').text('Please enter a URL!');
                $('#submit').addClass('error');

                //re-set the button
                setTimeout(function () {
                    $('#submit').text('Scrape Page');
                    $('#submit').removeClass('error');
                }, 2000);

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
                    console.dir(jsonData);

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