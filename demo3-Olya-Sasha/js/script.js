$(function() {

/*$('#popupbutton').fancybox({
    helpers: {
        overlay: {
            locked: false
        }
    }
});*/

    $('#popupbutton').fancybox({
        'padding': 37,
        'overlayOpacity': 0.87,
        'overlayColor': '#fff',
        'transitionIn': 'none',
        'transitionOut': 'none',
        'titlePosition': 'inside',
        'centerOnScroll': true,
        'maxWidth': 310,
        'minHeight': 310
});

    $("#form-feedback").submit(function(event) {

        if (($('#name').val() == "") || ($('#lastName').val() == ""))
            {
                $('#bthrow_error_input').fadeIn(1000).html('Представьтесь, пожалуйста.');
            }
        else
            {
                var postForm = {
                    'name'  : $('#name').val(),
                    'lastName'  : $('#lastName').val()
                };

                $.ajax({
                    type        : 'POST',
                    url         : 'sendMail/sendMail.php',
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
