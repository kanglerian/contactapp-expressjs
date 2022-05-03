const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { redirect } = require('express/lib/response');
const app = express();
const port = 3000;
const { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts } = require('./utils/contacts');
const { body, validationResult, check } = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

// Konfigurasi flash
app.use(cookieParser('secret'));
app.use(session({
   cookie: {maxAge: 6000},
   secret: 'secret',
   resave: true,
   saveUninitialized: true
}));
app.use(flash());

// menggunakan EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));

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
      contacts,
      msg: req.flash('msg'),
   });
});

app.get('/contact/add', (req,res) => {
   res.render('tambah', {
      nama: "Tambah Contact",
      title: "Tambah Contact",
      layout: 'layouts/main'
   });
});

app.post('/contact', [
   check('email','Email tidak benar!').isEmail(),
   check('nohp', 'No HP tidak benar').isMobilePhone('id-ID'),
   body('noreg').custom((value) => {
      const duplikat = cekDuplikat(value);
      if(duplikat){
         throw new Error('No Registrasi sudah terdaftar!');
      }
      return true;
   }),
], (req, res) => {
   const errors = validationResult(req);
   if(!errors.isEmpty()){
      // return res.status(400).json({ errors: errors.array() });
      res.render('tambah',{
         title: "Tambah data kontak",
         layout: "layouts/main",
         errors: errors.array(),
      });
   } else {
      addContact(req.body);
      req.flash('msg','Data kontak berhasil ditambahkan!');
      res.redirect('/contact');
   }
});

app.get('/contact/delete/:noreg', (req, res) => {
   const contact = findContact(req.params.noreg);

   if(!contact){
      res.status(404);
      res.send("Gak ada!");
   }else{
      deleteContact(req.params.noreg);
      req.flash('msg','Data kontak berhasil dihapus!');
      res.redirect('/contact');
   }
});

// form ubah data kontak
app.get('/contact/edit/:noreg', (req,res) => {
   const contact = findContact(req.params.noreg);
   res.render('edit', {
      nama: "Edit Contact",
      title: "Ubah Data Contact",
      layout: 'layouts/main',
      contact
   });
});

// proses ubah data
app.post('/contact/update', [
   check('email','Email tidak benar!').isEmail(),
   check('nohp', 'No HP tidak benar').isMobilePhone('id-ID'),
   body('noreg').custom((value, {req}) => {
      const duplikat = cekDuplikat(value);
      if(value !== req.body.oldnoreg && duplikat){
         throw new Error('No Registrasi sudah terdaftar!');
      }
      return true;
   }),
], (req, res) => {
   const errors = validationResult(req);
   if(!errors.isEmpty()){
      // return res.status(400).json({ errors: errors.array() });
      res.render('edit',{
         title: "Ubah data kontak",
         layout: "layouts/main",
         errors: errors.array(),
         contact: req.body
      });
   } else {
      updateContacts(req.body);
      req.flash('msg','Data kontak berhasil diubah!');
      res.redirect('/contact');
   }
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