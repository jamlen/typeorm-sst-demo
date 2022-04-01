import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from "aws-lambda";
import { getDatabase } from "./data-source"
import { Customer } from "./entity/Customer"

// AppDataSource.initialize().then(() => console.log('initialised'))

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
    await getDatabase()
    const results = await Customer.find()
    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(results)
    };
};

interface PostPayload {
    first_name: string
    last_name: string
}

export const post: APIGatewayProxyHandlerV2<PostPayload> = async (event: APIGatewayProxyEventV2) => {
    console.log(event)
    await getDatabase()

    const customer = new Customer()
    customer.firstName = "Timber"
    customer.lastName = "Saw"
    await customer.save()
    console.log("Saved a new user with id: " + customer.id)
    // const results = await db.query(`INSERT INTO customers (first_name, last_name) VALUES(:first,:last)`, event)

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer)
    };
};
