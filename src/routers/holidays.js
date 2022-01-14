const express = require("express");
const axios = require('axios');

const router = new express.Router();

router.get("/api/holidays", async (req, res) => {
    try {
        let holidays = await axios.get('https://www.gov.uk/bank-holidays.json');
        res.status(201).send(holidays.data);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});

module.exports = router;
