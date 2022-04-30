const express = require('express');
const app = express();
const port = 3000;
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');

// menggunakan EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);

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
   res.render('contact', {
      nama: "Contact",
      title: "Contact",
      layout: 'layouts/main'
   });
});

app.get('/produk/:id', (req,res) => {
   res.send(`Product ID: ${req.params.id} <br> Category: ${req.query.category}`);
});

app.use('/', (req,res) => {
   res.status(404);
   res.send(`<h1>404</h1>`);
});

app.listen(port, () => {
   console.log(`Aplikasi jalan di http://localhost:${port}`)
});