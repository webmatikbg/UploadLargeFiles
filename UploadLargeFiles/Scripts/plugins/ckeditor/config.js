/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
    // config.uiColor = '#AADC6E';
    config.extraPlugins = 'lineheight';
    config.line_height = "0.5px;5px;10px;15px;20px;30px;50px";
    config.toolbarGroups = [
    
    //'/',
    { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
    { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi'] },
    { name: 'styles' },
    { name: 'colors' },
    { name: 'tools' },
    ];

    config.enterMode = CKEDITOR.ENTER_BR;
};
