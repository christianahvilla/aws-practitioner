"use strict";

const AWS = require("aws-sdk");
const uuid = require("uuid");
const {
  productParams,
  stockParams,
  responseHeaders,
  errorResponseHeaders,
} = require("../../constants/constants");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = async (event) => {
  const { body } = event;
  const data = JSON.parse(body);
  const id = uuid.v4();

  const productParamsById = {
    ...productParams,
    Item: {
      id: id,
      title: data.title,
      description: data.description,
      image: data.image,
      price: data.price,
    },
  };

  const stockParamsById = {
    ...stockParams,
    Item: {
      product_id: id,
      count: data.count,
    },
  };

  try {
    await dynamoDb
      .put(productParamsById, (error, result) => {
        if (error) {
          console.log(error, "product");
          throw new Error(error);
        }

        return result;
      })
      .promise();

    await dynamoDb
      .put(stockParamsById, (error, result) => {
        if (error) {
          throw new Error(error);
        }

        return result;
      })
      .promise();

    const product = {
      id: id,
      ...data,
    };

    return {
      ...responseHeaders,
      body: JSON.stringify({
        product: product,
      }),
    };
  } catch (error) {
    return {
      ...errorResponseHeaders,
      body: JSON.stringify({
        error: error || "Something went wrong",
      }),
    };
  }
};
