$(function() {

    $('#popupbutton').fancybox({
        'padding': 37,
        'overlayOpacity': 0.87,
        'overlayColor': '#fff',
        'transitionIn': 'none',
        'transitionOut': 'none',
        'titlePosition': 'inside',
        'centerOnScroll': true,
        'maxWidth': 400,
        'minHeight': 310

    });

    $('#phone').mask('+7 (000) 000-00-00');

    $("#form-feedback").submit(function(event) {

        if ($('#name').val() == "")
            {
                $('#bthrow_error_name').fadeIn(1000).html('Представьтесь, пожалуйста.');
            }
        else if ($('#phone').val() == "")
            {
                $('#bthrow_error_name').empty();
                $('#bthrow_error_phone').fadeIn(1000).html('Как с Вами связаться?');
            }
        else
            {
                var postForm = {
                    'name'  : $('#name').val(),
                    'phone'  : $('#phone').val()
                };

                $.ajax({
                    type        : 'POST',
                    url         : 'feedback.php',
                    data        : postForm,
                    dataType    : 'json',
                    success     : function(data)
                        {
                            if (!data.success)
                                {
                                    if (data.errors.name)
                                        {
                                            $('.throw_error').fadeIn(1000).html(data.errors.name);
                                        }
                                }
                            else
                                {
                                    $('#form-feedback').fadeIn(1000).html('<p>' + data.posted + '</p>');
                                }
                        }
                });
            }

        event.preventDefault();

    });

});
