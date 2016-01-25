
var Time = new Mongo.Collection("time");

if (Meteor.isClient)
{
    Meteor.subscribe("serverTime");
    var localTime = new ReactiveVar('');


    Template.body.helpers({
        localTime: function () {
            return localTime.get();
        },
        serverTime: function () {
            return Time.find();
        }
    });

    Meteor.setInterval(function () {
        var currentTime = new Date(),
            timeString = currentTime.getHours() + ':' + currentTime.getSeconds();

        localTime.set(timeString)
    }, 10);
}



if (Meteor.isServer)
{
    Meteor.publish("serverTime", function () {
        return Time.find();
    });

    Meteor.setInterval(function () {
        var currentTime = new Date(),
            timeString = currentTime.getHours() + ':' + currentTime.getSeconds();

        Time.update( new Mongo.ObjectID('56a62e51ddbf2f75b554e82a'), {value: timeString} )

    }, 10);
}
