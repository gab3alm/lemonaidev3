import {Mongo} from 'meteor/mongo';
import {ProjectModel} from '../models/project.streams.model';
export let ProjectStream = new Mongo.Collection<ProjectModel>('projectstream');

ProjectStream.allow({
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