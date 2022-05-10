const express = require("express");
const path = require("path");
const app = express();
const urllib = require("urllib");

const port = 3000;
let playersArr = [];
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));

const teamToIDs = {
  lakers: "1610612747",
  warriors: "1610612744",
  heat: "1610612748",
  suns: "1610612756",
};

const buildPlayersData = function (data, teamName) {
  let leaguesPlayersData = JSON.parse(data.toString()).league;
  playersArr = [];
  for (league in leaguesPlayersData) {
    for (player of leaguesPlayersData[league]) {
      if (player.teamId === teamToIDs[teamName]) {
        let firstName = player.firstName.toLowerCase();
        let lastName = player.lastName.toLowerCase();
        playersArr.push({
          name: player.temporaryDisplayName,
          img:
            "https://nba-players.herokuapp.com/players/" +
            lastName +
            "/" +
            firstName,
        });
      }
    }
  }
};

app.get("/teams/:teamName", function (req, res) {
  const teamName = req.params.teamName;
  urllib.request(
    "http://data.nba.net/10s/prod/v1/2018/players.json",
    function (err, data, res) {
      if (err) {
        throw err;
      }
      buildPlayersData(data, teamName);
    }
  );

  res.send(playersArr);
});
app.listen(port, function () {
  console.log(`Running server on port ${port}`);
});
