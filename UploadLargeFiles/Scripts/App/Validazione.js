$(document).on("submit", "form", function (e) {
    var $form = $(this);

    if ($("#bypassvalidazione").val() != undefined) {
        if ($("#bypassvalidazione").val() == 'True')
            return;
    }
    /*for (var i in CKEDITOR.instances){
        CKEDITOR.instances[i].updateElement();
    }*/

    var error = 0;

    $form.find(".obbl").each(function () {

        var type = $(this).prop("type");

        if (type == "select-one") {
            if (!this.value) {
                var $el = $(this);
                if ($el.hasClass("select2")) {
                    $el.next().css('border', '3px solid red');
                }

                $el.addClass("has-error");

                $el.bind("keyup change", function () {
                    if ($el.hasClass("select2")) {
                        $el.next().css('border', '');
                    }

                    $el.removeClass("has-error");
                });
            }
        }
        else if (type == "checkbox") {
            if ($(this).prop('checked') == false) {
                var $el = $(this);
                $el.addClass("bg-warning");
                $el.parents("label").css("font-weight", "bolder");
                $el.bind("keyup change", function () {
                    $el.removeClass("bg-warning");
                    $el.parents("label").css("font-weight", "400");
                });
            }
        }
        else if (type == "textarea" || type == "text" || type == "number" || type == "date" || type == "password") {
            if ($(this).val() == "") {
                var $el = $(this);
                $el.addClass("has-error");
                $el.bind("keyup change", function () {
                    $el.removeClass("has-error");
                });
            }
            else if (type == "text" && $(this).hasClass("email")) {
                if (isValidEmailAddress($(this).val()) == false) {
                    var $el = $(this);
                    $el.addClass("has-error");
                    $el.after("<p class='text-danger invalidEmail'>L'indirizzo email non è in formato corretto</p>");
                    $el.bind("keyup change", function () {
                        $el.removeClass("has-error");
                        $(".invalidEmail").remove();
                    });
                }
            }
        }
    });

    var error = $form.find(".form-group.has-error").length;
    //09082017 Aggiunto questo pezzo perchè altrimenti non funzionava se il form era fatto da tabelle quindi senza form-group
    if (error == 0)
        error = $form.find(".has-error").length;

    if (error > 0) {
        e.preventDefault();
        if (swal != undefined) {
            swal({
                title: "Errore!",
                text: 'Controlla gli errori prima di procedere',
                type: "error",
                timer: 2000,
                showConfirmButton: false
            });
        }
        else if ($.jAlert != undefined) {
            $.jAlert({
                'title': 'Attenzione!',
                'content': 'Controlla gli errori prima di procedere',
                'theme': 'red',
                'btns': { 'text': 'Chiudi' }
            });
        }
        else {
            alert('Controlla gli errori prima di procedere');
        }
    }
});

//Versione che applica lo stile direttamente all'input
function controlloValidazioneSuInput(contenitore) {

    var $form = contenitore;

    var error = 0;

    $form.find(".obbl").each(function () {

        var type = $(this).prop("type");

        if (type == "select-one") {
            if (!this.value) {
                var $el = $(this);
                if ($el.hasClass("select2")) {
                    $el.next().css('border', '3px solid red');
                }

                $el.addClass("has-error");

                $el.bind("keyup change", function () {
                    if ($el.hasClass("select2")) {
                        $el.next().css('border', '')
                    }

                    $el.removeClass("has-error");
                });
            }
        }
        else if (type == "checkbox") {
            if ($(this).prop('checked') == false) {
                var $el = $(this);
                $el.addClass("has-error");
                $el.bind("keyup change", function () {
                    $el.removeClass("has-error");
                });
            }
        }
        else if (type == "text" || type == "number" || type == "date" || type == "password" || type == "textarea") {
            if ($(this).val() == "") {
                var $el = $(this);
                $el.addClass("has-error");
                $el.bind("keyup change", function () {
                    $el.removeClass("has-error");
                });
            }
            else if (type == "text" && $(this).hasClass("email")) {
                if (isValidEmailAddress($(this).val()) == false) {
                    var $el = $(this);
                    $el.addClass("has-error");
                    $el.after("<p class='text-danger invalidEmail'>L'indirizzo email non è in formato corretto</p>");
                    $el.bind("keyup change", function () {
                        $el.removeClass("has-error");
                        $(".invalidEmail").remove();
                    });
                }
            }
        }
    });

    error = $form.find(".has-error").length;

    if (error > 0) {
        if (swal != undefined) {
            swal({
                title: "Errore!",
                text: 'Controlla gli errori prima di procedere',
                type: "error",
                timer: 2000,
                showConfirmButton: false
            });
        }
        else if ($.jAlert != undefined) {
            $.jAlert({
                'title': 'Attenzione!',
                'content': 'Controlla gli errori prima di procedere',
                'theme': 'red',
                'btns': { 'text': 'Chiudi' }
            });
        }
        else {
            alert('Controlla gli errori prima di procedere');
        }
        return true;
    }

    return false;
};

