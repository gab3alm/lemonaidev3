import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import {ConversationSubscriptionModel} from '../models/conv.subscriptions.model';
export const ConversationSubscriptions = new Mongo.Collection<ConversationSubscriptionModel>('convsubs');

ConversationSubscriptions.allow({
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