
Template.kardex.onCreated(function(){
    this.resKardex = new ReactiveVar([]);
    Meteor.call('getKardex',(error, result) => {
        this.resKardex.set(result.rows)
    });
});

Template.kardex.helpers({
    kardex : function() {
        return Template.instance().resKardex.get();
    }
});