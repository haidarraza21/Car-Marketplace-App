import Header from '@/components/Header'
import React, { useState } from 'react'
import carDetails from './../Shared/carDetails.json'
import InputField from './../add-listing/components/InputField'
import DropDown from './../add-listing/components/DropDown'
import TextAreaField from './../add-listing/components/TextAreaField'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from "@/components/ui/checkbox"

import features from './../Shared/features.json'
import { Button } from '@/components/ui/button'
import { db } from './../../configs'
import { CarListing } from './../../configs/schema'
import IconField from './components/IconField'
import UploadImage from './components/UploadImage'

const AddListing = () => {

  const [formData, setFormData] = useState([])
  const [featuresData, setFeaturesData] = useState([])

  const [triggerUploadImage, setTriggerUploadImage] = useState([])
  const handleInputChanged = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))

    console.log(formData)
  }

  const handleFeaturesChange = (name, value) => {
    setFeaturesData((prevData) => ({
      ...prevData,
      [name]: value
    }))

    console.log(featuresData)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)

    try {
      const result = await db.insert(CarListing).values({
        ...formData,
        features: featuresData
      }).returning({ id: CarListing.id })
      if (result) {
        console.log("Data Saved")
        setTriggerUploadImage(result[0]?.id)
      }
    } catch (e) {
      console.log("Error", e)
    }
  }


  return (
    <div>
      <Header />
      <div className='px-10 md:px-20 my-10'>
        <h2 className='font-bold text-4xl'>Add New Listing</h2>
        <form className='p-10 border rounded-xl mt-10' >
          <div>
            <h2 className='font-medium text-lg mb-6'>Car Deatils</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              {carDetails?.carDetails?.map((item, index) => (
                <div key={index}>
                  <label className='text-sm flex gap-2 items-center mb-2'>
                    <IconField icon={item?.icon} />
                    {item.label} {item.required && <span className='text-red-600'> *</span>}</label>
                  {item.fieldType == 'text' || item.fieldType == 'number' ? <InputField item={item} handleInputChanged={handleInputChanged} />
                    : item.fieldType == 'dropdown' ? <DropDown item={item} handleInputChanged={handleInputChanged} />
                      : item.fieldType == 'textarea' ? <TextAreaField item={item} handleInputChanged={handleInputChanged} />
                        : null}
                </div>
              ))}
            </div>
          </div>

          <Separator className='my-6' />

          <div>
            <h2 className='font-medium text-xl my-6'>Features</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
              {features?.features?.map((item, index) => (
                <div key={index} className='flex gap-2 items-center'>
                  <Checkbox onCheckedChange={(value) => handleFeaturesChange(item.name, value)} /> <h2>{item.label}</h2>

                </div>
              ))}
            </div>
            <Separator className='my-6' />

            <UploadImage triggerUploadImage={triggerUploadImage} />

            <div className='mt-10 flex justify-end'>
              <Button onClick={(e) => onSubmit(e)} >Submit</Button>
            </div>
          </div>

        </form>
        {/* <UploadImage /> */}
      </div>
    </div>
  )
}

export default AddListing
