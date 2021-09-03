import { css } from 'styled-components';

const sizes = {
    huge: 2000,
    searchLarge: 1400,
    laptop: 1200,
    searchLarge: 960,
    searchMedium: 730,
    tablet_l: 641,
    tablet: 640,
    largeMobile: 450,
    mobile: 320
}

export const media = Object.keys(sizes).reduce((accumulator, label) => {
    const pxSize = sizes[label]
    accumulator[label] = (...args) => css `
    @media (max-width: ${pxSize}px) {
      ${css(...args)};
    }
  `
    return accumulator
}, {})

export const media_min = Object.keys(sizes).reduce((accumulator, label) => {
  const pxSize = sizes[label]
  accumulator[label] = (...args) => css `
  @media (min-width: ${pxSize}px) {
    ${css(...args)};
  }
`
  return accumulator
}, {})