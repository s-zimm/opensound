var env = (user) => {
  var db = 'opensound';

  return {
    user,
    db
  }
}

module.exports = env('joshuamartin');