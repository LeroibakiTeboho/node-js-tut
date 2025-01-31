const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username or password is required" });

  //* check for duplicate username in the db
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); // conflict

  try {
    //* encrypt the password
    const hashedPassword = await bcrypt.hash(pwd, 10);

    //* create and store the user in the db
    const result = await  User.create({
      username: user,
      password: hashedPassword,
      //! role is set to 2001 by default in schema file
    });

    console.log(result);

    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
