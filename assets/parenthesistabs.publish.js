(function($) {

	Tabs = {

		wrapper: null,
		tabs: [],
		storage: {
			all: $([])
		},

		init: function() {
			$('.field:visible').each(Tabs.findTabs);

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
				label = field.find('label'),
				node = Tabs.getTextNode(label, 0),
				match = node.nodeValue.match(/\((.*?)\)/);

			if(match != null) {
				var name = match[1];

				// Store name
				if($.inArray(name, Tabs.tabs) == -1) {
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
		},

		getTextNode: function(element, position) {
			var nodes = element.contents().filter(function () {
				return this.nodeType === 3;
			});

			if(position >= 0) {
				return nodes[position];
			}
			else {
				return nodes;
			}
		}
	}

	$(document).on('ready.parenthesistabs', function(event) {
		Tabs.init();
	});

})(window.jQuery);
