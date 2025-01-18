import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { useLocation } from 'react-router-dom';

const Collection = () => {
  const location = useLocation();
  const data = location.state;

  const { products, search, showSearch, filters } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent')
  const [specificCat, setSpecificCat] = useState(false)

  const toggleCategory = (e) => {

    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }

  }

  const applyFilter = () => {

    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    setFilterProducts(productsCopy)

  }

  const sortProduct = () => {

    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }

  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    applyFilter();
  }, [category, search, showSearch, products])

  useEffect(() => {
    sortProduct();
  }, [sortType])

  useEffect(() => {
    if (data) {
      setSpecificCat(true);
      setCategory(data.data);
    } else {
      setSpecificCat(false);
      setCategory("");
    }
  }, [data])

  return (
    <div className='py-16'>
      <div className="container">
        <div className='flex flex-col md:flex-row gap-1 sm:gap-14'>

          <div className='lg:w-[18rem] flex flex-col gap-y-3'>
            {/* Filter Options */}
            {!specificCat && <div className='min-w-60'>
              <p onClick={() => setShowFilter(!showFilter)} className='flex items-center gap-1 font-semibold text-lg text-secondary capitalize'>
                filters
                <img className={`h-3 mt-[3px] sm:hidden ${showFilter ? 'rotate-0' : '-rotate-90'}`} src={assets.dropdown_icon} alt="" />
              </p>
              {/* Category Filter */}
              <div className={`border border-primary rounded pl-5 py-3 mt-2 ${showFilter ? '' : 'hidden'} sm:block`}>
                <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>

                  {filters?.categories?.map((filter, index) => {
                    return (
                      // <p key={index} className='flex gap-2'>
                      //   <input className="w-4 h-4 text-primary bg-lightstone border-primary rounded focus:ring-primary" type="checkbox" value={filter} onChange={toggleCategory}/> {filter}
                      // </p>

                      <div key={index} className="flex items-center rounded">
                        <input id={index} className="w-4 h-4 text-primary bg-lightstone border-primary rounded focus:ring-primary" type="checkbox" value={filter} onChange={toggleCategory} />
                        <label htmlFor={index} className="w-full py-1 ms-2 text-base text-secondary">{filter}</label>
                      </div>
                    )
                  })}

                  {/* <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory}/> Women
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory}/> kids
              </p> */}
                </div>
              </div>
            </div>
            }

            <div className='flex justify-between text-base sm:text-2xl mb-4'>
              {/* Porduct Sort */}
              <select onChange={(e) => setSortType(e.target.value)} className='w-full border-1 border-primary focus:ring-primary focus:border-primary rounded-1 text-base px-2'>
                <option value="relavent">Sort by: Relavent</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
              </select>
            </div>

          </div>

          {/* Right Side */}
          <div className='flex-1 mt-6'>

            <div className="mb-4">
              <Title text1={specificCat ? data?.data : 'all'} text2={'collections'} />
            </div>

            {/* Map Products */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-6 w-full'>
              {filterProducts.length > 0 ? filterProducts.map((item, index) => (
                <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
              )) :
                <div className='text-xl text-center col-span-full mt-2'>No Product Found</div>
              }
            </div>
          </div>

        </div>
      </div>
    </div>

  )
}

export default Collection
