
Template.mallas.onCreated(function(){
    this.mallas = new ReactiveVar([]);
    self=this;
    self.autorun(function(){
        Meteor.call('getCanPlanes',function(error,resul){
            return self.mallas.set(resul.rows);
        });
    });
});

Template.mallas.helpers({
    mallas: function() {
        return Template.instance().mallas.get();
    }
});