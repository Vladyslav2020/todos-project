const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const router = require('./routes/routes.js');
const auth_router = require('./routes/auth-router.js');
const todos_router = require('./routes/todos-router');

//const app = express();
const PORT = config.get('port') || 3000;
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: true}));

(async function() {
    try {
        await mongoose.connect(config.get("mongoURi"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => console.log(`Server is started on PORT ${PORT}`));
        //app.use(router);
        app.use('/api/auth', auth_router);
        app.use('/api/todos/', todos_router);
        if (process.env.NODE_ENV === 'production'){
            app.use('/', express.static(path.join(path.resolve(), 'client', 'build')));
            app.use('*', (req, res) => {
                res.sendFile(path.join(path.resolve(), 'client', 'build', 'index.html'));
            });
        }
    }
    catch(err) {
        console.log("Server error " + err.message);
        process.exit(1);
    }
})();
