import { createSlice } from '@reduxjs/toolkit'
import { layoutProps } from '../../../../types/index'
import { RootState } from '../store'

const initialState: layoutProps = {
  isOpenSort: false,
  isOpenFilter: false,
  isOpenSideBar: false,
  sliders: [],
}


const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleSort: (state) => {
      state.isOpenSort = !state.isOpenSort
    },
    closeSort: (state) => {
      state.isOpenSort = false
    },
    toggleFilter: (state) => {
      state.isOpenFilter = !state.isOpenFilter
    },
    closeFilter: (state) => {
      state.isOpenFilter = false
    },
    toggleSideBar: (state) => {
      state.isOpenSideBar = !state.isOpenSideBar
    },
    closeSideBar: (state) => {
      state.isOpenSideBar = false
    },
    setSlider: (state, action) => {
      state.sliders = action.payload
    },
  },
})

export const {
  toggleSort,
  closeFilter,
  toggleFilter,
  closeSort,
  toggleSideBar,
  closeSideBar,
  setSlider,
} = layoutSlice.actions

export const selectIsOpenSideBar = (state: RootState) => state.layout.isOpenSideBar

export default layoutSlice.reducer
