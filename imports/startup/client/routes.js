import {FlowRouter} from 'meteor/kadira:flow-router';
import {mount} from 'react-mounter';
import React from 'react';
//import RichGridDeclarativeExample from "../../ui/latest-transactions";
import Layout from "../../ui/layout";
import TransactionList from "../../ui/TransactionList"
import Transaction from "../../ui/Transaction"
import Scan from "../../ui/Scan"
import Decrypt from "../../ui/Decrypt"
import Save from "../../ui/Save"
//import { Tracker } from 'meteor/tracker'
FlowRouter.route('/', {
    action(){
        mount(Layout, {main: <TransactionList />});
    }
});
FlowRouter.route('/t/:t', {
    action(){
        mount(Layout, {main: <Transaction action="view" {...this} />});
    }
});
FlowRouter.route('/scan', {
    action(){
        mount(Layout, {main: <Scan />});
    }
});
FlowRouter.route('/decrypt/:t', {
    action(){
        mount(Layout, {main: <Decrypt {...this} />});
    }
});
FlowRouter.route('/t/:t/:k', {
    action(){
        mount(Layout, {main: <Transaction  action="view" {...this} />});
    }
});
FlowRouter.route('/s/:t', {
    action(){
        mount(Layout, {main: <Save />});
    }
});
FlowRouter.route('/n/:t', {
    action(){
        mount(Layout, {main: <Transaction action="new" />});
    }
});
// FlowRouter.route('/login', {
//     action(){
//         if (Meteor.userId()) {
//             FlowRouter.go('/dashboard');
//         }
//         else {
//             mount(Layout, {main: <RichGridDeclarativeExample />});
//
//         }
//     }
// });
// FlowRouter.route('/signup', {
//     action(){
//         if (Meteor.userId()) {
//             FlowRouter.go('/signup');
//         }
//         else {
//             mount(Layout, {main: <SignUp />});
//
//         }
//     }
// });
// Tracker.autorun(function() {
//     FlowRouter.watchPathChange();
//
//     try{
//         //this.props.navigation.state.params.refresh()
//         var currentContext = FlowRouter.current();
//         //FlowRouter.reload(currentContext.path)
//         // do anything with the current context
//         // or anything you wish
//     }catch(e)
//     {
//
//     }
//
// });