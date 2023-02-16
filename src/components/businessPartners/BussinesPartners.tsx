import React from 'react'
import styles from './BusinessPartners.module.css'
import { Row, Col, Image } from 'antd'
import businessImg1 from '../../assets/images/partner1.png'
import businessImg2 from '../../assets/images/partner2.png'
import businessImg3 from '../../assets/images/partner3.png'
import businessImg4 from '../../assets/images/partner4.png'

export const BussinessPartners: React.FC = () => {
  return (
    <div className={styles['business-content']}>
      <Row>
        <Col span={6}
          className={styles['business-img']}>
          <Image src={businessImg1} width={240} />
        </Col>
        <Col span={6}
          className={styles['business-img']}>
          <Image src={businessImg2} width={240} />
        </Col>
        <Col span={6}
          className={styles['business-img']}>
          <Image src={businessImg3} width={240} />
        </Col>
        <Col span={6}
          className={styles['business-img']}>
          <Image src={businessImg4} width={240} />
        </Col>
      </Row>
    </div>)
}