import { createTheme } from '@mui/material/styles'
import { prefixer } from 'stylis'
import rtlPlugin from 'stylis-plugin-rtl'
import createCache from '@emotion/cache'
import { Vazirmatn } from 'next/font/google'


const vazirmatn = Vazirmatn({ subsets: ['latin'] })


export const theme = createTheme({
  // direction: 'rtl',
  typography: {
    fontFamily: `${vazirmatn.style.fontFamily}, Arial, sans-serif`,
  },
  palette: {
    primary: {
      main: '#5DDBD8',
    },
    secondary: {
      main: '#F2A799',
    },
  },
})

export const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
})


