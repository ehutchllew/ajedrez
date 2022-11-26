export const logSchema = {
  $jsonSchema: {
    required: ["createdAt", "hasError", "ips", "method", "path", "statusCode"],
    properties: {
      createdAt: {
        bsonType: "int",
        description:
          "millisecond representation of when the request record was created",
      },
      data: {
        bsonType: "string",
        description: "stringified request body data",
      },
      error: {
        bsonType: "string",
        description: "stringified data of request error",
      },
      hasError: {
        bsonType: "bool",
        description:
          "flag for determining whether an error exists for the specified request",
      },
      ips: {
        oneOf: [
          {
            bsonType: "array",
            description:
              "list of root and proxy ips associated with the request",
          },
          {
            bsonType: "string",
            description: "ip from which the request originated",
          },
        ],
      },
      method: {
        enum: ["DELETE", "GET", "POST", "PUT"],
        description: "HTTP method for the request",
      },
      params: {
        bsonType: "string",
        description: "stringified dictionary/object of path parameters",
      },
      path: {
        bsonType: "string",
        description: "the path portion of the URL that the request was made on",
      },
      query: {
        bsonType: "string",
        description: "stringified dictionary/object of query parameters",
      },
      statusCode: {
        enum: [200, 400, 401, 403, 404, 405, 409, 422, 429, 500, 501],
        description:
          "list of allowable status codes relating to the result/response of the processed request",
      },
      updatedAt: {
        bsonType: "int",
        description:
          "millisecond representation of when the request record was updated",
      },
    },
  },
};
