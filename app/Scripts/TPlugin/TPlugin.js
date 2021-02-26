(function ($) {
	$.fn.extend({
		decimalMask: function (maxlength) {
			return this.inputmask({
				alias: 'decimal',
				groupSeparator: '.',
				autoGroup: true,
				integerDigits: "*", //number of integerDigits
				digits: maxlength,
				digitsOptional: false,
				placeholder: '0',
				radixPoint: ",",
				groupSize: 3,
				autoGroup: false,
				allowPlus: true,
				allowMinus: true,
				autoUnmask: true,
				unmaskAsNumber: true
			});
		},
		phieuDNSXMask: function () {
			return this.inputmask('999/99/XXX', {
				definitions: {
					'X': {
						validator: "[a-zA-Z]",
						casing: "upper"
					}
				}
			});
		},
		soLenhSXMask: function () {
			return this.inputmask({
				regex: '([h][s]|[i][t]|[i][c])-[0-9]{4}/[0-9]{2}',
				casing: "upper"
				// placeholder: "HS-0000/00"
			})
		},
		upperMask: function () {
			return this.inputmask({
				casing: "upper"
			})
		},
		upperStringMask: function () {
			return this.inputmask({
				regex: '[a-z]*',
				casing: "upper"
			})
        }
	});
})(jQuery);