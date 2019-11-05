import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { TypographyProps } from '@material-ui/core/Typography';

interface TabPanelProps extends TypographyProps {
    index: any;
    value: any;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, index, value, ...rest }) => {

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            {...rest}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

export default TabPanel;