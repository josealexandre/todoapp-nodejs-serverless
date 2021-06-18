import { APIGatewayProxyHandler } from 'aws-lambda';
import { v4 as uuidV4 } from 'uuid';
import { dynamoDb } from '../utils/dynamoDbClient';

export const handle: APIGatewayProxyHandler = async (event) => {
  const { title, deadline } = JSON.parse(event.body);
  const { userId } = event.pathParameters;

  const result = await dynamoDb.query({
    TableName: 'todos',
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: {
      ':id': userId,
    },
  }).promise();

  let user = result.Items[0];

  const newTodo = {
    id: uuidV4(),
    title,
    done: false,
    deadline: new Date(deadline).toISOString(),
    created_at: new Date().toISOString(),
  };

  if (user) {
    user.todos.push(newTodo);
  } else {
    user = {
      id: userId,
      todos: [newTodo],
    };
  }

  await dynamoDb.put({
    TableName: 'todos',
    Item: user,
  }).promise();

  return {
    statusCode: 201,
    body: '',
  };
};
