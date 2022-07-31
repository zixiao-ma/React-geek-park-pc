/**
 * @author MaZiXiao
 * @date 2022-07-31 19:56
 */
import {Tag} from 'antd';
import './tagsView.scss'

export const TagsView = (props) => {
    console.log()
    const log = (e) => {
        console.log(e);
    };

    return (<div className='tagsView'>
        {props.data.map((item, index) => (
            <Tag closable onClose={log} key={index}>
                {item.name}
            </Tag>
        ))}
        

    </div>)
}
