import styles from './SearchPage.module.css'
import React, { useEffect } from 'react'
import { Header, Footer, FilterArea, ProductList } from '../../components'
import { MainLayout } from '../../layouts/mainLayout'
import { useLocation, useParams } from 'react-router-dom'
import { Spin } from 'antd'
import { searchProduct } from '../../redux/productSeach/slice'
import { useSelector, useAppDispatch } from '../../redux/hooks'

type MatchParams = {
  keywords: string
}
export const SearchPage: React.FC = () => {
  const loading = useSelector(state => state.productSearch.loading)
  const error = useSelector(state => state.productSearch.error)
  const pagination = useSelector(state => state.productSearch.pagination)
  const productList = useSelector(state => state.productSearch.data)

  const dispatch = useAppDispatch()
  const location = useLocation()
  const { keywords } = useParams<MatchParams>()

  useEffect(() => {
    if (keywords) {
      dispatch(searchProduct({ nextPage: 1, pageSize: 10, keywords }))
    }
  }, [location])
  const onPageChange = (nextPage, pageSize) => {
    if (keywords) {
      dispatch(searchProduct({ nextPage, pageSize, keywords }))
    }
  }
  if (loading) {
    return (<Spin
      size="large"
      style={{
        marginTop: 200,
        marginBottom: 200,
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
      }}
    />)
  }
  if (error) {
    return <div>网站出错{error}</div>
  }
  return <MainLayout>
    <div className={styles['page-content']}>
      {/* 分类过滤器 */}
      <div className={styles['page-container']}>
        <FilterArea />
      </div>
      {/* 产品列表 */}
      <div className={styles['page-container']}>
        <ProductList
          data={productList}
          paging={pagination}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  </MainLayout>
}