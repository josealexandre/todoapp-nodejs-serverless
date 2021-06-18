import { APIGatewayProxyHandler } from 'aws-lambda';
import { dynamoDb } from '../utils/dynamoDbClient';

export const handle: APIGatewayProxyHandler = async (event) => {
  const { userId } = event.pathParameters;

  const { Items: todos } = await dynamoDb.query({
    TableName: 'todos',
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: {
      ':id': userId,
    },
  }).promise();

  if (!todos) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: 'No ToDo for this user was found',
      }),
      headers: {
        header: 'application/json',
      },
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(todos),
    headers: {
      header: 'application/json',
    },
  };
};
