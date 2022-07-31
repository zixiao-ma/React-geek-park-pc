/**
 * @author MaZiXiao
 * @date 2022-07-31 19:56
 */
import {Tag} from 'antd';
import './tagsView.scss'
import {useNavigate} from "react-router-dom";

export const TagsView = (props) => {
    const navigator = useNavigate()
    const log = (index) => {
        navigator(props.data[index - 1].path)
        props.ClickTag(props.data[index - 1].path)
        props.delTag(index)
    };
    const navigatorTags = path => {
        navigator(path)
        props.ClickTag(path)
    }
    return (<div className='tagsView'>
        {props.data.map((item, index) => (
            <Tag closable={index !== 0} onClick={() => navigatorTags(item.path)} onClose={() => log(index)} key={index}
                 color={props.highlight === item.path ? 'blue' : ''}>
                {item.name}
            </Tag>
        ))}


    </div>)
}
