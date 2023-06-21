const productParams = {
  TableName: process.env.PRODUCT_TABLE,
};

const stockParams = {
  TableName: process.env.STOCK_TABLE,
};

const errorResponseHeaders = {
  statusCode: 501,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
}

const responseHeaders = {
      statusCode: 200,
     headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
}

module.exports = {
    responseHeaders, 
    errorResponseHeaders,
    stockParams,
    productParams
}