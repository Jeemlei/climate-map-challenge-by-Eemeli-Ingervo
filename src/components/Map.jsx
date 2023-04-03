import React from 'react';
import { Map as LeafletMap, Marker, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import styled from 'styled-components';
import Popup from './Popup';

const MapContainer = styled(LeafletMap)`
	width: calc(100vw - 500px);
	height: 100vh;
	position: absolute;
	top: 0px;
	left: 500px;
`;

const defaultIcon = L.icon({
	iconRetinaUrl: require('../assets/images/marker-icon-2x.png'),
	iconUrl: require('../assets/images/marker-icon.png'),
	shadowUrl: require('../assets/images/marker-shadow.png'),
	iconSize: [25, 41],
	iconAnchor: [12.5, 41],
});

const selectedIcon = L.icon({
	iconRetinaUrl: require('../assets/images/marker-icon-selected-2x.png'),
	iconUrl: require('../assets/images/marker-icon-selected.png'),
	shadowUrl: require('../assets/images/marker-shadow.png'),
});

const Map = ({
	center,
	zoom,
	locations,
	selectedLocation,
	setSelectedLocation,
}) => {
	return (
		<MapContainer center={center} zoom={zoom}>
			<TileLayer
				url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
				attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> 
                     &copy; <a href="https://carto.com/attributions">CARTO</a>'
				subdomains="abcd"
				maxZoom={20}
				minZoom={3}
			/>
			{locations.map(loc => (
				<Marker
					position={[loc.position.lat, loc.position.lon]}
					key={loc.info.id}
					icon={selectedLocation === loc.info.id ? selectedIcon : defaultIcon}
					onClick={() => setSelectedLocation(loc.info.id)}
				>
					<Popup
						temperatures={loc.data.t}
						percipitation={loc.data.r_1h}
						snow={loc.data.snowdepth}
					/>
				</Marker>
			))}
		</MapContainer>
	);
};

export default Map;
