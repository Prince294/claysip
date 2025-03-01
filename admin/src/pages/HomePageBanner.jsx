import React, { useState } from 'react'
import {assets} from '../assets/assets'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import http from '../services/utility'
import FullScreenAlert from './FullScreenAlert'

const HomePageBanner = ({token}) => {

  const [image,setImage] = useState(false)
  const [list, setList] = useState([])
  const [isVisible, setIsVisible] = useState(false);
  const [bannerIdRemove, setBannerIdRemove] = useState("")
  

  useEffect(() => {
    fetchList()
  }, [])


  const buttonClickResponse = (resp)=>{
    if(resp){
      removeBanner(bannerIdRemove);
      setIsVisible(false);
    } else {
      setIsVisible(false);
    }
  }

  const removeBanner = async (id) => {
    try {

      const response = await http.post(backendUrl + '/api/banner/remove', { id }, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const fetchList = async () => {
    try {

      const response = await http.get(backendUrl + '/api/banner/list')
      if (response.data.success) {
        setList(response.data.banners);
      }
      else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
   
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      
      const formData = new FormData()
      
      image && formData.append("image",image)
      
      const response = await http.post(backendUrl + "/api/banner/add",formData,{headers:{token}})

      if (response.data.success) {
        toast.success(response.data.message)
        setImage(false)
        await fetchList();
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <>
      <form onSubmit={onSubmitHandler} className='flex flex-row w-full items-end gap-6 mb-8'>
        <div>
          <p className='mb-4'>Upload Image</p>

          <div className='flex gap-2'>
            <label htmlFor="image">
              <img className='w-96 h-32 cover cursor-pointer' src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
              <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden/>
            </label>
          </div>
        </div>

        <button type="submit" className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
      </form>


      <FullScreenAlert clicked={(val)=> buttonClickResponse(val)} isVisible={isVisible} />
      <p className='mb-2'>All Banner List</p>
      <div className='flex flex-col gap-2'>

        {/* ------- List Table Title ---------- */}

        <div className='hidden md:grid grid-cols-[3fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b className='text-center'>Action</b>
        </div>

        {/* ------ Banner List ------ */}

        {
          list.map((item, index) => (
            <div className='grid grid-cols-[3fr_1fr] md:grid-cols-[3fr_1fr] items-center gap-2 py-4 px-2 border-4 text-sm' key={index}>
              <img className='w-3/4 h-32' src={item.image} alt="" />
              <div className='flex items-center justify-center w-full gap-4'>
                <p onClick={()=>{
                  setIsVisible(true);
                  setBannerIdRemove(item._id)
                }} className='cursor-pointer text-2xl' title='Delete Banner'>X</p>
              </div>
            </div>
          ))
        }

      </div>
    </>
  )
}

export default HomePageBanner