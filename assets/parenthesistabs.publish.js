/*global window*/

(function (window, $) {

    'use strict';

    // module

    window.tabs = (function () {

        // objects

        var tabs, fields, init, select;

        // private api

        init = function () {

            var wrapper;

            // init tabs

            tabs = [];

            // init tabs

            fields = {

                all : $([])
            };

            // find tabs and store fields

            $('.field').each(function () {

                var field, label, match, name;

                // get field

                field = $(this);

                // get field label

                label = field.find('label').contents().get(0);

                // check if field label matches pattern

                match = label.nodeValue.match(/\(([\w\W]*?)\)/);

                // if field label has parenthesis

                if (match) {

                    // get tab name

                    name = match[1];

                    // store tab

                    if (!fields[name]) {

                        tabs.push(name);
                        fields[name] = $([]);
                    }

                    // store field

                    fields[name] = fields[name].add(field);
                    fields.all   = fields.all.add(field);

                    // remove parenthesis from field label

                    label.nodeValue = label.nodeValue.replace(/\(([\w\W]*?)\)/, '');
                }
            });

            // if tabs

            if (tabs.length !== 0) {

                // create wrapper

                wrapper = $('<ul />', { 'class' : 'tabs' });

                // create tabs

                $(tabs).each(function (key, value) {

                    $('<li />', { 'text' : value })
                        .on('click', select)
                        .appendTo(wrapper);
                });

                // append wrapper and select first tab

                wrapper
                    .appendTo('#context')
                    .find('li:first')
                    .trigger('click');
            }
        };

        select = function () {

            var tab = $(this);

            tab.addClass('selected').siblings().removeClass('selected');

            fields.all.hide();

            fields[tab.text()].show();
        };

        // public api

        return {

            init   : init,
            select : select
        };

    }());

    $(window.document).on('ready.metakeys', function () {

        window.tabs.init();
    });

}(window, window.jQuery));