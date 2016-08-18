import {Mongo} from 'meteor/mongo';
import {ProjectSubscriptionsModel} from '../models/project.subscriptions.model';

export const ProjectSubscriptions = new Mongo.Collection<ProjectSubscriptionsModel>('projectsubscriptions');

ProjectSubscriptions.allow({
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