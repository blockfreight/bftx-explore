import {Transactions} from "../lib/collections"
Meteor.startup(() => {
    Meteor.publish('transactions', function() {
        console.log("data")
        return Transactions.find({},{sort:{TxTimestamp:-1}});
    });

    Meteor.methods({
        GetPass(){
            var passdock = require('passdock')

            passdock.api.token = 'b8bf3998d4837e73ec967b28abc80c339cc4e8d5582b44514c855d8846bca54f'

            //passdock.templates.list( console.log )
            var pass = {
                "formatVersion": 1,
                "teamIdentifier": "H8FC455EVV",
                "serial_number": parseInt(Math.random() * 10000000),
                "serialNumber": "anynum",
                "passTypeIdentifier": "pass.passdock2017.public.1",
                "organizationName": "Passdock",
                "authenticationToken": "PASS_DEPENDANT",
                "webServiceURL": "https://api.passdock.com",
                "description": "",
                "foregroundColor": "rgb(255,255,255)",
                "backgroundColor": "rgb(32,87,132)",
                "logoText": "",
                "year":"",
                "name":"",
                "issue":"",
                "points":"",
                "restaurant":"",
                "barcode": {
                    "message": "",
                    "format": "PKBarcodeFormatPDF417",
                    "messageEncoding": "iso-8859-1",
                    "altText": ""
                },
                "generic": {
                    "headerFields": [{"key": "year", "label": "YEAR", "value": "2012/2013"}],
                    "primaryFields": [{"key": "name", "label": "NAME", "value": "John Smith"}],
                    "secondaryFields": [{"key": "issue", "label": "Issue Date", "value": "1 Oct 2012"}],
                    "auxiliaryFields": [{"key": "points", "label": "POINTS", "value": "1055"}],
                    "backFields": [{"key": "restaurant", "label": "RESTAURANT", "value": "15% off"}]
                }
            };
            var pass = {
                serial_number:		parseInt(Math.random() * 10000000),
                bar: {
                    message:		'http://domain.tld/pass?id=123',
                },
                year: {
                    label:			'YEAR',
                    value:			'29-12-2012'
                },
                issue: {
                    label:			'POINTS',
                    value:			'blah'
                },
                points: {
                    label:			'POINTS',
                    value:			'hello world'
                }
            }
            passdock.passes.create ( 124541, pass, (o,e) =>{
                console.log(o)
                console.log(e)
            })

            return "ok";
        }
    })

})

