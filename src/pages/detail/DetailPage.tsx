import React, { useEffect, useState } from 'react';
import styles from './DetailPage.module.css'
import { useParams } from 'react-router-dom'
import { Spin, Row, Col, DatePicker, Divider, Typography, Anchor, Menu, Button } from 'antd'
import axios from 'axios'
import { Header, Footer, ProductIntro, ProductComments } from '../../components'
import { MainLayout } from '../../layouts/mainLayout';
import { commentMockData } from './mockup';

import { productDetailSlice, getProductDetail } from '../../redux/productDetail/slice'
import { useSelector, useAppDispatch } from '../../redux/hooks'
import { useDispatch } from 'react-redux'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { addShoppingCartItem } from '../../redux/shoppingCart/slice'

// interface MatchParams{
//   touristRouteId
// }
type MatchParams = {
  touristRouteId: string,
  // other:string
}

// export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = (props) => 
export const DetailPage: React.FC = (props) => {
  // console.log(props.history);
  // console.log(props.location);
  // console.log(props.match);
  // return (<h1>详情页面 路线ID：{props.match.params.touristRouteId}</h1>)
  // var params = useParams<'touristRouteId'>()
  var { touristRouteId } = useParams<MatchParams>()
  // const [loading, setLoading] = useState<boolean>(true)
  // const [product, setProduct] = useState<any>(null)
  // const [error, setError] = useState<string | null>(null)
  const { RangePicker } = DatePicker;
  const loading = useSelector(state => state.productDetail.loading)
  const error = useSelector(state => state.productDetail.error)
  const product = useSelector(state => state.productDetail.data)
  const dispatch = useAppDispatch()

  const jwt = useSelector(state => state.user.token) as string
  const shoppingCartLoading = useSelector(state => state.shoppingCart.loading)
  

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true)
      if (touristRouteId) {
        dispatch(getProductDetail(touristRouteId))
      }
    }
    fetchData()
  }, [])

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
      {/* 产品简介与日期选择 */}
      <div className={styles['product-intro-container']}>
        <Row>
          <Col span={13}><ProductIntro
            title={product.title}
            shortDescription={product.description}
            price={product.originalPrice}
            coupons={product.coupons}
            points={product.points}
            discount={product.price}
            rating={product.rating}
            pictures={product.touristRoutePictures.map((p) => p.url)}
          /></Col>
          <Col span={11}>
            <Button
              style={{ marginTop: 50, marginBottom: 30, display: 'block' }}
              type='primary'
              danger
              loading={shoppingCartLoading}
              onClick={() => {
                dispatch(addShoppingCartItem({jwt,touristRouteId:product.id}))
              }}
            >
              <ShoppingCartOutlined />
              放入购物车
            </Button>
            <RangePicker open style={{ marginTop: 20 }} />
          </Col>
        </Row>
      </div>
      {/* 锚点菜单 */}
      <div className={styles['product-detail-anchor']}>
        <Anchor>
          <Menu mode='horizontal'>
            <Menu.Item key="1">
              <Anchor.Link href='#feature' title='产品特色'></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Anchor.Link href='#fees' title='费用'></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Anchor.Link href='#notes' title='预定须知'></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Anchor.Link href='#comments' title='用户评价'></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="1">
              <Anchor.Link href='#feature' title='产品特色'></Anchor.Link>
            </Menu.Item>
          </Menu>
        </Anchor>
      </div>
      {/* 产品特色 */}
      <div id="feature" className={styles['product-detail-container']}>
        <Divider orientation={'center'}>
          <Typography.Title level={3}>产品特色</Typography.Title>
        </Divider>
        <div dangerouslySetInnerHTML={{ __html: product.features }} style={{ margin: 50 }}>
        </div>
      </div>
      {/* 费用 */}
      <div id="fees" className={styles['product-detail-container']}>
        <Divider orientation={'center'}>
          <Typography.Title level={3}>费用</Typography.Title>
        </Divider>
        <div dangerouslySetInnerHTML={{ __html: product.fees }}
          style={{ margin: 50 }}>
        </div>
      </div>
      {/* 预定须知 */}
      <div id="notes" className={styles['product-detail-container']}>
        <Divider orientation={'center'}>
          <Typography.Title level={3}>预定须知</Typography.Title>
        </Divider>
        <div dangerouslySetInnerHTML={{ __html: product.notes }} style={{ margin: 50 }}>
        </div>
      </div>
      {/* 商品评价 */}
      <div id="comments" className={styles['product-detail-container']}>
        <Divider orientation={'center'}>
          <Typography.Title level={3}>用户评价</Typography.Title>
        </Divider>
        <div style={{ margin: 40 }}>
          <ProductComments data={commentMockData} />
        </div>
      </div>
    </div>
  </MainLayout>
}