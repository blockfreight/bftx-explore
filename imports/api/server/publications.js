import {Transactions} from "../lib/collections"
import fetch from 'isomorphic-fetch';


Meteor.startup(() => {
    Meteor.publish('transactions', function() {
        console.log("data")
        return Transactions.find({},{sort:{TxTimestamp:-1}});
    });
async function  GetId(Properties)
    {
        delete Properties.Id
        var s = `{"query": "mutation {tx: constructBFTX(Properties:${JSON.stringify(Properties).replace(/\"([^(\")"]+)\":/g,"$1:").replace(/"/g, "\\\"")}){Id}}"}`

        console.log(s)
        let response = await fetch("http://localhost:12345/bftx-api",{method: 'post', headers: { 'Content-Type': 'application/json' }, body: s,})
        let json = await response.json();
        console.log("response: "+JSON.stringify(json))
        let BFTX = json.data.tx.Id;
        s =`{"query": "mutation{tx: signBFTX(Id:\\"${BFTX}\\"){Id Verified Transmitted}}"}`
        console.log("sign: "+s)
        response = await fetch("http://localhost:12345/bftx-api",{method: 'post', headers: { 'Content-Type': 'application/json' }, body: s,})
        json = await response.json();
        console.log("response: "+JSON.stringify(json))
        s =`{"query": "mutation{tx: broadcastBFTX(Id:\\"${BFTX}\\"){Id}}"}`
        console.log("broadcast: "+s)
        response = await fetch("http://localhost:12345/bftx-api",{method: 'post', headers: { 'Content-Type': 'application/json' }, body: s,})
        json = await response.json();
        console.log("response: "+JSON.stringify(json))
        return json



        //     .then(response => response.json())
        // .then(async json =>    {
        //     console.log(json)
        //
        //     s =`{"query": "mutation{tx: signBFTX(Id:\\"${json.data.tx.Id}\\"){Id Verified Transmitted}}"}`
        //     console.log("signature: "+ s)
        //     return await fetch("http://localhost:12345/bftx-api",{
        //         method: 'post',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: s,
        //     }).then(response => response.json())
        //         .then(async json => {
        //             console.log(json)
        //             s =`{"query": "mutation{tx: broadcastBFTX(Id:\\"${json.data.tx.Id}\\"){Id}}"}`
        //             console.log("broadcast: "+ s)
        //             return  await fetch("http://localhost:12345/bftx-api",{
        //                 method: 'post',
        //                 headers: { 'Content-Type': 'application/json' },
        //                 body: s,
        //             }).then(response => await response.json())
        //         .then(json => {
        //                 console.log(json)
        //
        //                 // json.data.tx.Id
        //             });
        //         });
        // });
    }
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
        },
        async Save(Properties)
        {
            return GetId(Properties)
            //console.log(Properties)
            delete Properties.Id
            var s = `
            {"query": "mutation {tx: constructBFTX(Properties:${JSON.stringify(Properties).replace(/\"([^(\")"]+)\":/g,"$1:").replace(/"/g, "\\\"")}){Id}}"}`

            //s = `{'query': 'mutation {tx: constructBFTX(Properties:${JSON.stringify(Properties).replace(/\"([^(\")"]+)\":/g,"$1:")}){Id}}'}`

            console.log(s)
            return await fetch("http://localhost:12345/bftx-api",{
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: s,
            }).then(response => response.json())
                .then(async json =>    {
                    console.log(json)

                    s =`{"query": "mutation{tx: signBFTX(Id:\\"${json.data.tx.Id}\\"){Id Verified Transmitted}}"}`
                    console.log("signature: "+ s)
                   return await fetch("http://localhost:12345/bftx-api",{
                        method: 'post',
                        headers: { 'Content-Type': 'application/json' },
                        body: s,
                    }).then(response => response.json())
                        .then(async json => {
                            console.log(json)
                            s =`{"query": "mutation{tx: broadcastBFTX(Id:\\"${json.data.tx.Id}\\"){Id}}"}`
                            console.log("broadcast: "+ s)
                            return  await fetch("http://localhost:12345/bftx-api",{
                                method: 'post',
                                headers: { 'Content-Type': 'application/json' },
                                body: s,
                            }).then(response =>  response.json())
                                .then(json => {
                                    console.log(json)

                                    // json.data.tx.Id
                                });
                        });
                });


            return constructResponse;
            // '{
            //     "query": "mutation{tx: signBFTX(Id:\"BFTX99a72d715f899fdf681c7127a3b48d5b71296a9ae2bbd6c7297e61e7e462f7fa\"){Id Verified Transmitted}}"
            // }
            // {
            //     "query": "mutation{tx: broadcastBFTX(Id:\"BFTX99a72d715f899fdf681c7127a3b48d5b71296a9ae2bbd6c7297e61e7e462f7fa\"){Id}}"
            // }
            // HTTP.post("http://localhost:12345/bftx-api",{body:s},(e,r)=>{
            //     console.log(JSON.stringify(r));
            // })
           // console.log(s);
            // HTTP.post("http://"+socketServerAddress+":46657/status",(e,r)=>{
            //     if(e){
            //         console.log(e);
            //         return;
            //     }
            //
            //     // console.log(r.data.result.latest_block_height)
            //     // var i
            //     // for(i = parseInt(r.data.result.latest_block_height);i!=0;i-- ){
            //     //     HTTP.get("http://"+socketServerAddress+":46657/block?height="+i,(e1,block)=>{
            //     //         HTTP.get("http://"+socketServerAddress+":46657/block_results?height="+block.data.result.block.header.height,(e2,block_result)=> {
            //     //             block.data.result.block.data.txs.forEach(o => {
            //     //                 if (isJson(String.fromCharCode.apply(null, Base64.decode(o)))) {
            //     //                     //  console.log(String.fromCharCode.apply(null, Base64.decode(o)));
            //     //                     let jsonObject = JSON.parse(String.fromCharCode.apply(null, Base64.decode(o)));
            //     //                     jsonObject.AppTimestamp = (new Date()).getTime();
            //     //                     //jsonObject.Tags = TagsById(block_result, jsonObject.Id);
            //     //                     jsonObject.TxTimestamp =TagsById(block_result, jsonObject.Id).find(timestamp=>{return timestamp.key=="bftx.timestamp"}).valueInt
            //     //                     jsonObject.Height =block.data.result.block.header.height;
            //     //                     Transactions.upsert(jsonObject.Id, jsonObject);
            //     //                 }
            //     //             })
            //     //         })
            //     //         //}
            //     //     })
            //     // }
            //     // //http://localhost:46657/block?height=16
            //     // //console.log(JSON.parse(r.data));
            // })
        }
    })

})

