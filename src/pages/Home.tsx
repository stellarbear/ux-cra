import React from 'react';
import { Grid } from '@material-ui/core';

import DataManagement from 'panels/DataManagement';
import DataMetrics from 'panels/DataMetrics';
import DataChart from 'panels/DataChart';


const Home: React.FC = () => {
	return (
		<Grid
			container
			direction="column"
			justify="center"
			alignItems="center" >
			<DataManagement />
			<DataMetrics />
			<DataChart />
		</Grid >
	);
}

export default Home;

/*

		<Grid
			container>
			<Grid item md={12} lg={6}>
				<DataManagement />
				<DataMetrics />
			</Grid>
			<Grid item md={12} lg={6}>
				<DataChart />
			</Grid>
		</Grid >
*/