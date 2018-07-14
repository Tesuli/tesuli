/*----------------------------------------

Files are neat, but you know what else is neat?
Not looking at other's poorly written code.

----------------------------------------*/
$(document).ready(function () {
    //Immediate events
    function updateNewsAlert() {
        var year;
        var month;
        var day;
        $.ajax({
            type: 'GET',
            //url:window.location.href.substring(0,window.location.href.length-11) + 'resources/data/news/showcase.txt',
            url: 'https://tesuli.github.io/tesuli/resources/data/news/showcase.txt',
            dataType: 'text'
        }).done(function (data) {
            var dataArray = data.split('\n');
            year = dataArray[0].trim();
            month = dataArray[1].trim();
            day = dataArray[2].trim();
            console.log(year, month, day);
            if (localStorage.getItem('lastNewsSeen') === year + '/' + month + '/' + day) {
                $('#news-alert').addClass('disable');
            }
        });
    }
    updateNewsAlert();
    $('#mobile-ok').on('click', function () {
        $('#mobile').css({ display: 'none' });
    });
    //window.open("file:///C:/Users/super/Desktop/game/index.html#", "", "width=1024,height=768"); 
    /*=-=-=-=-=-=-=-=-=-=-=-=-=
    =-=-=-=-=-=-=-=-=-=-=-=-=-=
        
         HOME BUBBLE ANIMATION
        
    =-=-=-=-=-=-=-=-=-=-=-=-=-=
    -=-=-=-=-=-=-=-=-=-=-=-=-=-*/
    function Bubble() {
        this.element = null;
        this.left = 0;
        this.bottom = 0;
        this.updateProps = function () {
            if ((Math.floor(Math.random() * 10)) == 0) {
                if (Math.random() >= 0.5) {
                    this.left += 2;
                }
                else {
                    this.left -= 2;
                }
            }
            this.bottom += 2;
            this.element.css({
                left: this.left + 'px',
                bottom: this.bottom + 'px'
            });
            if (this.bottom > $(window).height() || this.left > $(window).width() * 0.98) {
                this.bottom = 0;
                this.left = Math.random() * (($(window).width() * 0.13));
            }
        };
    }
    ;
    var bubbles = [];
    var _loop_1 = function (i) {
        var loc = 'resources/images/bubble2.png';
        if ((Math.random * 10) == 9) {
            loc = 'resources/images/bubble2.png';
        }
        bubbles[i] = new Bubble();
        bubbles[i].element = $('<img src="' + loc + '" />').addClass('bubble').appendTo('body');
        bubbles[i].bottom = 5000;
        setInterval(function () {
            bubbles[i].updateProps();
        }, 10 + i);
    };
    for (var i = 0; i < 9; i++) {
        _loop_1(i);
    }
    function screenSizeIsNotTooSmall() {
        return $(window).height() > 400 && $(window).width() > 500;
    }
    function screenSizeIsTooSmall() {
        return $(window).height() <= 400 || $(window).width() <= 500;
    }
    $(window).resize(function () {
        console.log('H');
        if (screenSizeIsNotTooSmall()) {
            $('nav').animate({ width: '100%' }, 300);
            $('nav a').animate({ fontSize: '2vh' }, 100);
            $('#nav-about').animate({ top: '0', left: '0' }, 50);
            $('#nav-home').animate({ top: '0', left: '0' }, 10);
            $('#nav-music').animate({ top: '0', left: '0' }, 50);
            $('#nav-news').animate({ top: '0', left: '0' }, 50);
            $('#nav-contact').animate({ top: '0', left: '0' }, 50);
        } /*else if(screenSizeIsTooSmall()){
            nav.children().each(function(index){
                $(this).css({color:'navLinkColors[index]', fontSize:'3.75vh'});
            });
            $('nav').css({width:'70%'});
        }*/
    });
    var atHome = true;
    /*=-=-=-=-=-=-=-=-=-=-=-=-=
    =-=-=-=-=-=-=-=-=-=-=-=-=-=
        
            NAV BAR LINKS
        
    =-=-=-=-=-=-=-=-=-=-=-=-=-=
    -=-=-=-=-=-=-=-=-=-=-=-=-=-*/
    var navBarLinks = $('nav a');
    var linkMusic = $('#nav-music');
    var linkHome = $('#nav-home');
    var homeTitle = $('#home-title');
    var tesuliProfile = $('#tesuli-profile');
    var DSIProfile = $('#DSI-profile');
    var currentPageOpen = 'nav-home';
    /*---------------------------------
    Default Nav Bar Link Click Events
    ----------------------------------*/
    var navLinkColors = ['#FFFFFF', '#FFF19A', '#78aaff', '#E15858', '#66D875'];
    var nav = $('#header nav');
    /*
    Function Summary
    ------
    All navBar links will, upon clicking:
    1. Set the currentPageOpen variable
    2. change color based on order
    3. push the home title upwards into the header and fire
       the function associated with the clicked link (excluding the home link)
    */
    nav.children().each(function (index) {
        $(this).on('click', function (event) {
            //Make certain the page isn't already open
            if (currentPageOpen !== $(event.target).attr('id')) {
                //1
                currentPageOpen = $(event.target).attr('id');
                //2
                $(this).css('color', navLinkColors[index]);
                //3
                //Each link in the navbar is assigned a function
                //based on their id (those functions are listed below in separated categories)
                var linkFuncKey = {
                    'nav-home': linkHomeOpen,
                    'nav-about': linkScheduleOpen,
                    'nav-news': linkNewsOpen,
                    'nav-music': linkMusicOpen,
                    'nav-contact': linkContactOpen
                };
                for (var prop in linkFuncKey) {
                    if ($(event.target).attr('id') === prop) {
                        linkFuncKey[prop]();
                    }
                }
                //Default action when clicking home link
                if (screenSizeIsNotTooSmall()) {
                    if ($(this).attr('id') === 'nav-home') {
                        setTimeout(function () {
                            homeTitle
                                .appendTo($('#home-content'))
                                .css({ top: '10%', left: '0' })
                                .animate({ width: '50vw', top: '50%', margin: '0', left: '10%' }, 600);
                            setTimeout(function () {
                                homeTitle.css({ animation: 'bobbing 3s cubic-bezier(.28,-0.05,.72,1.12) infinite' });
                                console.log('no');
                            }, 600);
                        }, 700);
                        //Default action when clicking any other navBar link
                    }
                    else {
                        homeTitle
                            .css({ animation: 'none', top: '52%', left: '10%' })
                            .animate({ width: '20vw', top: '4.4%', left: '29%' }, 600);
                        setTimeout(function () {
                            homeTitle.appendTo($('#header')).css({ marginLeft: '29%', marginTop: '-3%' });
                        }, 700);
                    }
                }
                else {
                    //Default action when clicking the home and the window is too small
                    if ($(this).attr('id') === 'nav-home') {
                        if (atHome === false) {
                            atHome = true;
                            $('#mobile-nav').children().each(function () {
                                $(this).css({ display: 'block' });
                                $(this).animate({ bottom: '0' }, 1000);
                            });
                            $('#radio-window').css({ display: 'none' }); //The function above accidentally sets the display of the radio to block, this is to undo that
                            $('#nav-radio').css({ display: 'none' }).animate({ top: '50%', left: '80%' }, 10);
                            $('nav').css({ overflow: 'hidden' });
                            $('nav a').css({ paddingRight: '100%' });
                        }
                        //Default action when clicking any other link and the window is too small
                    }
                    else {
                        if (atHome === true) {
                            atHome = false;
                            $('nav').css({ overflow: 'initial' }).animate({ width: '40%' }, 300);
                            $('nav a').animate({ fontSize: '2vh', paddingRight: '35%' }, 100);
                            $('#nav-about').animate({ top: '95%', left: '-80%' }, 50);
                            $('#nav-home').animate({ top: '100%', left: '-80%' }, 10);
                            $('#nav-music').animate({ top: '63.5%', left: '0%' }, 50);
                            $('#nav-news').animate({ top: '68.5%', left: '0%' }, 50);
                            $('#news-alert').animate({ top: '41%', left: '41%', width: '10%' });
                            $('#nav-contact').animate({ top: '36.8%', left: '80%' }, 50);
                            $('#mobile-nav').children().each(function () {
                                var th = $(this);
                                th.animate({ bottom: '-10vh' }, 1000);
                                $('body').css({ height: '110vh' });
                                setTimeout(function () {
                                    th.css({ display: 'none' });
                                }, 1000);
                            });
                            //Animate the radio nav link
                            $('#nav-radio').css({ display: 'block' }).animate({ top: '32%', left: '80%' }, 10);
                        }
                    }
                }
            }
        });
    });
    /*-------------------
    Home Link Click
    -------------------*/
    /*
    Function Summary
    ------
    The navBar music link will, upon clicking:
    1. perform the function mentioned above in the "Default Nav Bar Link Click Events" section (animate the home title translating back)
    2. push aside all possible still-open windows
    3. set the color of all navBar links to white (if screen size is not too small)
    4. animate tabs back into position (if screen size is small enough)
    */
    function linkHomeOpen() {
        //2
        closeStillOpen();
        //3
        if (screenSizeIsNotTooSmall()) {
            navBarLinks.each(function () {
                $(this).css('color', 'white');
            });
        }
        //4
        if (screenSizeIsTooSmall()) {
            $('nav').animate({ width: '70%' }, 300);
            $('nav a').animate({ fontSize: '2.8vh' }, 100);
            $('#nav-about').animate({ top: '0', left: '0' }, 50);
            $('#nav-home').animate({ top: '0', left: '0' }, 50);
            $('#nav-music').animate({ top: '0', left: '0' }, 50);
            $('#nav-news').animate({ top: '0', left: '0' }, 50);
            $('#nav-contact').animate({ top: '0', left: '0' }, 50);
        }
    }
    /*-------------------
    Schedule Link Click
    -------------------*/
    var schedule = $('#schedule');
    var scheduleSelector = $('#schedule-selector');
    var scheduleTimes = $('#schedule-times');
    var dayText; //will be set in the linkScheduleOpen() function
    /*
    Function Summary
    ------
    The navBar schedule link will, upon clicking:
    1. perform the function mentioned above in the "Default Nav Bar Link Click Events" section
    2. close any windows that are currently open
    3. animate the the schedule windows
    4. animate schedule upon hovering over days of the week
    */
    function linkScheduleOpen() {
        var width = '30vw';
        var height = '72vh';
        if (screenSizeIsTooSmall()) {
            width = '70vw';
            height = '55vh';
        }
        //2
        closeStillOpen(linkScheduleClose);
        //3
        schedule.css({ display: 'inline-block', opacity: '1' });
        setTimeout(function () {
            scheduleSelector.animate({ height: height, width: width }, 700);
        }, 100);
        //4
        /*
        Function Summary
        ------
        The navBar schedule link will, upon clicking:
        1. The dayText variable is updated
        2. The schedule selector is pushed the the left
        3. The schedule times window is animated into existence
        4. The text of the header of the schedule times window is set to the corresponding day
        5. The appropriate text file is located and the schedule information is updated
        6. Deciper text file junk stuff
        */
        $('.schedule-days-space').on('click', function (event) {
            var scheduleCounter = 0; //will be set later to count the amount of schedules in each day file
            //1
            dayText = $(event.target).text();
            //2
            if (screenSizeIsNotTooSmall()) {
                scheduleSelector.animate({ left: '0' });
            }
            else {
                scheduleTimes.css({ marginLeft: '55vw' });
                $('#schedule-content').css({
                    width: '220%',
                    marginLeft: '-38%'
                });
            }
            //3
            scheduleTimes.css({ display: 'inline-block', opacity: '1' });
            scheduleTimes.animate({ width: width, height: height }, 300);
            //4
            scheduleTimes.children('.header').children('span').text($(event.target).text());
            //5
            $.ajax({
                type: 'GET',
                //url:window.location.href.substring(0,window.location.href.length-11) + 'resources/data/schedule/' + dayText + '.txt',
                url: 'https://tesuli.github.io/tesuli/resources/data/schedule/' + dayText + '.txt',
                dataType: 'text'
            }).done(function (data) {
                //6
                var dataArray = data.split('\n');
                $('#schedule-info-content').html('');
                for (var i = 0; i < dataArray.length; i++) {
                    if (dataArray[i].trim() == '[!]') {
                        scheduleCounter++;
                        var el = $('<span class="schedule-text">' + dataArray[i + 1] + '<br /> <span class="schedule-text-desc">' + dataArray[i + 2] + '</span></span>');
                        //Search for the word 'FFHD' and surround it in a span
                        el.html(el.html().replace('FFHD', '<span class="schedule-ffhd">FFHD<div></div><span>Funk, Freestyle, Hip-hop & Disco</span></span>'));
                        $('#schedule-info-content').append(el);
                    }
                }
                //If there are more than 6 schedules in the day file, make all the schedule elements shorter in css through the 'too-many' class
                if (scheduleCounter > 6) {
                    $('#schedule-info-content').children().each(function () {
                        $(this).addClass('too-many');
                    });
                }
            }).fail(function () {
                alert("Unfortunately, the schedule could not load properly.");
            });
        });
    }
    /*
    Closing Function
    ------
    Will close all windows associated with the schedule tab
    */
    function linkScheduleClose() {
        if (screenSizeIsNotTooSmall()) {
            $('#nav-about').css('color', 'white');
        }
        scheduleSelector.animate({ height: '0', width: '0' }, 700);
        scheduleSelector.animate({ left: '20%' });
        setTimeout(function () {
            scheduleTimes.animate({ height: '0', width: '0' }, 700);
        }, 100);
        setTimeout(function () {
            schedule.css({ display: 'none', opacity: '0' });
            scheduleTimes.css({ opacity: '0', display: 'none' });
        }, 700);
    }
    /*-------------------
    News Link Click
    -------------------*/
    var news = $('#news');
    var article = $('#article');
    var articleSelector = $('#article-selector');
    /*
    Function Summary
    ------
    The navBar news link will, upon clicking:
    1. perform the function mentioned above in the "Default Nav Bar Link Click Events" section
    2. close any windows that are currently open
    3. animate the the article windows
    4. Set the text in the article window to the most recent news article
    */
    $('#subt').on('click', function () {
        $('#subt-dropdown').toggleClass('down');
        console.log($('#subt-dropdown').hasClass('down'));
    });
    $('#header-stuff').on('click', function () {
        console.log('poop');
        if (screenSizeIsTooSmall) {
            $('#subt-dropdown').toggleClass('down');
            console.log($('#subt-dropdown').hasClass('down'));
        }
    });
    function linkNewsOpen() {
        var size = '40vw';
        var selectorSize = '19vw';
        if (screenSizeIsTooSmall()) {
            size = '80vw';
            selectorSize = '60vw';
        }
        //2
        closeStillOpen(linkNewsClose);
        //3
        news.css({ display: 'block', opacity: '1' });
        article.animate({ width: size }, 700);
        setTimeout(function () {
            articleSelector.animate({ width: selectorSize }, 500);
        }, 100);
        //4
        var year;
        var month;
        var day;
        $.ajax({
            type: 'GET',
            //url:window.location.href.substring(0,window.location.href.length-11) + 'resources/data/news/showcase.txt',
            url: 'https://tesuli.github.io/tesuli/resources/data/news/showcase.txt',
            dataType: 'text'
        }).done(function (data) {
            var dataArray = data.split('\n');
            year = dataArray[0].trim();
            month = dataArray[1].trim();
            day = dataArray[2].trim();
            localStorage.setItem('lastNewsSeen', year + '/' + month + '/' + day);
            updateNewsAlert();
            var monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
            var monthNamesDisplay = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            $.ajax({
                type: 'GET',
                //url:window.location.href.substring(0,window.location.href.length-11) + 'resources/data/news/' + year + '/' + monthNames[month-1] + '/' + day + '.txt',
                url: 'https://tesuli.github.io/tesuli/resources/data/news/' + year + '/' + monthNames[month - 1] + '/' + day + '.txt',
                dataType: 'text'
            }).done(function (data) {
                function dataL() {
                    var f = "";
                    for (var i = 2; i < dataArray.length; i++) {
                        f += dataArray[i] + '<br/>';
                    }
                    return f;
                }
                //6
                var dataArray = data.split('\n');
                $('#article-content').html('');
                var title = $('<span><div id="article-title">' + dataArray[0] + '</div><div id="article-date">' + monthNamesDisplay[month - 1] + ' ' + day + ',  ' + year + '</div>' + '</span>'); //Title of the news article
                var el = $('<span>' + dataL() + '</span>');
                console.log(el);
                $('#article .header').html(title);
                $('#article-content').html(el);
            });
        });
        var monthDays = {
            january: 31,
            february: 29,
            march: 31,
            april: 30,
            may: 31,
            june: 30,
            july: 31,
            august: 31,
            september: 30,
            october: 31,
            november: 30,
            december: 31
        };
        year = 2018;
        $('.article-selector-space').on('click', function () {
            var monthText = $(this).children('span').text();
            var numberOfDays = monthDays[monthText];
            $('#article-selector-day').html('<span id="article-back"><img src="resources/images/back.png" /></span>');
            $('#article-selector-day').css({ display: 'block' });
            $('#article-selector').children('.header').children('span:not(#subt-dropdown)').text(monthText);
            $('#article-selector').children('.header').children('#subt').text(year);
            var _loop_2 = function (i) {
                var g = void 0;
                if (i % 2 == 0) {
                    g = $('<div class="day-discolor"><span>' + i + '</span></div>');
                }
                else {
                    g = $('<div><span>' + i + '</span></div>');
                }
                $(g).each(function () {
                    var lthis = this;
                    $.ajax({
                        type: 'GET',
                        //url:window.location.href.substring(0,window.location.href.length-11) + 'resources/data/news/' + year + '/' + monthText + '/' + $(this).text() + '.txt',
                        url: 'https://tesuli.github.io/tesuli/resources/data/news/' + year + '/' + monthText + '/' + $(this).text() + '.txt',
                        dataType: 'text'
                    }).done(function (data) {
                        $(lthis).addClass('day-good');
                        $(lthis).attr('title', data.split('\n')[0]);
                    });
                    $('#article-selector-day').append($(this));
                    $(this).on('click', function () {
                        $.ajax({
                            type: 'GET',
                            //url:window.location.href.substring(0,window.location.href.length-11) + 'resources/data/news/' + year + '/' + monthText + '/' + $(this).text() + '.txt',
                            url: 'https://tesuli.github.io/tesuli/resources/data/news/' + year + '/' + monthText + '/' + $(this).text() + '.txt',
                            dataType: 'text'
                        }).done(function (data) {
                            var dataArray = data.split('\n');
                            month = monthText;
                            day = i;
                            function dataL() {
                                var f = "";
                                for (var i_1 = 2; i_1 < dataArray.length; i_1++) {
                                    f += dataArray[i_1] + '<br/>';
                                }
                                return f;
                            }
                            //6
                            $('#article-content').html('');
                            var title = $('<span><div id="article-title">' + dataArray[0] + '</div><div id="article-date">' + month + ' ' + day + ',  ' + year + '</div>' + '</span>'); //Title of the news article
                            var el = $('<span>' + dataL() + '</span>');
                            $('#article .header').html(title);
                            $('#article-content').html(el);
                        });
                    });
                });
            };
            for (var i = 1; i <= numberOfDays; i++) {
                _loop_2(i);
            }
            $('#article-selector-day #article-back').on('click', function () {
                $('#article-selector-day').html('').css({ display: 'none' });
                $('#article-selector').children('.header').children('span:not(#subt-dropdown)').text('Select Article');
                $('#article-selector').children('.header').children('#subt').text(year);
            });
        });
        $('#subt-dropdown a').each(function () {
            $(this).on('click', function () {
                var chosenYear = $(this).text();
                if (chosenYear > (new Date()).getFullYear()) {
                    alert('Until time travel is possible, you cannot view future news articles.');
                }
                else {
                    year = chosenYear;
                    $('#subt-dropdown').toggleClass('down');
                    $('#article-selector').children('.header').children('#subt').text(year);
                }
            });
        });
    }
    /*
    Closing Function
    ------
    Will close all windows associated with the news tab
    */
    function linkNewsClose() {
        if (screenSizeIsNotTooSmall()) {
            $('#nav-news').css('color', 'white');
        }
        article.animate({ width: '0' }, 700);
        setTimeout(function () {
            articleSelector.animate({ width: '0' }, 500);
        }, 100);
        setTimeout(function () {
            news.css({ display: 'none', opacity: '0' });
        }, 700);
        setTimeout(function () {
            $('#subt-dropdown').removeClass('down');
        }, 700);
    }
    /*-------------------
    Music Link Click
    -------------------*/
    var music = $('#music');
    /*
    Function Summary
    ------
    
    The navBar music link will, upon clicking:
    1. perform the function mentioned above in the "Default Nav Bar Link Click Events" section
    2. close any windows that are currently open
    3. animate the two profiles becoming visible
    */
    function linkMusicOpen() {
        var size = '72vh';
        if (screenSizeIsTooSmall()) {
            size = '55vh';
            $('.music').css({ width: '70vw' });
            $('#music-content').css({ width: '165vw' });
        }
        //2
        closeStillOpen(linkMusicClose);
        //3
        music.css({ display: 'inline-block', opacity: '1' });
        DSIProfile.animate({ height: size }, 700);
        setTimeout(function () {
            tesuliProfile.animate({ height: size }, 700);
        }, 100);
    }
    /*
    Closing Function
    ------
    Will close all windows associated with the music tab
    */
    function linkMusicClose() {
        if (screenSizeIsNotTooSmall()) {
            $('#nav-music').css('color', 'white');
        }
        tesuliProfile.animate({ height: '0' }, 700);
        setTimeout(function () {
            DSIProfile.animate({ height: '0' }, 500);
        }, 200);
        setTimeout(function () {
            music.css('display', 'none');
        }, 680);
    }
    /*-------------------
    Contact Link Click
    -------------------*/
    var contact = $('#contact');
    var instagram = $('.contact.instagram');
    var email = $('.contact.email');
    var youtube = $('.contact.youtube');
    /*
    Function Summary
    ------
    The navBar music link will, upon clicking:
    1. perform the function mentioned above in the "Default Nav Bar Link Click Events" section
    2. the size of the contact windows are determined based on the size of the viewport
    3. close any windows that are currently open
    4. animate the 3 contact windows
    */
    function linkContactOpen() {
        //2
        size = '40vh';
        if (screenSizeIsTooSmall()) {
            size = '35vh';
        }
        //3
        closeStillOpen(linkContactClose);
        //4
        contact.css({ display: 'block', opacity: '1' });
        email.animate({ height: size, width: size }, 700);
        instagram.animate({ height: size, width: size }, 500);
        setTimeout(function () {
            youtube.animate({ height: size, width: size }, 500);
        }, 200);
    }
    /*
    Closing Function
    ------
    Will close all windows associated with the contact tab
    */
    function linkContactClose() {
        if (screenSizeIsNotTooSmall()) {
            $('#nav-contact').css('color', 'white');
        }
        var size = 0;
        setTimeout(function () {
            email.animate({ height: size, width: size }, 700);
        }, 100);
        setTimeout(function () {
            youtube.animate({ height: size, width: size }, 500);
        }, 300);
        setTimeout(function () {
            instagram.animate({ height: size, width: size }, 500);
        }, 100);
        setTimeout(function () {
            contact.css('display', 'none');
        }, 700);
    }
    /*-------------------
    Close All Possible Still-Open Windows
    
    the exception parameter describes which window not to close
    -------------------*/
    var closeStillOpenList = [linkScheduleClose, linkNewsClose, linkMusicClose, linkContactClose];
    function closeStillOpen(exception) {
        for (var i = 0; i < closeStillOpenList.length; i++) {
            if (closeStillOpenList[i] !== exception) {
                closeStillOpenList[i]();
            }
        }
    }
    /*=-=-=-=-=-=-=-=-=-=-=-=-=
    =-=-=-=-=-=-=-=-=-=-=-=-=-=
        
            TRACK BUTTON
        
    =-=-=-=-=-=-=-=-=-=-=-=-=-=
    -=-=-=-=-=-=-=-=-=-=-=-=-=-*/
    //TESULI LATEST TRACK
    $.ajax({
        type: 'GET',
        //url: window.location.href.substring(0, window.location.href.length - 11) + 'resources/data/music/tesuli-latest-track.txt',
        url:'https://tesuli.github.io/tesuli/resources/data/music/tesuli-latest-track.txt',
        dataType: 'text'
    }).done(function (data) {
        var dataArray = data.split('\n');
        $('.track.tesuli').attr('href', dataArray[2]).children().each(function () {
            $(this).text(dataArray[0]);
        });
    });
    //DSI LATEST TRACK
    $.ajax({
        type: 'GET',
        //url: window.location.href.substring(0, window.location.href.length - 11) + 'resources/data/music/dsi-latest-ep.txt',
        url:'https://tesuli.github.io/tesuli/resources/data/music/dsi-latest-ep.txt',
        dataType: 'text'
    }).done(function (data) {
        var dataArray = data.split('\n');
        $('.track.DSI.DSI-track').attr('href', dataArray[2]).children().each(function () {
            $(this).text(dataArray[0]);
        });
    });
    //DSI LATEST EP
    $.ajax({
        type: 'GET',
        //url: window.location.href.substring(0, window.location.href.length - 11) + 'resources/data/music/dsi-latest-track.txt',
        url:'https://tesuli.github.io/tesuli/resources/data/music/dsi-latest-track.txt',
        dataType: 'text'
    }).done(function (data) {
        var dataArray = data.split('\n');
        $('.track.DSI.DSI-EP').attr('href', dataArray[2]).children().each(function () {
            $(this).text(dataArray[0]);
        });
    });
});
/*=-=-=-=-=-=-=-=-=-=-=-=-=
=-=-=-=-=-=-=-=-=-=-=-=-=-=
    
        RADIO BUTTON
    
=-=-=-=-=-=-=-=-=-=-=-=-=-=
-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
var radioWindow = $('#radio-window');
var buttonRadio = $('#button-radio');
var navRadio = $('#nav-radio');
var radioWindowUp = false;
var usingNavRadio = false;
buttonRadio.on('click', function () {
    if (radioWindowUp == true) {
        radioWindowUp = false;
        radioWindow.animate({
            top: '100%'
        }, 800);
        setTimeout(function () {
            radioWindow.css({ display: 'none' });
        }, 800);
        $(this).children('span').text('Radio');
        setTimeout(function () {
            buttonRadio.css({ boxShadow: '0 0 0' }).animate({ width: '33vw', bottom: '0', left: '0' }, 300);
        }, 200);
        if (usingNavRadio === true) {
            setTimeout(function () {
                buttonRadio.animate({ bottom: '-10vh' });
            }, 201);
        }
    }
    else {
        radioWindowUp = true;
        usingNavRadio = false;
        radioWindow.css({ display: 'block' });
        radioWindow.animate({
            top: '0'
        }, 800);
        $(this).children('span').text('Back');
        setTimeout(function () {
            buttonRadio.css({ boxShadow: '0 1vh 8vh rgba(0,0,0,0.6)' }).animate({ width: '50vw', bottom: '3vw', left: '3vw' }, 300);
        }, 200);
    }
});
navRadio.on('click', function () {
    usingNavRadio = true;
    if (radioWindowUp == false) {
        radioWindowUp = true;
        radioWindow.css({ display: 'block' });
        radioWindow.animate({
            top: '0'
        }, 800);
        buttonRadio.children('span').text('Back');
        setTimeout(function () {
            buttonRadio.css({ boxShadow: '0 1vh 8vh rgba(0,0,0,0.6)', display: 'block' }).animate({ width: '50vw', bottom: '3vw', left: '3vw' }, 300);
        }, 200);
    }
});
