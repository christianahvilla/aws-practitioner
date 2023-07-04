"use strict";

module.exports.authorization = async (event) => {
  const { headers } = event;
  const { authorization: authorizationHeader } = headers;

  if (!authorizationHeader) {
    const error = new Error("Error authorization was not provided");
    error.statusCode = 401;

    throw error;
  }

  const encodedCreds = authorizationHeader.split(" ")[1];
  const plainCreds = Buffer.from(encodedCreds, "base64").toString().split(":");
  const username = plainCreds[0];
  const password = plainCreds[1];

  if (
    !(
      process.env.GIT_HUB_USER === username &&
      process.env.GIT_HUB_PASSWORD === password
    )
  ) {
    return {
      principalId: username,
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Deny",
            Resource: event.routeArn,
          },
        ],
      },
    };
  }

  return {
    principalId: username, // The principal user identification associated with the token sent by the client.
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: "Allow",
          Resource: event.routeArn,
        },
      ],
    },
  };
};
