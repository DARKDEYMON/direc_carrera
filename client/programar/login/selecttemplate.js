
Template.selecttemplate.onCreated(function(){
    this.carreras = new ReactiveVar([]);
    self = this;
    Meteor.call('getProgramas',(error,result)=>{
        res = result.rows.map(function(doc){
            return {text: doc.programa ,value: doc.id_programa}
        });
        self.carreras.set(res);
    });
});

Template.selecttemplate.helpers({
    carreras: function() {
        return Template.instance().carreras.get();
    }
});