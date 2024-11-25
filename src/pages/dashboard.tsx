import { useEffect, useState } from 'react'
// import './App.css'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { CreateContentModal } from '../components/CreateContentModal'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { SideBar } from '../components/SideBar'
import { useContent } from '../hooks/useContent'
import axios from 'axios'
import { BACKEND_URL } from '../config'

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(true);

  const { contents, refresh } = useContent();
  useEffect(() => {
    refresh();
  }, [modalOpen])
  return (
      <div>
        <SideBar />
        <div className='p-4 ml-72 min-h-screen bg-gray-100 border-2'>
          <CreateContentModal open={modalOpen} onClose={() => {
            setModalOpen(false)
          }}/>
          <div className='flex justify-end gap-4'>
            <Button onClick={() => {
              setModalOpen(true)
            }} text='Add Content' variant='primary' startIcon={<PlusIcon />}></Button>
            <Button onClick={async () => {
              const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
                share: true
              }, {
                headers: {
                  "Authorization": localStorage.getItem("token")
                }
              })
              const shareURL = `http://localhost:5173/share${response.data.hash}`
              alert(shareURL);
              
            }} text='Share Brain' variant='secondary' startIcon={<ShareIcon />}></Button>
        </div>  
        <div className='flex gap-4 flex-wrap'>
          { contents.map(({type, link , title}) => <Card 
          type={type}
          link={link} 
          title={title} 
          />) }
          <Card type='twitter' link="https://x.com/mannupaaji/status/1737037471391645728" title="First Tweet"/>
          
        </div>  
      </div>
    </div>
  )
}



export default Dashboard