function controlloValidazione(contenitore, forminline) {

    var $form = contenitore;

    var error = 0;
    var formtype = ".form-group";
    if (forminline == true)
        formtype = ".form-inline";

    $form.find(".obbl").each(function () {

        var type = $(this).prop("type");

        if (type == "select-one") {
            if (!this.value) {
                var $el = $(this);
                $el.parents(formtype).addClass("has-error");
                $el.bind("keyup change", function () {
                    $el.parents(formtype).removeClass("has-error");
                });
            }
        }
        else if (type == "checkbox") {
            if ($(this).prop('checked') == false) {
                var $el = $(this);
                $el.parents(formtype).addClass("has-error");
                $el.bind("keyup change", function () {
                    $el.parents(formtype).removeClass("has-error");
                });
            }
        }
        else if (type == "text" || type == "number" || type == "date" || type == "password") {
            if ($(this).val() == "") {
                var $el = $(this);
                $el.parents(formtype).addClass("has-error");
                $el.bind("keyup change", function () {
                    $el.parents(formtype).removeClass("has-error");
                });
            }
            else if (type == "text" && $(this).hasClass("email")) {
                if (isValidEmailAddress($(this).val()) == false) {
                    var $el = $(this);
                    $el.parents(formtype).addClass("has-error");
                    $el.after("<p class='text-danger invalidEmail'>L'indirizzo email non è in formato corretto</p>");
                    $el.bind("keyup change", function () {
                        $el.parents(formtype).removeClass("has-error");
                        $(".invalidEmail").remove();
                    });
                }
            }
        }
    });

    var error = $form.find(formtype + ".has-error").length;
    //09082017 Aggiunto questo pezzo perchè altrimenti non funzionava se il form era fatto da tabelle quindi senza form-group
    if (error == 0)
        error = $form.find(".has-error").length;

    if (error > 0) {
        if (swal != undefined) {
            swal({
                title: "Errore!",
                text: 'Controlla gli errori prima di procedere',
                type: "error",
                timer: 2000,
                showConfirmButton: false
            });
        }
        else if ($.jAlert != undefined) {
            $.jAlert({
                'title': 'Attenzione!',
                'content': 'Controlla gli errori prima di procedere',
                'theme': 'red',
                'btns': { 'text': 'Chiudi' }
            });
        }
        else {
            alert('Controlla gli errori prima di procedere');
        }
        return true;
    }

    return false;
};

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i);
    return pattern.test(emailAddress);
}


function validateNumber(element) {
    if ($(element).val() != '') {
        var numero = $(element).val().replace(/,/g, '.');
        if ($.isNumeric(numero) == false) {
            var $el = $(element);
            if ($el.parents('.form-group').hasClass("has-error") == true)
                return;
            $el.parents('.form-group').addClass("has-error");
            $el.parents('.form-group').children().first().next().append("<label class='control-label'>Il valore inserito non è un numero. La virgola è il solo carattere ammesso oltre ai numeri</label>");
            $el.bind("keyup change", function () {
                $el.parents('.form-group').removeClass("has-error");
                $el.parents('.form-group').children().first().next().children().first().next().remove();
            });
        }
    }
}



function rimpiazzaDotComma(e) {
    if (navigator.language == "it-IT" && e.keyCode == 46) //  . da tastierino numerico
    {
        e.preventDefault();
        var val = $("#" + e.srcElement.id).val();
        $("#" + e.srcElement.id).val(val + ',');
    }
}

