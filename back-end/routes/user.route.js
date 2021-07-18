import express from 'express';
const userRouter = express.Router();

// in-memory data
let users = [];
const FAKE_JWT = 'FAKE TOKEN';

userRouter.get('/users', (req, res) => {
  response(res, 200, 'OK', users);
});

userRouter.post('/sign-in', (req, res) => {
  const requestUser = req.body;
  if (!requestUser.username || !requestUser.password) {
    response(res, 400, 'Bad Request');
    return;
  }
  const existingUser = users.find(user => (user.nickName === requestUser.username) && (user.password === requestUser.password));
  if (existingUser) {
    response(res, 200, 'OK', {
      nickName: existingUser.nickName,
      email: existingUser.email,
      phone: existingUser.phone,
      password: existingUser.password,
      country: existingUser.country,
      token: FAKE_JWT
    });
    return;
  }
  response(res, 404, 'User not found');
});

userRouter.post('/sign-up', (req, res) => {
  const newUser = req.body;
  if (!validateUser(newUser)) {
    response(res, 400, 'Bad Request');
    return;
  }
  if (!validateExistingNickName(users, newUser)) {
    response(res, 422, 'Existing nick name');
    return;
  }
  if (!validateExistingEmail(users, newUser)) {
    response(res, 422, 'Existing email');
    return;
  }
  users.push(newUser);
  response(res, 201, 'OK', {
    nickName: newUser.nickName,
    email: newUser.email,
    phone: newUser.phone,
    password: newUser.password,
    country: newUser.country,
    token: FAKE_JWT
  });
});

userRouter.post('/update', (req, res) => {
  const token = req.headers['access-token'];
  if (token !== FAKE_JWT) {
    response(res, 401, 'UnAuthorized');  
    return;
  }
  const requestUser = req.body;
  if (!validateUser(requestUser)) {
    response(res, 400, 'Bad Request');
    return;
  }
  console.log(requestUser)
  const currentUser = users.find(user => user.email === requestUser.email);
  if (!currentUser) {
    response(res, 404, 'Not Found');
    return;
  }
  if (!validateExistingNickName(users, requestUser)) {
    response(res, 422, 'Existing nick name');
    return;
  }
  users = users.filter(user => user.email !== requestUser.email);
  users.push(requestUser);
  response(res, 200, 'UPDATED', {...requestUser, token: token});
});
// private method
const response = (res, status, msg, data) => {
  res.status(status).json({
    msg: msg,
    data: data
  });
}
// validate valid user
const validateUser = (user) => {
  if (!user.nickName || !user.password || !user.email || !user.phone || !user.country) {
    return false;
  }
  return true;
}
// validate email existing
const validateExistingEmail = (users, newUser) => {
  const existingUser = users.find(user => user.email === newUser.email);
  if (existingUser) {
    return false;
  }
  return true;
}
// validate nickName existing
const validateExistingNickName = (users, newUser) => {
  const existingUser = users.find(user => user.nickName === newUser.nickName);
  if (existingUser) {
    return false;
  }
  return true;
}

export default userRouter;