if (CKEDITOR.instances.modal_MailBody == null || CKEDITOR.instances.editor_ModelloTesto) {
    var modellotesto = document.getElementById("editor_ModelloTesto");
    if (modellotesto != null)
        CKEDITOR.replace('editor_ModelloTesto');
}

function loadModelloTesto(id) {
    if (id != undefined) {
        $.ajax({
            type: 'POST',
            url: '/Impostazioni/getModelloTesto',
            data: { ID_Modello: id },
            dataType: 'json',
            success: function (data) {
                CKEDITOR.instances['editor_ModelloTesto'].setData(data.Testo);                
            },
            error: function (ex) {
                alert('Impossibile recuperare i dati' + ex);
            }
        });
    }
}

$('#modalModelli').on('hidden.bs.modal', function () {
    svuotamodal($(this));
})

$('#dtModelli tbody').on('click', 'tr', function () {
    var ID_Modello = $(this).find('.key').html();
    $("#modelloSelected").val(ID_Modello);
    loadModelloTesto(ID_Modello);
});


function loadModalModelli(id) {
    svuotamodal('#modalModelli');

    if (id != undefined) {
        $.ajax({
            type: 'GET',
            url: '/Impostazioni/getModelloMail',
            data: { ID_Modello: id },
            dataType: 'json',
            success: function (data) {
                $('#modalModelli_Userid').val(data.Userid);
                $('#modalModelli_ID_Modello').val(data.ID_Modello);
                $('#modalModelli_Titolo').val(data.Titolo);
                $('#modalModelli_Oggetto').val(data.Oggetto);
            },
            error: function (ex) {
                alert('Impossibile recuperare i dati' + ex);
            }
        });
    }
    else {
        $("#modalModelli_ID_Modello").val('0');
    }

    $('#modalModelli').modal('show');
}

function removeModello(id) {
    if (id != undefined) {
        $.ajax({
            type: 'POST',
            url: '/Impostazioni/DeleteModelloMail',
            data: { ID_Modello: id },
            dataType: 'json',
            success: function (data) {
                $('#dtModelli').DataTable().ajax.reload();
            },
            error: function (ex) {
                alert('Impossibile recuperare i dati' + ex);
            }
        });
    }


}

$(".salvamodalModelli").click(function () {

    var controllo = controlloValidazione($("#modalModelli"));
    if (controllo == true)
        return;

    var testo = CKEDITOR.instances.editor_ModelloTesto.getData();

    var dati = {
        "Userid": $("#modalModelli_Userid").val(),
        "ID_Modello": $("#modalModelli_ID_Modello").val(),
        "Titolo": $("#modalModelli_Titolo").val(),
        "Oggetto": $("#modalModelli_Oggetto").val(),
        "Testo": testo
    }

    var json = JSON.stringify(dati);

    $.ajax({
        type: 'POST',
        url: '/Impostazioni/saveModelliMail',
        data: { dati: json },
        dataType: 'json',
        success: function (data) {
            svuotamodal('#modalModelli');
            $("#modalModelli").modal('hide');
            $('#dtModelli').DataTable().ajax.reload();
        },
        error: function (ex) {
            alert('Impossibile recuperare i dati' + ex);
        }
    });
});

$(".salvaModelloTesto").click(function () {
    var ID_Modello = $("#modelloSelected").val();
    if (ID_Modello == 0) {
        alert("Selezionare una riga di modello dalla tabella");
        return false;
    }
    var Testo = CKEDITOR.instances.editor_ModelloTesto.getData()

    $.ajax({
        type: 'POST',
        url: '/Impostazioni/saveModelloTesto',
        data: { ID_Modello: ID_Modello, testo: Testo },
        dataType: 'json',
        success: function (data) {
            notificaSuccess();
            $('#dtModelli').DataTable().ajax.reload();
        },
        error: function (ex) {
            alert('Impossibile recuperare i dati' + ex);
        }
    });
});


tableModelli = $('#dtModelli').dataTable({
    "processing": true, /* attiva l'indicatore di caricamento */
    "serverSide": true,
    "responsive": true,
    "retrieve": true,
    "length": 10, /* numero di item x pagina */
    "pagingType": "full_numbers",
    "lengthMenu": [10, 50, 100, 500, 1000],
    "select": {
        style: 'single',
        style: 'os',
        className: 'row-selected'
    },
    "ajax": {
        "url": "/Impostazioni/getListModelliMail",
        "data": function (d) {

        }
    },
    "columns": [
        { data: "ID_Modello", className: 'key' },
        { data: "Titolo" },
        { data: "Oggetto" },
        { data: "Testo", visible: false },
        {
            "mData": null,
            "bSortable": false,
            "bSearchable": false,
            "sClass": "dt-center",
            "mRender": function (data, type, row) {
                return '<a class="btn btn-warning btn-xs btn-dt-min-w" onclick="loadModalModelli(' + row["ID_Modello"] + ')" ><i class="fa fa-edit"></i></a>';
            }
        },
        {
            "mData": null,
            "bSortable": false,
            "bSearchable": false,
            "sClass": "dt-center",
            "mRender": function (data, type, row) {
                return '<a class="btn btn-danger btn-xs btn-dt-min-w" href="javascript:removeModello(\'' + row["ID_Modello"] + '\' )"><i class="fa fa-close"></i></a>';
            }
        }],
    "language": {
        url: '//cdn.datatables.net/plug-ins/1.10.11/i18n/Italian.json'
    },
    buttons: [
        {
            text: 'Nuovo modello',
            className: 'btn default',
            action: function (e, dt, node, config) {
                loadModalModelli();
            },
        },
        //{
        //    text: 'Ricarica',
        //    className: 'btn default',
        //    action: function (e, dt, node, config) {
        //        dt.ajax.reload();
        //    }
        //}
    ],
    "dom": "<'row' <'col-md-6 col-sm-12'B><'col-md-6 col-sm-12'l>><'table-scrollable't><'row'<'col-md-5 col-sm-12'><'col-md-7 col-sm-12'>>", // horizontal scrollable datatable
});

//tableModelli.on('select', function (e, dt, type, indexes) {
//    if (type === 'row') {
//        var data = tableModelli.rows(indexes).data().pluck('Testo');
//        $("#editor_ModelloTesto").val(data[0]);
//    }
//});

