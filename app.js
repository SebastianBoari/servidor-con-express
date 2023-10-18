import express from 'express'
import productManager from './ProductManager.js'

const app = express()

app.get('/products', async (req, res) => {
    try {
        const products = await productManager.getProducts()

        let limit

        if (req.query.limit) {
            limit = +req.query.limit

            const limitProducts = products.slice(0, limit)

            return res.send({ status: 'success', payload: limitProducts })
        }

        res.send({ status: 'success', payload: products })
    } catch (error) {
        res.send({ status: 'error', payload: error })
    }
})


app.get('/products/:pid', async (req, res) => {
    try {
        const product = await productManager.getProductById(+req.params.pid)

        res.send({ status: 'success', payload: product })
    } catch (error) {
        res.send({ status: 'error', payload: error })
    }
})

app.listen(8080, () => console.log('Server up'))