var friendData = require("../data/friends");

module.exports = function(app){

    app.get("/api/friends", function(req, res){
        res.json(friendData);
    });

    app.post("/api/friends", function(req, res){

        var resultArr =[];

        
        for(var i = 0; i < friendData.length; i++){
            var result = 0;
            for(var j = 0; j < friendData[i].scores.length; j++){                
                result += Math.abs(req.body.scores[j] - friendData[i].scores[j]);        
            }
            resultArr.push(result);
        }
        var minval = resultArr[0];
        var matchingFriend = 0;
        for (var k = 0; k < resultArr.length; k++){
            if (minval > resultArr[k]){
                minval = resultArr[k];
                matchingFriend = k;
            }
        }
        var newGuy = {
            name: req.body.name,
            photo: req.body.photo,
            scores: req.body.scores
        }
        friendData.push(newGuy);
        res.json(friendData[matchingFriend]);
    });
};
