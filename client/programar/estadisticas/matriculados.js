Template.matriculados.onCreated(function(){
    this.cantidad = new ReactiveVar([]);
    this.matriculados = new ReactiveVar([]);
    this.ru = new ReactiveVar('');
    this.limite = new ReactiveVar(10);
    this.gestion = new ReactiveVar(2018);
    this.periodo = new ReactiveVar(1);
    self = this;
    self.autorun(function(){
        const user = Meteor.user();
        if (!user) {
            return;
        }
        Meteor.call('getMatriculadosCant',user.profile.carrera ,self.gestion.get() ,self.periodo.get() ,(error, result)=>{
            return self.cantidad.set(result.rows[0].can);
        });
        Meteor.call('getMatriculados',user.profile.carrera ,self.gestion.get() ,self.periodo.get() ,self.limite.get(),self.ru.get() ,(error, result)=>{
            return self.matriculados.set(result.rows);
        });
    });
});

Template.matriculados.helpers({
    cantidad : function() {
        return Template.instance().cantidad.get();
    },
    matriculados : function() {
        return Template.instance().matriculados.get()
    },
    gestion: function(){
        return Template.instance().gestion.get();
    },
    periodo: function(){
        return Template.instance().periodo.get();
    }
});

Template.matriculados.events({ 
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