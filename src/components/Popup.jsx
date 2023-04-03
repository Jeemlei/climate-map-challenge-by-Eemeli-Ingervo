import React from 'react';
import { Popup as LeafletPopup } from 'react-leaflet';
import styled from 'styled-components';

const WeatherContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const WeatherItem = styled.div`
	margin: 0em 1em 1em 1em;
	border: 3px solid ${props => props.color};
	border-radius: 4em;
	width: 4em;
	height: 4em;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
    font-weight: bold;
    font-size: 1.25em;
	background-image: url('/images/${props => {
		if (props.temp) return 'thermometer';
		if (props.rain) return 'rain';
		if (props.snow) return 'snowflake';
	}}.png');
	background-size: cover;
	background-position: center center;
`;

const Popup = ({ temperatures, percipitation, snow }) => {
	const latestTemp = temperatures.timeValuePairs.slice(-1)[0].value;
	const latestPerc = percipitation.timeValuePairs.slice(-1)[0].value;
	const latestSnow = snow.timeValuePairs.slice(-1)[0].value;

	return (
		<LeafletPopup offset={[0, -25]}>
			<h2>Viimeisimmät mittaukset:</h2>
			<WeatherContainer>
				<WeatherItem color="#9966ff" temp>
					{latestTemp || latestTemp === 0 ? `${latestTemp}℃` : '-'}
				</WeatherItem>
				<WeatherItem color="blue" rain>
					{latestPerc || latestPerc === 0 ? `${latestPerc}mm` : '-'}
				</WeatherItem>
				<WeatherItem color="silver" snow>
					{latestSnow || latestSnow === 0 ? `${latestSnow}cm` : '-'}
				</WeatherItem>
			</WeatherContainer>
		</LeafletPopup>
	);
};

export default Popup;
