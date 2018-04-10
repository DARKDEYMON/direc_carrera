
Template.programarespecial.onCreated(function(){
    this.resMallaId = new ReactiveVar(2016);
    this.resMateriaProgra = new ReactiveVar([]);
    this.gestionb = new ReactiveVar(false);

    this.gestion = new ReactiveVar('2018');
    this.periodo = new ReactiveVar('1');

    var self = this;
    this.id = FlowRouter.getParam('id');

    this.veriPrograEs = new ReactiveVar(false);
    
    self.autorun(function() { 
        self.subscribe('materias');
        self.subscribe('progra');
        //res = await Meteor.call('getAlumPlan',self.id);
        //console.log(res);
        Meteor.call('getMateriasFaltantes',self.resMallaId.get() ,self.id ,(error, result)=>{
            return self.resMateriaProgra.set(result.rows);
        });
        Meteor.call('getVeriFechaLimiteProEspecial',self.gestion.get(),self.periodo.get(),(error, result)=>{
            /*usar esto en produccion */
            //return self.veriPrograEs.set(result.rows[0].verificarfechaprogramacionespecial);
            return self.veriPrograEs.set(true);
        });
    });
});

Template.programarespecial.helpers({
    veriPrograEs: function(){
        //console.log(Template.instance().veriPrograEs.get());
        return Template.instance().veriPrograEs.get();
    },
    gestion:  function(){
        return Template.instance().gestion.get();
    },
    periodo: function(){
        return Template.instance().periodo.get();
    },
    idAlumno: function(){
        return FlowRouter.getParam('id');
    },
    getOptions: function() {
        var cursor = Template.instance().resMateriaProgra.get();
        //console.log(cursor);

        return cursor.map(function(doc){
            return {label: doc.r_materia, value: doc.r_id_materia};
        });
    },
    getOptionGroups: function(){
        dat = [{val:1},{val:2},{val:3},{val:4},{val:5},{val:6},{val:7},{val:8}]

        return _.map(dat,function(dat){
            return { label: dat.val , value: dat.val };
        });
    },
    getInitYear : function(){
        return new Date().getFullYear();
    },
    gestionChange : function(){
        return Template.instance().gestionb.get();
    }
});

Template.programarespecial.events({
    'submit .gest': function(event, template){
        event.preventDefault();
        event.stopPropagation();

        gestion = event.target.gestion.value.trim();
        Template.instance().gestion.set(gestion);
        
        periodo = event.target.periodo.value.trim();
        Template.instance().periodo.set(periodo);

        var id = FlowRouter.getParam('id');
        //console.log(id);
        Template.instance().gestionb.set(true);
    },
    'change .gest':function(event, template){
        Template.instance().gestionb.set(false);
    }
});