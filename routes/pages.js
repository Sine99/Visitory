const express =require("express");
const router = express.Router();

router.get('/', (req, res) => {
    // res.send("this is the home page")
    res.render('pages/homePage');
});

router.get('/dashboard', (req, res) => {
    res.send("this is the dashboard")
});
module.exports = router;
