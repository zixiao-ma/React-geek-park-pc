/**
 * @author MaZiXiao
 * @date 2022-07-31 19:00
 */
import {tableData} from "@/pages/DataOverview/moduleOneData";
import './table.scss'

export const MyTable = () => {
    return (
        <table>
            <tbody>
            {
                tableData.map((item, index) => (
                    <tr key={index}>
                        <td>{item.td1}</td>
                        <td>{item.td2}</td>
                        <td>{item.td3}</td>
                        <td>{item.td4}</td>
                        <td>{item.td5}</td>
                    </tr>
                ))
            }
            </tbody>


        </table>
    )
}
