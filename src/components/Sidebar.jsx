import React from 'react';
import styled from 'styled-components';
import Chart from './Chart';

const SidebarContainer = styled.div`
	width: 500px;
	height: 100vh;
	position: absolute;
	top: 0px;
	background-color: #eee;
`;

const StyledHeader = styled.h1`
	font-size: 2em;
	font-weight: bold;
	width: 450px;
	height: 2em;
	margin-left: 0.5em;
	margin-bottom: 0.75em;
`;

function Sidebar({ selectedLocationId, observationLocations }) {
	const loc = observationLocations.find(
		loc => loc.info.id === selectedLocationId
	);

	if (!loc)
		return (
			<SidebarContainer>
				<StyledHeader>Valitse sijanti kartalta</StyledHeader>
			</SidebarContainer>
		);

	const temperature = loc.data.t;
	const snow = loc.data.snowdepth;
	const percipitation = loc.data.r_1h;

	return (
		<SidebarContainer>
			<StyledHeader>{loc.info.name}</StyledHeader>
			<Chart
				line
				data={temperature.timeValuePairs}
				header={'Lämpötila'}
				unit={'℃'}
			/>
			<hr />
			<Chart
				bar
				data={percipitation.timeValuePairs}
				header={'Sademäärä'}
				unit={'mm'}
				color={'blue'}
			/>
			<hr />
			<Chart
				area
				data={snow.timeValuePairs}
				header={'Lumen syvyys'}
				unit={'cm'}
				color={'gray'}
			/>
		</SidebarContainer>
	);
}

export default Sidebar;