function validateNumberAndFormat(element) {
    if ($(element).val() != '') {
        var numero = replaceAll($(element).val(), ".", "");
        numero = numero.replace(/,/g, '.');
        if ($.isNumeric(numero) == false) {
            var $el = $(element);
            if ($el.parents('.form-group').hasClass("has-error") == true)
                return;
            $el.parents('.form-group').addClass("has-error");
            $el.parents('.form-group').children().first().next().append("<label class='control-label'>Il valore inserito non è un numero. La virgola è il solo carattere ammesso oltre ai numeri</label>");
            $el.bind("keyup change", function () {
                $el.parents('.form-group').removeClass("has-error");
                $el.parents('.form-group').children().first().next().children().first().next().remove();
            });
        }
        else {
            var formattednumber = Number(numero).toLocaleString("it-IT", { minimumFractionDigits: 2 });
            $(element).val(formattednumber);
        }
    }
}

function validateNumberAndFormat(element, min, max, digits) {
    var $el = $(element);
    var hasError = false;
    if ($el.val() != '') {
        var numero = replaceAll($el.val(), ".", "");
        numero = numero.replace(/,/g, '.');
        numero = numero.replace('€', '');
        numero = numero.replace('%', '');
        if ($.isNumeric(numero) == false) {
            hasError = true;
            if ($el.parent().hasClass("has-error") == true)
                return;
            //$el.parents('.form-group').children().first().next().append("<label class='control-label'>Il valore inserito non è un numero valido</label>");
            $el.parent().append("<label class='control-label text-danger'>Il valore inserito non è un numero valido</label>");
        }

        if (min != null && hasError == false) {
            if ($el.parent().hasClass("has-error") == true)
                return;
            if (Number(numero) < min) {
                hasError = true;
                //$el.parents('.form-group').children().first().next().append("<label class='control-label'>Valori inferiori a 0 non sono consentiti</label>");
                $el.parent().append("<label class='control-label text-danger'>Valori inferiori a 0 non sono consentiti</label>");
            }
        }

        if (max != null && hasError == false) {
            if ($el.parent().hasClass("has-error") == true)
                return;
            if (Number(numero) > max) {
                //$el.parents('.form-group').children().first().next().append("<label class='control-label'>Il valore inserito è superiore al limite massimo di " + max + "</label>");
                $el.parent().append("<label class='control-label text-danger'>Il valore inserito è superiore al limite massimo di " + max + "</label>");
                hasError = true;
            }
        }

        if (hasError == true) {
            if ($el.parent().hasClass("has-error") == true)
                return;
            $el.parent().addClass("has-error");
            $el.bind("keyup change", function () {
                $el.parent().removeClass("has-error");
                //$el.parent().children().first().next().children().first().next().remove();
                $el.next().remove();
            });
        }
        else {
            var formattednumber = Number(numero).toLocaleString("it-IT", { minimumFractionDigits: digits, maximumFractionDigits: digits });
            if ($el.hasClass('toLocalizeEuro'))
                formattednumber = localize(numero, digits, 'currency');
            if ($el.hasClass('toLocalizePercent'))
                formattednumber = localize(numero, digits, 'percent');
            $el.val(formattednumber);
        }
    }
}

function validateNumberInTable(element) {
    if ($(element).val() != '') {
        //var numero = $(element).val().replace(/,/g, '.');
        var numero = replaceAll($(element).val(), ".", "");
        numero = numero.replace(/,/g, '.');
        if ($.isNumeric(numero) == false) {
            var $el = $(element);
            if ($el.parents().first().hasClass("has-error") == true)
                return;
            $el.parents().first().addClass("has-error");
            $el.after("<label class='control-label'>Il valore inserito non è un numero. La virgola è il solo carattere ammesso oltre ai numeri</label>");
            $el.bind("keyup change", function () {
                $el.parents().first().removeClass("has-error");
                $el.next().remove();
            });
        } else {
            var formattednumber = Number(numero).toLocaleString("it-IT", { minimumFractionDigits: 2 });
            $(element).val(formattednumber);
        }
    }
}

//FUNZIONE PER VALIDARE LA CORRISPONDENZA DELLE PASSWORD NON è STATA TERMINATA

//$(document).on("blur", ".password", function (e) {
//    if ($(".password").length == 2)
//    {
//        var p1 = $(".password").first().val();
//        var p2 = $(".password").first().next().val();
//        if (p1 != p2)
//        {
//            $(".password").parents('form-group').addClass("has-error");
//            $(".password").first().next().after("<label class='control-label'>Le password non corrispondono</label>");
//        }
//    }
//});




