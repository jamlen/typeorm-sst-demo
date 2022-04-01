import "reflect-metadata"
import * as sst from "@serverless-stack/resources";

export default class MyStack extends sst.Stack {
    constructor(scope: sst.App, id: string, props?: sst.StackProps) {
        super(scope, id, props);

        const defaultDatabaseName = "acme";

        const cluster = new sst.RDS(this, "Database", {
            engine: "postgresql10.14",
            defaultDatabaseName,
            migrations: "src/migrations",
        });

        // Create a HTTP API
        const api = new sst.Api(this, "Api", {
            defaultFunctionProps: {
                environment: {
                    DATABASE: defaultDatabaseName,
                    CLUSTER_ARN: cluster.clusterArn,
                    SECRET_ARN: cluster.secretArn,
                },
                permissions: [cluster],
            },
            routes: {
                "GET /": "src/lambda.handler",
                "POST /": "src/lambda.post"
            },
        });

        // Show the endpoint in the output
        this.addOutputs({
            "ApiEndpoint": api.url,
        });
    }
}
