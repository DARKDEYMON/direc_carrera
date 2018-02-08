import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

SimpleSchema.setDefaultMessages({
    initialLanguage: 'en',
    messages: {
      en: {
        required: '{{label}} es requerido',
      },
      es: {
        required: '{{label}} es requerido',
      },
    },
});

progra = new Mongo.Collection("progra");

prograShema = new SimpleSchema({
    alumno_id :{
        type : String,
        label : "ID DE ALUMNO",
        regEx: SimpleSchema.RegEx.Id,
        /*
        "regEx": [
            {msg: "Default Message"},
            {exp: SimpleSchema.RegEx.Url, msg: "You call that a URL?"}
          ],
        */
        optional: false
    },
    materias_id :{
        type : String,
        label : "MATERIAS",
        regEx: SimpleSchema.RegEx.Id,
        optional: false,
        autoform: {
            firstOption : '(Seleccione una materia)',
        }
    },
    dateInsert : {
        type : Date,
        label :"Fecha de insercion",
        autoValue : function(){
            return new Date();
        },
        autoform: {
			type:"hidden"
		}
    }
},{tracker: Tracker});

progra.attachSchema(prograShema);