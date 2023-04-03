import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const SummaryContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: 0.5em;
	border: 2px solid;
	border-radius: 10px;
`;

const SummaryHeader = styled.h3`
	margin: 0.5em 0 0.5em 0.5em;
`;

const SummaryItem = styled.div`
	margin: 0.75em 0.5em 0.25em 1em;
	${props => (props.bold ? 'font-weight: bold;' : '')}
`;

const PopupSummary = ({ data, maxHeader, minHeader, unit }) => {
	const filteredData = data.timeValuePairs.filter(
		pair => !isNaN(Number(pair.value))
	);

	const max = filteredData.reduce(
		(prev, current) => {
			return prev.value > current.value ? prev : current;
		},
		{ time: '?', value: -999 }
	);

	const min = filteredData.reduce(
		(prev, current) => {
			return prev.value < current.value ? prev : current;
		},
		{ time: '?', value: 999 }
	);

	return (
		<SummaryContainer>
			<SummaryHeader>{maxHeader}</SummaryHeader>
			{(max.time !== '?' && (
				<div>
					<SummaryItem bold>
						{max.value}
						{unit}
					</SummaryItem>
					<SummaryItem>
						{moment(new Date(max.time)).format('D.M. [klo] H')}
					</SummaryItem>
				</div>
			)) || <SummaryItem>ei dataa</SummaryItem>}
			<hr />
			<SummaryHeader>{minHeader}</SummaryHeader>
			{(min.time !== '?' && (
				<div>
					<SummaryItem bold>
						{min.value}
						{unit}
					</SummaryItem>
					<SummaryItem>
						{moment(new Date(min.time)).format('D.M. [klo] H')}
					</SummaryItem>
				</div>
			)) || <SummaryItem>ei dataa</SummaryItem>}
		</SummaryContainer>
	);
};

export default PopupSummary;
