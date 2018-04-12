T9n.setLanguage("es");
//poner a carrera
async function materias(){
	var res=[];
	res = await( new Promise((resolve, reject) => {
		Meteor.call('getProgramas',(error,result)=>{
			resolve( result.rows.map(function(doc){
				return {text: doc.programa ,value: doc.id_programa}
			}))
		});
	 })
	)
	return res;
}


console.log(materias());

AccountsTemplates.addFields([
	{
	    _id: 'nombres',
	    type: 'text',
	    displayName: 'Nombres',
	    required: true, 
	    maxLength: 25,
	    re: /^[a-zA-Z]+$/,
	    errStr: 'Solo letras',
	},
	{
	    _id: 'paterno',
	    type: 'text',
	    displayName: 'Paterno',
	    required: true, 
	    maxLength: 25,
	    re: /^[a-zA-Z]+$/,
	    errStr: 'Solo letras',
	},
	{
	    _id: 'Materno',
	    type: 'text',
	    displayName: 'Materno',
	    required: true, 
	    maxLength: 25,
	    re: /^[a-zA-Z]+$/,
	    errStr: 'Solo letras',
	},
	{
	    _id: "estado",
	    type: "select",
	    displayName: "Estado",
	    required: true, 
	    select: [
	        {
	            text: "Activado",
	            value: true,
	        },
	        {
	            text: "Desactivado",
	            value: false,
	        },
	    ],
	},
	{
	    _id: "sexo",
	    type: "select",
	    displayName: "Sexo",
	    required: true, 
	    select: [
	        {
	            text: "Masculino",
	            value: "M",
	        },
	        {
	            text: "Femenino",
	            value: "F",
	        },
	    ],
	},
	{
	    _id: "ci",
	    type: "text",
	    placeholder: "C.I.",
	    displayName: "C.I.",
	    required: true, 
	},
	{
	    _id: "telefono",
	    type: "text",
	    placeholder: "Telefono",
	    displayName: "Telefono",
	    required: true, 
	},
	{
	    _id: "fec_nac",
	    type: "text",
	    //template: "dateTemplate",
	    placeholder: "Fecha de nacimiento",
	    displayName: "Fecha de nacimiento",
	    required: true, 
	},
	{
	    _id: "Carrera",
	    type: "select",
	    displayName: "Estado",
	    required: true, 
	    select: [
	        {
	            text: "Activado",
	            value: true,
	        },
	        {
	            text: "Desactivado",
	            value: false,
	        },
	    ],
	},
]);


AccountsTemplates.configure({
	hideSignInLink : true,
	hideSignUpLink : true,
	//onLogoutHook: myLogoutFunc,
    //onSubmitHook: mySubmitFunc,
    //preSignUpHook: myPreSubmitFunc,
    //postSignUpHook: myPostSubmitFunc,
});
