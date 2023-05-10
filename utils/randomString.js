import crypto from "crypto";

//This file is ONLY to genrate random strings to be used as our jwt token
// Each time you run this file you will get different value
// To run this file switch to a new terminal naviage to the project dir and type in

// node utils/randomString.js

const randomString = crypto.randomBytes(32).toString("hex");
console.log(randomString);
