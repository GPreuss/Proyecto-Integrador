const data = require("../db/data")
const db = require("../database/models")
const productos = db.Product;
const users = db.User


const controller = {
    index: function(req, res, next) { 
        res.render('index', {data: data.productos}  );
    },
    login: function(req, res, next) { 
        res.render('login');
    },
    create: function(req, res){
        console.log(users)
        return res.render('register')
    },
    store: function(req, res){
        //Obtener los datos del formulario y armar el objeto literal que quiero guardar
        let user = {
            userName: req.body.usuario,
            email: req.body.email,
            password: req.body.password,
            //avatar: req.body.avatar,
        }
        //Guardar la info en la base de datos
        users.create(user)
            .then( function(respuesta){ //En el parámetro recibimos el registro que se acaba de crear en la base de datos.
                console.log(respuesta)
                return res.redirect('/')
            })
            .catch( error => console.log(error))
    },
    /*
    storeProfile: function (req, res){
        
        console.log(req.body) // aca deberia llegar lo que mando el usuario

        var image;
        if (!(req.file.filename)){
            console.log('entro al filename')
            image = '/images/users/default-image.png'
        } else {
            image = req.file.filename
        }
        if(req.body.password.length<3){
            res.locals.errores={mensaje:"la contraseña debe tener mas de tres caracteres"}
            return res.render("register")
        }
        let user = { 
            email: req.body.email,
            username:req.body.username,
            password: bcrypt.hashSync(req.body.password, 10),
            date: req.body.date,
            dni: req.body.dni,
            image: req.file.filename
        }

        users.findOne({
            where: [{email: user.email}] //encontrar un mail que coincida con el mail que ingreso el usuario
        })

        .then(function(usuario){ //el then es para que el codigo se ejecute recien cuando se chequee la linea de arriba (el find one)
            if (usuario) {
                console.log ('el usuario ya existe')
                res.locals.errores = {mensaje: 'El email ya esta en uso'}
                console.log(res.locals.errores)
                return res.render('register')
            }else{
                res.locals.errores = ''; 
                console.log ('el usuario no existe')
                users.create(user) //create agarra el objeto, se lo manda a la table en la bd y cuando esta lo guarda, devuelve el registro como parametro de la funcion del then
                .then(function(respuesta){  //en el parametro recibimos el registro que se acaba de crear en la base de datos
                    // return res.send(respuesta)
                    return res.redirect('/index'); //redirigir falta ponerle el id del usuario en cuestion -> session
                })
            }
        })

        

            .catch(error => console.log (error))

    },
    */
    login: function(req, res){
        //mostrar el form de registro
        //Chequear que un usario esté logueado
          if(req.session.user != undefined){
            return res.redirect('/')
        } else {  
            return res.render('login');
        }
    },

    signIn: function(req, res){
        //verificar el que el mail exista en labase de datos.
            //Buscar al usuario usando el email del form de login.
            //Del usuario conseguido chequear que la contraseña del formulario coincida con la guardad el base.
            //USamos compareSync 
                    //Si las contraseñas coinciden avisemos con mensaje que todo está ok. Cuando sepamos loguear redireccionamos a la home con el proceso de login completo.
                //Controlar que el usario no esté logueado

        users.findOne({
            where: [{email: req.body.email}]
        })
            .then(function(user){
                if(user){
                    req.session.user = user.dataValues;
                    //Si el usuario tildó recordarme creo la cookie
                    res.cookie('userId',user.dataValues.id,{maxAge: 1000*60*100} )
                }
                console.log(req.session.user);
                return res.redirect('/')

            })
            .catch(error => console.log(error))

    },
    search: function(req, res, next) { 
        res.render('search-results', {data: data.productos});
    },
}
module.exports = controller;