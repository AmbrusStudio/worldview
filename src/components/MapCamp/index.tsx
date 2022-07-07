import styled from '@emotion/styled';
import { Html } from '@react-three/drei';
import React, { FC } from 'react';

import CampsLogoOne from '../../assets/images/camps-logo-1.svg';
import CampsRoleOneOne from '../../assets/images/camps-role-1-1.png';
import useStoreMapDrawer from '../../hooks';
import ArrowRight from '../Icons/ArrowRight';

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
  transition: all 0.3s ease-in-out;
  &:hover {
    background: #ff4125;
    .camp-icon {
      display: inline-block;
      transform: translateX(0);
      opacity: 1;
    }
  }
  img {
  }
  span {
    /* font-family: 'Montserrat'; */
    font-style: normal;
    font-weight: 600px;
    font-size: 20px;
    line-height: 24px;
    text-transform: uppercase;
    color: #ffffff;
    margin: 0 12px;
  }
  .camp-icon {
    display: none;
    transform: translateX(-10px);
    opacity: 0;
    transition: all 0.3s ease-out;
  }
`;

const Roles = styled.div`
  display: grid;
  margin-top: 12px;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 12px;
`;

const Role = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  transition: background 0.3s ease-in-out;
  &:hover {
    width: auto;
    padding: 0 22px;
    background: #ff4125;
    img {
      display: none;
    }
    span {
      display: initial;
    }
    .role-icon {
      display: inline-block;
      transform: translateX(0);
      opacity: 1;
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  span {
    display: none;
    /* font-family: 'Montserrat'; */
    font-style: italic;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    color: #ffffff;
    margin: 0 12px 0 0;
  }
  .role-icon {
    color: #ffffff;
    display: none;
    transform: translateX(-10px);
    opacity: 0;
    transition: all 0.3s ease-out;
  }
`;

const camps = [
  {
    x: -82.96578304719736,
    y: 8.225027980985985,
    logo: CampsLogoOne,
    name: 'Hive',
    roles: [
      {
        src: CampsRoleOneOne,
        name: 'NANA',
        alt: 'role1',
      },
      {
        src: CampsRoleOneOne,
        name: 'NANA',
        alt: 'role1',
      },
      {
        src: CampsRoleOneOne,
        name: 'NANA',
        alt: 'role1',
      },
      {
        src: CampsRoleOneOne,
        name: 'NANA',
        alt: 'role1',
      },
      {
        src: CampsRoleOneOne,
        name: 'NANA',
        alt: 'role1',
      },
      {
        src: CampsRoleOneOne,
        name: 'NANA',
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
        name: 'NANA',
        alt: 'role1',
      },
      {
        src: CampsRoleOneOne,
        name: 'NANA',
        alt: 'role1',
      },
      {
        src: CampsRoleOneOne,
        name: 'NANA',
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
              <ArrowRight className="camp-icon" sx={{ fontSize: '1em' }} />
            </Camps>

            <Roles>
              {camp.roles.map((role, indexJ) => (
                <Role key={indexJ}>
                  <img src={role.src} alt={role.alt} />
                  <span>{role.name}</span>
                  <ArrowRight className="role-icon" sx={{ fontSize: '1em' }} />
                </Role>
              ))}
            </Roles>
          </Wrapper>
        </Html>
      ))}
    </group>
  );
};

export default MapLegend;
