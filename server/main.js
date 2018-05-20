import { Meteor } from 'meteor/meteor';
import {Transactions} from "../imports/api/lib/collections";
import "/imports/api/server/publications"
import Sockette from "sockette"
import _ from "lodash"

let socketServerAddress = process.env.BFT_NODE;
if(undefined==socketServerAddress)
{
    socketServerAddress = "localhost";
}

  WebSocket = require('ws')
f = Meteor.bindEnvironment((e,cb) => {
        console.log(e);
    let result = JSON.parse(e.data)

    if( _.get(result, 'result.data.type')== "tx")
    {
        let jsonObject = JSON.parse(String.fromCharCode.apply(null, Base64.decode(result.result.data.data.tx)));
        jsonObject.AppTimestamp=  (new Date()).getTime()
        jsonObject.TxTimestamp =result.result.data.data.result.tags.find(timestamp=>{return timestamp.key=="bftx.timestamp"}).value_int
        jsonObject.Height =result.result.data.data.height;
        Transactions.upsert(jsonObject.Id,jsonObject);
    }
})

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function TagsById(json,id) {
    return json.data.result.results.DeliverTx.find((o)=> {
        return o.tags.find((t)=> {
            return t.valueString == id && t.key=="bftx.id"
        })
    }).tags

}
HTTP.get("http://"+socketServerAddress+":46657/status",(e,r)=>{
    if(e){
        console.log(e);
        return;
    }
return;
    console.log(r.data.result.latest_block_height)
    var i
    for(i = parseInt(r.data.result.latest_block_height);i!=0;i-- ){
        HTTP.get("http://"+socketServerAddress+":46657/block?height="+i,(e1,block)=>{
            HTTP.get("http://"+socketServerAddress+":46657/block_results?height="+block.data.result.block.header.height,(e2,block_result)=> {
                block.data.result.block.data.txs.forEach(o => {
                    if (isJson(String.fromCharCode.apply(null, Base64.decode(o)))) {
                        //  console.log(String.fromCharCode.apply(null, Base64.decode(o)));
                        let jsonObject = JSON.parse(String.fromCharCode.apply(null, Base64.decode(o)));
                        jsonObject.AppTimestamp = (new Date()).getTime();
                        //jsonObject.Tags = TagsById(block_result, jsonObject.Id);
                        jsonObject.TxTimestamp =TagsById(block_result, jsonObject.Id).find(timestamp=>{return timestamp.key=="bftx.timestamp"}).valueInt
                        jsonObject.Height =block.data.result.block.header.height;
                        Transactions.upsert(jsonObject.Id, jsonObject);
                    }
                })
            })
            //}
        })
    }
    //http://localhost:46657/block?height=16
    //console.log(JSON.parse(r.data));
})
Meteor.startup(() => {
    // let createServer = require('abci')
    //
    // let server = createServer({
    //     info (request) {
    //         return {
    //             data: 'Node.js counter app',
    //             version: '0.0.0',
    //             lastBlockHeight: 0,
    //             lastBlockAppHash: ""
    //         }
    //     }
    //     // info (request) {
    //     //     console.log('got info request', request)
    //     //    return { code: 4, log: 'tx succeeded',type:4 }
    //     // }
    //
    //     // implement any ABCI method handlers here
    // })
    // server.listen(46658)
    // return;
/*
    //const Sockette = require('sockette');
    let createABCIServer = require('abci')

// turn on debug logging
    require('debug').enable('abci*')

    let state = {
        count: 0
    }

    let handlers = {
        info (request) {
            return {
                data: 'Node.js counter app',
                version: '0.0.0',
                lastBlockHeight: 0,
                lastBlockAppHash: Buffer.alloc(0)
            }
        },

        checkTx (request) {
            console.log(request.tx.toString());
           // console.log(request);
            return { code: 0, log: 'tx succeeded' }
            let number = request.tx.readUInt32BE(0)
            if (number !== state.count) {
                return { code: 1, log: 'tx does not match count' }
            }
            return { code: 0, log: 'tx succeeded' }
        },

        deliverTx (request) {
           // console.log(request.tx.toString());
            return { code: 0, log: 'tx succeeded' }
            let number = request.tx.readUInt32BE(0)
            if (number !== state.count) {
                return { code: 1, log: 'tx does not match count' }
            }

            // update state
            state.count += 1

            return { code: 0, log: 'tx succeeded' }
        }
        // ,
        // commit(request) {
        //     console.log(request.tx.toString());
        //     return { code: 0, log: 'tx succeeded' }
        //     let number = request.tx.readUInt32BE(0)
        //     if (number !== state.count) {
        //         return { code: 1, log: 'tx does not match count' }
        //     }
        //
        //     // update state
        //     state.count += 1
        //
        //     return { code: 0, log: 'tx succeeded' }
        // }
    }

    let port = 46658
    createABCIServer(handlers).listen(port, () => {
        console.log(`listening on port ${port}`)
    })
    return;
    */
    // EventBond              = "Bond"
    // EventCompleteProposal  = "CompleteProposal"
    // EventDupeout           = "Dupeout"
    // EventFork              = "Fork"
    // EventLock              = "Lock"
    // EventNewBlock          = "NewBlock"
    // EventNewBlockHeader    = "NewBlockHeader"
    // EventNewRound          = "NewRound"
    // EventNewRoundStep      = "NewRoundStep"
    // EventPolka             = "Polka"
    // EventRebond            = "Rebond"
    // EventRelock            = "Relock"
    // EventTimeoutPropose    = "TimeoutPropose"
    // EventTimeoutWait       = "TimeoutWait"
    // EventTx                = "Tx"
    // EventUnbond            = "Unbond"
    // EventUnlock            = "Unlock"
    // EventVote              = "Vote"
    // EventProposalHeartbeat = "ProposalHeartbeat"
    const ws = new Sockette('ws://'+socketServerAddress+':46657/websocket', {
        timeout: 1000,
        maxAttempts: 5e3,
        onopen: e => {//console.log('Connected!', e)
            ws.send('{"jsonrpc": "2.0", "id": "11", "method": "subscribe", "params": ["tm.event=\'Tx\'"] }');
        },
        // onmessage: e => {console.log('Received:', e)
        //     Meteor.bindEnvironment((obj)
        //     Transactions.insert(e);
        // )
        onmessage:  e =>{ f(e)},
        onreconnect: e => console.log('Reconnecting...', e),
        onmaximum: e => console.log('Stop Attempting!', e),
        onclose: e => console.log('Closed!', e),
        onerror: e => console.log('Error:', e)
    });
});
