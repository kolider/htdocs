    $('#carousel').slick({
        centerMode: true,
        centerPadding: '104px',
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows:true,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '80px',
                    autoplay: true,
                    autoplaySpeed: 3000,
                    arrows:true
                }}
        ]
    });


    $(document).ready(function(){
        $(window).scroll(function () {
            if ($(this).scrollTop() > 50) {
                $('#back-to-top').fadeIn();
            } else {
                $('#back-to-top').fadeOut();
            }
        });
        // scroll body to 0px on click
        $('#back-to-top').click(function () {
            $('#back-to-top').tooltip('hide');
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });

        $('#back-to-top').tooltip('show');

    });