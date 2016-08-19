import {ProjectSubscriptions} from '../../both/collections/projectSubscriptions';
import {Meteor} from 'meteor/meteor';

Meteor.publish('getProjectSubscriptions', function(ID){
  return ProjectSubscriptions.find({'_id':ID});
});