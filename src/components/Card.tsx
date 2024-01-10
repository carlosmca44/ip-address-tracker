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
			const response = await fetch(import.meta.env.PUBLIC_IP_API_URL + import.meta.env.PUBLIC_IP_API_KEY)
			const ipInfo: IpApi = await response.json()
			changeIpAddress(ipInfo)
		} catch (error) {
			console.log(error)
		}
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
		<div className="p-10 bg-white flex flex-col md:flex-row items-center justify-between w-full md:w-3/4 rounded-lg z-50">
			<div>
				<p>IP ADDRESS</p>
				{toShow?.ip}
			</div>
			<div>
				<p>LOCATION</p>
				{toShow?.location.country}
			</div>
			<div>
				<p>TIMEZONE</p>
				{toShow?.location.timezone}
			</div>
			<div>
				<p>ISP</p>
				{toShow?.isp}
			</div>
		</div>
	)
}

export default Card
