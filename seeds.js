var mongoose = require('mongoose')
var Shnax = require("./models/shnax");
var Comment = require("./models/comment");
var data = [{
        name: "Nigga17",
        image: "https://images.vexels.com/media/users/3/176958/isolated/lists/40396cb33971dc4911066dbf5fa10753-penguin-muzzle-angry-flat-sticker.png",
        desc: "Occaecat cupidatat culpa officia anim fugiat cupidatat excepteur deserunt pariatur. Culpa sint enim et mollit dolor velit non ut consectetur. Dolor nostrud aliqua deserunt in cupidatat pariatur in excepteur enim. Lorem do nisi velit ea et quis tempor sunt pariatur dolore. Ipsum exercitation dolore officia  consequat nisi dolor quis fugiat sit. Laborum pariatur sint dolore ut aute aliquip ut sint eu exercitation commodo commodo. Consequat nostrud voluptate nisi duis sit."
    },
    {
        name: "Nigga420",
        image: "https://vignette.wikia.nocookie.net/animalcrossing/images/f/f1/WaltNH_Render.png/revision/latest/top-crop/width/720/height/900?cb=20200429195525",
        desc: "Velit mollit labore ad incididunt enim voluptate exercitation. Laborum amet amet consequat nisi sit fugiat veniam aliquip laboris duis minim. Sunt dolore et eu ullamco nulla tempor velit ut et consequat pariatur. Dolore esse amet pariatur dolor ex aute et. Magna minim laborum consectetur reprehenderit ad est adipisicing laboris. Culpa occaecat adipisicing officia consequat tempor qui non pariatur aliquip voluptate. Commodo sunt deserunt culpa ut."
    },
    {
        name: "Nigga69",
        image: "https://dodo.ac/np/images/thumb/7/72/Phil_NH_2.png/200px-Phil_NH_2.png",
        desc: "Velit mollit labore ad incididunt enim voluptate exercitation. Laborum amet amet consequat nisi sit fugiat veniam aliquip laboris duis minim. Sunt dolore et eu ullamco nulla tempor velit ut et consequat pariatur. Dolore esse amet pariatur dolor ex aute et. Magna minim laborum consectetur reprehenderit ad est adipisicing laboris. Culpa occaecat adipisicing officia consequat tempor qui non pariatur aliquip voluptate. Commodo sunt deserunt culpa ut."
    }
]

function seedDB() {
    //Remove all Cgrounds
    Shnax.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("removed");
            adding
            data.forEach(function (seed) {
                Shnax.create(seed, function (err, shnax) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("added");
                        comments
                        Comment.create({
                            text: "Enim proident dolore labore nulla voluptate do est tempor.",
                            author: "Homo"
                        }, function (err, comment) {
                            if (err) {
                                console.log(err);
                            } else {
                                shnax.comments.push(comment);
                                shnax.save();
                                console.log("comment created");
                            }
                        });
                    }
                });
            });
        }
    });
}

module.exports = seedDB;