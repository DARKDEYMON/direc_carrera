
FlowRouter.route('/',{
    name:'home',
    action(){
        BlazeLayout.render("main")
    }
});

FlowRouter.route('/insertar/:id',{
    name:'progra',
    action(){
        BlazeLayout.render("programar")
    }
});

FlowRouter.route('/update/:id',{
    name:'prograupdate',
    action(){
        BlazeLayout.render("updateProgra")
    }
});