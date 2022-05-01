const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { redirect } = require('express/lib/response');
const app = express();
const port = 3000;
const { loadContact, findContact, addContact } = require('./utils/contacts');

// menggunakan EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));

app.use(express.urlencoded());

app.get('/', (req,res) => {
   const mahasiswa = [
      {
         nama: "Lerian Febriana",
         email: "kanglerian@gmail.com",
      },{
         nama: "Sopyan Sauri",
         email: "sopyan@gmail.com",
      },{
         nama: "Adhie Rachmat",
         email: "adhie@gmail.com",
      },
   ];
   res.render('index', {
      nama: "Lerian Febriana",
      title: "Home",
      mahasiswa,
      layout: 'layouts/main'
   });
});

app.get('/about', (req,res) => {
   res.render('about', {
      nama: "About",
      title: "About",
      layout: 'layouts/main'
   });
});

app.get('/contact', (req,res) => {
   const contacts = loadContact();
   res.render('contact', {
      nama: "Contact",
      title: "Contact",
      layout: 'layouts/main',
      contacts
   });
});

app.get('/contact/add', (req,res) => {
   res.render('tambah', {
      nama: "Tambah Contact",
      title: "Tambah Contact",
      layout: 'layouts/main'
   });
});

app.post('/contact', (req, res) => {
   addContact(req.body);
   res.redirect('/contact');
});

app.get('/contact/:noreg', (req,res) => {
   const contact = findContact(req.params.noreg);
   res.render('detail', {
      nama: "Detail Contact",
      title: "Detail Contact",
      layout: 'layouts/main',
      contact
   });
});

app.use('/', (req,res) => {
   res.status(404);
   res.send(`<h1>404</h1>`);
});

app.listen(port, () => {
   console.log(`Aplikasi jalan di http://localhost:${port}`)
});