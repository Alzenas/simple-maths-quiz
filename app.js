let express = require('express');
let app = express();


let person = 'Mike';
let thing = 'book';
let price = 4;
let number = 3;

let question = `${person} wants to buy ${number} of ${thing}s.\n` 
               + `How much does ${person} need to pay?`;

    app.get("/", function(req, res) {
        res.send(question);
    });    

let listening_port = 8080;
app.listen(listening_port, function(){
    // Nothing to run here for now.
});