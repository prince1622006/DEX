import React, { useMemo } from 'react'
import styled, {
  ThemeProvider as StyledComponentsThemeProvider,
  createGlobalStyle,
  css,
  DefaultTheme
} from 'styled-components'
import { useIsDarkMode } from '../state/user/hooks'
import { Text, TextProps } from 'rebass'
import { Colors } from './styled'
import 'react-datepicker/dist/react-datepicker.min.css'
import { transparentize } from 'polished'

export * from './components'

export const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    ;(accumulator as any)[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `
    return accumulator
  },
  {}
) as any

const white = '#FFFFFF'
const black = '#000000'

export function colors(darkMode: boolean): Colors {
  return {
    // base
    //white,
    white: darkMode ? black : white,
    black,

    // gradient colors
    grd1: darkMode ? '#023E8A' : '#394F50',
    grd2: darkMode ? '#0096C7' : '#212429',
    grd3: darkMode ? '#0077B6' : '#394F50',

    // text
    text1: darkMode ? '#f0f0ff' : '#FFFFFF' ,
    text2: darkMode ? '#1a1a1a' : '#C3C5CB',
    text3: darkMode ? '#1a1a1a' : '#6C7284' ,
    text4: darkMode ? '#000000' : '#565A69',
    text5: darkMode ? '#a2d2ff' : '#c3c5cb',

    // backgrounds / greys
    bg1: darkMode ? '#e2eafc' : '#212429',
    bg1And2: darkMode ? '#f8f9fa' : '#212429',
    bg2: darkMode ? '#e2eafc' : '#2C2F36',
    bg3: darkMode ? '#EDEEF2' : '#40444F',
    bg4: darkMode ? '#CED0D9' : '#565A69',
    bg5: darkMode ? '#888D9B' : '#6C7284',
    bg6: darkMode ? '#888D9B' : '#212429',

    //specialty colors
    modalBG: darkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,.425)',
    advancedBG: darkMode ?  'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.1)',

    //primary colors
    primary1: darkMode ? '#a2d2ff': '#40444f',
    primary2: darkMode ? '#2172E5': '#FFE270',
    primary3: darkMode ? '#ffc8dd': '#FFE270',
    primary4: darkMode ? '#FFAFCC': '#FFE270',
    primary5: darkMode ? '#FFAFCC': '#FFE270',

    // color text
    primaryText1: darkMode ? '#ffff' : 'rgba(44, 52, 55, 0.8)',

    // secondary colors
    secondary1: darkMode ?  '#ffc8dd' : '#FFE270',
    secondary2: darkMode ?  '#ffc8dd' : '#FFE270',
    secondary3: darkMode ?  '#ffc8dd' : '#FFE270',

    // other
    red1: '#FF6871',
    red2: '#F82D3A',
    green1: '#27AE60',
    yellow1: '#000000',
    yellow2: '#F3841E',
    blue1: '#2172E5',

    // dont wanna forget these blue yet
    // blue4: darkMode ? '#153d6f70' : '#C4D9F8',
    // blue5: darkMode ? '#153d6f70' : '#EBF4FF',

    // new UI refactor colors
    mainPurple: '#2E17F2',
    purpleBase: '#101016',
    purpleOverlay: '#111018',
    purple2: '#a2d2ff',
    purple3: '#a2d2ff',
    purple4: '#00b4d8',
    purple5: '#a2d2ff',
    boxShadow: '#0A0A0F',

    // darkest // dark 1.1
    darkest: '#161721',
    dark1: '#212429',
    dark2: '#2A2F42'

    // dont wanna forget these blue yet
    // blue4: darkMode ? '#153d6f70' : '#C4D9F8',
    // blue5: darkMode ? '#153d6f70' : '#EBF4FF',
  }
}

export function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),

    grids: {
      sm: 8,
      md: 12,
      lg: 24
    },

    //shadows
    shadow1: darkMode ? '#2F80ED' : '#000',

    // media queries
    mediaWidth: mediaWidthTemplates,

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useIsDarkMode()

  const themeObject = useMemo(() => theme(darkMode), [darkMode])

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`

export const TYPE = {
  main(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text2'} {...props} />
  },
  link(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />
  },
  black(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'black'} {...props} />
  },
  white(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'white'} {...props} />
  },
  modeColor(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'yellow2'} {...props} />
  },
  body(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={16} color={'text4'} {...props} />
  },
  bodyMain(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={16} color={'text5'} {...props} />
  },
  largeHeader(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={24} {...props} />
  },
  mediumHeader(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={20} {...props} />
  },
  subHeader(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={14} {...props} />
  },
  small(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={11} {...props} />
  },
  blue(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />
  },
  yellow(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'yellow1'} {...props} />
  },
  darkGray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text3'} {...props} />
  },
  gray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'bg3'} {...props} />
  },
  italic(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={12} fontStyle={'italic'} color={'text2'} {...props} />
  },
  error({ error, ...props }: { error: boolean } & TextProps) {
    return <TextWrapper fontWeight={500} color={error ? 'red1' : 'text2'} {...props} />
  }
}

