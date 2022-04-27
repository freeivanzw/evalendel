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

    $('.toggle_btn').on('click', function(e) {
        e.preventDefault();
        if ($(this).parent('.toggle_wrap').hasClass('active')) {
            $(this).parent('.toggle_wrap').removeClass('active')
        } else {
            $('.toggle_wrap').removeClass('active');
            $(this).parent('.toggle_wrap').addClass('active')
        }
    })

    $('.open_lang').on('click', function() {
        $(this).parent('.toggle_lang').toggleClass('active');
    })

    $('.big_slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.mini_slider'
    });

    $('.mini_slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        asNavFor: '.big_slider',
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

    $('.link_item').hover(function () {
        let $this = $(this);
        $(this).addClass('anim_item')
        setTimeout(function() {
            $this.removeClass('anim_item')
        },1000)
    });

})
