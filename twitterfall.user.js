// ==UserScript==
// @name       Twitterfall modification by IFET
// @namespace  IFET
// @version    0.3.0
// @description  used for ifet twitterfall
// @match	http://www.twitterfall.com/*
// @match	www.twitterfall.com/*
// @match	twitterfall.com/*
// @updateURL  https://raw.githubusercontent.com/poberbichler/tampermonkey/master/twitterfall.js
// @copyright  I Fix Everything Team
// ==/UserScript==

(function() {
    console.log('starting the superawesome IFET twitterfall script...');
    function hashtagAlreadyExists(hashtag) {
        var result = false;
        $('#customlist > .customsearch').each(function(index, value) {
            if($.trim($(value).text()) === hashtag) {
                result = true;
            }
        });

        return result;
    }

    function generateHashtag() {
        var year = new Date().getFullYear();
        return '#EHFG' + year;
    }

    // add the ehfg hashtag if necessary
    var currentHashtag = generateHashtag();
    if (!hashtagAlreadyExists(currentHashtag)) {
        console.log('setting hashtag', currentHashtag);
        $('#customsearch').val(currentHashtag);
        $('#customform button').click();
    }

    // hide the awful watermark
    $('#watermark').hide();

    // set the new background
    var bodyElement = $('body');
    bodyElement.css('background-image', 'url("http://app.ehfg.org/twitterfall/logo.jpg")');
    bodyElement.css('background-size', '100%');
    bodyElement.css('overflow-x', 'hidden');
    bodyElement.css('overflow', 'hidden');

    // append new speed and select it - twitterfall only checks the speed if the select is changed
    $('#speed').append('<option id="ifetspeed" value="5000">ifet</option>');
    $('#ifetspeed').prop('selected', true);

    $('#presentmode').click();
    $('#presentationtext').text(currentHashtag);

    $('#closepresent').text('modified by I Fix Everything Team with Tampermokey');

    // twitterlogin is shown
    if ($('#popuploading > .dontshowme').css('display') === 'block') {
        console.log('twitter login not found, clicking the login link...');
        $('#popuploading > .dontshowme > .authorize > img[alt="Login With Twitter"]').click();
    }

    // override the mouseover, so twitterfall won't stop by accident
    $('#timeline_body').mouseover(function() {
        var hightlightList = $(this).find('.highlight');
        $.each(hightlightList, function(index, element) {
            $(element).removeClass('highlight');
        });
        restartQueue();
    });
}());
