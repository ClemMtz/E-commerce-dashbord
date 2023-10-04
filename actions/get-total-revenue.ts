import { prismadb } from "@/lib/prisamdb";

export const getTotalRevenue = async (storeId: string) => {
    const paidOrders = await prismadb.order.findMany({
        where: {
            storeId,
            isPaid: true,
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    });

    // const totalRevenue = paidOrders.reduce((total, order) => {
    //     const orderTotal = order.orderItems.reduce((orderSum, item) => {
    //         return orderSum + item.product.price.toNumber();
    //     }, 0);

    //     return total + orderTotal;
    // }, 0);

    // return totalRevenue;


    let totalRevenue = 0;

    for (const order of paidOrders) {
        for (const item of order.orderItems) {
            totalRevenue += item.product.price.toNumber();
        }
    }

    return totalRevenue;
};