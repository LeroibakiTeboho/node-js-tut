const User = require("../model/User");

const handleLogout = async (req, res) => {
  //! on client, also delete the accessToken
  const cookies = req.cookies;
  if (!cookies.jwt) return res.sendStatus(204); // no content
  const refreshToken = cookies.jwt;

  //* Is refreshToken in db?
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }

  //* Delete refreshToken from db
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); //* secure: true - only server on https
  res.sendStatus(204); // no content
};

module.exports = {
  handleLogout,
};
