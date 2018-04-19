Template.listaprogra.onCreated(function(){
    this.progra = new ReactiveVar([]);
    this.gestion = new ReactiveVar(2017);
    this.periodo = new ReactiveVar(1);
    this.limite = new ReactiveVar(10);
    this.ru = new ReactiveVar('');
    self = this;
    self.autorun(function(){
        const user = Meteor.user();
        if (!user) {
            return;
        }
        Meteor.call('getProgramaciones', user.profile.carrera, self.gestion.get(), self.periodo.get(), self.limite.get(), self.ru.get(), (error, result)=>{
            return self.progra.set(result.rows);
        });
    });
});

Template.listaprogra.helpers({
    progra: function() {
        return Template.instance().progra.get();
    },
    gestion: function(){
        return Template.instance().gestion.get();
    },
    periodo: function(){
        return Template.instance().periodo.get();
    }
});

Template.listaprogra.events({
    'change .gest': function(event, template) {
        var gestion = Number(document.getElementById("gestion").value);
        Template.instance().gestion.set(gestion);
        var periodo = Number(document.getElementById("periodo").value);
        Template.instance().periodo.set(periodo);
        return;
    },
    'click .dispmore': function(event, template){
        Template.instance().limite.set(Template.instance().limite.get()+10);
        return;
    },
    'keyup .search': function(event,template){
        var res = event.target.value.trim();
        Template.instance().ru.set(res);
        return
    }
});