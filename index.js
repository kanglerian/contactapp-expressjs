const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;
const { loadContact, findContact } = require('./utils/contacts');

// menggunakan EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));

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

app.get('/contact/:id', (req,res) => {
   const contact = findContact(req.params.id);
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