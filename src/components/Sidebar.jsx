import React from 'react';
import styled from 'styled-components';

function Sidebar({ selectedLocationId, observationLocations }) {
	const loc = observationLocations.find(
		loc => loc.info.id === selectedLocationId
	);

	return (
		<div>
			<pre>{loc && JSON.stringify(loc.info, null, 4)}</pre>
		</div>
	);
}

export default styled(Sidebar)`
	width: 300px;
	height: 100vh;
`;
