import React, { useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../utils/uploadImage';
import Loading from '../components/loading';
import OpenImage from '../components/OpenImage';
import { IoClose } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';
import AddFieldComponent from '../components/AddFieldComponent'
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import successAlert from '../utils/successAlert.js';
const UploadProduct = () => {
  const [imageLoading, setImageLoading] = useState(false)
  const [fullImage, setFullImage] = useState("")
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subcategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  })
  const allCategory = useSelector(state => state.product.allCategory)
  const allSubCategory = useSelector(state => state.product.allSubCategory)
  const [openAddField, setOpenAddField] = useState(false)
  const [fieldName, setFieldName] = useState("")
  const [selectCategory, setSelectCategory] = useState('')
  const [selectSubCategory, setSelectSubCategory] = useState('')
  const handleChange = (e) => {
    const { name, value } = e.target
    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }
  const handleUploadImage = async (e) => {
    const files = Array.from(e.target.files)
    if (!files) {
      return
    }
    setImageLoading(true)
    // const Response = await uploadImage(file)
    // const { data: imageResponse } = Response
    // const imageUrl = imageResponse.data.url
    // setData((preve) => {
    //   setImageLoading(false)
    //   return {
    //     ...preve,
    //     image: [...preve.image, imageUrl]
    //   }

    // })
    // ################## for uploading ultiple images at ones ######################### 
    const uploadedImages = []

  for (let file of files) {
    const response = await uploadImage(file)
    const imageUrl = response.data.data.url
    uploadedImages.push(imageUrl)
  }
  setImageLoading(false)
  setData((prev) => ({
    ...prev,
    image: [...prev.image, ...uploadedImages]
  }))
  }
  const handleDelete = async (index) => {
    data.image.splice(index, 1)
    setData((preve) => {
      return {
        ...preve
      }
    })
  }
  const handleRemoveCategorySelected = async (index) => {
    data.category.splice(index, 1)
    setData((preve) => {
      return {
        ...preve
      }
    })
  }
  const handleRemoveSubCategorySelected = async (index) => {
    data.subcategory.splice(index, 1)
    setData((preve) => {
      return {
        ...preve
      }
    })
  }
  const handleAddField = () => {
    setData((preve) => {
      return {
        ...preve,
        more_details: {
          ...preve.more_details,
          [fieldName]: ""

        }
      }
    })
    setFieldName("")
    setOpenAddField(false)

  }
  const handleProductSubmit = async(e) => {
    e.preventDefault()
    try {
      const response =await Axios({
        ...SummaryApi.createProduct,
        data:data
      })
      const {data : responseData} =response
      if (responseData.success){
        successAlert(responseData.message)
        setData({
          name: "",
          image: [],
          category: [],
          subcategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
        })
        
      }
    } catch (error) {
      
    }

  }
  return (
    <section>
      <div className='bg-white p-2 flex items-center justify-between  shadow-md'>
        <h2 className='font-semibold'>Upload Product</h2>
      </div>
      <div className='grid p-3 lg:max-w-3/5 items-center '>
        <form onSubmit={handleProductSubmit} className='grid gap-2' action="">

          <div className='grid gap-1'>
            <label className='font-medium' htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id='name'
              placeholder='Enter Product Name'
              name='name'
              value={data.name}
              onChange={handleChange}
              required
              className='bg-blue-50 p-1 outline-none shadow focus-within:shadow-blue-300 rounded'
            />
          </div>

          <div className='grid gap-1'>
            <label className='font-medium' htmlFor="description">
              Description
            </label>
            <textarea
              type="text"
              id='description'
              placeholder='Enter Product description'
              name='description'
              value={data.description}
              onChange={handleChange}
              required
              multiple
              rows={2}
              className='bg-blue-50 p-1 outline-none shadow focus-within:shadow-blue-300 rounded resize-none'
            />
          </div>

          <div className='grid gap-1'>
            <p className='font-medium'>image</p>
            <div>
              <label htmlFor='productImage' className='bg-blue-50 h-24 border rounded flex justify-center cursor-pointer'>
                <div className='text-center flex justify-center items-center flex-col'>
                  {
                    imageLoading ? <Loading /> : (<>
                      <FaCloudUploadAlt size={35} />
                      <p>Upload Image</p>
                    </>)
                  }

                </div>
                <input type="file" multiple id='productImage' className='hidden' accept='image' onChange={handleUploadImage}
                />
              </label>
              {/* display uploaded images */}
              <div className='flex flex-wrap gap-4'>
                {
                  data.image.map((img, index) => {
                    return (
                      <div key={img + index} className='mt-1 relative group h-25 w-25 min-w-20 bg-blue-50 shadow-xs shadow-blue-200'>
                        <img src={img} alt={img} onClick={() => setFullImage(img)} className='w-full h-full object-scale-down cursor-pointer' />
                        <div onClick={() => handleDelete(index)} className='absolute bottom-0 right-0 p-1 z-20 shadow-sm  shadow-blue-200 bg-gray-100 hover:text-red-500 rounded-full hidden group-hover:block'>
                          <MdDelete size={20} />
                        </div>
                      </div>
                    )
                  })

                }
              </div>
            </div>
          </div>

          <div className='grid gap-1'>
            <label className='font-medium' htmlFor="category">Category</label>
            <div>
              <select
                className='bg-blue-50 outline-none  shadow-blue-100 shadow-md w-full p-2'
                value={selectCategory}
                id='category'
                onChange={(e) => {
                  const value = e.target.value
                  const category = allCategory.find(el => el._id === value)
                  console.log("value", category)
                  setData((preve) => {
                    return {
                      ...preve,
                      category: [...preve.category, category]
                    }
                  })
                  setSelectCategory("")
                }}
              >
                <option value={""}>Select Category</option>
                {
                  allCategory.map((c, index) => {
                    return (
                      <option key={c._id + index} value={c?._id}>{c.name}</option>
                    )
                  })
                }
              </select>
              <div className='flex flex-wrap gap-2' >
                {
                  data.category.map((c, index) => {
                    return (
                      <p className='bg-white shadow-md px-1 m-1 flex items-center gap-2' key={c._id + index + "productSection"}>{c.name}
                        <button onClick={() => handleRemoveCategorySelected(index)} className=' text-neutral-800 block shadow hover:text-red-600 hover:shadow-red-600 shadow-blue-300 rounded ml-auto cursor-pointer'>
                          <IoClose size={15} />
                        </button>
                      </p>
                    )

                  })
                }
              </div>

            </div>
          </div>

          <div className='grid gap-1'>
            <label className='font-medium' htmlFor="subcategory">Sub Category</label>
            <div>
              <select
                className='bg-blue-50 outline-none  shadow-blue-100 shadow-md w-full p-2'
                value={selectSubCategory}
                id='subcategory'
                onChange={(e) => {
                  const value = e.target.value
                  const subcategory = allSubCategory.find(el => el._id === value)
                  setData((preve) => {
                    return {
                      ...preve,
                      subcategory: [...preve.subcategory, subcategory]
                    }
                  })
                  setSelectSubCategory("")
                }}
              >
                <option value={""}>Select Sub Category</option>
                {
                  allSubCategory.map((c, index) => {
                    return (
                      <option key={c._id + index} value={c?._id}>{c.name}</option>
                    )
                  })
                }
              </select>
              <div className='flex flex-wrap gap-2' >
                {
                  data.subcategory.map((c, index) => {
                    console.log("dfbksbfrwhj", index)
                    return (
                      <p className='bg-white shadow-md px-1 m-1 flex items-center gap-2' key={c._id + index + "productSection"}>{c.name}
                        <button onClick={() => handleRemoveSubCategorySelected(index)} className=' text-neutral-800 block shadow hover:text-red-600 hover:shadow-red-600 shadow-blue-300 rounded ml-auto cursor-pointer'>
                          <IoClose size={15} />
                        </button>
                      </p>
                    )

                  })
                }
              </div>

            </div>
          </div>

          <div className='grid gap-1'>
            <label className='font-medium' htmlFor="unit">
              Unit
            </label>
            <input
              type="text"
              id='unit'
              placeholder='Enter Product Unit'
              name='unit'
              value={data.unit}
              onChange={handleChange}
              required
              className='bg-blue-50 p-1 outline-none shadow focus-within:shadow-blue-300 rounded'
            />
          </div>

          <div className='grid gap-1'>
            <label className='font-medium' htmlFor="stock">
              Number of Stock
            </label>
            <input
              type="number"
              id='stock'
              onKeyDown={(e) => {
                if (['e', 'E', '+', '-'].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              placeholder='Enter Product Stock'
              name='stock'
              value={data.stock}
              onChange={handleChange}
              required
              className='bg-blue-50 p-1 outline-none shadow focus-within:shadow-blue-300 rounded'
            />
          </div>

          <div className='grid gap-1'>
            <label className='font-medium' htmlFor="price">
              Price
            </label>
            <input
              type="number"
              id='price'
              onKeyDown={(e) => {
                if (['e', 'E', '+', '-'].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              placeholder='Enter Product Price'
              name='price'
              value={data.price}
              onChange={handleChange}
              required
              className='bg-blue-50 p-1 outline-none shadow focus-within:shadow-blue-300 rounded'
            />
          </div>

          <div className='grid gap-1'>
            <label className='font-medium' htmlFor="discount">
              Discount
            </label>
            <input
              type="number"
              id='discount'
              onKeyDown={(e) => {
                if (['e', 'E', '+', '-'].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              placeholder='Enter Product discount'
              name='discount'
              value={data.discount}
              onChange={handleChange}
              required
              className='bg-blue-50 p-1 outline-none shadow focus-within:shadow-blue-300 rounded'
            />
          </div>
          {/* add more field */}
          <div>
            {
              Object?.keys(data?.more_details)?.map((k, index) => {
                return (
                  <div className='grid gap-1'>
                    <label className='font-medium' htmlFor={k}>
                      {k}
                    </label>
                    <input
                      type="text"
                      id={k}
                      value={data?.more_details[k]}
                      onChange={(e) => {
                        const value = e.target.value
                        setData((preve) => {
                          return {
                            ...preve,
                            more_details: {
                              ...preve.more_details,
                              [k]: value
                            }
                          }
                        })
                      }}
                      required
                      className='bg-blue-50 p-1 outline-none shadow focus-within:shadow-blue-300 rounded'
                    />
                  </div>
                )
              })
            }
          </div>
          <div onClick={() => setOpenAddField(true)} className='text-md font-semibold text-center text-green-900 inline-block max-w-36 px-3 py-2 shadow hover:text-green-600 hover:shadow-blue-400 rounded mt-3 border-2  border-blue-100 tracking-widest'>
            Add Fields
          </div>
          <button className={`${!data.image || !data.name || !data.category[0] ? "text-neutral-400  bg-neutral-200" : "text-green-900 hover:shadow-green-400 hover:text-green-600"} text-md font-semibold text-center w-full lg:max-w-full px-3 py-2 shadow  rounded border-2 border-blue-100 tracking-widest`}>
            Upload Product
          </button>
        </form>
      </div>
      {
        fullImage && (<OpenImage url={fullImage} close={() => setFullImage("")} />)
      }
      {
        openAddField && (
          <AddFieldComponent value={fieldName} onChange={(e) => setFieldName(e.target.value)} submit={handleAddField} close={() => setOpenAddField(false)} />
        )
      }

    </section>
  )
}
export default UploadProduct