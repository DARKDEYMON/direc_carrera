
Template.ranking.onCreated(function(){
    this.ranking = new ReactiveVar([]);
    ru = FlowRouter.getParam('ru');
    self = this;
    self.autorun(function() { 
        Meteor.call('getRanking',ru,(error, result) => {
            self.ranking.set(result.rows);
        });
    });
});

Template.ranking.helpers({
    ranking : function() {
        return Template.instance().ranking.get();
    }
});

Template.ranking.events({ 
    'change' : function(event, template) {
        
    }
});