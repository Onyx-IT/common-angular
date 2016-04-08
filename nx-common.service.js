(function () {
    'use strict';

    angular
        .module('onyxCommon', []);
})();


(function () {
    'use strict';

    angular
        .module('onyxCommon')
        .service('NxCommon', [
            function ($http, appConfig) {

                var service = {
                    isNumeric: function (n) {
                        return !isNaN(parseFloat(n)) && isFinite(n);
                    },

                    isFormValid: function (formStatus) {
                        var isValid = true;

                        angular.forEach(formStatus, function (error) {
                            if (error) {
                                isValid = false;
                            }
                        });
                        return isValid;
                    },

                    getAuthToken: function () {
                        //TODO: check for different storage including header, browser session and cookies
                        var token = $http.defaults.headers.common['Authorization'];
                        return token;
                    },

                    setAuthToken: function () {
                        appConfig.TOKEN = service.getAuthToken();
                        if (!appConfig.TOKEN) {
                            return false;
                        } else {
                            return true;
                        }

                    },

                    isValidDate: function (dateString) {
                        // First check for the pattern
                        if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
                            return false;

                        // Parse the date parts to integers
                        var parts = dateString.split("/");
                        var day = parseInt(parts[1], 10);
                        var month = parseInt(parts[0], 10);
                        var year = parseInt(parts[2], 10);

                        // Check the ranges of month and year
                        if (year < 1000 || year > 3000 || month == 0 || month > 12)
                            return false;

                        var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

                        // Adjust for leap years
                        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
                            monthLength[1] = 29;

                        // Check the range of the day
                        return day > 0 && day <= monthLength[month - 1];
                    }
                };

                return service;
            }])
})();
