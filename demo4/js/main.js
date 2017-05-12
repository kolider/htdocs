$(document).ready(function(){
    $('.sl').slick(  {
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.sl2'
    });
    $('.sl2').slick(  {
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: '.sl',
        focusOnSelect: true,
        centerMode: true,
        centerPadding:'30',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerMode: true
                }
            },
            {
                breakpoint: 1070,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    arrows:false

                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },

            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
    $('.parallax-window').parallax({
        naturalWidth: 600,
        naturalHeight: 400
    });
});
