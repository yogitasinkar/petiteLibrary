import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Landing = () => {

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/dashboard')
  }

  return (
    <div className='landing'>
      <h1>Welcome to the Petit Library</h1>
      <Button type="primary" onClick={handleNavigate}>Get Started</Button>
    </div>
  )
}

export default Landing