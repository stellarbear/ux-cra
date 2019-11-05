import React from 'react';
import { Grid, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Tabs, Tab, Button, Fab } from '@material-ui/core';

import DataManagement from 'panels/DataManagement';
import DataMetrics from 'panels/DataMetrics';
import { CloudUpload, CloudDownload } from '@material-ui/icons';
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