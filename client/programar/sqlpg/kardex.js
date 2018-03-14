
Template.kardex.onCreated(function(){
    this.resKardex = new ReactiveVar([]);
    this.all = new ReactiveVar(false);
    ru = FlowRouter.getParam('ru');
    self = this;
    //console.log(ru);
    self.autorun(function() { 
        Meteor.call('getKardex',ru,self.all.get(),(error, result) => {
            //console.log(result.rows);
            self.resKardex.set(result.rows);
        });
    });
});

Template.kardex.helpers({
    kardex : function() {
        return Template.instance().resKardex.get();
    },
    resApro : function(dat){
        return dat>=51 ?'Aprobado': 'Reprobado';
    },
    classRepro : function(dat){
        return dat>=51 ? '' : 'repro';
    }
});

Template.kardex.events({ 
    'change' : function(event, template) {
        //console.log(event.currentTarget.value)
        if(event.currentTarget.value=='T')
            Template.instance().all.set(true);
        else
            Template.instance().all.set(false);
        //console.log(Template.instance().all.get());
    }
});