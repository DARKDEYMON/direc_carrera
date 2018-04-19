Template.listdocentesof.onCreated(function(){
    this.docentes = new ReactiveVar([]);
    this.gestion = new ReactiveVar(2017);
    this.periodo = new ReactiveVar(1);
    self=this;
    self.autorun(function(){
        const user = Meteor.user();
        if(!user){
            return;
        }
        Meteor.call('getDocentes', user.profile.carrera, self.gestion.get(), self.periodo.get(), (error, result)=>{
            return self.docentes.set(result.rows);
        });
    });
});

Template.listdocentesof.helpers({
    docentes: function() {
        return Template.instance().docentes.get();
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

Template.listdocentesof.events({ 
    'change .gest': function(event, template) {
        var gestion = Number(document.getElementById("gestion").value);
        Template.instance().gestion.set(gestion);
        var periodo = Number(document.getElementById("periodo").value);
        Template.instance().periodo.set(periodo);
        console.log("aqui");
        return;
    }
});