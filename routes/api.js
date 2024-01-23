const express = require("express");
const router = express.Router();

const citationRouter = require("./citation_route");
const utilisateurRouter = require("./utilisateur_route");

router.use("/citations", citationRouter);
router.use("/utilisateur", utilisateurRouter);

module.exports = router;
