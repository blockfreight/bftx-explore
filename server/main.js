import { Meteor } from 'meteor/meteor';
import {Transactions} from "../imports/api/lib/collections";
import "/imports/api/server/publications"
import Sockette from "sockette"
//import {Base64} from "base64"
import _ from "lodash"
WebSocket = require('ws')
f = Meteor.bindEnvironment((e,cb) => {
     //   console.log(e);
    let result = JSON.parse(e.data)

    if( _.get(result, 'result.data.type')== "tx")
    {
        Transactions.insert(JSON.parse(String.fromCharCode.apply(null, Base64.decode(result.result.data.data.tx))));
        //.result.data.data

    }
          // cb()

})
function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

HTTP.get("http://localhost:46657/status",(e,r)=>{
    if(e){
        console.log(e);
        return;
    }

    console.log(r.data.result.latest_block_height)
    for(var i = parseInt(r.data.result.latest_block_height);i!=0;i-- ){
        HTTP.get("http://localhost:46657/block?height="+i,(e,r)=>{
            //console.log(r.data.result.block.data.txs)
           // if(r.data.result.block.data.txs.length >0){
                    r.data.result.block.data.txs.forEach(o=>{
                        if(isJson(String.fromCharCode.apply(null, Base64.decode(o)))){
                        //Transactions.insert(JSON.parse(String.fromCharCode.apply(null, Base64.decode(result.result.data.data.tx)));
                        console.log(String.fromCharCode.apply(null, Base64.decode(o)));
                        let jsonObject = JSON.parse(String.fromCharCode.apply(null, Base64.decode(o)))

                        Transactions.upsert(jsonObject.Id,jsonObject);
                        }
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
    const ws = new Sockette('ws://localhost:46657/websocket', {
        timeout: 5e3,
        maxAttempts: 10,
        onopen: e => {//console.log('Connected!', e)
            ws.send('{"jsonrpc": "2.0", "id": "11", "method": "subscribe", "params": ["tm.event=\'Tx\'"] }');
        },
        // onmessage: e => {console.log('Received:', e)
        //     Meteor.bindEnvironment((obj)
        //     Transactions.insert(e);
        // )
        onmessage:  e =>{

                f(e)},
        onreconnect: e => console.log('Reconnecting...', e),
        onmaximum: e => console.log('Stop Attempting!', e),
        onclose: e => console.log('Closed!', e),
        onerror: e => console.log('Error:', e)
    });
});
