﻿angular.module('wiz.validation', [
	'wiz.validation.integer',
	'wiz.validation.decimal',
	'wiz.validation.postcode',
	'wiz.validation.zipcode',
	'wiz.validation.phone',
	'wiz.validation.atLeastOne'
]);
angular.module('wiz.validation.integer', []);
angular.module('wiz.validation.integer')

.directive('wizValInteger', function () {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function (scope, elem, attr, ngModel) {

			//For DOM -> model validation
			ngModel.$parsers.unshift(function (value) {
				return validate(value);
			});

			//For model -> DOM validation
			ngModel.$formatters.unshift(function (value) {
				return validate(value);
			});

			function validate(value) {
				var valid = /^-?[0-9]+$/.test(value);
				ngModel.$setValidity('wizValInteger', valid);
				return value;
			}
		}
	};
});
angular.module('wiz.validation.decimal', []);
angular.module('wiz.validation.decimal')

.directive('wizValDecimal', function () {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function (scope, elem, attr, ngModel) {

			//For DOM -> model validation
			ngModel.$parsers.unshift(function (value) {
				return validate(value);
			});

			//For model -> DOM validation
			ngModel.$formatters.unshift(function (value) {
				return validate(value);
			});

			function validate(value) {
				var valid = /^-?([0-9]+(\.[0-9]+))$/.test(value);
				ngModel.$setValidity('wizValDecimal', valid);
				return value;
			}
		}
	};
});
angular.module('wiz.validation.phone', []);
angular.module('wiz.validation.phone')

.directive('wizValPhone', function () {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function (scope, elem, attr, ngModel) {

			//For DOM -> model validation
			ngModel.$parsers.unshift(function (value) {
				return validate(value);
			});

			//For model -> DOM validation
			ngModel.$formatters.unshift(function (value) {
				return validate(value);
			});

			function validate(value) {
				var valid = /(^(((\+|00)44)?)([1-9]{1}[0-9]{9})$)|(^[0][0-9]{10}$)/.test(value);
				ngModel.$setValidity('wizValPhone', valid);
				return value;
			}
		}
	};
});

angular.module('wiz.validation.postcode', []);
angular.module('wiz.validation.postcode')

.directive('wizValPostcode', function () {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function (scope, elem, attr, ngModel) {

			//For DOM -> model validation
			ngModel.$parsers.unshift(function (value) {
				return validate(value);
			});

			//For model -> DOM validation
			ngModel.$formatters.unshift(function (value) {
				return validate(value);
			});

			function validate(value) {
				// GOV Postcode regex: http://webarchive.nationalarchives.gov.uk/+/http://www.cabinetoffice.gov.uk/media/291370/bs7666-v2-0-xsd-PostCodeType.htm
				var valid = /^\b(GIR ?0AA|SAN ?TA1|(?:[A-PR-UWYZ](?:\d{0,2}|[A-HK-Y]\d|[A-HK-Y]\d\d|\d[A-HJKSTUW]|[A-HK-Y]\d[ABEHMNPRV-Y])) ?\d[ABD-HJLNP-UW-Z]{2})\b$/i.test(value);
				ngModel.$setValidity('wizValPostcode', valid);
				return value;
			}
		}
	};
});
angular.module('wiz.validation.zipcode', []);
angular.module('wiz.validation.zipcode')

.directive('wizValZipcode', function () {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function (scope, elem, attr, ngModel) {

			//For DOM -> model validation
			ngModel.$parsers.unshift(function (value) {
				return validate(value);
			});

			//For model -> DOM validation
			ngModel.$formatters.unshift(function (value) {
				return validate(value);
			});

			function validate(value) {
				var valid = /(^\d{5}-?\d{4}$)|(^\d{5}$)/.test(value);
				ngModel.$setValidity('wizValZipcode', valid);
				return value;
			}
		}
	};
});
angular.module('wiz.validation.atLeastOne', []);
angular.module('wiz.validation.atLeastOne')

.service('wizAtLeastOneSvc', ['$filter', function ($filter) {
	this.values = [];

	this.cleanup = function () {
		this.values = [];
	};

	this.addValue = function (value) {
		var existingValue = false;
		for (var i = 0; i < this.values.length; i++) {
			if (this.values[i].name === value.name) {
				this.values[i] = value;
				existingValue = true;
				break;
			}
		}
		if (!existingValue) this.values.push(value);
	};

	this.isEmpty = function () {
		var isEmpty = true;
		for (var i = 0; i < this.values.length; i++) {
			if (this.values[i].value && this.values[i].value.length > 0) {
				isEmpty = false;
				break;
			}
		}
		return isEmpty;
	};
}]);
angular.module('wiz.validation.atLeastOne')

.directive('wizValAtLeastOne', ['wizAtLeastOneSvc', function (wizAtLeastOneSvc) {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function (scope, elem, attr, ngModel) {

			//For DOM -> model validation
			ngModel.$parsers.unshift(function (value) {
				wizAtLeastOneSvc.addValue({
					name: elem[0].name,
					value: value
				});
				return value;
			});

			//For model -> DOM validation
			ngModel.$formatters.unshift(function (value) {
				wizAtLeastOneSvc.addValue({
					name: elem[0].name,
					value: value
				});
				return value;
			});
			
			function validate() {
				debugger;
				valid = false;
				if (!wizAtLeastOneSvc.isEmpty()) valid = true;
				ngModel.$setValidity('wizValAtLeastOne', valid);
			}

			scope.$watch(function () { return wizAtLeastOneSvc.values; }, function () {
				validate();
			}, true);

			scope.$on('$destroy', function () {
				wizAtLeastOneSvc.cleanup();
			});
		}
	};
}]);
