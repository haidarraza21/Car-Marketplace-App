import { GoXCircleFill } from "react-icons/go";
import supabase from "./../../../configs/supabaseConfig";
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import UUID for unique file names
import { db } from './../../../configs';
import { CarImages } from './../../../configs/schema';

const UploadImage = ({ triggerUploadImage }) => {
  const [selectFileList, setSelectFileList] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  useEffect(() => {
    if (triggerUploadImage) {
      UploadImagesToServe();
    }
  }, [triggerUploadImage]);

  const onFileSelected = (event) => {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setSelectFileList((prev) => [...prev, file]);
    }
  };

  const onImageRemove = (image) => {
    const result = selectFileList.filter((item) => item !== image);
    setSelectFileList(result);
  };

  const UploadImagesToServe = async () => {
    setIsLoading(true); // Set loading to true when the upload starts
    const insertData = []; // Array to collect data for batch insert

    for (let i = 0; i < selectFileList.length; i++) {
      const file = selectFileList[i];
      const fileName = `${uuidv4()}-${Date.now()}-${file.name}`;

      try {
        // Upload file to Supabase storage
        const { data, error } = await supabase.storage
          .from('car') // Ensure the correct bucket name
          .upload(`car/${fileName}`, file, {
            contentType: file.type,
          });

        if (error) {
          console.error("Upload error:", error.message);
          continue;
        }

        const filePath = data.path;
        let publicUrl;

        // Generate public or signed URL
        const { publicURL, error: urlError } = supabase.storage
          .from('car')
          .getPublicUrl(filePath);

        if (urlError || !publicURL) {
          const { data: signedData, error: signedUrlError } = await supabase.storage
            .from('car')
            .createSignedUrl(filePath, 60 * 60); // URL valid for 1 hour

          if (signedUrlError || !signedData?.signedUrl) {
            console.error("Error generating signed URL:", signedUrlError?.message || "Signed URL is undefined");
            continue;
          }
          publicUrl = signedData.signedUrl;
        } else {
          publicUrl = publicURL;
        }

        console.log("Generated URL:", publicUrl);

        // Collect data for batch insert
        insertData.push({
          imageUrl: publicUrl,
          carListingId: triggerUploadImage, // ID of the car listing
        });
      } catch (err) {
        console.error("Error uploading file:", err.message);
      }
    }

    // Perform a single database insert for all images
    if (insertData.length > 0) {
      try {
        const { error: dbError } = await db.insert(CarImages).values(insertData);

        if (dbError) {
          console.error("Database insert error:", dbError.message, dbError.details, dbError.hint);
        } else {
          console.log("All images successfully inserted into the database");
        }
      } catch (err) {
        console.error("Error inserting images into database:", err.message);
      }
    } else {
      console.log("No images to insert into the database.");
    }

    setIsLoading(false); // Set loading to false when the upload finishes
  };

  return (
    <div>
      <h2 className='font-medium text-lg my-3'>Upload Car Images</h2>
      {isLoading ? (
        <div className="text-center">
          <div className="loader"></div>
          <p>Uploading images...</p>
        </div>
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5'>
          {selectFileList.map((image, index) => (
            <div key={index} className="relative">
              <GoXCircleFill
                className='absolute m-2 text-lg text-white cursor-pointer'
                onClick={() => onImageRemove(image)}
              />
              <img
                src={URL.createObjectURL(image)}
                className='w-full h-[130px] object-cover rounded-lg'
                alt="selected-file"
              />
            </div>
          ))}
          <label htmlFor='upload-image'>
            <div className='border rounded-xl border-dotted border-primary bg-blue-100 p-10 cursor-pointer'>
              <h2 className='text-lg text-center text-primary'>+</h2>
            </div>
          </label>
          <input
            type="file"
            multiple={true}
            onChange={onFileSelected}
            id='upload-image'
            className='opacity-0'
          />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
