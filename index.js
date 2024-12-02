const express = require('express');
const app = express();
app.set('view engine', 'ejs');
const path = require('path');
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true })); // Parses form-encoded data
app.use(express.json());
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

let comments = [{
    id: uuidv4(),
    username: 'Todd', comment: 'lol thats funny!'
},
{
    id: uuidv4(),

    username: 'Skyler', comment: 'I like to go birdwatching'
},
{
    id: uuidv4(),
    username: 'Walter', comment: 'I need more meth'
},
{
    id: uuidv4(),
    username: 'Jessy', comment: 'I am high'
}

]
//index
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
})
//load the create new comment page
app.get('/comments/new', (req, res) => {
    res.render('comments/new');

})

// show comments detail
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find((c) => {
        return c.id === (id);
    })
    if (!comment) {
        return res.status(404).send('Comment not found');

    }
    res.render('comments/show', { comment });
})

// add the new comment

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;

    const newCommentText = (req.body.comment);
    const foundComment = comments.find((c) => {
        return c.id === (id);
    })
    foundComment.comment = newCommentText;

    res.redirect('/comments');

})


//edit comment

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    // console.log('ID from params:', id); // Debugging log
    const comment = comments.find((c) => c.id === (id));
    console.log('Found comment:', comment); // Debugging log
    if (!comment) {
        return res.status(404).send('Comment not found');
    }
    res.render('comments/edit', { comment });
});


// create new comment

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuidv4() }) // This should log the form data
    res.redirect('/comments');
});

/// delete
app.delete('/comments/:id',(req,res)=>{
    const { id } = req.params;
    // const comment = comments.find((c) => c.id === (id));
    comments=comments.filter(c=> c.id!==id )
     res.redirect('/comments');
})






// app.get('/tacos', (req, res) => {
//     res.send("get /tacos response");
// })
// app.post('/tacos', (req, res) => {
//     const { meat, qty } = (req.body);
//     res.send(`qty ${qty}  meat ${meat} `);
// })
app.listen(3000, () => {
    console.log("on port 3000!");
})