$(document).ready(function () {
    // Get links of active image
    var firstImgDemoLink = $('#item-1').data('demo');
    var firstImgBuyLink = $('#item-1').data('buy');

    // Insert links of active image to buttons on page load
    $('.demo-link').attr('href', firstImgDemoLink);
    $('.buy-link').attr('href', firstImgBuyLink);

    var carousel = $('#carousel').waterwheelCarousel({
        flankingItems: 3,
        movedToCenter: function ($item) {
            // Using plugin method with a callback
            // to get clicked image links
            // and insert them to buttons
            $('.demo-link').attr('href', $item.data('demo'));
            $('.buy-link').attr('href', $item.data('buy'));
        }
    });

    $(".modalbox").fancybox({'closeBtn': false});

    $("#commentForm").submit(function (event) {
        event.preventDefault();

        $(".submit").replaceWith("<div class='form_dscr'><img class='loader' src='image/loader_love.gif' alt='Загрузка' width='40' height='40'></div>");
        var form = document.forms.commentForm;

        var formData = new FormData(form);
        var file = document.getElementById('file').files[0];
        var xhr = new XMLHttpRequest();
        formData.append("doc", file);
        formData.append("tel", document.getElementById("tel").value);
        formData.append("design", document.getElementById("design").value);
        formData.append("name", document.getElementById("name").value);
        formData.append("email", document.getElementById("email").value);
        formData.append("message", document.getElementById("message").value);
        formData.append("pay", document.getElementById("pay").value);

        xhr.open("POST", "sendMail/order.php", true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                //alert("Status:4");
                if (xhr.status == 200) {
                    //alert("status:200");
                    var dataJSON = xhr.responseText;
                    var data = JSON.parse(dataJSON);
                    if (data["error"] === undefined) {

                        $("#order").fadeOut("fast", function () {
                            $(this).before("<span style='text-align: center;'><h4><strong>" + data["success"] + "</strong></h4></span>");
                            setTimeout(function () {
                                $.fancybox.close();
                                document.getElementById('file').value = '';
                                document.getElementById("tel").value = null;
                                document.getElementById("design").value = "не указано";
                                document.getElementById("name").value = null;
                                document.getElementById("email").value = null;
                                document.getElementById("message").value = null;
                                document.getElementById("pay").value = "не указано";
                                $("#commentForm").replaceWith("<br><div style='text-align: center;'><h4><strong>Вы уже отправили запрос</strong></h4></div>");
                            }, 5000);
                        });


                    } else {

                        $("#order").fadeOut("fast", function () {
                            $(this).before("<span style='text-align: center;'><h5>Ошибка<br><br>" + data["error"] + "</h5></span>");
                            setTimeout(function () {
                                $.fancybox.close();
                                window.location.reload(false);
                            }, 10000);
                        });
                    }
                }
            }
        };
        xhr.send(formData);

        /*$("#order").fadeOut("fast", function(){
         //    $(this).before("<p><strong>Ваше сообщение отправлено!</strong></p>");
         //    setTimeout("$.fancybox.close()", 1300);
         });	*/
    });


    $("#feedbackForm").submit(function (event) { //return false; });
        event.preventDefault();
        $("#feedbackSubmit").replaceWith("<div id='beforeButton'><img class='loader' src='image/loader_love.gif' alt='Отправка' width='40' height='40'></div>");
        //$(".feedbackSubmit").on("click", function(){
        var form = document.forms.feedbackForm;
        var formData = new FormData(form);
        var xhr = new XMLHttpRequest();
        formData.append("feedbackName", document.querySelector("input[name=feedbackName]").value);
        formData.append("feedbackContact", document.querySelector("input[name=feedbackContact]").value);
        formData.append("feedbackMessage", document.querySelector("textarea[name=feedbackMessage]").value);
        xhr.open("POST", "sendMail/feedback.php", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    $.fancybox.close();
                    if (xhr.responseText == "true") {
                        $.fancybox.open([{src: '#feedbackMessage'}], {
                            width: '40%',
                            height: '10%',
                            closeBtn: false,
                            autoSize: false
                        });
                        setTimeout("$.fancybox.close()", 3000);
                        document.querySelector("input[name=feedbackName]").value = null;
                        document.querySelector("input[name=feedbackContact]").value = null;
                        document.querySelector("textarea[name=feedbackMessage]").value = null;
                    } else {
                        $.fancybox.open([{src: '#feedbackError'}], {
                            width: '40%',
                            height: '10%',
                            closeBtn: false,
                            autoSize: false
                        });
                        setTimeout("$.fancybox.close()", 3000);
                    }
                    $("#beforeButton").replaceWith("<input type='submit' id='feedbackSubmit' class='button-2 btn-primary-1 btn-width' value='отправить'>");
                }
            }

        };
        xhr.send(formData);
    });

});
function avalible(value) {
    if (value.value == "") {
        document.getElementById("status").innerHTML = "Введите адрес";
        value.style.cssText = 'text-align: right;';
        document.getElementById("status").style.cssText = '';
    } else {
        setTimeout(function () {
            var xhr = new XMLHttpRequest();
            var params = "domain=" + encodeURIComponent(value.value);
            xhr.open("GET", '/avalible.php?' + params, true);

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        var data = xhr.responseText;
                        if (data == "true") {
                            document.getElementById("status").innerHTML = "Адрес свободный";
                            value.style.cssText = 'text-align: right; color: green;';
                            document.getElementById("status").style.cssText = 'color: green;';
                        }
                        if (data == "false") {
                            document.getElementById("status").innerHTML = "Адрес занят";
                            value.style.cssText = 'text-align: right; color: red;';
                            document.getElementById("status").style.cssText = 'color: red;';
                        }
                    }
                }
            };

            xhr.send();
        }, 200);
    }
}