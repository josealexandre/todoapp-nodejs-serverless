import { APIGatewayProxyHandler } from 'aws-lambda';
import { v4 as uuidV4 } from 'uuid';
import { dynamoDb } from '../utils/dynamoDbClient';

export const handle: APIGatewayProxyHandler = async (event) => {
  const { title, deadline } = JSON.parse(event.body);
  const { userId } = event.pathParameters;

  const newTodo = {
    id: uuidV4(),
    userId,
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date(),
  };

  await dynamoDb.put({
    TableName: 'todos',
    Item: newTodo,
  }).promise();

  return {
    statusCode: 201,
    body: '',
  };
};
