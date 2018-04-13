Template.vermalla.onCreated(function(){
    this.plan = FlowRouter.getParam('id');
    this.mallac = new ReactiveVar([]);
    self=this;
    self.autorun(function(){
        const user = Meteor.user();
        if (!user) {
            return;
        }
        Meteor.call('getMallaCurricular', self.plan, user.profile.carrera ,function(error, result){
            console.log(result.rows);
            return self.mallac.set(result.rows);
        });
    });
});

Template.vermalla.helpers({
    mallac: function() {
        return Template.instance().mallac.get();
    }
});