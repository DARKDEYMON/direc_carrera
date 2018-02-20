import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

designacionDct = new Mongo.Collection('designacionDct');

designacionDctShema = new SimpleSchema({
    docente_id :{
        type : String,
        label : "Docente",
        regEx: SimpleSchema.RegEx.Id,
        optional: false,
    },
    materia_id :{
        type : String,
        label : "Asignar Materia",
        regEx: SimpleSchema.RegEx.Id,
        optional: false,
        autoform : {
            firstOption : '(Seleccione una materia)',
        },
    },
    gestion :{
        type : Number,
        label : "Gestion",
        optional: false,
        /* vereificar si es asi */
        autoValue : function(){
            return new Date().getFullYear();
        }
    },
    periodo : {
        type : Number,
        label : "Periodo",
        optional: false,
        /* vereificar si es asi */
        autoValue : function(){
            da = new Date().getMonth();
            return  da>=5 ? 2 : 1;
        }
    }
},{tracker : Tracker});

designacionDct.attachSchema(designacionDctShema);

