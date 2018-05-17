import {Transactions} from "../lib/collections"
Meteor.startup(() => {
    Meteor.publish('transactions', function() {
        console.log("data")
        return Transactions.find({},{sort:{TxTimestamp:-1}});
    });

})

