import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

SimpleSchema.setDefaultMessages({
    initialLanguage: 'en',
    messages: {
      en: {
        required: '{{label}} es requerido',
        yaProgramado : "Materia ya Programada",
        designado : "La Materia ya esta designada",
        designado_grupo : "El grupo ya esta Desiganado"
      },
      es: {
        required: '{{label}} es requerido',
        designado : "La Materia ya esta designada",
        designado_grupo : "El grupo ya esta designado"
      },
    },
});

designacionDct = new Mongo.Collection('designacionDct');

designacionDctShema = new SimpleSchema({
    id_docente : {
        type : String,
        label : "Docente",
        //regEx: SimpleSchema.RegEx.Id,
        optional: false,
        autoform : {
            firstOption : '(Seleccione uno)',
        },
    },
    id_materia : {
        type : String,
        label : "Asignar Materia",
        //regEx: SimpleSchema.RegEx.Id,
        optional: false,
        autoform : {
            firstOption : '(Seleccione una materia)',
        },
        custom : function(){
            modifi = this.obj.$set || this.obj;
            /* no tan efic */
            //designacionDct.find({grupo:{$nin:[1,2]}}).fetch()
            if(!(designacionDct.find({id_docente:modifi.id_docente,id_gestion:modifi.id_gestion,id_periodo:modifi.id_periodo,id_grupo:modifi.id_grupo}).count()===0))
                return ('designado');
        }
    },
    id_gestion : {
        type : Number,
        label : "Gestion",
        optional: false,
        /*
        autoValue : function(){
            return new Date().getFullYear();
        }
        */
    },
    /* emulado */
    id_periodo : {
        type : Number,
        label : "Periodo",
        optional: false,
        /*
        autoValue : function(){
            da = new Date().getMonth();
            return  da>=5 ? 2 : 1;
        }
        */
    },
    id_grupo : {
        type : Number,
        label : "Grupo",
        optional : false,
        /*
        autoform :{
            firstOption : '(Seleccione un grupo)',
            options : function(){
                dat = [{val:1},{val:2},{val:3},{val:4}]
                return _.map(dat,function(dat){
                    return { label: dat.val , value: dat.val };
                });
            }
        },
        */
        custom : function(){
            //console.log('aqui');
            if(!(designacionDct.find({id_docente:modifi.id_docente,id_gestion:modifi.id_gestion,id_periodo:modifi.id_periodo,id_grupo:modifi.id_grupo}).count()===0))
                return ('designado_grupo');
        }
    }
},{tracker : Tracker});

designacionDct.attachSchema(designacionDctShema);
