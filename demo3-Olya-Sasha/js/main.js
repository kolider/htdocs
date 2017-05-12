$(document).ready(function(){
    $("#carousel").slick({
        centerMode: true,
        centerPadding: '200px',
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows:false,
        focusOnSelect:true,
        responsive: [
            {
                breakpoint: 1800,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '180px',
                    autoplay: true,
                    autoplaySpeed: 3000,
                    arrows:false
                }},
            {
                breakpoint: 481,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '10px',
                    autoplay: true,
                    autoplaySpeed: 3000,
                    arrows:false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '40px',
                    autoplay: true,
                    autoplaySpeed: 3000,
                    arrows: false
                }
            }
        ]
    });
    $('#carousel-child').slick({
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 10000,
        arrows:false
    });
    $(".fancybox").fancybox({
        openEffect	: 'none',
        closeEffect	: 'none'
    });
});