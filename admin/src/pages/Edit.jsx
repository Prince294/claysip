import React, { useState } from 'react'
import {assets} from '../assets/assets'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import http from '../services/utility'

const Edit = ({token}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state;

  const [image1,setImage1] = useState(false)
  const [image2,setImage2] = useState(false)
  const [image3,setImage3] = useState(false)
  const [image4,setImage4] = useState(false)

  const setters = [setImage1, setImage2, setImage3, setImage4];

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [category, setCategory] = useState("Glasses");
  const [bestseller, setBestseller] = useState(false);

  const [productTypes, setProductTypes] = useState("0");
  const [productTypeData, setProductTypeData] = useState([]);


  useEffect(() => {
    if(data){
      console.log(data)
      let productTypeDataa = [];
      data.product_type_data.forEach((productTypeD, index)=>{
        let newImages = {}; 
        productTypeD.image.map((img, index) => {
          newImages[`image${index + 1}`] = img;
        });
        productTypeDataa.push({ ...productTypeD, ...newImages });
      })

      setProductTypeData(productTypeDataa)
      setName(data.name);
      setDescription(data.description);
      setPrice(data.price);
      setWeight(data?.weight);
      setCategory(data.category);
      setBestseller(data.bestseller);
      setProductTypes(parseInt(data.no_of_product_types));
      setFullDescription(data.full_description);

      data?.image.forEach((img, index) => {
        if (setters[index] && img != "") {
          setters[index](img);
        }
      });
    }

  }, [data])
   
  const setProductTypeSize = (index, size)=>{
    const newProductTypeData = [...productTypeData];

    if(!newProductTypeData[index].sizes.includes(size)){
      newProductTypeData[index] = {
        ...newProductTypeData[index],
        sizes: [...newProductTypeData[index].sizes, size],
      };
    } else {
      newProductTypeData[index] = {
        ...newProductTypeData[index],
        sizes: newProductTypeData[index].sizes.filter( item => item !== size),
      };
    }
    setProductTypeData(newProductTypeData);
  }

  const setProductTypeImage = (index, image, imageUrl)=>{
    const newProductTypeData = [...productTypeData];

    newProductTypeData[index] = {
      ...newProductTypeData[index],
      ["image"+image]: imageUrl,
    };

    setProductTypeData(newProductTypeData);
  }

  const setProductTypePrice = (index, price)=>{
    const newProductTypeData = [...productTypeData];

    newProductTypeData[index] = {
      ...newProductTypeData[index],
      price: price,
    };
    setProductTypeData(newProductTypeData);
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      
      const formData = new FormData()
      formData.append("_id",data._id);
      formData.append("name",name)
      formData.append("description",description)
      formData.append("full_description",fullDescription)
      formData.append("price",price)
      formData.append("weight",weight)
      formData.append("category",category)
      formData.append("no_of_product_types",productTypes)
      
      productTypeData.forEach((product, index) => {
        typeof product.image1 !== 'string' && formData.append(`image${product.index}_1`, product.image1);
        typeof product.image2 !== 'string' && formData.append(`image${product.index}_2`, product.image2);
        typeof product.image3 !== 'string' && formData.append(`image${product.index}_3`, product.image3);
        typeof product.image4 !== 'string' && formData.append(`image${product.index}_4`, product.image4);
      });

      let dataImage = data.image;
      if(image1 && typeof image1 !== 'string'){
        dataImage[0] = "";
      }
      if(image2 && typeof image2 !== 'string'){
        dataImage[1] = "";
      }
      if(image3 && typeof image3 !== 'string'){
        dataImage[2] = "";
      }
      if(image4 && typeof image4 !== 'string'){
        dataImage[3] = "";
      }

      formData.append("images", JSON.stringify(dataImage))
      
      formData.append("product_type_data",JSON.stringify(productTypeData))
      
      formData.append("bestseller",bestseller)

      image1 && typeof image1 !== 'string' && formData.append("image1",image1)
      image2 && typeof image2 !== 'string' && formData.append("image2",image2)
      image3 && typeof image3 !== 'string' && formData.append("image3",image3)
      image4 && typeof image4 !== 'string' && formData.append("image4",image4)

      const response = await http.post(backendUrl + "/api/product/update",formData,{headers:{token}})

      if (response.data.success) {
        toast.success(response.data.message)
        navigate(-1);
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
        <div>
          <p className='mb-2'>Upload Image</p>

          <div className='flex gap-2'>
            <label htmlFor="image1">
              <img className='w-20' src={!image1 ? assets.upload_area : typeof image1 !== 'string' ? URL.createObjectURL(image1) : image1} alt="" />
              <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden/>
            </label>
            <label htmlFor="image2">
              <img className='w-20' src={!image2 ? assets.upload_area : typeof image2 !== 'string' ? URL.createObjectURL(image2) : image2} alt="" />
              <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden/>
            </label>
            <label htmlFor="image3">
              <img className='w-20' src={!image3 ? assets.upload_area : typeof image3 !== 'string' ? URL.createObjectURL(image3) : image3} alt="" />
              <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden/>
            </label>
            <label htmlFor="image4">
              <img className='w-20' src={!image4 ? assets.upload_area : typeof image4 !== 'string' ? URL.createObjectURL(image4) : image4} alt="" />
              <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden/>
            </label>
          </div>
        </div>

        <div className='w-full'>
          <p className='mb-2'>Product name</p>
          <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required/>
        </div>

        <div className='w-full'>
          <p className='mb-2'>Product description</p>
          <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required/>
        </div>

        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

            <div>
              <p className='mb-2'>Product category</p>
              <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
                  <option value="Glasses">Glasses</option>
                  <option value="Jugs">Jugs</option>
                  <option value="Bottles">Bottles</option>
                  <option value="Pots">Pots</option>
              </select>
            </div>

            <div>
              <p className='mb-2'>Product Price</p>
              <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25' />
            </div>

            <div>
              <p className='mb-2'>Product Weight (in grams)</p>
              <input onChange={(e) => setWeight(e.target.value)} value={weight} className='w-full px-3 py-2 sm:w-[180px]' type="Number" placeholder='1000' />
            </div>

        </div>

        <div>
          <div className='flex-row gap-3'>
            <p className='mb-2'>Number of Product Types</p>
            <select onChange={(e) => setProductTypes(e.target.value)} value={productTypes} className='w-full px-3 py-2'>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
          </div>
          <div className='flex-row gap-3 mt-3 flex-wrap'>
            {productTypeData.length == productTypes && Array.from({ length: parseInt(productTypes) }, (_, index) => (
              <>
                Type {index + 1}:
                <div className='flex gap-2 mb-3 flex-wrap' key={index}>
                  <label htmlFor={`product_type_${index}_image1`}>
                    <img className='w-20' src={!productTypeData[index]?.image1 ? assets.upload_area : typeof productTypeData[index]?.image1 !== 'string' ? URL.createObjectURL(productTypeData[index]?.image1) : productTypeData[index]?.image1} alt="" />
                    <input onChange={(e)=>setProductTypeImage(index, 1, e.target.files[0])} type="file" id={`product_type_${index}_image1`} hidden/>
                  </label>
                  <label htmlFor={`product_type_${index}_image2`}>
                    <img className='w-20' src={!productTypeData[index]?.image2 ? assets.upload_area : typeof productTypeData[index]?.image2 !== 'string' ? URL.createObjectURL(productTypeData[index]?.image2) : productTypeData[index]?.image2} alt="" />
                    <input onChange={(e)=>setProductTypeImage(index, 2, e.target.files[0])} type="file" id={`product_type_${index}_image2`} hidden/>
                  </label>
                  <label htmlFor={`product_type_${index}_image3`}>
                    <img className='w-20' src={!productTypeData[index]?.image3 ? assets.upload_area : typeof productTypeData[index]?.image3 !== 'string' ? URL.createObjectURL(productTypeData[index]?.image3) : productTypeData[index]?.image3} alt="" />
                    <input onChange={(e)=>setProductTypeImage(index, 3, e.target.files[0])} type="file" id={`product_type_${index}_image3`} hidden/>
                  </label>
                  <label htmlFor={`product_type_${index}_image4`}>
                    <img className='w-20' src={!productTypeData[index]?.image4 ? assets.upload_area : typeof productTypeData[index]?.image4 !== 'string' ? URL.createObjectURL(productTypeData[index]?.image4) : productTypeData[index]?.image4} alt="" />
                    <input onChange={(e)=>setProductTypeImage(index, 4, e.target.files[0])} type="file" id={`product_type_${index}_image4`} hidden/>
                  </label>

                  <div className='ml-4'>
                    <p className='mb-2'>Product Price</p>
                    <input onChange={(e) => setProductTypePrice(index, e.target.value)} value={productTypeData[index]?.price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25' />
                  </div>

                  <div className='flex gap-2 mt-2 items-center ml-6'>
                    <input onChange={() => {
                      const newProductTypeData = [...productTypeData];
                      newProductTypeData[index] = {
                        ...newProductTypeData[index],
                        size_available: !newProductTypeData[index].size_available,
                      };
                      setProductTypeData(newProductTypeData);
                    }} checked={productTypeData[index]?.size_available} type="checkbox" id={`is_size_available-${index}`} />
                    <label className='cursor-pointer' htmlFor={`is_size_available-${index}`}>Is sizes available</label>
                  </div>

                  {productTypeData[index]?.size_available && (
                    <div className='flex gap-2 mt-2 w-full'>
                      <div onClick={()=>setProductTypeSize(index, "S")}>
                        <p className={`${productTypeData[index].sizes.includes("S") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>S</p>
                      </div>
                      
                      <div onClick={()=>setProductTypeSize(index, "M")}>
                        <p className={`${productTypeData[index].sizes.includes("M") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>M</p>
                      </div>

                      <div onClick={()=>setProductTypeSize(index, "L")}>
                        <p className={`${productTypeData[index].sizes.includes("L") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>L</p>
                      </div>

                      <div onClick={()=>setProductTypeSize(index, "XL")}>
                        <p className={`${productTypeData[index].sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>XL</p>
                      </div>

                      <div onClick={()=>setProductTypeSize(index, "XXL")}>
                        <p className={`${productTypeData[index].sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>XXL</p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ))}
          </div>
            
        </div>

        <div className='flex gap-2 mt-2'>
          <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
          <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
        </div>

        <div className='w-full mt-2'>
          <p className='mb-2'>Product Additional Details</p>
          <textarea onChange={(e)=>setFullDescription(e.target.value)} value={fullDescription} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Enter Additional Details here' rows={4} required/>
        </div>

        <button type="submit" className='w-28 py-3 mt-4 bg-black text-white'>Update</button>

    </form>
  )
}

export default Edit