function metar(robot) {
    robot.hear(/metar (.*)/i, function (msg) {
      var airports = cleanArgument(msg.match[1]);
      if (!airports || airports.length == 0) return;

      airports.forEach(function(item, index, array) {
        requestApi(item, "metar", robot, msg);
      });
    });

    robot.hear(/taf (.*)/i, function (msg) {
      var airports = cleanArgument(msg.match[1]);
      if (!airports || airports.length == 0) return;

      airports.forEach(function(item, index, array) {
        requestApi(item, "taf", robot, msg);
      });
    });


}
module.exports = metar;

function cleanArgument(args) {
  if (!args || args.length == 0) {
    return undefined;
  }

  var terms = args.split(' ');
  for (var i=0;i<terms.length;i++){
    if (terms[i].trim().length!=4) {
      terms.splice(i, 1)
    }
  }

  return terms;
}

function requestApi(airport, type, robot, msg) {
  new Promise((resolve, reject) =>
      robot.http("https://api.checkwx.com/"+ type + "/" + airport)
      .header('Cache-Control', 'no-cache')
      .header('X-API-Key', process.env.METAR_API_KEY)
      .get()((err, response, body) => {
          err ? reject(err) : resolve(body)
        }
      )
  )
  .then(body => JSON.parse(body))
  .then(json => {
    if (json.data && json.data.length > 0){
      msg.reply(json.data)
    }
  });
}
