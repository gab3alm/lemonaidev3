import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import {ConversationStreamsModel} from '../models/conv.streams.model';

export let ConversationStreams = new Mongo.Collection<ConversationStreamsModel>("convstream");

ConversationStreams.allow({
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