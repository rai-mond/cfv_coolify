
/*
var express = require('express')
const path = require('path');



const views = {
  //about: path.join(__dirname, '../../', 'public/views/about.html'),
  client: path.join(__dirname,'../static/inst-app/index.html'),
  users: path.join(__dirname,'../views/index.html')
  //landing: path.join(__dirname, '../../', 'public/views/landing.html'),
  //newCall: path.join(__dirname, '../../', 'public/views/newcall.html'),
  //notFound: path.join(__dirname, '../../', 'public/views/404.html'),
  //permission: path.join(__dirname, '../../', 'public/views/permission.html'),
  //privacy: path.join(__dirname, '../../', 'public/views/privacy.html'),
  //stunTurn: path.join(__dirname, '../../', 'public/views/testStunTurn.html'),
};
*/

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};


exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
