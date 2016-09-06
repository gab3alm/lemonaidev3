import {Meteor} from 'meteor/meteor';
import {ProjectsStream} from '../../both/collections/projectsStream';
import {ProjectSubscriptions} from '../../both/collections/projectSubscriptions';
import {Task} from '../../both/classes/task';
import {Users} from '../../both/collections/users';

function getName(ID){
  var firstname = Users.find({"_id":ID}).fetch()[0].profile.firstname;
  var lastname = Users.find({"_id":ID}).fetch()[0].profile.lastname;
  var name = firstname + " " + lastname;
  return name;
}

Meteor.methods({
  // Create new task in the given ProjectStream
  createNewTask: function(streamID:string, title:string, duedate:string, description:string){
    var now = new Date().toString();
    var assigner = getName(Meteor.userId());
    var task = new Task(now, assigner, title, description, duedate);
    ProjectsStream.update({'_id':streamID}, {$addToSet:{
      'pending': task
    }});
  },

  // Changes Project Visibility Field (public field)
  changeProjectVisibility: function(projectID:string, visibility:boolean){
    ProjectsStream.update({'_id':projectID}, {$set: {
      'public':visibility
    }});
  },

  checkProjectVisibility: function(projectID:string){
    // get the visibility of the project
    var visibility = ProjectsStream.find({'_id':projectID}).fetch()[0].public;
    if(!visibility){
      // Get array of all users allowed into the project
      var exceptions = ProjectsStream.find({'_id':projectID}).fetch()[0].allowed;
      if(exceptions.indexOf(Meteor.userId()) != -1){
        // user was found on list
        return {permission:true};
      }else{
        // user was not found on list
        return {permission:false};
      }
    }else{
      // Project visibility is open to everyone
      return {permission:true};
    }
  },

  // 

});