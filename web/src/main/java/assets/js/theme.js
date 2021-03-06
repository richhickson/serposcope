/* 
 * Serposcope - SEO rank checker https://serposcope.serphacker.com/
 * 
 * Copyright (c) 2016 SERP Hacker
 * @author Pierre Nogues <support@serphacker.com>
 * @license https://opensource.org/licenses/MIT MIT License
 */

/* global serposcope */

serposcope.theme = function () {

    var topOffset = 50;
    var availableHeight = 0;
    
    var setAvailableHeight = function () {
        height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        availableHeight = height - topOffset;
    };
    
    var adjustSideBar = function() {
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 140; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }        
    };
    
    var adjustPageHeight = function(){
        if (availableHeight > topOffset) {
            $("#page-wrapper").css("min-height", (availableHeight) + "px");
        }        
    };
    
    var setResizeHooks = function() {
        $(window).bind("load resize", function () {
            setAvailableHeight();
            adjustSideBar();
            adjustPageHeight();
        });        
    };
    
    var newGroupModal = function() {
        $('.modal').modal('hide');
        $('#new-group-modal').modal();
        return false;
    };    
    
    var bootstrap = function () {
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();
    };
    
    var runModules = function () {
        return confirm("Launch a task to check the rankings of all your keywords ?");
    };
    
    var bannerError = function(elt) {
        elt.currentTarget.remove();
    };

    var setup = function () {
        setResizeHooks();
        bootstrap();
        $('.btn-add-group').click(newGroupModal);
        $('#btn-run-modules').click(runModules);
        $('#side-banner img').error(bannerError);
    };
    
    var oPublic = {
        topOffset: function() {return topOffset;},
        availableHeight: function() {return availableHeight;},
        setup: setup
    };

    return oPublic;

}();

