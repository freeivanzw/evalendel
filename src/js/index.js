$(function () {
    jQuery.fn.dropdown = function (options) {

        var settings = $.extend({
            arrow: '',
            prevent: true,
            onChange: ''
        }, options);
    
        return this.each(function () {
            var $this = $(this);
    
            if ($this.find('.selected').length > 0) {
                $this.find('span:eq(0)')
                    .html($this.find('.selected').text() + settings.arrow)
                    .end()
                    .find('input').val($this.find('.selected a').data('value'))
                    .end()
                    .find('.selected').closest('li').hide();
            }
    
            $this.on('click', '.overflow', function (e) {
                e.preventDefault();
    
                if (!$(this).closest('.dropdown').hasClass('dropdown-open')) {
                    $.when($('.dropdown').each(function () {
                        $(this).removeClass('dropdown-open').find('ul:eq(0)').slideUp();
                    })).then(function () {
                        $this.addClass('dropdown-open').find('ul:eq(0)').slideDown(function () {
                            var h = parseInt($(this).outerHeight(true, true)),
                                top = parseInt($(this).offset()['top']) - parseInt($(document).scrollTop()),
                                wh = parseInt($(window).height());
    
                            if (top + h > wh) {
                                $(this).css({
                                    'max-height': wh - top - 10
                                });
                            } else {
                                $(this).css({
                                    'max-height': 'auto'
                                });
                            }
                        });
                    });
                } else {
                    $this.removeClass('dropdown-open').find('ul:eq(0)').slideUp();
                }
            });
    
            $this.find('ul').eq(0).on('click', 'a', function (e) {
                e.preventDefault();
    
                if (!$(this).hasClass('disabled')) {
                    if (settings.prevent === false) {
                        window.location.href = $(this).attr('href');
                    } else {
                        $(this).closest('ul').find('.selected').removeClass('selected').show().end().end().closest('li').addClass('selected').hide();
                        $this.find('span:eq(0)').html($(this).text() + settings.arrow).end().find('input').val($(this).data('value'));
    
                        $this.removeClass('dropdown-open').find('ul:eq(0)').slideUp();
                        if ($.isFunction(settings.onChange)) settings.onChange($(this));
                    }
                }
            });
        });
    };

    $('.open_lang').on('click', function() {
        $(this).parent('.toggle_lang').toggleClass('active');
    })

    $('.filters_list').children('.toggle_btn').on('click', function(e) {
        e.preventDefault();

        if ($('#' + $(this).attr('data-name')).hasClass('opened')){
            $('.filters_list').children('.toggle_btn').removeClass('active');
            $('#' + $(this).attr('data-name')).removeClass('opened')
        } else {
            $('.toggle_inner').removeClass('opened');
            $('.filters_list').children('.toggle_btn').removeClass('active');
            $(this).addClass('active');
            $('#' + $(this).attr('data-name')).addClass('opened');
        }
    })

    $dark = $('.shadow');
    // $dark.on('click', function() {
    //     $(this).addClass('hidden')
    // })

    $('.open_menu').on('click', function (e) {
        e.preventDefault();
        $('.site_header ').toggleClass('opened');
        let $toggleName = $('.open_menu').children('span').text();
        $('.open_menu').children('span').text($('.open_menu').attr('data-close'));
        $('.open_menu').attr('data-close', $toggleName);
        $dark.toggleClass('hidden')      

    })

    $dark.on('click', function() {
        $('.site_header ').toggleClass('opened');
        let $toggleName = $('.open_menu').children('span').text();
        $('.open_menu').children('span').text($('.open_menu').attr('data-close'));
        $('.open_menu').attr('data-close', $toggleName);
        $(this).addClass('hidden')
    })

    $('.open_info').on('click', function(e) {
        e.preventDefault();
        
        $(this).closest('.privacy_item').toggleClass('active')
    })

    $('.details_slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        mobileFirst: true,
          responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 1279,
                settings: "unslick"
            }
        ]
    });

    $('.main_banner').each(function(index, element) {
        if ($(element).find('picture').length > 1) {
            $(element).find('.big_slider').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: $(element).find('.mini_slider'),
            });
            $(element).find('.mini_slider').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                nextArrow: $(element).find('.arrow_right'),
                prevArrow: $(element).find('.arrow_left'),
                asNavFor: $(element).find('.big_slider'),
            })
        }
    })

    $('.blog_slider').each(function(index, element) {
        if ($(element).find('.text_blog').length > 1) {
            $(element).find('.text_blog-wrap').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                nextArrow: $(element).find('.arrow_right'),
                prevArrow: $(element).find('.arrow_left'),
                asNavFor: $(element).find('.photo_blog-wrap'),
            })
            $(element).find('.photo_blog-wrap').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: $(element).find('.text_blog-wrap')
            });
        }
    })

    $('.goods_slider').each(function(index, element) {
        $($(element).find('.goods_inner')).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            nextArrow: $(element).find('.arrow_right'),
            prevArrow: $(element).find('.arrow_left'),
            mobileFirst: true,
            responsive: [
                {
                  breakpoint: 767,
                  settings: {
                    slidesToShow: 2,
                  }
                },
                {
                  breakpoint: 1279,
                  settings: {
                    slidesToShow: 3,
                  }
                }
              ]
        })
        console.log($(element).find('.arrow_right'))
    })

    $('.big_slider img').addClass('slider_anim');

    $('.order_delivery').dropdown()

    // АНІМАЦІЯ

    gsap.registerPlugin(ScrollTrigger);

    $('.photo_anim').each(function(index, element) {
        gsap.to(element, {
            scale: 1,
            scrollTrigger: {
                trigger: element,
                start: 'top 100%',
                end: 'center 50%',
                scrub: true,
            },
        })
    });

    $('.show_top').each(function(index, element) {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 50%',
                onEnter: () => $(element).addClass('anim_finish'),
            },
        })
    });

    $('.blog_slider').each(function(index, element) {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 50%',
                onEnter: () => $(element).addClass('blog_slider-anim'),
            },
        })
    });

    $('.three_photo').each(function(index, element) {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                onEnter: () => $(element).addClass('three_photo-anim'),
            },
        })
    });

    // $('.element').each(function(index, element) {
    //     gsap.to(element, {
    //         // x: 200,
    //         // duration: 1,
    //         scrollTrigger: {
    //             toggleActions: "restart none none none",
    //             trigger: element,
    //             start: 'top 100%',
    //             end: 'bottom 80%',
    //             scrub: true,
    //             toggleClass: 'show',
    //             onEnter: () => $(element).addClass('tester'),
    //             markers: false,
    //         },
    //     })
    // });

    $('.link_item').on('mouseover', function () {
        let $this = $(this);
        if (!$(this).hasClass('anim_item')) {
            $(this).addClass('anim_item')
            setTimeout(function() {
                $this.removeClass('anim_item')
            },1000)
        }
    });

})
