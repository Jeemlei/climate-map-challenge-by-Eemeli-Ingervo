import React, { useEffect, useState } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import styled from 'styled-components';
import L from 'leaflet';
import Sidebar from './Sidebar';
import { fetchObservationLocations } from '../utils';

const MapContainer = styled(Map)`
	width: calc(100vw - 500px);
	height: 100vh;
	position: absolute;
	top: 0px;
	left: 500px;
`;

// Ugly hack to fix Leaflet icons with leaflet loaders
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
	iconUrl: require('leaflet/dist/images/marker-icon.png'),
	shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function App() {
	const [observationLocations, setObservationLocations] = useState([]);
	const [selectedLocation, setSelectedLocation] = useState(null);

	useEffect(() => fetchObservationLocations(setObservationLocations), []);

	const position = [65, 26];
	const map = (
		<MapContainer center={position} zoom={6}>
			<TileLayer
				url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
				attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> 
                     &copy; <a href="https://carto.com/attributions">CARTO</a>'
				subdomains="abcd"
				maxZoom={19}
			/>
			{observationLocations.map(loc => (
				<Marker
					position={[loc.position.lat, loc.position.lon]}
					key={loc.info.id}
					onClick={() => setSelectedLocation(loc.info.id)}
				/>
			))}
		</MapContainer>
	);

	return (
		<div>
			<Sidebar
				selectedLocationId={selectedLocation}
				observationLocations={observationLocations}
			/>
			{map}
		</div>
	);
}

export default App;
