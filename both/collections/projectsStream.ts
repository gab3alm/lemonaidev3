import {Mongo} from 'meteor/mongo';
import {ProjectModel} from '../models/projects.stream.model';
export let ProjectsStream = new Mongo.Collection<ProjectModel>('projectsstream');

ProjectsStream.allow({
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