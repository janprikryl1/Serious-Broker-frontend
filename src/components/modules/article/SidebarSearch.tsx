import {FC} from "react";

export const SidebarSearch:FC = () => {
  return (
      <div className="sidebar__search">
          <h6 className="mb-10">Search Here</h6>
          <div className="sidebar__search-body">
              <form className="" action="">
                  <div className="input">
                      <input type="text" className="form-control" placeholder="Search articles"/>
                      <button type="submit" className="search-btn"><i className="fa-solid fa-magnifying-glass"></i>
                      </button>
                  </div>
              </form>
          </div>
      </div>
  );
};