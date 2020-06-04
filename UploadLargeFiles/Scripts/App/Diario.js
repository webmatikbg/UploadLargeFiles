//inizializzaSelectCliente("#searchCliente", null);

function showModalDiario(ID) {

    svuotamodal("#modalDiario");
    $("#modalDiario").find("#colorThumb").css('background-color', 'white');
    if (ID != undefined && ID != '0') {
        $.ajax({
            type: 'GET',
            url: '/Diario/get',
            data: { ID: ID },
            dataType: 'json',
            success: function (Diario) {
                document.getElementById("modalDiario_ID_Diario").value = Diario.ID_Diario;
                inizializzaSelectCliente("#modalDiario_ID_CLIENTE", Diario.ID_Cliente);
                if (Diario.Inizio != null) $("#modalDiario").find("#Inizio").val(formatJsonTime(Diario.Inizio));
                if (Diario.Inizio != null) $("#modalDiario").find("#InizioData").val(formatJsonDateForChrome(Diario.Inizio));
                if (Diario.Fine != null) $("#modalDiario").find("#Fine").val(formatJsonTime(Diario.Fine));
                if (Diario.Fine != null) $("#modalDiario").find("#FineData").val(formatJsonDateForChrome(Diario.Fine));
                $("#modalDiario").find("#DESCRIZIONE").val(Diario.Descrizione);
                $("#modalDiario").find("#backGroundColor").val(Diario.backgroundColor);
                $("#modalDiario").find("#colorThumb").css('background-color', Diario.backgroundColor);
                $("#divInformations").show();
                $("#modalDiario").find("#deleteDiarioButton").show();
            },
            error: function (ex) {
                alert('Impossibile recuperare i dati' + ex);
            }
        });
    }
    else {
        inizializzaSelectCliente("#modalDiario_ID_CLIENTE", null);
        $("#modalDiario").find("#InizioData").val(getTodayDateForChrome());
        $("#modalDiario").find("#FineData").val(getTodayDateForChrome());
        $("#divInformations").hide();
        $("#modalDiario").find("#deleteDiarioButton").hide();
    }
}

$("#saveDiario").click(function () {
    var salvato = saveDiario();
    if (salvato == true)
        $("#modalDiario").modal('hide');
});

$("#saveDiarioAndAdd").click(function () {
    saveDiario();
});

$("#backGroundColor").change(function () {
    var colore = $(this).val();
    $("#colorThumb").css('background-color', colore);
});

function saveDiario() {
    var dati = {
        "ID_Diario": document.getElementById("modalDiario_ID_Diario").value,
        "ID_CLIENTE": document.getElementById("modalDiario_ID_CLIENTE").value,
        "Data": document.getElementById("InizioData").value,
        "Inizio": $("#modalDiario").find("#InizioData").val() + ' ' + $("#modalDiario").find("#Inizio").val(),
        "Fine": $("#modalDiario").find("#FineData").val() + ' ' + $("#modalDiario").find("#Fine").val(),
        "Descrizione": $("#modalDiario").find("#DESCRIZIONE").val(),
        "backgroundColor": $("#modalDiario").find("#backGroundColor").val()
    };

    var controllo = controlloValidazioneSuInput($("#modalDiario"));
    if (controllo == true)
        return false;

    var json = JSON.stringify(dati);

    $.ajax({
        type: 'POST',
        url: '/Diario/edit/',
        data: { dati: json },
        dataType: 'json',
        success: function (ID_Diario) {
            svuotamodal("#modalDiario");
            Refresh();
            askToSendMailAppuntamento(ID_Diario);
        },
        error: function (ex) {
            alert('Impossibile recuperare i dati' + ex);
        }
    });

    return true;
}

function askToSendMailAppuntamento(ID_Diario) {

    $.confirm({
        title: 'Vuoi inviare una mail di promemoria al cliente?',
        content: '',
        buttons: {
            confirm: {
                text: "Conferma",
                action: function() {
                    sendMailAppuntamento(ID_Diario);
                }
            },
            cancel: {
                text: 'Chiudi',
                btnClass: 'btn-danger',
                action: function () {
                }
            },
        }
    });
}

function sendMailAppuntamento(ID_Diario) {
    $.ajax({
        type: 'POST',
        url: '/Diario/sendMailAppuntamento/',
        data: { ID_Diario: ID_Diario },
        dataType: 'json',
        success: function (data) {
            notificaSuccess("Mail inviata");
        },
        error: function (ex) {
            alert('Si è verificato un errore: ' + ex);
        }
    });
}

