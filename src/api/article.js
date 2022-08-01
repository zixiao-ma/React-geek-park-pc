/**
 * @author MaZiXiao
 * @date 2022-07-31 21:18
 */
import request from "@/utils/request";

export function getChannelApi() {
    return request.get('/channels')
}

export function getArticleTable(data) {
    return request.get('/mp/articles', {
        params: data
    })
}

export function deleteArticle(id) {
    return request.delete(`/mp/articles/${id}`)

}

export function postArticleAPi(data) {
    return request.post('/mp/articles?draft=false', data)
}

export function getArticleDetail(id) {
    return request.get(`/mp/articles/${id}`)
}
