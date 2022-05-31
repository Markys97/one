// Переворот экрана
if ($(window).width()<1000) {
    window.addEventListener("orientationchange", function() {
        if (window.matchMedia("(orientation: landscape)").matches) {
           location.reload();
        }
    }, false);
}
$(document).ready(function(){
    setTimeout(
      function() 
      {
        $('input[name="HIDDEN_TEXT"]').val('upfly');
      }, 3000);
      // Сбор параметров секций
    var contentParams = [], sectionParams = [];
    $('.section').each(function(index, el) {
        $(el).attr('data-lenght', ++index);
        // Параметры секции
        sectionParams.push($(el).data('params').split(';'));
        // Параметры контента на фоне
        contentParams.push($(el).data('text')).par;
    });
      // Открытие модальных блоков
      if(window.location.hash.includes('#')){
        var click = window.location.hash;
        $(click).addClass('active');
        // $.fn.fullpage.setAllowScrolling(false);

      }
    $('.modal_block_click').click(function(event) {
        event.preventDefault();
        var click = $(this);
        if ($('.modal_block').hasClass('active')) {
            $('.left_slide.active').children('.wrapper_modal').animate({'margin-left':'-100%'}, 500, function() {
                $(this).parent().css('background', 'rgba(0,0,0,0)');
                var active = $(this);
                setTimeout(function fadeOut_block() {
                    $(active).attr('style', '');
                    $(active).parents('.modal_block').attr('style', '').removeClass('active');
                    $.fn.fullpage.setAllowScrolling(true);
                }, 500);
            });
             $('.right_slide.active').children('.wrapper_modal').animate({'margin-right':'-100%'}, 500, function() {
                $(this).parent().css('background', 'rgba(0,0,0,0)');
                var active = $(this);
                setTimeout(function fadeOut_block() {
                    $(active).attr('style', '');
                    $(active).parents('.modal_block').attr('style', '').removeClass('active');
                    $.fn.fullpage.setAllowScrolling(true);
                }, 500);
            });
        }
        $($(click).attr('href')).addClass('active');
        $.fn.fullpage.setAllowScrolling(false);
    });
    // Закрытие модальных блоков
    $('.modal_block .close').click(function(event) {
        event.preventDefault();
       $(this).parents('.left_slide.active').children('.wrapper_modal').animate({'margin-left':'-100%'}, 500, function() {
            $(this).parent().css('background', 'rgba(0,0,0,0)');
            var active = $(this);
            setTimeout(function fadeOut_block() {
                $(active).attr('style', '');
                $(active).parents('.modal_block').attr('style', '').removeClass('active');
                $.fn.fullpage.setAllowScrolling(true);
            }, 500);
        });
         $(this).parents('.right_slide.active').children('.wrapper_modal').animate({'margin-right':'-100%'}, 500, function() {
            $(this).parent().css('background', 'rgba(0,0,0,0)');
            var active = $(this);
            setTimeout(function fadeOut_block() {
                $(active).attr('style', '');
                $(active).parents('.modal_block').attr('style', '').removeClass('active');
                $.fn.fullpage.setAllowScrolling(true);
            }, 500);
        });
    });
    $(document).mouseup(function (e){
        if (!$(".modal_block.active .wrapper_modal").is(e.target) && $(".modal_block.active .wrapper_modal").has(e.target).length === 0) {
            $('.left_slide.active .wrapper_modal').animate({'margin-left':'-100%'}, 500, function() {
                $(this).parent().css('background', 'rgba(0,0,0,0)');
                var active = $(this);
                setTimeout(function fadeOut_block() {
                    $(active).attr('style', '');
                    $(active).parents('.modal_block').attr('style', '').removeClass('active');
                    $.fn.fullpage.setAllowScrolling(true);
                }, 500);
            });
            $('.right_slide.active .wrapper_modal').animate({'margin-right':'-100%'}, 500, function() {
                $(this).parent().css('background', 'rgba(0,0,0,0)');
                var active = $(this);
                setTimeout(function fadeOut_block() {
                    $(active).attr('style', '');
                    $(active).parents('.modal_block').attr('style', '').removeClass('active');
                    $.fn.fullpage.setAllowScrolling(true);
                }, 500);
            });
        }
    });
    // фокус input
    $('.input').focusin(function(event) {
        $(this).prev().addClass('focus');
    });
    $('.input').focusout(function(event) {
        $(this).prev().removeClass('focus');
    });
    // Изменение textarea
    $(document).on('input', '.right_slide textarea', function(event) {
        $('.scroll_block').animate({
            scrollTop: $(".scroll_block .text").offset().top
        }, 0);
        var min_line_height = 40;
        if ($(window).width()) {
            min_line_height = 26;    
        }
        $('#comment_div').html($(this).val());
        var obj_height = $('#comment_div')[0].offsetHeight+12;
        if ($(window).width()) {
            obj_height = $('#comment_div')[0].offsetHeight+6; 
        }
        if (event.keyCode == 13) obj_height += min_line_height;
        else if (obj_height < min_line_height) obj_height = min_line_height;
        $(this).css('height', obj_height + 'px');
    });
    // Процесс перелистывания секций
    var sectionSettings = {
        // Скроллинг
        scrollingSpeed: 800,
        fitToSectionDelay: 500,
        touchSensitivity: 15,
        //Дизайн
        paddingTop:'100px',
        scrollHorizontally: true,
        normalScrollElements: '.modal_block',
        paddingBottom:'100px',
        controlArrows: false,
        verticalCentered: true,
        responsiveWidth: 0,
        onLeave: function(origin, destination, direction){
            // Затухание
            $('.section[data-lenght="'+destination+'"]').animate({opacity:1}, 800);
            $('.section[data-lenght="'+origin+'"]').animate({opacity:0}, 300);
            // Изменение фона кнопки
            $('.right_slide form .btn').css({
                background: sectionParams[destination-1][0],
                transition: "all 1s ease-out",
            });
            // Изменение цвета фона
            $('.background').css({
                "box-shadow": "inset "+sectionParams[destination-1][2]+" "+sectionParams[destination-1][3]+" 300px "+sectionParams[destination-1][4]+""+sectionParams[destination-1][1],
                background: sectionParams[destination-1][0],
                transition: "all 1s ease-out",
            });
            $('.background .active').fadeOut('500', function() {
                $('.background div').toggleClass('active');
            });
            $('.background div:not(.active)').html(contentParams[destination-1]).fadeIn('500');
        },
    }
    if ($(window).width() < 1200) {
        sectionSettings = {
            // Скроллинг
            scrollingSpeed: 800,
            fitToSectionDelay: 500,
            touchSensitivity: 15,
            //Дизайн
            paddingTop:'90px',
            scrollHorizontally: true,
            normalScrollElements: '.modal_block',
            paddingBottom:'80px',
            controlArrows: false,
            verticalCentered: true,
            responsiveWidth: 0,
            onLeave: function(origin, destination, direction){
                // Затухание
                $('#section_'+destination).animate({opacity:1}, 800);
                $('#section_'+origin).animate({opacity:0}, 300);
                // Изменение фона кнопки
                $('.right_slide form .btn').css({
                    background: sectionParams[destination-1][0],
                    transition: "all 1s ease-out",
                });
                // Изменение цвета фона
                $('.background').css({
                    "box-shadow": "inset "+sectionParams[destination-1][2]+" "+sectionParams[destination-1][3]+" 300px "+sectionParams[destination-1][4]+""+sectionParams[destination-1][1],
                    background: sectionParams[destination-1][0],
                    transition: "all 1s ease-out",
                });
                $('.background .active').fadeOut('500', function() {
                    $('.background div').toggleClass('active');
                });
                $('.background div:not(.active)').html(contentParams[destination-1]).fadeIn('500');
            },
        }
    }
    if ($(window).width() < 993) {
        sectionSettings = {
            // Скроллинг
            scrollingSpeed: 800,
            fitToSectionDelay: 500,
            touchSensitivity: 15,
            //Дизайн
            paddingTop:'90px',
            scrollHorizontally: true,
            normalScrollElements: '.modal_block',
            paddingBottom:'80px',
            controlArrows: false,
            verticalCentered: true,
            responsiveWidth: 0,
            onLeave: function(origin, destination, direction){
                // Затухание
                $('.section[data-lenght="'+destination+'"]').animate({opacity:1}, 800);
                $('.section[data-lenght="'+origin+'"]').animate({opacity:0}, 300);
                // Изменение фона кнопки
                $('.right_slide form .btn').css({
                    background: sectionParams[destination-1][0],
                    transition: "all 1s ease-out",
                });
                // Изменение цвета фона
                $('.background').css({
                    "box-shadow": "inset "+sectionParams[destination-1][2]+" "+sectionParams[destination-1][3]+" 300px "+sectionParams[destination-1][4]+""+sectionParams[destination-1][1],
                    background: sectionParams[destination-1][0],
                    transition: "all 1s ease-out",
                });
                $('.background .active').fadeOut('500', function() {
                    $('.background div').toggleClass('active');
                });
                $('.background div:not(.active)').html(contentParams[destination-1]).fadeIn('500');
            },
        }
    }
    if ($(window).width() < 551) {
        sectionSettings = {
            // Скроллинг
            scrollingSpeed: 800,
            fitToSectionDelay: 500,
            touchSensitivity: 15,
            fitToSection:false,
            autoScrolling:false,
            //Дизайн
            paddingTop:'0px',
            scrollHorizontally: true,
            normalScrollElements: '.modal_block',
            paddingBottom:'0px',
            controlArrows: false,
            bigSectionsDestination:'top',
            verticalCentered: false,
            scrollOverflow:false,
            responsiveWidth: 0,
            onLeave: function(origin, destination, direction){
                // Затухание
                $('.section').addClass('fp-auto-height');
                $('#section_7').removeClass('fp-auto-height');
                // Изменение фона кнопки
                $('.right_slide form .btn').css({
                    background: sectionParams[destination-1][0],
                    transition: "all 1s ease-out",
                });
                // Изменение самолетика
                 $('footer .send i').css({
                    color: sectionParams[destination-1][0],
                    transition: "all 1s ease-out",
                });
                // Скрытие шапки
                if (origin < destination) {
                    $('header').animate({top:'-500px'}, 800);
                    $('.container-fluid').animate({'padding-top':'95px'}, 0);
                }else{
                    $('header').animate({top:'0'}, 0);
                    $('.container-fluid').animate({'padding-top':'95px'}, 0);
                }
                // Изменение цвета фона
                $('.background').css({
                    "box-shadow": "inset "+sectionParams[destination-1][2]+" "+sectionParams[destination-1][3]+" 300px "+sectionParams[destination-1][4]+""+sectionParams[destination-1][1],
                    background: sectionParams[destination-1][0],
                    transition: "all 1s ease-out",
                });
                $('header').css({
                    background: sectionParams[destination-1][1],
                    transition: "all 1s ease-out",
                });
                $('.background .active').fadeOut('500', function() {
                    $('.background div').toggleClass('active');
                });
                $('.background div:not(.active)').html(contentParams[destination-1]).fadeIn('500');
            },
        }
    }
    $('#sections').fullpage(sectionSettings);
});