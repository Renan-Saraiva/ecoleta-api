import express from 'express';

const app = express();
app.use(express.json())

const users = [{
    name: 'Renan 0',
    email: 'renan.m.saraiva@gmail.com'
}, {
    name: 'Junirus 1',
    email: 'renan.m.saraiva@gmail.com'
}, {
    name: 'Matheus 3',
    email: 'renan.m.saraiva@gmail.com'
}];

app.get('/users', (request, response) => {
    const search = String(request.query.search);   
    const filteredUser = search ? users.filter(user => user.name.includes(search)) : users;    
    response.json(filteredUser);
})

app.get('/users/:id', (request, response) => {    
    const id = request.params.id;
    response.json(users[+id]);
})

app.post('/users', (request, response) => {
    const user = {
        name: request.body.name,
        email: request.body.email
    }
    users.push(user);
    return response.json(user);
})

app.listen(4000);