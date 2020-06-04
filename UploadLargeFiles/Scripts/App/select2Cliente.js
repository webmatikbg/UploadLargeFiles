function inizializzaSelectCliente(selettore, initialValue) {
    $(selettore).select2({
        allowClear: true,
        placeholder: "Seleziona un cliente",
        theme: "classic",
        width: "100%",
        language: {
            // You can find all of the options in the language files provided in the
            // build. They all must be functions that return the string that should be
            // displayed.
            errorLoading: function () {
                return "I risultati non possono essere caricati"
            },
            inputTooLong: function (a) {
                var b = a.input.length - a.maximum
                    , c = "Prego cancellare " + b + " caratteri";
                return 1 != b && (c += "s"),
                    c
            },
            inputTooShort: function (a) {
                var b = a.minimum - a.input.length
                    , c = "Inserire " + b + " o più caratteri";
                return c
            },
            loadingMore: function () {
                return "Caricando più risultati…"
            },
            maximumSelected: function (a) {
                var b = "Puoi selezionare solo " + a.maximum + " oggetti";
                return 1 != a.maximum && (b += "s"),
                    b
            },
            noResults: function () {
                return "Nessun risultato trovato"
            },
            searching: function () {
                return "Cerco…"
            }
        },
        ajax: {
            url: "/Account/getListForSelect",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    search: params.term,
                };
            },
            processResults: function (data, params) {
                params.page = params.page || 1;
                return {
                    results: data,
                    //selectedValue: selectedValue
                };
            },
            cache: true
        },
        escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
        minimumInputLength: 0

        //templateResult: formatRepo, // omitted for brevity, see the source of this page
        //templateSelection: formatRepoSelection // omitted for brevity, see the source of this page
    });

    //$('#FamigliaProdotto').on('select2:select', function (e) {
    //    var data = e.params.data;
    //});

    //$('#FamigliaProdotto').on('select2:clear', function (e) {
    //    $("#Codice").val('');
    //});

    //CODICE PRE LA PRESELEZIONE DI UNA OPTION
    if (initialValue != null) {
        var select = $(selettore);
        $.ajax({
            type: 'GET',
            url: "/Account/getListForSelect?initialValue=" + initialValue,
        }).then(function (data) {
            var option = new Option(data[0].text, data[0].id, true, true);
            select.append(option).trigger('change');

            select.trigger({
                type: 'select2:select',
                params: {
                    data: data
                }
            });
        });
    }
}