
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