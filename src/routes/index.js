const express = require("express");
const routes = express.Router();
const home = require("./home");
const recipes = require("./recipes");
const chefs = require("./chefs");
const users = require("./users");
const vips = require("./vips");
const reports = require ("./reports");
const suporte = require ("./suporte");
const pagamento = require ("./pagamento");

// Home
routes.use("/", home);

// Admin
routes.use("/admin", users);
routes.use("/admin", chefs);
routes.use("/admin", recipes);
routes.use("/admin", vips);
routes.use("/admin", reports);
routes.use("/admin", suporte);
routes.use("/admin", pagamento);


const videos = require("./data");



routes.get("/admin/videos", function(req, res){
    return res.render("admin/videos/index", {items: videos})
})


routes.get("/admin/video", function(req, res){
    const id = req.query.id;

    const video = videos.find(function(video){
    return video.id == id
    })
    if (!video){
        return res.send("Video not found!");
    }
    return res.render("admin/videos/video",{item: video})

});

module.exports = routes;
