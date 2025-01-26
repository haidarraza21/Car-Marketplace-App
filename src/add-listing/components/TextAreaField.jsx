import React from 'react'
import { Textarea } from "@/components/ui/textarea"

const TextAreaField = ({ item, handleInputChanged }) => {
  return (
    <div>
      <Textarea onChange={(e) => handleInputChanged(item.name, e.target.value)} required={item.required} />

    </div>
  )
}

export default TextAreaField
