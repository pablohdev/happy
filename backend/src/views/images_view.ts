import Image from '../models/Image'
export default {
    render(image: Image) {
        return {
            id: image.id,
            url: `${process.env.HOST_API}:${process.env.PORT_API}/uploads/${image.path}`
        }
    },

    renderMany(images: Image[]) {
        return images.map(image => this.render(image))
    }
}