const fs = require('fs');

// membuat folder data jika belum ada
const dirPath = "./data";
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}

// membuat file contacts.json jika belum ada
const dataPath = "./data/contacts.json";
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}

const findContact = (noreg) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.noreg === noreg);
    return contact;
}

// Menuliskan, menimpa file contacts.json dengan data yang baru
const saveContacts = (contacts) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
}

// Menambah contact baru
const addContact = (contact) => {
    const contacts = loadContact();
    contacts.push(contact);
    saveContacts(contacts);
}

// Cek duplikat
const cekDuplikat = (noreg) => {
    const contacts = loadContact();
    return contacts.find((contact) => contact.noreg === noreg);
}

// Delete contact
const deleteContact = (noreg) => {
    const contacts = loadContact();
    const filteredContacts = contacts.filter((contact) => contact.noreg !== noreg);
    saveContacts(filteredContacts);
}

// Update contacts
const updateContacts = (contactBaru) => {
    const contacts = loadContact();
    // hilangkankontak lama yg noreg sama dgn oldreg
    const filteredContacts = contacts.filter((contact) => contact.noreg !== contactBaru.oldnoreg);
    delete contactBaru.oldnoreg;
    filteredContacts.push(contactBaru);
    saveContacts(filteredContacts);
}

module.exports = { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts }