import Metolib from '@fmidev/metolib';

export const fetchObservationLocations = setObservationLocations => {
	const connection = new Metolib.WfsConnection();
	const secondsInHour = 60e3 * 60;
	if (
		connection.connect(
			'http://opendata.fmi.fi/wfs',
			'fmi::observations::weather::cities::multipointcoverage'
		)
	) {
		connection.getData({
			begin: Date.now() - secondsInHour * 24 * 7,
			end: Date.now() - secondsInHour,
			requestParameter: 't,snowdepth,r_1h',
			timestep: 60 * 60 * 1000,
			bbox: '20.6455928891, 59.846373196, 31.5160921567, 70.1641930203',
			callback: (data, errors) => {
				if (errors.length > 0) {
					errors.forEach(err => {
						console.error('FMI API error: ' + err.errorText);
					});
					return;
				}

				setObservationLocations(
					data.locations.map(loc => {
						const [lat, lon] = loc.info.position.map(parseFloat);
						return { ...loc, position: { lat, lon } };
					})
				);

				connection.disconnect();
			},
		});
	}
};
