function modPrice(Price, sum) {
    var price = document.getElementById(Price);
    var address = document.getElementById("forPrice");
    var insum = parseInt(address.innerHTML, 10);
    if (price.checked){
        insum += sum;
        insum=insum+" грн";
    }
    else {
        insum -= sum;
        insum= insum+" грн";
    }
    address.innerHTML = insum;
}

function view() {
    var element = document.getElementById("output");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    var arr = document.getElementsByName("send[]");
    arr.forEach(function (p1, p2, p3) {
        if (p1.checked){
            var child = document.createElement("li"), text = document.createTextNode(p1.value);
            child.appendChild(text);
            element.appendChild(child);
        }
    });
    var insum = parseInt(document.getElementById("forPrice").innerHTML, 10);
    var child = document.createElement("strong"), text = document.createTextNode("Сумма: " + insum + " грн");
    child.appendChild(text);
    document.getElementById("output").appendChild(child);
}

function checkSubmit(check) {
    if (check.checked){
        document.getElementById("orderSubmit").disabled = false;

    }else {
        document.getElementById("orderSubmit").disabled = true;
    }
}

$(document).ready(function () {
    $(".modalbox").fancybox({closeBtn : false});
});

$("#orderForm").submit(function(event) {
    event.preventDefault();
    $("#orderSubmit").replaceWith("<div id='beforeButton'><img class='loader' src='/image/loader_love.gif' alt='Отправка' width='40' height='40'></div>");
    var formData = new FormData();
    var xhr = new XMLHttpRequest();

    var arr = document.getElementsByName("send[]");
    formData.append('send[]', document.getElementsByName("tpl")[0].value);
    formData.append('send[]', document.getElementsByName("FirstName")[0].value);
    formData.append('send[]', document.getElementsByName("LastName")[0].value);
    formData.append('send[]', document.getElementsByName("email")[0].value);
    arr.forEach(function (p1, p2, p3) {
        if (p1.checked){
            formData.append('send[]', p1.value);
        }
    });
    formData.append('send[]', "Сумма: " + document.getElementById("forPrice").innerHTML);
    xhr.open("POST", "/sendMail/orderDemo.php", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if(xhr.status == 200) {
                $.fancybox.close();
                if (xhr.responseText == "true"){
                    $.fancybox.open([{src : '#orderFormMessage'}],{
                        width:'40%',
                        height:'10%',
                        closeBtn : false,
                        autoSize : false
                    });
                    setTimeout("$.fancybox.close()", 3000);
                    $("#orderForm").replaceWith("<br><div style='text-align: center;'><h4><strong>Вы уже отправили запрос</strong></h4></div>");
                }else{
                    $.fancybox.open([{src : '#orderFormError'}],{
                        width:'40%',
                        height:'10%',
                        closeBtn : false,
                        autoSize : false
                    });
                    setTimeout(function(){
                        $.fancybox.close();
                        window.location.reload(false);
                    }, 10000);
                }
            }
        }

    };
    xhr.send(formData);
});

$("#feedbackForm").submit(function(event) { //return false; });
    event.preventDefault();
    $("#feedbackSubmit").replaceWith("<div id='beforeButton'><img class='loader' src='/image/loader_love.gif' alt='Отправка' width='40' height='40'></div>");
    //$(".feedbackSubmit").on("click", function(){
    var form = document.forms.feedbackForm;
    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();
    formData.append("feedbackName", document.querySelector("input[name=feedbackName]").value);
    formData.append("feedbackContact", document.querySelector("input[name=feedbackContact]").value);
    formData.append("feedbackMessage", document.querySelector("textarea[name=feedbackMessage]").value);
    xhr.open("POST", "/sendMail/feedback.php", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if(xhr.status == 200) {
                $.fancybox.close();
                if (xhr.responseText == "true"){
                    $.fancybox.open([{src : '#feedbackMessage'}],{
                        width:'40%',
                        height:'10%',
                        closeBtn : false,
                        autoSize : false
                    });
                    setTimeout("$.fancybox.close()", 3000);
                    document.querySelector("input[name=feedbackName]").value = null;
                    document.querySelector("input[name=feedbackContact]").value = null;
                    document.querySelector("textarea[name=feedbackMessage]").value = null;
                }else{
                    $.fancybox.open([{src : '#feedbackError'}],{
                        width:'40%',
                        height:'10%',
                        closeBtn : false,
                        autoSize : false
                    });
                    setTimeout(function(){
                        $.fancybox.close();
                        window.location.reload(false);
                    }, 10000);
                }
                $("#beforeButton").replaceWith("<input type='submit' id='feedbackSubmit' class='button-2 btn-primary-1 btn-width' value='отправить'>");
            }
        }

    };
    xhr.send(formData);
});