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
    },
    /*
    ult_usuario :{
        type : String,
        // esta funcion en produccion
        autoValue :function(){
            return "asdjbmkkjh";
        }
    },
    estado : {
        type : String,
    },
    marcador : {
        type : String,
    },
    pparcial : {
        type : Number,
    },
    sparcial : {
        type : Number,
    },
    tparcial : {
        type : Number,
    },
    cparcial : {
        type : Number
    },
    promparcial : {
        type : Number,
    },
    pract : {
        type : Number,
    },
    prompract : {
        type : Number,
    },
    lab :{
        type : Number,
    },
    promlab : {
        type : Number,
    },
    notapre : {
        type : Number,
    },
    exfinal : {
        type: Number,
    },
    promexfinal :{
        type : Number,
    },
    nota : {
        type : Number,
    },
    nota_2da : {
        type : Number,
    },
    nota_ex_mesa : {
        type : Number,
    },
    obserbacion : {
        type : String,
    },
    num_2do_turno : {
        type : Number,
    },
    tipo_prog : {
        type : String,
    },
    metodo_programacion : {
        type : String,
    },
    _estado : {
        type : String,
    },
    tipo_programacion : {
        type : String,
    }
    */
},{tracker: Tracker});

progra.attachSchema(prograShema);