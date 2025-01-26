import React from 'react'

import { Input } from '@/components/ui/input'
const InputField = ({ item, handleInputChanged }) => {
  return (
    <div>
      <Input type={item?.fieldType}
        name={item?.name}
        required={item?.required}
        onChange={(e) => handleInputChanged(item.name, e.target.value)}
      />
    </div>
  )
}

export default InputField
