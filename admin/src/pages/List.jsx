import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import FullScreenAlert from './FullScreenAlert'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const List = ({ token }) => {
  const navigate = useNavigate();
  const [list, setList] = useState([])
  const [productIdRemove, setProductIdRemove] = useState("")
  const [isVisible, setIsVisible] = useState(false);
  

  const fetchList = async () => {
    try {

      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products.reverse());
      }
      else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {

      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })

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

  const buttonClickResponse = (resp)=>{
    if(resp){
      removeProduct(productIdRemove);
      setIsVisible(false);
    } else {
      setIsVisible(false);
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <FullScreenAlert clicked={(val)=> buttonClickResponse(val)} isVisible={isVisible} />
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>

        {/* ------- List Table Title ---------- */}

        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* ------ Product List ------ */}

        {
          list.map((item, index) => (
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
              <img className='w-12' src={item.image[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <div className='flex items-center justify-center w-full gap-4'>
                <img src={assets.pencil_icon} onClick={()=>{
                  navigate(`/add/${item._id}`, { state: { data: item } });
                }} alt="edit" className='w-4 cursor-pointer' title='Edit Product' />
                <p onClick={()=>{
                  setIsVisible(true);
                  setProductIdRemove(item._id)
                }} className='cursor-pointer text-lg' title='Delete Product'>X</p>
              </div>
            </div>
          ))
        }

      </div>
    </>
  )
}

export default List