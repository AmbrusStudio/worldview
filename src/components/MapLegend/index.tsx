import styled from '@emotion/styled'
import { Stack } from '@mui/material'
import { FC } from 'react'

const LegendWrapper = styled.div`
  position: fixed;
  left: 36px;
  bottom: 36px;
  z-index: 1000;
  @media screen and (max-width: 960px) {
    left: 20px;
    bottom: 120px;
  }
`

const LegendTitle = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.4);
  padding: 0;
  margin: 0 0 12px 0;
  @media screen and (max-width: 960px) {
    font-size: 14px;
    line-height: 18px;
  }
`

const LegendItemDot = styled.div<{ color: string }>`
  width: 16px;
  height: 16px;
  background: ${(p) => p.color || '#fff'};
  border-radius: 50%;
  @media screen and (max-width: 960px) {
    width: 12px;
    height: 12px;
  }
`

const LegendItemText = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  font-feature-settings: 'tnum' on, 'lnum' on;
  color: rgba(0, 0, 0, 0.4);
  @media screen and (max-width: 960px) {
    font-size: 12px;
    line-height: 16px;
  }
`

const LegendData = [
  {
    color: '#28b5f9',
    value: '2100',
  },
  {
    color: '#BED2DD',
    value: '2022',
  },
]

const MapLegend: FC = () => {
  return (
    <LegendWrapper>
      <LegendTitle>Map of E4C:Verse</LegendTitle>
      <Stack spacing={1}>
        {LegendData.map((legend, index) => (
          <Stack spacing={1} direction="row" alignItems="center" key={index}>
            <LegendItemDot color={legend.color}></LegendItemDot>
            <LegendItemText>{legend.value}</LegendItemText>
          </Stack>
        ))}
      </Stack>
    </LegendWrapper>
  )
}

export default MapLegend
