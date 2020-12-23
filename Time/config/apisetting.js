function getAbsolutePath() {
    let path = location.pathname
    var base = path.substring(0, path.lastIndexOf('/') + 1)
    const baseUrl = process.env.NODE_ENV === 'development' ? '/api/' : base
    return baseUrl
}

function getAbsoluteHost() {
    return location.origin
}

var API = {
    PROXY_HOST: getAbsoluteHost(),
    PROXY_HOST_URL: getAbsolutePath() + 'proxyHandler?url=',
    QQ_MAP_URL:
        'http://wprd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}&scl=1&ltype=3',
    Component: {
        Query: getAbsolutePath() + 'Component/listComponent',
        Update: getAbsolutePath() + 'Component/updateComponent'
    },
    ClassifyInfo: {
        queryLinkInfoById: getAbsolutePath() + 'ClassifyInfo/queryLinkInfoById',
        queryRelationComponentsDataSet:
            getAbsolutePath() + 'ClassifyInfo/queryRelationComponentsDataSet'
    },
    MapPlan: {
        queryMapPlanByOWNERID:
            getAbsolutePath() + 'MapPlan/queryMapPlanByOWNERID',
        selectMapPlanById: getAbsolutePath() + 'MapPlan/selectMapPlanById',
        updateMapPlan: getAbsolutePath() + 'MapPlan/updateMapPlan',
        saveMapPlan: getAbsolutePath() + 'MapPlan/saveMapPlan',
        deleteMapPlanById: getAbsolutePath() + 'MapPlan/deleteMapPlanById'
    },
    sysConfigUrl:
        getAbsolutePath() +
        'config/getPropertyValueByKey?key=security.disabled',
    LoginUrl: getAbsolutePath() + 'user/login',
    LogoutUrl: getAbsolutePath() + 'user/logout',
    fontUrl: getAbsolutePath() + 'fontlib/font.pbf'
}
export default API
