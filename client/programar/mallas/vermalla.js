Template.vermalla.onCreated(function(){
    this.plan = FlowRouter.getParam('id');
    this.mallac = new ReactiveVar([]);
    self=this;
    self.autorun(function(){
        Meteor.call('getMallaCurricular',self.plan ,function(error, result){
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