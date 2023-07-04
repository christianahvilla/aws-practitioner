const bucketName = process.env.PRODUCTS_BUCKET;
const defaultRegion = process.env.REGION;
const queueURL =
  "https://sqs.us-east-1.amazonaws.com/330926698891/product-service-dev-catalogItemsQueue";

const errorResponseHeaders = {
  statusCode: 501,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
};

const responseHeaders = {
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
};

const productsBucketParams = {
  Bucket: bucketName,
  Prefix: "uploaded/",
};

module.exports = {
  responseHeaders,
  errorResponseHeaders,
  bucketName,
  productsBucketParams,
  defaultRegion,
  queueURL,
};
