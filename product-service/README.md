# AWS-Node-Project

This is backend application to handle storefront using AWS

- [AWS](https://aws.amazon.com/?nc1=h_ls) as a cloud platform
- [Node](https://beta.reactjs.org/) as a frontend framework
- [Serverless](https://serverless.com/) as a serverless framework
- [TypeScript](https://www.typescriptlang.org/) as a type checking tool

## Available Scripts

### `sls deploy`

To create S3, API Gateway, DynamoDB and Lambda functions of this application.

## Task 4

### [getProducts](https://5koi4jml6a.execute-api.us-east-1.amazonaws.com/products)
- Available method: GET
### [getProductsById/{id}](https://5koi4jml6a.execute-api.us-east-1.amazonaws.com/products/03b70a83-01fa-4434-93e0-fc36430fb1)
- Available id: `03b70a83-01fa-4434-93e0-fc36430fb191`
- Available method: GET

### [createProduct](https://5koi4jml6a.execute-api.us-east-1.amazonaws.com/products)
- Available method: POST
- Available route: https://5koi4jml6a.execute-api.us-east-1.amazonaws.com/products
- Body: 
```
{
  "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    "price": 899,
    "image": "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
    "title": "iPhone X",
    "count": 34
}
```
