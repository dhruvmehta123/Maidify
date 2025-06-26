const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'random';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


function auth(req, res, next) {

    const token = req.headers.authorization;
    if (!token) return res.status(401).send({ message: 'Unauthorized' });

    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded) {
        req.user = decoded.username;
        next();
    }


}


const data = {
    1: {

        "name": "Rita",
        "age": 25,
        "city": "New York",
        "image": "https://thumbs.dreamstime.com/b/young-indian-housewife-beautiful-doing-house-chores-62111311.jpg",
        "slots": ["12-2", "2-4", "4-6"]
    },

    2: {

        "name": "Jahanara",
        "age": 34,
        "city": "New Delhi",
        "image": "https://www.shutterstock.com/image-photo/indian-maid-clearing-living-room-260nw-2560045909.jpg",
        "slots": ["11-1", "2-4", "5-7"]
    },

    3: {

        "name": "Saloni",
        "age": 25,
        "city": "Gurugram",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP75YbUCkKV6ojXeB14RDqJkoYYAFl8buHDQ&s",
        "slots": ["10-12", "2-4", "4-8"]
    }
};

const users = [

    {
        id: 1,
        name: "Raman",
        username: "raman",
        password: "123",
        pastBookings: [
            {
                date: "20/04/2025",
                maid: "Jahanara",
                time: "12-2",
                rating: "2"
            },
            {
                date: "20/04/2025",
                maid: "Saloni",
                time: "12-2",
                rating: "2"
            },
        ]
    },
    {


        id: 2,
        name: "Ramandeep",
        username: "raman2",
        password: "1234",
        pastBookings: [
            {
                date: "20/04/2025",
                maid: "Jahanara1",
                time: "12-2",
                rating: "2"
            },
            {
                date: "20/04/2025",
                maid: "Saloni1",
                time: "12-2",
                rating: "2"
            }
        ]

    }
]



app.get('/maids', (req, res) => {

    res.json(data);

})

app.post('/register', (req, res) => {

    const { name, age, city, slots } = req.body;

    const slotArray = slots.split(',').map(s => s.trim());;


    data[Object.keys(data).length + 1] = { "name": name, "age": age, "city": city, "slots": slotArray };

    res.redirect('http://127.0.0.1:5500/index.html');
})

app.get('/slots/:id', (req, res) => {

    const id = req.params.id;
    res.send(data[id].slots);

})


app.post('/signin', (req, res) => {

    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);


    if (user) {

        const token = jwt.sign({
            username: username
        }, JWT_SECRET);

        res.send({ token: token });
    }

    else {
        res.status(401).send({ error: "Invalid username or password" });
    }

})

app.post('/signup', (req, res) => {

    const { username, password, name, age } = req.body;

    users.push({
        username: username,
        password: password,
        name: name,
        age: age,
        pastBookings:[]
    })

    res.send({
        message: "signed up succesfully!"
    })




})

app.get('/me', auth, (req, res) => {

    const foundUser = users.find(u => u.username === req.user);

    if(foundUser){

    res.send(foundUser);


    }
    else{
        res.send('no such user exists')
    }


})

app.listen(3000);