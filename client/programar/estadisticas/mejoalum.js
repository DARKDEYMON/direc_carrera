Template.mejoalum.onCreated(function(){
    this.mejorest = new ReactiveVar([]);
    this.gestion = new ReactiveVar(2015);
    this.periodo = new ReactiveVar(1);
    self = this;
    self.autorun(function(){
        const user = Meteor.user();
        if (!user) {
            return;
        }
        Meteor.call('getMejorEstudiante', user.profile.carrera, self.gestion.get(), self.periodo.get(), function(error, result){
            return self.mejorest.set(result.rows);
        });
    })
});

Template.mejoalum.helpers({
    mejalum: function() {
        return Template.instance().mejorest.get();
    },
    gestion: function(){
        return Template.instance().gestion.get();
    },
    periodo: function(){
        return Template.instance().periodo.get();
    },
    indexre: function(re){
        return re + 1;
    }
});

Template.mejoalum.events({
    'change .gest': function(event, template) {
        var gestion = Number(document.getElementById("gestion").value);
        Template.instance().gestion.set(gestion);
        var periodo = Number(document.getElementById("periodo").value);
        Template.instance().periodo.set(periodo);
        return;
    }
});