/* pruebas y demas */
FlowRouter.route('/insertar/:id',{
    name:'progra',
    action(){
        BlazeLayout.render("programar")
    }
});

/* --solo uno */
FlowRouter.route('/update/:id',{
    name:'prograupdate',
    action(){
        BlazeLayout.render("updateProgra")
    }
});

/* pdf */
FlowRouter.route('/pdfs',{
    name:'pdfgene',
    action(){
        BlazeLayout.render("pdfTemplate")
    }
});

FlowRouter.route('/kardexpdf/:id',{
    name:'kardexPdf',
    action(){
        BlazeLayout.render("kardexPdf")
    }
});

FlowRouter.route('/isertasig/:id',{
    name:'isertasig',
    action(){
        BlazeLayout.render("inserAsigDct")
    }
});
/* pgpruebas */
FlowRouter.route('/pgpruebas/',{
    name:'pgpruebas',
    action(){
        BlazeLayout.render("pgpruebas")
    }
});

FlowRouter.route('/pgpruebasdocen/',{
    name:'pgpruebasdocen',
    action(){
        BlazeLayout.render("pgpruebasdocen")
    }
});

FlowRouter.route('/lisdatuatf/',{
    name:'lisdatuatf',
    action(){
        BlazeLayout.render("lisdatuatf")
    }
});
FlowRouter.route('/listmore/',{
    name:'listmore',
    action(){
        BlazeLayout.render("main",{body:"alummore"})
    }
});

/* real funcional */
FlowRouter.route('/reprogramacion/:id',{
    name:'reprogramacion',
    action(){
        BlazeLayout.render("main",{body:"reprogramar"})
    }
});

FlowRouter.route('/alumnos/',{
    name:'listalum',
    action(){
        BlazeLayout.render("main",{body:"listalumnos"})
    }
});

FlowRouter.route('/docentesasig/:id',{
    name:'docentesasig',
    action(){
        BlazeLayout.render("main",{body:"asignacionDct"})
    }
});

FlowRouter.route('/docentes/',{
    name:'listdocentes',
    action(){
        BlazeLayout.render("main",{body:"listdocentes"})
    }
});

/* funsional re */
const norm = FlowRouter.group({
    prefix:'/directores',
    triggersEnter: [
    	(context, redirect)=>{
    		if(Meteor.user()===null){
    			//console.log("aqui");
    			redirect('/login');
    		}
    	}
    ]
});

FlowRouter.route('/',{
    name:'home',
    action(){
        BlazeLayout.render("main",{body:"escudo"})
    },
    triggersEnter: [
    	(context, redirect)=>{
    		if(Meteor.user()===null){
    			//console.log("aqui");
    			redirect('/login');
    		}
    	}
    ]
});

norm.route('/lisalumof/',{
    name:'lisalumof',
    action(){
        BlazeLayout.render("main",{body:"lisalumof"})
    }
});

norm.route('/programarof/:id',{
    name:'programarof',
    action(){
        BlazeLayout.render("main",{body:"programarof"})
    }
});

norm.route('/kardex/:ru',{
    name:'kardex',
    action(){
        BlazeLayout.render("main",{body:"kardex"})
    }
});

norm.route('/programarespecial/:id',{
    name:'programarespecial',
    action(){
        BlazeLayout.render("main",{body:"programarespecial"})
    }
});

norm.route('/ranking/:ru',{
    name:'ranking',
    action(){
        BlazeLayout.render("main",{body:"ranking"})
    }
});

norm.route('/pensun/:ru',{
    name:'pensun',
    action(){
        BlazeLayout.render("main",{body:"pensun"})
    }
});

norm.route('/verprograespecial/:ru',{
    name:'verprograespecial',
    action(){
        BlazeLayout.render("main",{body:"verprograespecial"})
    }
});

norm.route('/mallas/',{
    name:'mallas',
    action(){
        BlazeLayout.render("main",{body:"mallas"})
    }
});

norm.route('/vermalla/:id',{
    name:'vermalla',
    action(){
        BlazeLayout.render("main",{body:"vermalla"})
    }
});
//estadisticas
norm.route('/mejoalum',{
    name:'mejoalum',
    action(){
        BlazeLayout.render("main",{body:"mejoalum"})
    }
});

norm.route('/matriculados',{
    name:'matriculados',
    action(){
        BlazeLayout.render("main",{body:"matriculados"})
    }
});

norm.route('/listaprogra',{
    name:'listaprogra',
    action(){
        BlazeLayout.render("main",{body:"listaprogra"})
    }
});

norm.route('/promestudiantes',{
    name:'promestudiantes',
    action(){
        BlazeLayout.render("main",{body:"promestudiantes"})
    }
});

norm.route('/materiasestado',{
    name:'materiasestado',
    action(){
        BlazeLayout.render("main",{body:"materiasestado"})
    }
});

norm.route('/listdocentesof',{
    name:'listdocentesof',
    action(){
        BlazeLayout.render("main",{body:"listdocentesof"});
    }
});
//beca alimentacion
norm.route('/listapos',{
    name:'listapos',
    action(){
        BlazeLayout.render("main",{body:"listapos"});
    }
});

norm.route('/calificarbal/:id/:ges',{
    name:'calificarbal',
    action(){
        BlazeLayout.render("main",{body:"calificarbal"})
    }
})
//viajes
norm.route('/listviajes',{
    name:'listviajes',
    action(){
        BlazeLayout.render("main",{body:"listviajes"})
    }
});
//auxiliatura
norm.route('/listmathab',{
    name:'listmathab',
    action(){
        BlazeLayout.render("main",{body:"listmathab"})
    }
});
norm.route('/listhabaux/:ges/:matid',{
    name:'listhabaux',
    action(){
        BlazeLayout.render("main",{body:"listhabaux"})
    }
});
norm.route('/calificarbaux/:ges/:mat/:ru',{
    name:'calificarbaux',
    action(){
        BlazeLayout.render("main",{body:"calificarbaux"})
    }
})
//para login todo
norm.route('/singup/',{
    name:'singup',
    action(){
        BlazeLayout.render("main",{body:"singup"})
    }
});

FlowRouter.route('/login/',{
    name:'login',
    triggersEnter:[function(context, redirect){
        if(!(Meteor.user()===null))
            redirect('home')
    }],
    action(){
        BlazeLayout.render("login")
    }
});