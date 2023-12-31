import { format } from "date-fns";

import { prismadb } from "@/lib/prisamdb";
import { formatteur } from "@/lib/utils";

import { OrderClient } from "./components/client";
import { OrderColumn } from "./components/columns";

const OrdersPage = async ({ params }: { params: { storeid: string } }) => {
    const orders = await prismadb.order.findMany({
        where: {
            storeId: params.storeid
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const formatedOrders: OrderColumn[] = orders.map((item) => ({
        id: item.id,
        phone: item.phone,
        adress: item.adress,
        products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
        totalPrice: formatteur.format(item.orderItems.reduce((total, item) => {
            return total + Number(item.product.price)
        }, 0)),
        isPaid: item.isPaid,
        createdAt: format(item.createdAt, "MMMM do, yyyy")

    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient data={formatedOrders} />
            </div>
        </div>
    )
};


export default OrdersPage; 