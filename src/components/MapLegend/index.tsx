import styled from '@emotion/styled';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import React, { FC } from 'react';

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

const MapLegend: FC = () => {
  return (
    <Box
      component="div"
      sx={{
        position: 'fixed',
        left: 36,
        bottom: 36,
        zIndex: 1000,
      }}
    >
      <LegendTitle>Map of E4C:Verse</LegendTitle>
      <Stack spacing={1}>
        {LegendData.map((legend, index) => (
          <Stack spacing={1} direction="row" alignItems="center" key={index}>
            <LegendItemDot color={legend.color}></LegendItemDot>
            <LegendItemText>{legend.value}</LegendItemText>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default MapLegend;
