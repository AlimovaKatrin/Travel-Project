const express = require('express');

const Tour = require('./models/tour');
const User = require('./models/user');
const Comment = require('./models/comment');

const router = express.Router();

router.get('/test', (req, res) => {
  res.send({ test: 'test' });
});


router.post('/oneTour', async (req, res, next) => {

  console.log("fuuul", req.body.allMarks )
  let saveData = new Tour ({
    userName: req.body.userName,
    tourName: req.body.mapName,
    description: req.body.description,
    allMarks: req.body.allMarks,
    allLines: req.body.allLines
  })

  await saveData.save();
  // console.log(">>>>>>>>>>>>", saveData)
  res.json()
});

router.post('/profile', async (req, res, next) => {
 let check = await Tour.find({userName: req.body.userName})
  // console.log("lengthlengthlength", check.length)
  res.json(check)
});

router.delete('/deleteMap', async (req, res, next) => {
  let check = await Tour.findByIdAndRemove(req.body.id)
  let newOne = await Tour.find({userName: req.body.userName})
  //  console.log("deleteteeid", check)
   res.json(newOne)
 });

 router.delete('/delcomment', async (req, res, next) => {
  let check = await Comment.findByIdAndRemove(req.body.idComment)
  let newOne = await Comment.find({idPost: req.body.idPost})
  // //  console.log("deleteteeid", check)
   res.json(newOne)
 });

 router.post('/savecomment', async (req, res, next) => {
  let saveComment = new Comment({
    userName: req.body.userName,
    date: req.body.date,
    comment: req.body.comment,
    idPost: req.body.idPost
  })
  await saveComment.save();
  res.json({})
  // console.log(">>>>>>>>>>>>comment", saveComment)
 });

 router.post('/getcomments', async (req, res, next) => {
  let check = await Comment.find({idPost: req.body.idPost})
  // console.log(">>>>>>>>>>>>comment", check)
  // console.log(">>>>>>>>>>>>comment", req.body.idPost)
  res.json(check)

 });


router.post('/all', async (req, res, next) => {
  let check = await Tour.find({})
  //  console.log(">>>>>>>>>>>>", check)
   res.json(check)
 });

 router.post('/top', async (req, res, next) => {
  let check = await Tour.find({}).sort({_id:-1}).limit(5)
  //  console.log(">>>>>>>>>>>>", check)
   res.json(check)
 });


 router.post('/idTour', async (req, res, next) => {
  let check = await Tour.findOne({_id:req.body.id})
  //  console.log("+++++", check)
   res.json(check)
 });


router.post('/reg', async (req, res, next) => {
  let user = new User({
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email
  })


  await user.save();
  // console.log(">>>>>>>>>>>>", user)
  res.json('OK')
});

router.post('/login', async (req, res, next) => {
  let allUsers = await User.findOne({email:req.body.email})
  // for (let i = 0; i < allUsers.length; i++) {
    if (req.body.email === allUsers.email && req.body.password === allUsers.password) {
      console.log('Успешная авторизация');
      let userName = allUsers.userName
      let email = allUsers.email
      return res.json({result:'OK',email:email,user:userName})
    }
    else 
    console.log('Неуспешная авторизация');
    // console.log(req.body.email);
    // console.log('EMAIL IZ BD',allUsers.email);
    // console.log('VSE USERI',allUsers);
    return res.json('Not OK')
  });
// });

module.exports = router;