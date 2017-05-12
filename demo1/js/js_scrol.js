 $('.sl').slick(  {
	 autoplay: true,
	 autoplaySpeed: 4000,
	 slidesToShow: 1,
	 slidesToScroll: 1,
	 arrows:false,
	 fade: true,
	 asNavFor: '.sl2'
 });
$('.sl2').slick(  {
	slidesToShow: 5,
	slidesToScroll: 1,
	arrows: true,
    asNavFor: '.sl',
	focusOnSelect: true,
	centerMode: true,
	responsive: [
    {
      breakpoint: 1200,
      settings: {
	  slidesToShow: 4,
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
	 {
	  breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
		centerMode: true,
		centerPadding:'30px'
		
      }
    },
	{
	  breakpoint: 580,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
		centerMode: true,
		centerPadding:'30px'
      }
    },
	{
	  breakpoint: 494,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
		centerMode: true,
		centerPadding:'18px',
		arrows:false
      }
    },
	{
	  breakpoint: 320,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
		centerMode: true,
		centerPadding:'1px',
		arrows:false
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
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
// JavaScript Document