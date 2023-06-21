const AWS = require("aws-sdk");
const uuid = require("uuid");
const { productParams, stockParams } = require("../../constants/constants");

module.exports.process = async (event) => {
  const data = event.Records[0];
  const products = JSON.parse(data.body);
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const sns = new AWS.SNS();

  const promises = products.map(async (product) => {
    const id = uuid.v4();
    const params = {
      Message: `Product Created id:${id}`,
      TopicArn: "arn:aws:sns:us-east-1:330926698891:createProductTopic",
    };

    const productParamsById = {
      ...productParams,
      Item: {
        id: id,
        title: product.title,
        description: product.description,
        image: product.image,
        price: product.price,
      },
    };

    const stockParamsById = {
      ...stockParams,
      Item: {
        product_id: id,
        count: product.count,
      },
    };

    try {
      return new Promise(() => {
        dynamoDb.put(productParamsById).promise();
        dynamoDb.put(stockParamsById).promise();
        sns.publish(params).promise();
      });
    } catch (error) {
      console.log("error");
      console.error(error, error.stack);
    }
  });

  await Promise.all(promises);
};
