const User = require('../models/userModel');

const getRegister = (req, res) => {
  res.render('register', { error: null });
};

const postRegister = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.render('register', { error: 'Passwords do not match' });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.render('register', { error: 'Email already exists' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.render('register', { error: 'Username already exists' });
    }

    const user = new User({ username, email, password });
    await user.save();

    req.session.userId = user._id;
    req.session.user = { username: user.username };

    res.redirect('/students');
  } catch (error) {
    res.render('register', { error: 'An error occurred during registration' });
  }
};

const getLogin = (req, res) => {
  res.render('login', { error: null });
};

const postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.render('login', { error: 'Invalid username or password' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.render('login', { error: 'Invalid username or password' });
    }

    req.session.userId = user._id;
    req.session.user = { username: user.username };

    res.redirect('/students');
  } catch (error) {
    res.render('login', { error: 'An error occurred' });
  }
};

const getLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/students');
    }
    res.clearCookie('connect.sid');
    res.redirect('/auth/login');
  });
};

module.exports = {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  getLogout
};
