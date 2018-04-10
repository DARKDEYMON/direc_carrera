
Template.ranking.onCreated(function(){
    this.ranking = new ReactiveVar([]);
    ru = FlowRouter.getParam('ru');
    self = this;
    //console.log(ru);
    self.autorun(function() { 
        Meteor.call('getRanking',ru,(error, result) => {
            //console.log(result.rows);
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