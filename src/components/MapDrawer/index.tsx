import React, { FC } from 'react';

import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import useStoreMapDrawer from '../../hooks';

const LegendTitle = styled.p`
  /* font-family: 'Montserrat'; */
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.4);
  padding: 0;
  margin: 0 0 12px 0;
`;

const LegendItemDot = styled.div<{ color: string }>`
  width: 16px;
  height: 16px;
  background: ${(p) => p.color || '#fff'};
  border-radius: 50%;
`;

const LegendItemText = styled.span`
  /* font-family: 'Montserrat'; */
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  font-feature-settings: 'tnum' on, 'lnum' on;
  color: rgba(0, 0, 0, 0.4);
`;

const LegendData = [
  {
    color: '#28b5f9',
    value: '2100',
  },
  {
    color: '#BED2DD',
    value: '2022',
  },
];

const MapDrawer: FC = () => {
  const visible = useStoreMapDrawer((state) => state.visible);
  const setVisible = useStoreMapDrawer((state) => state.setVisible);

  return (
    <Drawer anchor={'right'} open={visible} onClose={() => setVisible(false)}>
      <Box component="div" sx={{ width: 400 }}>
        <img
          src="http://image.9game.cn/2020/8/26/171832690.jpg"
          alt="cover"
          style={{ width: '100%' }}
        />
      </Box>
    </Drawer>
  );
};

export default MapDrawer;
