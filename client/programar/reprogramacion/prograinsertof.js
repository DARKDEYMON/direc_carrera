
Template.programarof.onCreated(function(){
    this.resMateria = new ReactiveVar([]);
    this.gestionb = new ReactiveVar(false);
    this.gestion = new ReactiveVar('2018');
    this.periodo = new ReactiveVar('1');
    this.certf = new ReactiveVar('');
    
    this.certfValid = new ReactiveVar(undefined);
    //console.log("aqui");
    this.cantGroup = new ReactiveVar(0);

    id = FlowRouter.getParam('id');
    var self = this;

    self.autorun(function() {
        self.subscribe('materias');
        self.subscribe('progra');
        Meteor.call('getMateriasProgra',id,self.gestion.get() ,self.periodo.get() ,(error, result)=>{
            //console.log(result.rows);
            return self.resMateria.set(result.rows);
        });
        if(self.certf.get()!=''){
            //console.log(id+" "+self.certf.get())
            Meteor.call('getCertiValid',id ,self.certf.get(), (error, result)=>{
                //console.log(result.rows[0].estudianteloginkey);
                return self.certfValid.set(true)
                /*poner esta en produccion */
                //return self.certfValid.set(result.rows[0].estudianteloginkey);
            });
        }
    });
});

Template.programarof.helpers({
    idAlumno: function(){
        return FlowRouter.getParam('id');
    },
    gestion:  function(){
        return Template.instance().gestion.get();
    },
    periodo: function(){
        return Template.instance().periodo.get();
    },
    getOptions: function(){
        cursor = Template.instance().resMateria.get();
        //console.log(cursor);
        return cursor.map(function(doc){
            //console.log(doc)
            return {label: doc.r_materia, value: doc.r_id_materia};
        });
    },
    gestionb : function(){
        //console.log(Template.instance().gestionb.get())
        //console.log("aqui");
        return Template.instance().gestionb.get();
    },
    getInitYear : function(){
        return new Date().getFullYear();
    },
    getCertfValid : function(){
        /* errores verificar */
        var res = Template.instance().certfValid.get();
        var res1 = Template.instance().gestionb.get();
        //console.log(res);
        if(res===undefined)
            return true && res1;
        /* retornar res en produccion enves de true  */
        return res && res1;
    },
    getCertInvalidMessage: function(){
        /*ver q pasa */
        var res = Template.instance().certfValid.get();
        if(res==undefined)
            return false;
        return !res;
    },
    getOptionGroups(){
        res = Template.instance().cantGroup.get();
        dataArray = []; 
        for(i=0;i<res;i++){
            dataArray[i]={val:(i+1)};
        }
        //console.log(dataArray);
        return _.map(dataArray, function(dat){
            return { label: dat.val , value: dat.val };
        });
    }
});

Template.programarof.events({
    'submit .gest' : function(event, template){
        event.preventDefault();
        event.stopPropagation();

        Template.instance().gestionb.set(true);
        gestion = event.target.gestion.value.trim();
        Template.instance().gestion.set(gestion);
        //console.log(gestion);
        
        periodo = event.target.periodo.value.trim();
        Template.instance().periodo.set(periodo);
        //console.log(periodo);

        certf = event.target.certf.value.trim();
        Template.instance().certf.set(certf);

        return false;
    },
    /* solo al cambiar el form actualizar */
    'change .gest' : function(event, template){
        Template.instance().certfValid.set(false);
    },
    'change #insertProgramarForm33 select[name="materias_id"]':function(event, template){
        /*evento de cambio*/
        var matid = event.target.value.trim();
        var ges = Template.instance().gestion.get();
        var peri = Template.instance().periodo.get();
        var asig = Template.instance().cantGroup;
        
        var res = Meteor.call('getGruposMateria', matid, ges, peri, (error, result)=>{
            //console.log(result.rows[0].grupos);
            asig.set(result.rows[0].grupos);
        });

        //aqui = Template.instance()
    }
});