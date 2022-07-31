/**
 * @author MaZiXiao
 * @date 2022-07-31 16:19
 */
import {Col, Row, Card} from 'antd';
import './index.scss'
import {moduleOneData} from "@/pages/DataOverview/moduleOneData";
import {MyTable} from "@/pages/DataOverview/components/ModuleTwoTable";
import EchartsModel from "@/pages/DataOverview/components/echartsModel";

export const DataOverview = () => {
    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Row gutter={[16, 16]} className='ModuleOne'>
                        {moduleOneData.map(item => (
                            <Col span={8} key={item.name}>
                                <Card>
                                <span style={{background: item.iconColor}}
                                      className='md-one-icon d-flex justify-content-center align-items-center'>
                                    {item.icon}
                                </span>
                                    <h4>{item.value}</h4>
                                    <p>{item.name}</p>
                                </Card>

                            </Col>
                        ))}

                    </Row>
                </Col>
                <Col span={12}>
                    <Card style={{height: '184px'}}>
                        <MyTable></MyTable>
                    </Card>
                </Col>
            </Row>
            <Card className={'mt-2 echartsCard'}>
                <EchartsModel></EchartsModel>
            </Card>
        </div>
    )
}
