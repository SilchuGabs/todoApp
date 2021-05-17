const express = require('express');
require('./db/mongoose')
const app = express();
const PORT = process.env.PORT || 3000
const cors = require('cors')
require('dotenv').config()



//* Routers Imports
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');


app.use(cors())
    //*We can customized our server. This function automatically parse JSON into objects
app.use(express.json());

// /* ------------------------------- middleware ------------------------------- */
// app.use((req, res, next) => {
//         res.status(503).send('Server on maintenance')
// })
/* ----------------------------- User end-points ---------------------------- */
app.use(userRoutes);

/* ----------------------------- Task end-points ---------------------------- */

app.use(taskRoutes);
/*============================ END OF SECTION ============================*/


app.listen(PORT, () => {
    console.log(`Server is up on port ` + PORT)
})