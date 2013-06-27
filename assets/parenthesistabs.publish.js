(function($) {

	Tabs = {

		contents: null,
		wrapper: null,
		tabs: [],
		storage: {
			all: $([])
		},

		init: function() {
			Tabs.contents = $('#contents');
			Tabs.contents.find('.field:visible').each(Tabs.findTabs);

			if(Tabs.tabs.length) {
				Tabs.createWrapper();
				$.each(Tabs.tabs, Tabs.createTabs);

				// Select tab
				Tabs.wrapper.on('click.parenthesistabs', 'li', Tabs.selectTab).find('li:first').trigger('click.parenthesistabs');

				// Switch tab
				Tabs.contents.on('keydown.parenthesistabs', '.field:visible input, .field:visible textarea', Tabs.switchTab);
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

			// Focus first visible field
			Tabs.contents, Tabs.contents.find('.field:visible:first input:first, .field:visible:first textarea:first').first().trigger('focus.parenthesistabs');
		},

		switchTab: function(event) {
			var current = $(event.target),
				field = current.parents('.field'),
				lastInput = field.find('input, textarea').filter(':visible:last'),
				lastField = Tabs.contents.find('.field:visible:has(input:visible, textarea:visible)').last();

			if(event.which === 9 && current[0] == lastInput[0] && field[0] == lastField[0]) {
				event.preventDefault();
				Tabs.wrapper.find('.selected').next().trigger('click.parenthesistabs');
			}
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
