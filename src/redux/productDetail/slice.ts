import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
interface ProductDetailState {
  loading: boolean
  error: string | null
  data: any
}

const initialState: ProductDetailState = {
  loading: true,
  error: null,
  data: null
}

export const getProductDetail = createAsyncThunk(
  'productDetail/getProductDetail',
  async (touristRouteId: string, thunkAPI) => {
    // thunkAPI.dispatch(productDetailSlice.actions.fetchStart())
    // try {
    const { data } = await axios.get(
      `http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`
    )
      return data
    // setProduct(data)
    // setLoading(false)
    // thunkAPI.dispatch(productDetailSlice.actions.fetchSuccess(data))
    // } catch (error) {
    // setError(error instanceof Error ? error.message : 'error')
    // setLoading(false)
    // thunkAPI.dispatch(
    // productDetailSlice.actions.fetchFail(
    // error instanceof Error ? error.message : 'error'
    // )
    // )
    // }
  }
)

export const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
    // fetchStart: state => {
    //   // return { ...state, loading: true }
    //   state.loading = true
    // },
    // fetchSuccess: (state, action) => {
    //   state.data = action.payload
    //   state.loading = false
    //   state.error = null
    // },
    // fetchFail: (state, action: PayloadAction<string | null>) => {
    //   // const ddd = action.payload;
    //   state.loading = false
    //   state.error = action.payload
    // }
  },
  extraReducers: {
    [getProductDetail.pending.type]: state => {
      state.loading = true
    },
    [getProductDetail.fulfilled.type]: (state, action) => {
      state.data = action.payload
      state.loading = false
      state.error = null
    },
    [getProductDetail.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    }
  }
})
