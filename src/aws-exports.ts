import {AWS_REGION, AMPLIFY_ACCESS_KEY, AMPLIFY_SECRET, AMPLIFY_GRAPHQL_API_URL} from '@env'

const config = {
    aws_project_region: AWS_REGION,
    access_key_id: AMPLIFY_ACCESS_KEY,
    secret_access_key: AMPLIFY_SECRET,
    aws_appsync_graphqlEndpoint: AMPLIFY_GRAPHQL_API_URL,
}

export default config;