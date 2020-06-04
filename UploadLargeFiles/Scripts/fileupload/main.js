/*
 * jQuery File Upload Plugin JS Example
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global $, window */

$(function () {
    'use strict';

    // Initialize the jQuery File Upload widget:
    $('#fileupload').fileupload({
        // Uncomment the following to send cross-domain cookies:
        //xhrFields: {withCredentials: true},
        //url: 'UploadFile/'
        dataType: 'json',
        singleFileUploads: true,
        //maxChunkSize: 10000000 // 10 MB
    });

    $('#fileupload').bind('fileuploaddone', function (e, data) {
        console.log("documento caricato");
        sbloccaUI();
        $("#modalUpload").css("z-index", "1050");
        $("#modalUpload").modal('hide');
        notificaSuccess();
        window.location.reload();
    });

    $('#fileupload').bind('fileuploadstart', function (e, data) {
        console.log("start");
        bloccaUI();
        $("#modalUpload").css("z-index", "900");
    });

    $('#fileupload').bind('fileuploadcompleted', function (e, data) {
        console.log("complete");
        sbloccaUI();
        $("#modalUpload").css("z-index", "1050");
        $("#modalUpload").modal('hide');
        notificaSuccess();
    });

    $('#fileupload').bind('fileuploadfail', function (e, data) {
        console.log("stop");
        sbloccaUI();
        $("#modalUpload").css("z-index", "1050");
        $("#modalUpload").modal('hide');
        notificaError();
    });
});