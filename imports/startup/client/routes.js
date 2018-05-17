import {FlowRouter} from 'meteor/kadira:flow-router';
import {mount} from 'react-mounter';
import React from 'react';
//import RichGridDeclarativeExample from "../../ui/latest-transactions";
import Layout from "../../ui/layout";
import TransactionList from "../../ui/TransactionList"
import Transaction from "../../ui/Transaction"
FlowRouter.route('/', {
    action(){
        mount(Layout, {main: <TransactionList />});
    }
});
FlowRouter.route('/t/:t', {
    action(){
        mount(Layout, {main: <Transaction />});
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