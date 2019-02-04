var userData = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(userData);
    });

    app.post("/api/friends", function(req, res) {
        // userData.push(req.body);
        // console.log(userData);
        // res.json(userData[2]);
        // console.log(req.body);

        var leastDifference = 1000;
        var bestMatch;

        // loops through each friend in userData
        for (i=0; i < userData.length; i++) {
            var num = 0;
            var totalDifference = 0;
            // loops through each score in userData.scores
            // and compares to current user
            // then adds up all differences as totalDifference
            for (j=0; j < userData[i].scores.length; j++) {
                num = req.body.scores[j] - userData[i].scores[j];
                num = Math.abs(num);
                totalDifference += num;
            }
            // checks if lowest difference every loop
            if (totalDifference < leastDifference) {
                leastDifference = totalDifference;
                bestMatch = userData[i];
            }
        }
        
        userData.push(req.body);
        res.json(bestMatch);
    });
}