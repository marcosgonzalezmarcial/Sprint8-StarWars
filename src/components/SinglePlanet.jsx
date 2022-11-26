import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import ListOfPilots from './ListOfPilots'
import ListOfFilms from './ListOfFilms'
import { urlStringify } from '../utils/urlStringify'
import { Spinner } from './Spinner/Spinner'
import { transformDataArray } from '../utils/transformDataArray'
import { planetsMockedData } from '../utils/mocked-data'
import { TYPE_OF_DATA } from '../constants'
import { fetchItem } from '../services/fetchItem'

const SinglePlanet = () => {
	const [planet, setPlanet] = useState({})
	const [isLoading, setIsLoading] = useState(false)

	let { planetName } = useParams()

	useEffect(() => {
		setIsLoading(true)
		const planetNameFromUrl = urlStringify(planetName)

		const { id } = planetsMockedData.find(
			planet => planet.name === planetNameFromUrl
		)

		fetchItem({ id, typeOfData: TYPE_OF_DATA.PLANETS })
			.then(item => {
				const [transformedPlanetData] = transformDataArray({
					// fetched data must be an array for implementation requirements
					fetchedData: [item],
					typeOfData: TYPE_OF_DATA.PLANETS,
				})
				setPlanet(transformedPlanetData)
			})
			.catch(console.log)
			.finally(() => setIsLoading(false))
	}, [planetName])

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<main className="main text-secondary my-3">
					<div className="page-img-container">
						<img width="400px" height="400px" src={planet.imgUrl} alt={planet.name} />
					</div>
					<div className="page-description-container bg-dark p-2">
						<h2 className="mb-2 pt-1 px-2">{planet.name}</h2>
						<div className="px-2">
							<Row className="py-1">
								<Col>
									<h3>Climate:</h3>
									<span>{planet.climate}</span>
								</Col>
								<Col>
									<h3>Gravity:</h3>
									<span>{planet.gravity ? planet.gravity : 'Unknown'}</span>
								</Col>
							</Row>
							<Row className="py-1">
								<Col>
									<h3>Terrain:</h3>
									<span>{planet.terrain}</span>
								</Col>
								<Col>
									<h3>Population:</h3>
									<span>{planet.population}</span>
								</Col>
							</Row>
							<Row className="py-1">
								<Col>
									<h3>Diameter:</h3>
									<span>{planet.diameter}</span>
								</Col>
								<Col>
									<h3>Rotation period:</h3>
									<span>{planet.rotation_period}</span>
								</Col>
							</Row>
							<Row className="py-1">
								<Col className="pt-1">
									<h3 className="m-0 py-1">Appearances</h3>
									<ListOfFilms filmsUrls={planet.films} />
								</Col>
								<Col className="pt-1">
									<h3 className="m-0 py-1">Residents</h3>
									{planet.residents?.length > 0 ? (
										<ListOfPilots pilotsUrls={planet.residents} />
									) : (
										<span>No residents registered for this ship</span>
									)}
								</Col>
							</Row>
						</div>
					</div>
				</main>
			)}
		</>
	)
}

export default SinglePlanet
