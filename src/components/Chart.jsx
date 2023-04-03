import React from 'react';
import moment from 'moment';
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	Brush,
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import styled from 'styled-components';

const StyledHeader = styled.h2`
	font-size: 1.5em;
	font-weight: bold;
	margin-left: 1em;
	margin-bottom: 0;
	color: #444;
`;

const InfoText = styled.p`
	margin-top: 0;
	width: 475px;
	text-align: center;
	color: #aaa;
	font-size: small;
`;

const Chart = ({ data, header, unit, line, bar, area, color }) => {
	// Returning empty fragment if there is no data
	if (!data || data.length === 0) return <></>;

	// Parsing measurements time-value pairs
	const xyValues = data.map(meas => {
		const valueObject = {
			time: moment(new Date(meas.time)).format('D.M. [klo]HH'),
		};
		// unit is used as y-axis label
		valueObject[unit] =
			// rechart demands strings instead of null or NaN
			meas.value === null || isNaN(meas.value) ? '?' : meas.value;
		return valueObject;
	});

	const chartOptions = (
		<>
			<CartesianGrid strokeDasharray="5 5" />
			<XAxis dataKey="time" />
			<YAxis />
			<Tooltip />
			<Legend verticalAlign="top" height={36} />
			<Brush />
		</>
	);

	return (
		<div>
			<StyledHeader>{header}</StyledHeader>
			{line && (
				<LineChart width={475} height={300} data={xyValues}>
					{chartOptions}
					<Line type="monotone" dataKey={unit} stroke="#8884d8" />
				</LineChart>
			)}
			{bar && (
				<BarChart width={475} height={300} data={xyValues}>
					{chartOptions}
					<Bar dataKey={unit} fill={color} />
				</BarChart>
			)}
			{area && (
				<AreaChart width={475} height={300} data={xyValues}>
					<defs>
						<linearGradient id="areaColor" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor={color} stopOpacity={0.8} />
							<stop offset="95%" stopColor={color} stopOpacity={0} />
						</linearGradient>
					</defs>
					{chartOptions}
					<Area
						dataKey={unit}
						stroke={color}
						fillOpacity={1}
						fill="url(#areaColor)"
					/>
				</AreaChart>
			)}
			<InfoText>^käytä liukusäädintä aikaikkunan muuttamiseen^</InfoText>
		</div>
	);
};

export default Chart;
