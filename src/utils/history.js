/**
 * @author MaZiXiao
 * @date 2022-07-31 18:21
 */
// https://github.com/remix-run/react-router/issues/8264

import {createBrowserHistory} from 'history'
import {unstable_HistoryRouter as HistoryRouter} from 'react-router-dom'

const history = createBrowserHistory()

export {
    HistoryRouter,
    history
}