function Delete(id) {
    $.confirm({
        title: 'Attenzione!',
        content: 'Sei sicuro di voler eliminare questo evento?',
        buttons: {
            Conferma: function () {
                $.ajax({
                    type: 'POST',
                    url: '/Diario/Delete',
                    data: { id: id },
                    dataType: 'json',
                    success: function (data) {
                        if ($("#tabella").length > 0) {
                            $('#tabella').DataTable().ajax.reload();
                        }
                        else {
                            svuotamodal("#modalDiario");
                            $("#modalDiario").modal('hide');
                            Refresh();
                        }
                    },
                    error: function (ex) {
                        alert('Impossibile eliminare il record: ' + ex);
                    }
                });
            },
            Annulla: function () {

            }
        }
    });
}

$(".btnCerca").click(function () {
    $("#tabella").DataTable().ajax.reload();
    getSum();
});

function getSum() {
    $.ajax({
        type: 'GET',
        url: '/Diario/getSum/',
        data: { DataFrom: $("#searchDataFrom").val(), DataTo: $("#searchDataTo").val(), ID_Contatto: $("#searchCliente").val() },
        dataType: 'json',
        success: function (data) {
            $("#divSum").html(data.returnsum);
        },
        error: function (ex) {
            alert('Impossibile recuperare il totale ' + ex);
        }
    });
}

$(function () {
    $('#tabella').dataTable({
        "processing": true, /* attiva l'indicatore di caricamento */
        "serverSide": true,
        "responsive": true,
        "length": 5, /* numero di item x pagina */
        "pagingType": "full_numbers",
        "order": [0, "desc"],
        "ajax": {
            "type": "POST",
            "url": "/Diario/getList",
            "data": function (d) {
                d.id_contatto = $("#searchCliente").val();
                d.DataFrom = $("#searchDataFrom").val();
                d.DataTo = $("#searchDataTo").val();
                d.descrizione = $("#searchDescrizione").val();
            }
        },
        "columns": [
            { data: "ID_Diario" },
            { data: "CLIENTE" },
            {
                "mData": null,
                "sClass": "dt-center",
                "mRender": function (data, type, row) {
                    var jsonDate = row["DATA"];
                    if (jsonDate != null)
                        return formatJsonDate(jsonDate);
                    else
                        return "";
                }
            },
            {
                "mData": null,
                "sClass": "dt-center",
                "mRender": function (data, type, row) {
                    var jsonDate = row["INIZIO"];
                    if (jsonDate != null)
                        return formatJsonTime(jsonDate);
                    else
                        return "";
                }
            },
            {
                "mData": null,
                "sClass": "dt-center",
                "mRender": function (data, type, row) {
                    var jsonDate = row["FINE"];
                    if (jsonDate != null)
                        return formatJsonTime(jsonDate);
                    else
                        return "";
                }
            },
            { data: "DESCRIZIONE" },
            {
                "mData": null,
                "bSortable": false,
                "bSearchable": false,
                "sClass": "dt-center",
                "mRender": function (data, type, row) {
                    return '<a class="btn btn-warning btn-xs btn-dt-min-w" data-toggle="modal" href="#modalDiario" onclick="showModalDiario(\'' + row["ID_Diario"] + '\')"><i class="fa fa-edit"></i></a>';
                }
            },
            {
                "mData": null,
                "bSortable": false,
                "bSearchable": false,
                "sClass": "dt-center",
                "mRender": function (data, type, row) {
                    return '<a class="btn btn-danger btn-xs btn-dt-min-w" href="javascript:Delete(\'' + row["ID_Diario"] + '\' )"><i class="fa fa-close"></i></a>';
                }
            }],
        "language": {
            url: '//cdn.datatables.net/plug-ins/1.10.11/i18n/Italian.json'
        },

        buttons: [
            { extend: 'pdf', className: 'btn default' },
            { extend: 'excel', className: 'btn default' },
            { extend: 'csv', className: 'btn default' },
            {
                text: 'Ricarica',
                className: 'btn default',
                action: function (e, dt, node, config) {
                    dt.ajax.reload();
                }
            }
        ],

        "dom": "<'row' <'col-md-6 col-sm-12'B>l><'table-scrollable't>r<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizontal scrollable datatable
    });
});

function Refresh() {
    if ($('#calendar').length > 0)
        $('#calendar').fullCalendar('refetchEvents');
    else if ($("#tabella").length > 0)
        $("#tabella").DataTable().ajax.reload();
}

