export const handle = async (event) => ({
  statusCode: 201,
  body: JSON.stringify({
    message: 'Hello world!',
  }),
  headers: {
    'Content-Type': 'application/json',
  },
});

// export default handle;
