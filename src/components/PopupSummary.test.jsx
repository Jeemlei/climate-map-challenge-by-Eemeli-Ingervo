import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react';
import PopupSummary from './PopupSummary';

describe('PopupSummary component', () => {
	const testData = {
		timeValuePairs: [
			{
				time: 1679800000000,
				value: -1.2,
			},
			{
				time: 1679850000000,
				value: -3,
			},
			{
				time: 1679900000000,
				value: null,
			},
			{
				time: 1679950000000,
				value: 4.5,
			},
			{
				time: 1679955000000,
				value: 1,
			},
		],
	};

	it('renders without crashing when given valid data', () => {
		const div = document.createElement('div');
		ReactDOM.render(<PopupSummary data={testData} />, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	it('displays "ei dataa" for min and max when there is no data in the timeValuePairs array', () => {
		render(<PopupSummary data={{ timeValuePairs: [] }} />);

		expect(screen.getAllByText('ei dataa').length).toBe(2);
	});

	it('displays the maximum and minimum values correctly', () => {
		render(<PopupSummary data={testData} unit={'mm'} />);

		expect(screen.getByText('4.5mm')).toBeDefined();
		expect(screen.getByText('-3mm')).toBeDefined();
	});

	it('display maximum and minimum time in the "D.M. [klo] H" format', () => {
		render(<PopupSummary data={testData} />);

		expect(screen.getByTestId('max-time')).toHaveTextContent('27.3. klo 23');
		expect(screen.getByTestId('min-time')).toHaveTextContent('26.3. klo 20');
	})
});
