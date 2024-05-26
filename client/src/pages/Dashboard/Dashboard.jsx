
import { Outlet } from 'react-router-dom'

export const Dashboard = () => {
  return (
    <div className="overflow-hidden">
      <div className="fixed h-14 top-0 bg-[#1B4242] w-full flex items-center">
        <div className="p-2">PETITE LIBRARY</div>
      </div>
      <div className="mt-14 h-[calc(100vh-8rem)]">
        <Outlet/>
      </div>
    </div>
  )
}
