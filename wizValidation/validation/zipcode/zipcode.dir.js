﻿angular.module('wiz.validation.zipcode')

.directive('wizValidZipcode', function () {
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
				ngModel.$setValidity('wizZipcode', valid);
				return value;
			}
		}
	};
});