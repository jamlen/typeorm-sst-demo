import "reflect-metadata"
import { createConnection } from "typeorm"
import { Customer } from "./entity/Customer"

export const getDatabase = async () => {
    return await createConnection({
        type: 'aurora-data-api-pg',
        database: process.env.DATABASE,
        secretArn: process.env.SECRET_ARN,
        resourceArn: process.env.CLUSTER_ARN,
        region: 'eu-west-2',
        serviceConfigOptions: {},
        // formatOptions: {},
        synchronize: true,
        logging: false,
        entities: [Customer],
    })
}
