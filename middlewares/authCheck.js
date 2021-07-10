const regex_sid = /^[A-z][0-9]{8}$/;

function getJWTPayload(token) {
  let encodedPayload = token.split(".")[1];
  let decodedPayload = Buffer.from(encodedPayload, "base64").toString();
  return JSON.parse(decodedPayload);
}

module.exports.sid = function (req, res, next) {
  let token = req.get("Authorization").split(" ")[1];
  const sidInParam = String(req.params.sid).toUpperCase();
  const sidInJWT = String(getJWTPayload(token)["sid"]).toUpperCase();
  if (sidInParam === sidInJWT && regex_sid.test(sidInParam)) {
    next();
  } else {
    let err = new Error();
    err.name = "UnauthorizedError";
    next(err);
  }
};
