
Template.pensun.onCreated(function(){
    this.pensun = new ReactiveVar([]);
    ru = FlowRouter.getParam('ru');
    self = this;
    self.autorun(function() { 
        Meteor.call('getPensun',ru,(error, result) => {
            self.pensun.set(result.rows);
        });
    });
});

Template.pensun.helpers({
    ranking : function() {
        return Template.instance().pensun.get();
    }
});

Template.pensun.events({ 
    'change' : function(event, template) {
        
    }
});