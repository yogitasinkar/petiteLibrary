
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom';


export const Dashboard = () => {
  return (
    <div className="overflow-hidden">
      <div className="fixed h-14 top-0 bg-[#1B4242] w-full flex items-center justify-between">
        <div className="p-2">PETIT LIBRARY</div>
        <div className="flex gap-8">
          <NavLink 
            to={"books"}
            className={({ isActive }) => isActive ? "border-b-2" : ""}
          >
            BOOKS
          </NavLink>
          <NavLink 
            to={"members"}
            className={({ isActive }) => isActive ? "border-b-2" : ""}
          >
            MEMBERS
          </NavLink>
          <NavLink 
            to={"issues"}
            className={({ isActive }) => isActive ? "border-b-2" : ""}
          >
            ISSUE
          </NavLink>
        </div>
        <div/>

      </div>
      <div className="mt-14 h-[calc(100vh-8rem)]">
        <Outlet/>
      </div>
    </div>
  )
}
