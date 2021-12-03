export default function useMp4Video(videoUrl, defaultOptions) {
    const definition = {
        sd: '标清',
        hd: '高清'
    }
    const initVideo = (options = defaultOptions, fun) => {
        options.video.quality = []
        for (const key in videoUrl) {
            for (const childrenKey in videoUrl[key]) {
                options.video.quality.push({
                    name: definition[childrenKey],
                    url: videoUrl[key][childrenKey],
                    type: key
                })
            }
        }
        defaultOptions.video.quality = options.video.quality.filter(item => item.url)
        fun()
    }
    return initVideo
}