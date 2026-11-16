
export const COLORS = {
  primary: '#5B63D3',

  light: {
    background: '#F6F7FB',
    surface: '#FFFFFF',
    surfaceElevated: '#FFFFFF',

    text: '#202437',
    muted: '#7B8195',
    inactive: '#A1A6B6',
    border: '#E8EAF1',

    subtle: '#F0F2F8',
    accentSoft: '#EEF0FF',

    success: '#4F9675',
    warning: '#D69A45',
    danger: '#D66B70',

    overlay: 'rgba(25, 30, 50, 0.32)',
    tabBackground: 'rgba(255,255,255,0.97)',
    shadow: '#30395C',
    addShadow: '#5B63D3',
  },

  dark: {
    background: '#11141D',
    surface: '#191E2A',
    surfaceElevated: '#202635',

    text: '#F1F3F9',
    muted: '#A0A8BA',
    inactive: '#737D91',
    border: 'rgba(210,220,240,0.09)',

    subtle: '#242B3A',
    accentSoft: 'rgba(91,99,211,0.19)',

    success: '#78B99A',
    warning: '#E5B46B',
    danger: '#E58A8E',

    overlay: 'rgba(5, 8, 16, 0.62)',
    tabBackground: 'rgba(25,30,42,0.97)',
    shadow: '#000000',
    addShadow: '#000000',
  },
} as const;
