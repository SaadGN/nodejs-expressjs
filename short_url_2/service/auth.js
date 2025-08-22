
const jwt = require("jsonwebtoken")
const secret = "123@123"

function setUser(user) {
//  const payload = { _id: user._id, email: user.email };
  return jwt.sign({
  _id : user.id,
  email : user.email,
  role : user.role,
    
  }
  ,
  secret
  )
    // payload, 
    // secret, { expiresIn: "1h" });
  // return jwt.sign(user,secret);
}

function getUser(token) {
  if (!token) return null;

  try {
    return jwt.verify(token, secret);
  } catch (err) {
   // console.error("JWT verification failed:", err.message);
    return null;
  }
  // return jwt.verify(token,secret)
}

module.exports = {
  setUser,
  getUser,
};