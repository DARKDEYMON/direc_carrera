Template.calificarbal.onCreated(function(){
    this.gestion = new ReactiveVar(FlowRouter.getParam('ges'));
    this.ifamiliar = new ReactiveVar([]);
    this.ieconomico = new ReactiveVar([]);
    this.iprocedencia = new ReactiveVar([]);
    this.ivivienda = new ReactiveVar([]);
    this.datpersonales = new ReactiveVar({});
    this.datacademicos = new ReactiveVar({});
    this.id = FlowRouter.getParam('id');
    self = this;
    self.autorun(function(){
        /*
        user = Meteor.user();
        if(!user){
            return
        }
        */
        Meteor.subscribe('postulanteba', self.id, self.gestion.get());
        Meteor.call('inFamiliar', self.gestion.get(),(error, result)=>{
            return self.ifamiliar.set(result.rows);
        });
        Meteor.call('inEconomico', self.gestion.get(), (error, result)=>{
            return self.ieconomico.set(result.rows);
        });
        Meteor.call('inProcedencia', self.gestion.get(), (error, result)=>{
            return self.iprocedencia.set(result.rows);
        });
        Meteor.call('inVivienda', self.gestion.get(), (error, result)=>{
            return self.ivivienda.set(result.rows);
        });
        Meteor.call('getDatPersonalesBa',self.id ,self.gestion.get(), (error, result)=>{
            return self.datpersonales.set(result.rows[0]);
        });
        Meteor.call('getAcademicoBa', self.id,(error, result)=>{
            return self.datacademicos.set(result.rows[0]);
        });
    });
});

Template.calificarbal.helpers({
    ifamiliar: function() {
        return Template.instance().ifamiliar.get().map(function(dat){
            return{label: dat.descripcion+",------- Puntaje:" +dat.puntaje ,value: dat.id_p_fam};
        });
    },
    ieconomico: function() {
        return Template.instance().ieconomico.get().map(function(dat){
            return{label: dat.rango_1+"-"+dat.rango_2+",------- Puntaje:" +dat.puntaje ,value: dat.id_p_eco};
        });
    },
    iprocedencia: function() {
        return Template.instance().iprocedencia.get().map(function(dat){
            return{label: dat.procedencia+",------- Puntaje:" +dat.puntaje ,value: dat.id_p_pro};
        });
    },
    ivivienda: function(){
        return Template.instance().ivivienda.get().map(function(dat){
            return{label: dat.descripcion+",------- Puntaje:" +dat.puntaje ,value: dat.id_p_viv_f};
        });
    },
    datpersonal: function(){
        return Template.instance().datpersonales.get();
    },
    datacademico: function(){
        return Template.instance().datacademicos.get();
    },
    formatoFecha: function(dat){
        return moment(dat).format('MMM D, YYYY')
    },
    estCivil: function(dat){
        if(dat===0)
            return "Soltero(a)";
        else
            return "Casado(a)";
    },
    ru:function(){
        return FlowRouter.getParam('id');
    },
    gestion:function(){
        return FlowRouter.getParam('ges');
    },
    //mongo
    existeMongo(){
        if(postulantesba.find().count()>0)
            return true;
        else
            return false;
    },
    docMongo(){
        return postulantesba.findOne();
    }
});

AutoForm.hooks({
    postali:{
        onSuccess: function(formType, result){
            FlowRouter.go('listapos');
        }
    }
});