import React from 'react'

const InfoSection = () => {
  return (
    <div>
      <section>
        <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
            <div>
              <div class="max-w-lg md:max-w-none">
                <h2 class="text-2xl font-semibold text-gray-900 sm:text-3xl">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </h2>

                <p class="mt-4 text-gray-700">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur doloremque saepe
                  architecto maiores repudiandae amet perferendis repellendus, reprehenderit voluptas
                  sequi.
                </p>
              </div>
            </div>

            <div>
              <img
                src="https://www.usnews.com/object/image/0000018f-cfa8-d140-afdf-dfea657d0001/24-bmw-530i-ext1.jpg?update-time=1717175974506&size=responsiveGallery"
                class="rounded"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default InfoSection
