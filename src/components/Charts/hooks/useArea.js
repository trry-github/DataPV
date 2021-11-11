import axios from 'axios'
import { globalVariable } from '@/util/global.properties'
import chainGeoJson from './areaGeoJson.json'

// 获取地图数据（GeoJson)
export function getGeoJsonData(location = 'china') {
    return axios.get(
        `https://unpkg.com/echarts@3.6.2/map/json/${location}.json`
    )
}

const airData = [
    { name: '北京市', value: 39.92 },
    { name: '天津市', value: 39.13 },
    { name: '上海市', value: 31.22 },
    { name: '重庆市', value: 66 },
    { name: '河北省', value: 147 },
    { name: '河南省', value: 113 },
    { name: '云南省', value: 25.04 },
    { name: '辽宁省', value: 50 },
    { name: '黑龙江省', value: 114 },
    { name: '湖南省', value: 175 },
    { name: '安徽省', value: 117 },
    { name: '山东省', value: 92 },
    { name: '新疆维吾尔自治区', value: 84 },
    { name: '江苏省', value: 67 },
    { name: '浙江省', value: 84 },
    { name: '江西省', value: 96 },
    { name: '湖北省', value: 273 },
    { name: '广西壮族自治区', value: 59 },
    { name: '甘肃省', value: 99 },
    { name: '山西省', value: 39 },
    { name: '内蒙古自治区', value: 58 },
    { name: '陕西省', value: 61 },
    { name: '吉林省', value: 51 },
    { name: '福建省', value: 29 },
    { name: '贵州省', value: 71 },
    { name: '广东省', value: 38 },
    { name: '青海省', value: 57 },
    { name: '西藏自治区', value: 24 },
    { name: '四川省', value: 58 },
    { name: '宁夏回族自治区', value: 52 },
    { name: '海南省', value: 54 },
    { name: '台湾省', value: 88 },
    { name: '香港特别行政区', value: 66 },
    { name: '澳门特别行政区', value: 77 },
    { name: '南海诸岛', value: 55 }
]
async function useAreaCharts() {
    const { data } = await getGeoJsonData()
    console.log(data)

    globalVariable.$echarts.registerMap('china', chainGeoJson)
    return {
        tooltip: {
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2,
            formatter: function(params) {
                const value = (params.value + '').split('.')
                const valueStr = value[0].replace(
                    /(\d{1,3})(?=(?:\d{3})+(?!\d))/g,
                    '$1,'
                )
                return params.name + ': ' + valueStr
            }
        },
        // 配置地理坐标系组件
        geo: {
            type: 'map',
            map: 'china',
            roam: true, // 设置允许缩放以及拖动的效果
            zoom: 2, // 初始化缩放比例
            scaleLimit: {
                min: 1,
                max: 4
            },
            center: [110, 38], // 设置初始化中心点
            itemStyle: {
                // 定义样式
                areaColor: '#f4f1de', // 普通状态下的样式
                borderColor: '#111'
            }
        },
        series: [
            {
                data: airData,
                geoIndex: 0, // 将空气质量的数据和第0个geo配置关联在一起
                type: 'map',
                map: 'china'
            }
        ],
        visualMap: {
            min: 0,
            max: 300,
            inRange: {
                symbolSize: [30, 100],
                color: ['white', 'red'] // 控制颜色渐变的范围
            },
            calculable: true // 出现滑块
        }
    }
}
export default useAreaCharts
