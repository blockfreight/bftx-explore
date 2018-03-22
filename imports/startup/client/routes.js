import {FlowRouter} from 'meteor/kadira:flow-router';
import {mount} from 'react-mounter';
import React from 'react';
import RichGridDeclarativeExample from "../../ui/latest-transactions";
import Layout from "../../ui/layout";

FlowRouter.route('/', {
    action(){
        mount(Layout, {main: <RichGridDeclarativeExample />});
    }
});
FlowRouter.route('/login', {
    action(){
        if (Meteor.userId()) {
            FlowRouter.go('/dashboard');
        }
        else {
            mount(Layout, {main: <RichGridDeclarativeExample />});

        }
    }
});
FlowRouter.route('/signup', {
    action(){
        if (Meteor.userId()) {
            FlowRouter.go('/signup');
        }
        else {
            mount(Layout, {main: <SignUp />});

        }
    }
});