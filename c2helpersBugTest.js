Courses = new Mongo.Collection("courses");

// Courses.helpers({
//   canEdit: function () {
//     return Meteor.userId() === this.owner;
//   },
// });


courseSchema = new SimpleSchema({
  owner: {
    type: String,
  },
  ownerName: {
    type: String,
  },
  title: {
    type: String,
    max: 120
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else {
        this.unset();
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  }
});

Courses.attachSchema(courseSchema);

Meteor.startup(function() {
  if (Meteor.isServer) {
    Courses.remove({});

    var courseId = Courses.insert({
      title: "test-course",
      owner: 'this.userId',
      ownerName: "someone",
    });
    var course = Courses.findOne();
    console.log(course);

    console.log(courseSchema.namedContext().validate(course) );
    console.log(courseSchema.namedContext().invalidKeys());

  }
});