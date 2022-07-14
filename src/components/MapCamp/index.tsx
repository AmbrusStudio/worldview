import styled from '@emotion/styled'
import { Html } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import * as TWEEN from '@tweenjs/tween.js'
import { FC, useEffect } from 'react'
import useSWR from 'swr'

import { getWorldViewInfoApi } from '../../services/worldview'
import { useStoreMapControls } from '../../store'
import { openWorldviewOrganization, openWorldviewRanger } from '../../utils'
import ArrowRight from '../Icons/ArrowRight'

const Wrapper = styled.div`
  user-select: none;
`
const Camps = styled.div`
  /* width: 60px; */
  height: 60px;
  border-radius: 30px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 12px 23px 12px 12px;
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
  & > div {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  span {
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    text-transform: uppercase;
    color: #ffffff;
    margin: 0 12px;
    white-space: nowrap;
  }
  .camp-icon {
    display: none;
    transform: translateX(-10px);
    opacity: 0;
    transition: all 0.3s ease-out;
  }
`

const Roles = styled.div`
  display: grid;
  margin-top: 12px;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 12px;
`

const RoleWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
  &:hover {
    width: auto;
    padding: 0 22px;
    background: #ff4125;
    & > div {
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
  & > div {
    width: 80px;
    height: 80px;
    border-radius: 40px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  span {
    display: none;
    font-family: 'Montserrat', sans-serif;
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
`

const MapLegend: FC = () => {
  const { data, error } = useSWR<API.Response<API.Camp[]>>('api', getWorldViewInfoApi)

  const { camera } = useThree()
  const mapControlsRef = useStoreMapControls((state) => state.mapControlsRef)

  /**
   * toggle camp
   */
  const campCenter = (x: number, y: number, id: number): void => {
    if (!mapControlsRef) {
      return
    }

    new TWEEN.Tween({
      x: mapControlsRef.target.x,
      y: mapControlsRef.target.y,
      zoom: camera.zoom,
    })
      .to({ x: x, y: y, zoom: mapControlsRef.maxZoom }, 800)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate((object) => {
        // console.log('object', object);

        mapControlsRef.target.setX(object.x)
        mapControlsRef.target.setY(object.y)

        camera.position.setX(object.x)
        camera.position.setY(object.y)

        camera.zoom = object.zoom
        camera.updateProjectionMatrix()
      })
      .start()
      .onComplete(() => {
        openWorldviewOrganization(id)
      })
  }

  useEffect(() => {
    // Setup the animation loop.
    function animate(time: number) {
      requestAnimationFrame(animate)
      TWEEN.update(time)
    }
    requestAnimationFrame(animate)
  }, [])

  if (error) return <group></group>
  if (!data || !data?.data) return <group></group>

  return (
    <group position={[0, 0, 10]}>
      {data?.data.map((camp, index) => {
        const [x, y] = camp.coordinate.split(',')

        return (
          <Html wrapperClass="role" position={[Number(x), Number(y), 1 + index]} zIndexRange={[100, 0]} key={index}>
            <Wrapper>
              <Camps
                onClick={() => {
                  // console.log('e', e);
                  campCenter(Number(x), Number(x), camp.id)
                }}
              >
                <div>
                  <img src={camp.logo} alt={camp.name} />
                </div>
                <span>{camp.name}</span>
                <ArrowRight className="camp-icon" sx={{ fontSize: '1em' }} />
              </Camps>

              <Roles>
                {camp.ranger_list.map((role, indexJ) => (
                  <RoleWrapper
                    key={indexJ}
                    onClick={() => {
                      openWorldviewRanger(role.id)
                    }}
                  >
                    <div>
                      <img src={role.icon} alt={role.title} />
                    </div>
                    <span>{role.name}</span>
                    <ArrowRight className="role-icon" sx={{ fontSize: '1em' }} />
                  </RoleWrapper>
                ))}
              </Roles>
            </Wrapper>
          </Html>
        )
      })}
    </group>
  )
}

export default MapLegend
