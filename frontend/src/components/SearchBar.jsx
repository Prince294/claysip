import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

    const { search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const [visible,setVisible] = useState(false)
    const location = useLocation();

    useEffect(()=>{
        if (location.pathname.includes('collection')) {
            setVisible(true);
        }
        else {
            setVisible(false)
        }
    },[location])
    
  return showSearch && visible ? (
    <div className='bg-lightstone text-center'>
      <div className='inline-flex items-center justify-center w-3/4 sm:w-1/2 py-3'>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} className='rounded-[50px] px-5 py-3 flex-1 outline-none text-sm border border-primary ring-0 focus:ring-0 focus:border-secondary' type="text" placeholder='Search'/>
        <img className='w-4 -ml-7' src={assets.search_icon} alt="" />
      </div>
      <img onClick={()=>setShowSearch(false)} className='inline w-3 cursor-pointer ml-6' src={assets.cross_icon} alt="" />
    </div>
  ) : null
}

export default SearchBar
