import { prisma } from '@/lib/prisma'

export async function GET(req, res) {
    try {
        const products = await prisma.product.findMany({
            where: { category: 'ebook' },
        });
        res.status(200).json({ product: products });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching products' });
    }
}