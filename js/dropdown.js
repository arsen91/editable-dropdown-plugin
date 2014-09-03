(function( $ ) {
	'use strict';
	var comboboxParent = $('.combobox');

	function buildOptionList(opts) {
		var list = $('<ul role="menu" aria-labelledby="dLabel">')
		.addClass('dropdown-menu options');
		opts.forEach(function(item, i) {
			$('<li>' + item + '</li>')
			.addClass('combobox-option')
			.attr('tabindex', i + 1)
			.appendTo(list).click(onOptionClick);
		});

		list.appendTo(comboboxParent);
	}

	function onOptionClick() {
		var text = $(this).text();
		var input = $('.combobox-input');
		input.val(text);
	}

	function buildInput() {
		$('<input>').addClass('form-control combobox-input')
		.appendTo(comboboxParent);
	}

	function buildCaret() {
		return $('<span data-toggle="dropdown">').addClass('dropdown-toggle')
		.append($('<span>').addClass('caret'))
		.appendTo(comboboxParent);
	}

	function onToggleClick() {
		$('input.combobox-input').focus();
	}

	function onArrowKeyDown(e) {
		var menu = $('.dropdown-menu');
		if (e.keyCode === 40) {
			if (document.activeElement === $('input')[0]) {
				$('li[tabindex="1"]').focus();
			} else {
				$(document.activeElement).next().focus();
			}
		} else if (e.keyCode === 38) {
			$(document.activeElement).prev().focus();
		} else if (e.keyCode === 27) {
			menu.toggle();
		}
	}

	$.fn.combobox = function(options) {
		buildInput();
		buildCaret().click(onToggleClick);
		$('body').keydown(onArrowKeyDown);
		buildOptionList(options);
	};

}( window.jQuery ));