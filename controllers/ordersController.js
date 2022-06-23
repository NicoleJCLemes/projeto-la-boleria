import db from "../config/db.js";
import dayjs from "dayjs";

export async function getOrders(req, res) {
    const { date } = req.query;
    
    try {

        let orders;

        if (date) {
            orders = await db.query(`
            SELECT orders.*, clients.name as "clientName", clients.address, clients.phone,
            cakes.name as "cakeName", cakes.price, cakes.image, cakes.description
            FROM orders
            JOIN clients
            ON orders."clientId" = clients.id
            JOIN cakes
            ON orders."cakeId" = cakes.id
            WHERE (CAST("createdAt" AS DATE) = '${date}')
            `);
        } else {
            orders = await db.query(`
            SELECT orders.*, clients.name as "clientName", clients.address, clients.phone,
            cakes.name as "cakeName", cakes.price, cakes.image, cakes.description
            FROM orders
            JOIN clients
            ON orders."clientId" = clients.id
            JOIN cakes
            ON orders."cakeId" = cakes.id
            `);
        }


        if (orders.rows.length === 0) {
            return res.status(404).send([]);
        }

        let allOrdersArray = [];

        orders.rows.forEach(order => {
            let { clientId, clientName, address, phone, cakeId, cakeName, price, description, image, createdAt, quantity, totalPrice } = order;

            let ordersObject = {
                    client: {
                        id: clientId,
                        name: clientName,
                        address,
                        phone 
                    },
                    cake: {
                        id: cakeId,
                        name: cakeName,
                        price,
                        description,
                        image
                    },
                    createdAt,
                    quantity,
                    totalPrice
                };
    
            allOrdersArray = [...allOrdersArray, ordersObject]
        });

        res.status(200).send(allOrdersArray);
        
    } catch (error) {
        
        console.log(error);
        res.sendStatus(500);
        
    }
}

export async function getOrdersById(req, res) {
    const { id } = req.params;
    
    try {

        const order = await db.query(`
        SELECT orders.*, clients.name as "clientName", clients.address, clients.phone,
        cakes.name as "cakeName", cakes.price, cakes.image, cakes.description
        FROM orders
        JOIN clients
        ON orders."clientId" = clients.id
        JOIN cakes
        ON orders."cakeId" = cakes.id
        WHERE orders.id = $1
        `, [id]);


        if (order.rows.length === 0) {
            return res.sendStatus(404);
        }

        const { clientId, clientName, address, phone, cakeId, cakeName, price, description, image, createdAt, quantity, totalPrice } = order.rows[0];

        const orderObject = {
                client: {
                    id: clientId,
                    name: clientName,
                    address,
                    phone 
                },
                cake: {
                    id: cakeId,
                    name: cakeName,
                    price,
                    description,
                    image
                },
                createdAt,
                quantity,
                totalPrice
        };

        res.status(200).send(orderObject);
        
    } catch (error) {
        
        console.log(error);
        res.sendStatus(500);
        
    }
}

export async function postOrder(req, res) {
    const {clientId, cakeId, quantity, totalPrice} = req.body;
    const date = dayjs().format("YYYY-MM-DD HH:mm");

    try {

        await db.query(`INSERT INTO orders ("clientId", "cakeId", quantity, "totalPrice", "createdAt") VALUES ($1, $2, $3, $4, $5)`, 
        [clientId, cakeId, quantity, totalPrice, date]);
        res.sendStatus(201);

    } catch (error) {

        console.log(error);
        res.sendStatus(500);

    }
}