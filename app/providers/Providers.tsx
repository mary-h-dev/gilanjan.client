'use client'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { CacheProvider } from '@emotion/react'
import { cacheRtl } from './muiSettings/Settings'
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material'
import { theme } from './muiSettings/Settings'
import { SnackbarProvider } from 'notistack'



export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <div>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
      >
        <CacheProvider value={cacheRtl}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Provider store={store}>
           {children}
            </Provider>
          </MuiThemeProvider>
        </CacheProvider>
      </SnackbarProvider>
    </div>
  )
}
