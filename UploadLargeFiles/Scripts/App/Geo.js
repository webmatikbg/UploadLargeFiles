function getRegioni(idRegioneSelected, selettore) {
    $(selettore).empty();
    $.ajax({
        type: 'POST',
        url: '/Geo/getRegioni/',
        dataType: 'json',
        success: function (regioni) {
            var options = '<option selected="selected" value=""></option>';
            $.each(regioni, function (i, regione) {
                options += '<option value="' + regione.Value + '">' + regione.Text + '</option>';
            });
            $(selettore).html(options);

        },
        complete: function () {
            $(selettore + " option[value='" + idRegioneSelected + "']").attr('selected', 'selected');
        },
        error: function (ex) {
            alert('Impossibile recuperare i dati' + ex);
        }
    });
    return false;
}

function getProvince(idRegione, idProvincia, idProvinciaSelected, selettoreProvincia, selettoreComune) {
    $(selettoreProvincia).empty();
    $(selettoreComune).empty();
    $.ajax({
        type: 'POST',
        url: '/Geo/getProvince/',
        data: { idRegione: idRegione, idProvincia: idProvincia },
        dataType: 'json',
        success: function (province) {
            var options = '<option selected="selected" value=""></option>';
            $.each(province, function (i, provincia) {
                options += '<option value="' + provincia.Value + '">' + provincia.Text + '</option>';
            });
            $(selettoreProvincia).html(options);

        },
        complete: function () {
            $(selettoreProvincia + " option[value='" + idProvinciaSelected + "']").attr('selected', 'selected');
        },
        error: function (ex) {
            alert('Impossibile recuperare i dati' + ex);
        }
    });
    return false;
}

function getComuni(idProvincia, idComune, idComuneSelected, selettore) {
    $(selettore).empty();
    $.ajax({
        type: 'POST',
        url: '/Geo/getComuni/',
        data: { idProvincia: idProvincia, idComune: idComune },
        dataType: 'json',
        success: function (comuni) {
            var options = '<option selected="selected" value=""></option>';
            $.each(comuni, function (i, comune) {
                options += '<option value="' + comune.Value + '">' + comune.Text + '</option>';
            });
            $(selettore).html(options);
        },
        complete: function () {
            $(selettore + " option[value='" + idComuneSelected + "']").attr('selected', 'selected');
        },
        error: function (ex) {
            alert('Impossibile recuperare i dati' + ex);
        }
    });
    return false;
}

function getNazioni(idNazione, idNazioneSelected, selettore) {
    $(selettore).empty();
    $.ajax({
        type: 'POST',
        url: '/Geo/getNazioni/',
        data: { idNazione: idNazione },
        dataType: 'json',
        success: function (comuni) {
            var options = '<option selected="selected" value=""></option>';
            $.each(comuni, function (i, nazione) {
                options += '<option value="' + nazione.Value + '">' + nazione.Text + '</option>';
            });
            $(selettore).html(options);
        },
        complete: function () {
            $(selettore + " option[value='" + idNazioneSelected + "']").attr('selected', 'selected');
        },
        error: function (ex) {
            alert('Impossibile recuperare i dati' + ex);
        }
    });
    return false;
}