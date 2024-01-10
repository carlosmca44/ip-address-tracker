import { changeIpAddress } from '../store/ipInfo'
import type { IpApi } from '../types/ipApi'
import { type FC, useState } from 'react'

const CustomInput: FC = () => {
  const [inputValue, setInputValue] = useState<string | undefined>()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch(
        import.meta.env.PUBLIC_IP_API_URL + import.meta.env.PUBLIC_IP_API_KEY + `&ipAddress=${inputValue}`
      )
      const data: IpApi = await response.json()

      changeIpAddress(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <form onSubmit={onSubmit} className="flex justify-center items-center w-full">
      <input
        onChange={handleInputChange}
        value={inputValue}
        className="p-3 rounded-ss-lg rounded-s-lg focus:outline-none w-full md:w-4/12"
        type="text"
        placeholder="Search for any IP address domain"
      />
      <button type="submit" className="bg-black p-3 rounded-e-lg rounded-ee-lg text-white">
        <img className="w-2 h-2 m-2" src="/svg/icon-arrow.svg" alt="" />
      </button>
    </form>
  )
}

export default CustomInput
