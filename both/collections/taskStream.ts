import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export let TaskStreams = new Mongo.Collection('taskstreams');

TaskStreams.allow({
  insert: function() {
    let user = Meteor.user();
    
    return !!user;
  },
  update: function() {
    let user = Meteor.user();
    
    return !!user;
  },
  remove: function() {
    let user = Meteor.user();
    
    return !!user;
  }
});

