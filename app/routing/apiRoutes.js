var getFriends = require("../data/friends.js");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    return res.json(getFriends);
  });

  app.post("/api/friends", function(req, res) {
    var friendScores = req.body.scores;
    var scoresArray = [];
    var bestMatch = 0;

    for (var i = 0; i < getFriends.length; i++) {
      var scoresDiff = 0;
      for (var j = 0; j < friendScores.length; j++) {
        scoresDiff += Math.abs(
          parseInt(getFriends[i].scores[j]) - parseInt(friendScores[j])
        );
      }
      scoresArray.push(scoresDiff);
    }

    for (var i = 0; i < scoresArray.length; i++) {
      if (scoresArray[i] <= scoresArray[bestMatch]) {
        bestMatch = i;
      }
    }

    var bestFriend = getFriends[bestMatch];
    res.json(bestFriend);

    getFriends.push(req.body);
  });
};
