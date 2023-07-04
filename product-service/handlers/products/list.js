"use strict";

const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies
const {
  productParams,
  stockParams,
  responseHeaders,
  errorResponseHeaders,
} = require("../../constants/constants");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.list = async () => {
  try {
    const products = await dynamoDb
      .scan(productParams, (error, result) => {
        if (error) {
          throw new Error(error);
        }

        return result;
      })
      .promise();

    const stock = await dynamoDb
      .scan(stockParams, (error, result) => {
        if (error) {
          throw new Error(error);
        }

        return result;
      })
      .promise();

    const mappedProducts = products.Items.map((product) => ({
      ...product,
      count: stock.Items.filter((stock) => stock.product_id === product.id)[0]
        .count,
    }));

    return {
      ...responseHeaders,
      body: JSON.stringify({
        products: mappedProducts,
        total: mappedProducts.length,
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
