import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./componets/Header";
import React from "react";
import Blogs from "./componets/Blogs";
import BlogDetail from "./componets/BlogDetail";
import Users from "./componets/Users";
import UserDetail from "./componets/UserDetail";
import Home from "./componets/Home";

function App() {
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/blogs" element={<Blogs />}></Route>
          <Route path="/myBlogs/:id" element={<BlogDetail />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/users/:id" element={<UserDetail />}></Route>
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
