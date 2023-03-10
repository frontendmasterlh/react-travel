import React from 'react'
import styles from './HomePage.module.css'
import { SideMenu, Carousel, ProductCollection, BussinessPartners } from '../../components'
import { MainLayout } from '../../layouts/mainLayout'
import { Row, Col, Typography, Spin } from 'antd'
// import { productList1, productList2, productList3 } from './mockups'
import sideImage1 from '../../assets/images/sider_1.png'
import sideImage2 from '../../assets/images/sider_2.png'
import sideImage3 from '../../assets/images/sider_3.png'
// import { withRouter, RouteComponentProps } from '../../helpers/withRouter'
import { withTranslation, WithTranslation } from 'react-i18next'

import axios from 'axios'
import { connect } from 'react-redux'
import { RootState } from '../../redux/store'

import { giveMeDataActionCreator } from '../../redux/recommendProducts/recommendProductsActions'

type PropsType = WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

// export class HomePage extends React.Component {
class HomePageComponent extends React.Component<PropsType> {
  componentDidMount() {
    this.props.giveMeData()
  }
  render() {
    // console.log(this.props);
    // console.log(this.props.navigate);
    // console.log(this.props.t);
    const { t, productList, loading, error } = this.props
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
    return (
      <MainLayout>
        <Row style={{ marginTop: 20 }}>
          <Col span={6}>
            <SideMenu />
          </Col>
          <Col span={18}>
            <Carousel />
          </Col>
        </Row>
        <ProductCollection
          title={
            <Typography.Title level={3} type='warning'>{t("home_page.hot_recommended")}</Typography.Title>
          }
          sideImage={sideImage1}
          products={productList[0].touristRoutes}
        ></ProductCollection>
        <ProductCollection
          title={
            <Typography.Title level={3} type='danger'>{t("home_page.new_arrival")}</Typography.Title>
          }
          sideImage={sideImage2}
          products={productList[1].touristRoutes}
        ></ProductCollection>
        <ProductCollection
          title={
            <Typography.Title level={3} type='warning'>{t("home_page.domestic_travel")}</Typography.Title>
          }
          sideImage={sideImage3}
          products={productList[2].touristRoutes}
        ></ProductCollection>
        <BussinessPartners />
      </MainLayout>
    )
  }
}
const mapStateToProps = (state: RootState) => {
  return {
    loading: state.recommendProducts.loading,
    error: state.recommendProducts.error,
    productList: state.recommendProducts.productList
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    giveMeData: () => {
      dispatch(giveMeDataActionCreator())
    }
  }
}
export const HomePage = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HomePageComponent))