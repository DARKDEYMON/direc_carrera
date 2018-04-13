
Template.mallas.onCreated(function(){
    this.mallas = new ReactiveVar([]);
    self=this;
    self.autorun(function(){
        const user = Meteor.user();
        if (!user) {
            return;
        }
        Meteor.call('getCanPlanes',user.profile.carrera ,function(error,resul){
            return self.mallas.set(resul.rows);
        });
    });
});

Template.mallas.helpers({
    mallas: function() {
        return Template.instance().mallas.get();
    }
});