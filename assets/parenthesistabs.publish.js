(function($) {

	Tabs = {

		wrapper: null,
		tabs: [],
		storage: {
			all: $([])
		},

		init: function() {
			$('.field').each(Tabs.findTabs);

			if(Tabs.tabs.length) {
				Tabs.createWrapper();
				$.each(Tabs.tabs, Tabs.createTabs);

				// Events
				Tabs.wrapper.on('click.parenthesistabs', 'li', Tabs.selectTab);
				Tabs.wrapper.find('li:first').trigger('click.parenthesistabs');
			}
		},

		findTabs: function() {
			var field = $(this),
				node = field.find('label').contents().get(0),
				label = node.nodeValue.match(/\((.*?)\)/);

			if(label != null) {
				var name = label[1];

				// Store name
				if($.inArray(name, Tabs.tabs)) {
					Tabs.tabs.push(name);
					Tabs.storage[name] = $([]);
				}

				// Store field
				Tabs.storage[name] = Tabs.storage[name].add(field);
				Tabs.storage.all = Tabs.storage.all.add(field);

				// Remove name from field
				node.nodeValue = node.nodeValue.replace(/\((.*?)\)/, '');
			}
		},

		createWrapper: function() {
			Tabs.wrapper = $('<ul />', {
				class: 'tabs'
			}).appendTo('#context');
		},

		createTabs: function() {
			$('<li />', {
				text: this
			}).appendTo(Tabs.wrapper);
		},

		selectTab: function(event) {
			var selected = $(this).addClass('selected').siblings().removeClass('selected').end(),
				name = selected.text();

			Tabs.storage.all.hide();
			Tabs.storage[name].show();
		}
	}

	$(document).on('ready.metakeys', function(event) {
		Tabs.init();
	});

})(window.jQuery);
