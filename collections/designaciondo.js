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
    docente_id : {
        type : String,
        label : "Docente",
        regEx: SimpleSchema.RegEx.Id,
        optional: false,
    },
    materia_id : {
        type : String,
        label : "Asignar Materia",
        regEx: SimpleSchema.RegEx.Id,
        optional: false,
        autoform : {
            firstOption : '(Seleccione una materia)',
        },
        custom : function(){
            modifi = this.obj.$set || this.obj;
            /* no tan efic */
            //designacionDct.find({grupo:{$nin:[1,2]}}).fetch()
            if(!(designacionDct.find({materia_id:modifi.materia_id,gestion:modifi.gestion,periodo:modifi.periodo,grupo:modifi.grupo}).count()===0))
                return ('designado');
        }
    },
    gestion : {
        type : Number,
        label : "Gestion",
        optional: false,
        /* vereificar si es asi */
        autoValue : function(){
            return new Date().getFullYear();
        }
    },
    /* emulado */
    periodo : {
        type : Number,
        label : "Periodo",
        optional: false,
        /* vereificar si es asi */
        autoValue : function(){
            da = new Date().getMonth();
            return  da>=5 ? 2 : 1;
        }
    },
    grupo : {
        type : Number,
        label : "Grupo",
        optional : false,
        autoform :{
            firstOption : '(Seleccione un grupo)',
            options : function(){
                dat = [{val:1},{val:2},{val:3},{val:4}]
                return _.map(dat,function(dat){
                    return { label: dat.val , value: dat.val };
                });
            }
        },
        custom : function(){
            //console.log('aqui');
            if(!(designacionDct.find({materia_id:modifi.materia_id,gestion:modifi.gestion,periodo:modifi.periodo,grupo:modifi.grupo}).count()===0))
                return ('designado_grupo');
        }
    }
},{tracker : Tracker});

designacionDct.attachSchema(designacionDctShema);
