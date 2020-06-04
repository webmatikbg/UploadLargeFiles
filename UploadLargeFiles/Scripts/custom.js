//La gestione delle date qui è diversa dagli altri progetti
//UTC in DB e qui applicato in base al client

function formatJsonTime(dataJson) {
    var jsonDate = dataJson;
    var re = /-?\d+/;
    var m = re.exec(jsonDate);

    var d = new Date(parseInt(m[0]));
    var hour = d.getHours();
    var n = d.getTimezoneOffset();
    var ore = 1 * Number(n / 60);
    hour = hour + ore;
    var min = d.getMinutes();

    var formatted = (hour < 10 ? "0" : "") + hour + ":" + (min < 10 ? "0" : "") + min;

    return formatted;
}

function formatJsonDateTime(dataJson) {
    var jsonDate = dataJson;
    var re = /-?\d+/;
    var m = re.exec(jsonDate);

    var d = new Date(parseInt(m[0]));
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var hour = d.getHours();
    var n = d.getTimezoneOffset();
    var ore = 1 * Number(n / 60);
    hour = hour + ore;
    var min = d.getMinutes();

    var formatted = (day < 10 ? "0" : "") + day + "/" +
                (month < 10 ? "0" : "") + month + "/" +
                year + " - " + (hour < 10 ? "0" : "") + hour + ":" + (min < 10 ? "0" : "") + min;

    return formatted;
}

function formatJsonDate(dataJson) {
    var jsonDate = dataJson;
    var re = /-?\d+/;
    var m = re.exec(jsonDate);

    var d = new Date(parseInt(m[0]));
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();

    var formatted = (day < 10 ? "0" : "") + day + "/" +
                (month < 10 ? "0" : "") + month + "/" +
                year;

    return formatted;
}

function formatJsonDateForChrome(dataJson) {
    var jsonDate = dataJson;
    var re = /-?\d+/;
    var m = re.exec(jsonDate);

    var d = new Date(parseInt(m[0]));
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();

    var formatted = year + "-" + (month < 10 ? "0" : "") + month + "-" + (day < 10 ? "0" : "") + day;

    return formatted;
}

function getTodayDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = dd + '/' + mm + '/' + yyyy;
    return today;
}

function getTodayDateForChrome() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

$('.i-checks').iCheck({
    checkboxClass: 'icheckbox_minimal-blue',
    radioClass: 'iradio_minimal-blue',
});

$('input').on('ifChecked', function (event) {
    if (event != undefined) {
        if (event.target.type == 'radio') {
            $(this).val(event.target.value);
        }
        else
            $(this).val(true);
    }
});
$('input').on('ifUnchecked', function (event) {
    $(this).val(false);
});

$('.closemodal').click(function () {
    $(this).parents('.modal').modal('hide');
});

$(document).ready(function () {
    if ($("#modal").length == 0)
        return;

    $('#modal').on('hidden.bs.modal', function (e) {
        $(this)
          .find("input[type=text],input[type=number],textarea,select")
             .val('')
             .end()
          .find("input[type=checkbox], input[type=radio]")
             .prop("checked", "")
             .end();
    })
});

function notificaSuccess(testo) {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "onclick": null,
        "showDuration": "100",
        "hideDuration": "1000",
        "timeOut": "1000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    if (!testo)
        toastr.success("Operazione effettuata con successo")
    else
        toastr.success(testo)
}

function notificaError(testo) {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "onclick": null,
        "showDuration": "400",
        "hideDuration": "4000",
        "timeOut": "4000",
        "extendedTimeOut": "4000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    if (!testo)
        toastr.warning("Si è verificato un errore")
    else
        toastr.warning(testo)
}

function bloccaUI() {
    $.blockUI.defaults.message = "Attendere prego...";
    $.blockUI({
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .9,
            color: '#fff',
            baseZ: 2000
        }
    });
}

function sbloccaUI() {
    $.unblockUI();
}

function closeModal(modalid) {
    $("'#" + modalid + "'").modal('hide');
}

function svuotamodal(parent) {
    $(parent)
              .find("input[type=text],input[type=number],input[type=date],input[type=time],textarea")
                 .val('')
                 .end()
              .find("input[type=hidden]")
                 .val(0)
                 .end()
              .find("select")
                 .val(0)
                 .end()
              .find("input[type=checkbox], input[type=radio]")
                 .prop("checked", "")
                 .end();

    $(parent)
        .find(".has-error")
        .each(
        function (index, element) {
            $(element).removeClass("has-error")
        });

}

//La funzione replaceAll che necessita di escapRegExp per funzionare, permette di fare un replace di tutte le occorrenze di una stringa
//all'interno di un'altra altrimenti la funzione replace standard di javascript fa il replace solo della prima occorrenza
function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function unlocalize(element) {
    var elementunlocalized = '';
    if (element != '' && element != undefined) {
        var numero = replaceAll(element, ".", "");
        numero = numero.replace(/,/g, '.');
        elementunlocalized = Number(numero);
    }
    else {
        elementunlocalized = Number('')
    }
    return elementunlocalized;
}

function localize(numero) {
    var numerolocalized = '';
    if (numero != '' && numero != undefined) {
        numerolocalized = Number(numero).toLocaleString("it-IT", { minimumFractionDigits: 2 });
    }
    return numerolocalized;
}

function localizeValues(container) {
    if ($(container).length > 0) {
        $(container).find('input').each(function (index, element) {
            if ($(this).val() != "" && $(this).hasClass('toLocalize')) {
                var unlocalized = '';
                unlocalized = unlocalize($(element).val());
                $(this).val(unlocalized.toLocaleString('it-IT', { maximumFractionDigits: 2 }));
            }
        });
    }
}

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}

function generaPassword() {
    var randomstring = Math.random().toString(36).slice(-8);
    return randomstring;
}

$('.back').click(function () {
    history.go(-1);
});

