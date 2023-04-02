import React, { useEffect, useState } from 'react';
import { fetchObservationLocations } from '../utils';
import Sidebar from './Sidebar';
import Map from './Map';

function App() {
	const [observationLocations, setObservationLocations] = useState([]);
	const [selectedLocation, setSelectedLocation] = useState(null);

	useEffect(() => fetchObservationLocations(setObservationLocations), []);

	return (
		<div>
			<Sidebar
				selectedLocationId={selectedLocation}
				observationLocations={observationLocations}
			/>
			<Map
				center={[65, 26]}
				zoom={6}
				locations={observationLocations}
				selectedLocation={selectedLocation}
				setSelectedLocation={setSelectedLocation}
			/>
		</div>
	);
}

export default App;