export const FixedGlobalStyle = createGlobalStyle`
html, input, textarea, button {
  font-family: 'Montserrat', sans-serif;
  font-display: fallback;
}

html,
body {
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

button {
  user-select: none;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  
}

a {
  text-decoration: none;
}
`

export const ThemedGlobalStyle = createGlobalStyle`
html {
  color: ${({ theme }) => theme.text4};
  background-color: ${({ theme }) => theme.grd1};
  background: linear-gradient(111.63deg, ${({ theme }) => theme.grd1} 0%, ${({ theme }) => theme.grd2} 49.48%, ${({
  theme
}) => theme.grd3} 100%);
}
body {
  min-height: 100vh;
  background-position: 0 -30vh;
  background-repeat: no-repeat;
  background-image: ${({ theme }) =>
    `radial-gradient(50% 50% at 50% 50%, ${transparentize(0.9, theme.primary1)} 0%, ${transparentize(
      1,
      theme.bg1
    )} 100%)`};
}

.react-datepicker-wrapper {
  width: 100%;
}

.react-datepicker {
  font-family: Montserrat !important;
  border: solid 1px ${props => props.theme.bg5} !important;
  border-radius: 8px !important;
  color: ${props => props.theme.text4} !important;
  background-color: ${props => props.theme.bg1} !important;
  background: linear-gradient(113.18deg, rgba(255, 255, 255, 0.35) -0.1%, rgba(0, 0, 0, 0) 98.9%),
  ${({ theme }) => theme.bg1} !important;
  background-blend-mode: overlay, normal !important;
}

.react-datepicker__triangle {
  border-bottom-color: ${props => props.theme.bg1} !important;
}

.react-datepicker__header {
  background-color: transparent !important;
  border-top-left-radius: 8px;
  border-bottom: none !important;
}

.react-datepicker__current-month {
  color: ${props => props.theme.text4} !important;
}

.react-datepicker__day-name {
  color: ${props => props.theme.text4} !important;
  font-weight: 600;
}

.react-datepicker__day.react-datepicker__day--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.react-datepicker__time-container .react-datepicker__time {
  background: transparent !important;
}

.react-datepicker__time-container  {
  border-left: solid 1px ${props => props.theme.bg5} !important;
}

.react-datepicker-time__header  {
  color: ${props => props.theme.bg5} !important;
}

.react-datepicker__time-list-item {
  transition: background-color 0.3s ease;
  :hover:not(.react-datepicker__time-list-item--disabled) {
    background-color: ${props => props.theme.bg2} !important;
  }
}

.react-datepicker__time-list-item.react-datepicker__time-list-item--disabled {
  opacity: 0.5;
  color: ${props => props.theme.text4} !important;
}

.react-datepicker__header.react-datepicker__header--time {
  border-bottom: solid 1px ${props => props.theme.bg5} !important;
}

.react-datepicker__day--keyboard-selected {
  background-color: ${props => props.theme.bg2} !important;
}

.swapr-pagination {
  list-style: none;
}

.swapr-pagination ul {
  display: inline-flex;
}

.swapr-pagination li {
  display: inline-block;
  min-width: 28px;
  height: 22px;
  margin-right: 8px;
  vertical-align: middle;
  list-style: none;
  outline: 0;
  cursor: pointer;
  user-select: none;
  border: solid 1px ${props => props.theme.bg3};
  transition: border 0.3s ease, color 0.3s ease;
  font-size: 14px;
  border-radius: 4px;
  text-align: center;
  line-height: 20px;
  color: ${props => props.theme.text5};
}

.swapr-pagination li.rc-pagination-item-active {
  border: solid 1px ${props => props.theme.bg4};
}

.swapr-pagination li.rc-pagination-prev,
.swapr-pagination li.rc-pagination-next {
  color: ${props => props.theme.white};
  padding-top: 2px;
}

.swapr-pagination li.rc-pagination-disabled {
  border: solid 1px ${props => props.theme.bg3};
  color: ${props => props.theme.bg3};
}

`
