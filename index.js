const express = require('express');
const port = 8000;
const path = require('path');

const db = require('./config/mongoose');

const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


var contactList =[
    {name: "Motasim",
     phone: "38434839083",
    },
    {
        name: "Iron Man",
        phone: "3847833134"
    }, 
    {
        name: "jakajdlka",
        phone: "8374893"
    }
]


app.get('/', function(req, res){
    // console.log("from the get route controller", req.MyName);

    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }
        return res.render('home', {
            title: "Contacts List", 
            contact_list: contacts
        });

    });

    
});

app.get('/practice', function(req, res){
    return res.render('practice', {
        title: "Lets play with EJS"
    })
})

app.post('/create-contact', function(req, res){
    // contactList.push(
    //     {
    //         name: req.body.name,
    //         phone: req.body.phone
    //     }        
    // );

    // contactList.push(req.body);
    // return res.redirect('/');
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){
            console.log('error in creating a contact');
            return;
        }
        console.log('******', newContact);
        return res.redirect('back');
    });

    // return res.redirect('back');
})

app.get('/delete-contact/', function(req, res){
 
    let id = req.query.id;

    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('back');
    });
});

app.listen(port, function(err){
    if(err){
        console.log('Error in running the server', err);
    } 

    console.log('Server is up and running on port', port);
});

