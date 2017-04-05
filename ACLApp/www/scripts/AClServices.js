AclApp.factory('SearchPropertiesService', function ($http, $q) {

    return ({
        GetsearchTypes: GetsearchTypes,
    });
    function GetsearchTypes(clientIP) {
        var request = $http({
            method: "get",
            url: "http://sirez-server2/AmericanCenter/Aclservices.asmx/SearchPropertiesService",
            params: {
                'clientIP': clientIP,
            },
        });
        return (request.then(handleSuccess, handleError));
    }
    function handleSuccess(response) {
        var Rdata = response.data.replace(/(&lt;)/g, "<");
        Rdata = Rdata.replace(/(&gt;)/g, ">").replace('<?xml version="1.0" encoding="utf-8"?>', '').replace('</string>', '').replace('<string xmlns="http://tempuri.org/">', '').replace('<?xml version="1.0" encoding="UTF-8"?>', '').replace(/\n/g, '');
        var x2js = new X2JS();
        var data = x2js.xml_str2json(Rdata);
        return (data);
    }
    function handleError(response) {
        if (
            !angular.isObject(response.data) ||
            !response.data.message
            ) {
            return ($q.reject("An unknown error occurred."));
        }
        return ($q.reject(response.data.message));
    }
});


