'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const { productParams, stockParams, responseHeaders, errorResponseHeaders } = require('../../constants/constants');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.get = async (event) => {
    const { pathParameters } = event;
  const { id } = pathParameters;
  const productParamsById = {
    ...productParams,
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: {
      ':id': id 
    }
  }

  const stockParamsById = {
    ...stockParams,
    KeyConditionExpression: 'product_id = :id',
    ExpressionAttributeValues: {
      ':id': id
    }
  }

    try {
      const product = await dynamoDb.query(productParamsById, (error, result) => {
      if (error) {
        throw new Error(error)
      }

      return result
    }).promise();
  
    const stock = await dynamoDb.query(stockParamsById, (error, result) => {
      if (error) {
        throw new Error(error)
      }
    
      return result
    }).promise();
      
   const mappedProducts = product.Items.map((product) => ({
      ...product,
     count: stock.Items[0]?.count || 0
    }))

    return {
    ...responseHeaders,
      body: JSON.stringify({
        products: mappedProducts,
        total: mappedProducts[0]?.count || 0
      })
    };
    } catch (error) {
    return {
      ...errorResponseHeaders,
      body: JSON.stringify({
        error: error || 'Something went wrong'
      })
    }
  }
};
