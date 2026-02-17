public with sharing class PincodeService {

    @AuraEnabled(cacheable=true)
    public static String getAddress(String pincode){

        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://api.postalpincode.in/pincode/' + pincode);
        req.setMethod('GET');

        HttpResponse res = http.send(req);
        return res.getBody();
    }
}