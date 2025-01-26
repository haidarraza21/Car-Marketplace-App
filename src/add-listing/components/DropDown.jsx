import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const DropDown = ({ item, handleInputChanged }) => {
  return (
    <div>
      <Select onValueChange={(value) => handleInputChanged(item.name, value)} required={item.required}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={item.label} />
        </SelectTrigger>
        <SelectContent>

          {item?.options?.map((option, index) => (
            <SelectItem key={index} value={option}>{option}</SelectItem>
          ))}
        </SelectContent>
      </Select>

    </div>
  )
}

export default DropDown
