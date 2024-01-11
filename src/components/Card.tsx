import { $ipInfo, changeIpAddress } from '../store/ipInfo'
import { useStore } from '@nanostores/react'
import type { IpApi } from '../types/ipApi'
import { useState, type FC, useEffect } from 'react'

type CardProps = {
	ipAddress?: string,
	location?: string,
	timeZone?: string,
	isp?: string
}

const Card: FC<CardProps> = () => {
	const data = useStore($ipInfo)
	const [toShow, setToShow] = useState<IpApi>()

	const loadData = async () => {
		try {
			const response = await fetch(
				import.meta.env.PUBLIC_IP_API_URL + import.meta.env.PUBLIC_IP_API_KEY
			)
			await response.json().then(res => changeIpAddress(res as IpApi))
		} catch (error) {
			console.log(error)
		}
	}

	const Slot = ({ title, data }: { title: string, data: string|undefined }) => {
		return (
			<div className='flex flex-col gap-1 md:gap-3 md:w-1/4 text-center md:text-start'>
				<p style={{ color: '#969696' }} className="font-bold text-xs md:text-sm">
					{title}
				</p>
				<p className='font-medium text-xl md:text-3xl'>
					{data}
				</p>
			</div>
		)
	}

	useEffect(() => {
		loadData()
	}, [])

	useEffect(() => {
		const handleInfo = () => {
			setToShow(data)
		}
		handleInfo()
	}, [data])

	return (
		<div style={{ fontFamily: "Rubik" }} className="gap-4 md:gap-8 shadow-md py-6 px-3 md:p-10 bg-white items-center md:items-stretch flex flex-col md:flex-row justify-between w-full md:w-3/4 rounded-xl z-50">
			<Slot
				title='IP ADDRESS'
				data={toShow?.ip}
			/>
			<div className="w-px hidden md:block bg-[#d9d9d9] flex-grow flex-shrink-0" />
			<Slot
				title='LOCATION'
				data={`${toShow?.location.city}, ${toShow?.location.region} ${toShow?.location.postalCode}`}
			/>
			<div className="w-px hidden md:block bg-[#d9d9d9] flex-grow flex-shrink-0" />
			<Slot
				title='TIMEZONE'
				data={`UTC ${toShow?.location.timezone}`}
			/>
			<div className="w-px hidden md:block bg-[#d9d9d9] flex-grow flex-shrink-0" />
			<Slot
				title='ISP'
				data={toShow?.isp}
			/>
		</div>
	)
}

export default Card
