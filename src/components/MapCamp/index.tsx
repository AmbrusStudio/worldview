import React, { FC } from 'react';
import { Html } from '@react-three/drei';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import useStoreMapDrawer from '../../hooks';
import { drawExtrudeShape } from '../../utils';
import CampsRoleOneOne from '../../assets/images/camps-role-1-1.png';
import CampsLogoOne from '../../assets/images/camps-logo-1.svg';

const Wrapper = styled.div``;
const Camps = styled.div`
  /* width: 60px; */
  height: 60px;
  border-radius: 30px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 12px 23px 12px 17px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  img {
  }
  span {
    /* font-family: 'Montserrat'; */
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    text-transform: uppercase;
    color: #ffffff;
    margin-left: 12px;
  }
`;

const Role = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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

const camps = [
  {
    x: -82.96578304719736,
    y: 8.225027980985985,
    logo: CampsLogoOne,
    name: 'Hive',
    roles: [
      {
        src: CampsRoleOneOne,
        alt: 'role1',
      },
      {
        src: CampsRoleOneOne,
        alt: 'role1',
      },
      {
        src: CampsRoleOneOne,
        alt: 'role1',
      },
    ],
  },

  {
    x: 13.075822381246752,
    y: 2.267097072759015,
    logo: CampsLogoOne,
    name: 'Hive',
    roles: [
      {
        src: CampsRoleOneOne,
        alt: 'role1',
      },
    ],
  },
];

const MapLegend: FC = () => {
  const setVisible = useStoreMapDrawer((state) => state.setVisible);

  return (
    <group>
      {camps.map((camp, index) => (
        <Html
          wrapperClass="role"
          position={[camp.x, camp.y, 0]}
          zIndexRange={[100, 0]}
          key={index}
        >
          <Wrapper>
            <Camps
              onClick={(e) => {
                console.log('e', e);
                setVisible(true);
              }}
            >
              <img src={camp.logo} alt={camp.name} />
              <span>{camp.name}</span>
            </Camps>

            <Stack spacing={1} direction="row" sx={{ marginTop: '12px' }}>
              {camp.roles.map((role, indexJ) => (
                <Role key={indexJ}>
                  <img src={role.src} alt={role.alt} />
                </Role>
              ))}
            </Stack>
          </Wrapper>
        </Html>
      ))}
    </group>
  );
};

export default MapLegend;
