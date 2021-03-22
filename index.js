const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contacts', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 80;

var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
});

var contact = mongoose.model('detials', contactSchema);


app.use('/statics', express.static('statics'));
app.use(express.urlencoded());


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.status(200).render('home.pug')
});

app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug')
});

app.post('/contact', (req, res) => {

   var mydata = new contact (req.body);
   mydata.save().then(()=>{
       res.send("This data is sucessfully save in database")
   }).catch(()=>{
       res.status(200).send("This data is not save in database")
   })

    // res.status(200).rander('contact.pug')
















    // names = req.body.name 
    // phone = req.body.phone
    // email = req.body.email
    // address= req.body.address

    // let post = `Name:${names} Phone:${phone} Email ID:${email} address:${address}` 

    // fs.writeFileSync('contact.txt', post)

    // ------------------------------------- //

});


app.listen(port, () => {
    console.log(`This is port running in ${port}`);
});