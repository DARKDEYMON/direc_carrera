Template.listapos.onCreated(function(){
    this.listapos = new ReactiveVar([]);
    this.nroitems = new ReactiveVar({});
    this.gestion = new ReactiveVar(new Date().getFullYear());
    this.periodo = new ReactiveVar(1);
    self = this;
    self.autorun(function(){
        user = Meteor.user();
        if(!user){
            return
        }
        Meteor.call('getPostulantes', user.profile.carrera, self.gestion.get(), self.periodo.get(), (error, result)=>{
            return self.listapos.set(result.rows);
        });
        Meteor.call('getNoItemsBa',user.profile.carrera, self.gestion.get(), (error, result)=>{
            return self.nroitems.set(result.rows[0]);
        });
    });
});

Template.listapos.helpers({
    listapos: function() {
        return Template.instance().listapos.get();
    },
    gestion: function(){
        return Template.instance().gestion.get();
    },
    periodo: function(){
        return Template.instance().periodo.get();
    },
    indexre: function(re){
        return re + 1;
    },
    estador: function(re){
        switch(re){
            case 'P' || 'C':
                return "Aceptado";
                break;
            case 'R':
                return "Rechazado";
                break;
            case '':
                return "No calificado";
                break;
            default:
                return "Algo va mal";
        }
    },
    conbeca(re){
        var nro = re+1;
        var can = Number(Template.instance().nroitems.get().id_items);
        if(nro<=can)
            return "SI"
        else
            return "NO"
    }
});

Template.listapos.events({ 
    'change .gest': function(event, template) { 
        var gestion = Number(document.getElementById("gestion").value);
        Template.instance().gestion.set(gestion);
        var periodo = Number(document.getElementById("periodo").value);
        Template.instance().periodo.set(periodo);
        return;
    },
    'click #res': function(event, template){
        var progra = Meteor.user().profile.carrera;
        var ges = Template.instance().gestion.get();
        window.open("http://10.10.165.134:8080/pentaho/api/repos/:public:Steel%20Wheels:becali.prpt/generatedContent?programa="+progra+"&gestion="+ges+"&output-target=pageable/pdf&userid=admin&password=password")
    }
});