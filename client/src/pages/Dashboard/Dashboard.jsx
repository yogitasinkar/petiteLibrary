
import { Outlet } from 'react-router-dom'
import { Affix } from 'antd';


export const Dashboard = () => {
  return (
    <>
      <Affix className="header">
        <header>
          <div className="p-2">PETITE LIBRARY</div>
        </header>
      </Affix>
      <Outlet/>
    </>
  )
}
