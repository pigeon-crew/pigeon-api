import * as React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import React from 'react';
import './App.css';
const ENDPOINT = process.env.REACT_APP_API_URL || "";

const Main = () => {
  return (
    <h1>Pigeon Sign Up</h1>
	<form action="/action_page.php" style="border:none">
  <div class="container">
    <label for="name" ><b>Name</b></label>
    <input type="text" name="name" required style= "margin-right: 16px">
    <label for="email"><b>Email</b></label>
    <input type="text" name="email" required>
    <label for="psw"><b>Password</b></label>
    <input type="password" name="psw" required>
    <br>
      <button type="submit" class="signupbtn">Get started!</button>
  </div>
</form>
</div>
  );
};

export default Main;
