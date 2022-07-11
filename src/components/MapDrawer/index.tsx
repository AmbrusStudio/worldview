import styled from '@emotion/styled';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { FC } from 'react';

import useStoreMapDrawer from '../../hooks';
import ArrowRight from '../Icons/ArrowRight';

const VolSerialNumber = styled.p`
  /* font-family: 'SF Pro'; */
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-transform: uppercase;
  color: #ff4125;
  padding: 0;
  margin: 12px 0 0 0;
`;

const VolTitle = styled.span`
  /* font-family: 'SF Pro'; */
  font-style: normal;
  font-weight: 590;
  font-size: 16px;
  line-height: 19px;
  text-transform: capitalize;
  color: #ffffff;
`;

const VolLink = styled.a`
  text-decoration: none;
`;

const MapDrawer: FC = () => {
  const visible = useStoreMapDrawer((state) => state.visible);
  const campVol = useStoreMapDrawer((state) => state.campVol);
  const setVisible = useStoreMapDrawer((state) => state.setVisible);

  return (
    <Drawer
      anchor={'right'}
      open={visible}
      onClose={() => setVisible(false)}
      hideBackdrop={true}
      className="MuiDrawerMap"
    >
      <Stack
        spacing={3}
        sx={{ width: 480, padding: '36px', overflowY: 'auto' }}
      >
        {campVol.map((vol, index) => (
          <VolLink
            target="_blank"
            href={`/vol/${vol.id + index}`}
            rel="noreferrer"
            key={index}
          >
            <Box
              component="div"
              key={index}
              sx={{
                border: '2px solid rgba(255, 255, 255, 0.25)',
                padding: '12px',
                height: 220,
              }}
            >
              <img
                src={vol.cover}
                alt="cover"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
            <VolSerialNumber>Vol.{index + 1}</VolSerialNumber>
            <VolTitle>{vol.title}</VolTitle>
          </VolLink>
        ))}
      </Stack>
      {visible && (
        <Box
          component="div"
          sx={{
            position: 'absolute',
            top: 100,
            left: -52,
            width: '52px',
            height: '52px',
            background: '#FF4125',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => setVisible(false)}
        >
          <ArrowRight className="role-icon" sx={{ fontSize: '1em' }} />
        </Box>
      )}
    </Drawer>
  );
};

export default MapDrawer;
