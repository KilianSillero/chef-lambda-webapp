// default imports
const AWSXRay = require("aws-xray-sdk-core");
const AWS = AWSXRay.captureAWS(require("aws-sdk"));
const { metricScope, Unit } = require("aws-embedded-metrics");
const DDB = new AWS.DynamoDB({ apiVersion: "2012-10-08" });

// environment variables
const { TABLE_NAME, ENDPOINT_OVERRIDE, REGION } = process.env;
const options = { region: REGION };
AWS.config.update({ region: REGION });

if (ENDPOINT_OVERRIDE !== "") {
  options.endpoint = ENDPOINT_OVERRIDE;
}

const docClient = new AWS.DynamoDB.DocumentClient(options);
// response helper
const response = (statusCode, body, additionalHeaders) => ({
  statusCode,
  body: JSON.stringify(body),
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    ...additionalHeaders,
  },
});

function isValidRequest(event) {
  console.log("event in isValidRequest favorite recipe: " + JSON.stringify(event, null, 2));
  return (
    event !== null &&
    event.pathParameters !== null &&
    event.pathParameters.id !== null &&
    /^[\w-]+$/.test(event.pathParameters.id)
  );
}

function getCognitoUsername(event) {
  let authHeader = event.requestContext.authorizer;
  if (authHeader !== null) {
    return authHeader.claims["cognito:username"];
  }
  return null;
}

function updateRecord(username, recordId) {
  let params = {
    TableName: TABLE_NAME,
    Key: {
      "cognito-username": username,
      id: recordId,
    },
    UpdateExpression: "set #field = :value",
    ExpressionAttributeNames: { "#field": "favorite" },
    ExpressionAttributeValues: { ":value": true },
  };
  return docClient.update(params);
}

// Lambda Handler
exports.favRecipeItem = metricScope((metrics) => async (event, context) => {
  metrics.setNamespace("RecipeApp");
  metrics.putDimensions({ Service: "favRecipe" });
  metrics.setProperty("RequestId", context.requestId);

  if (!isValidRequest(event)) {
    metrics.putMetric("Error", 1, Unit.Count);
    return response(400, { message: "Error: Invalid request" });
  }

  try {
    let username = getCognitoUsername(event);
    let data = await updateRecord(username, event.pathParameters.id).promise();
    metrics.putMetric("Success", 1, Unit.Count);
    return response(200, data);
  } catch (err) {
    metrics.putMetric("Error", 1, Unit.Count);
    return response(400, { message: err.message });
  }
});
