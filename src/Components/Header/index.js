import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header id="header " className=" bg-[#0828c6] ">
        <div className="container">
          <div className="header flex items-center justify-between py-2 text-white">
            <h1 className=" text-[30px]">Logo</h1>
            <div className="header-nav flex items-center gap-2">
              <NavLink className=" text-[20px]" to={"/"}>
                Home
              </NavLink>
              <NavLink className=" text-[20px]" to={"/todolist"}>
                ToDoList
              </NavLink>
              <NavLink className=" text-[20px]" to={"/country"}>
                Country
              </NavLink>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
