import SimpleSchema from 'simpl-schema';
import { error } from 'util';

SimpleSchema.extendOptions(['autoform']);

SimpleSchema.setDefaultMessages({
    initialLanguage: 'en',
    messages: {
      en: {
        required: '{{label}} es requerido',
        yaProgramado : "Materia ya Programada"
      },
      es: {
        required: '{{label}} es requerido',
        yaProgramado : "Materia ya Programada"
      },
    },
});

progra = new Mongo.Collection("progra");

prograShema = new SimpleSchema({
    alumno_id :{
        type : String,
        label : "ID DE ALUMNO",
        //regEx: SimpleSchema.RegEx.Id, //esto momentaneo
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
        //regEx: SimpleSchema.RegEx.Id,
        optional: false,
        autoform : {
            firstOption : '(Seleccione una materia)',
        },
        custom : function(){
            //console.log(this.obj.$set);
            modifi = this.obj.$set || this.obj;
            //console.log(progra.find({materias_id:modifi.materias_id,alumno_id:modifi.alumno_id}).count());
            if(!(progra.find({materias_id:modifi.materias_id, alumno_id:modifi.alumno_id, gestion_id:modifi.gestion_id, periodo_id:modifi.periodo_id }).count()===0))
                return "yaProgramado";
        }
    },
    dateInsert : {
        type : Date,
        label :"Fecha de insercion",
        autoValue : function(){
            if (this.isSet || this.isUpdate) {
                return this.value;
            }
            return new Date();
        },
        autoform: {
			type:"hidden"
		}
    },
    postgre_id : {
        type : Number,
        //unique : true,
        label : "id de postgres",
        optional : true
    },
    //aqui
    gestion_id : {
        type : Number,
        label : "id de gestion",
        optional : true
    },
    periodo_id : {
        type : Number,
        label : "id de periodo",
        optional :true
    },
    id_grupo : {
        type : Number,
        label : "Grupo",
        optional : false,
        autoform :{
            firstOption : '(Seleccione un grupo)',
            /*
            options : function(){
                dat = [{val:1},{val:2}]
                return _.map(dat,function(dat){
                    return { label: dat.val , value: dat.val };
                });
            }
            */
        },
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
    */
    metodo_programacion : {
        type : String,
        label : "tipo programacion",
        autoform: {
			type:"hidden"
		}
    },
    /*
    _estado : {
        type : String,
    },
    tipo_programacion : {
        type : String,
    }
    */
},{tracker: Tracker});

progra.attachSchema(prograShema);