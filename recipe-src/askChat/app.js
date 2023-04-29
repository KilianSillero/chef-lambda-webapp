// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

// default imports
const { Configuration, OpenAIApi } = require("openai");
const AWSXRay = require("aws-xray-sdk-core");
const AWS = AWSXRay.captureAWS(require("aws-sdk"));
const { metricScope, Unit } = require("aws-embedded-metrics");
const { v1: uuidv1 } = require("uuid");

// environment variables
const { ENDPOINT_OVERRIDE, REGION } = process.env;
const options = { region: REGION };
AWS.config.update({ region: REGION });

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

if (ENDPOINT_OVERRIDE !== "") {
  options.endpoint = ENDPOINT_OVERRIDE;
}

const openai = new OpenAIApi(configuration);


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
  console.log("event in isValidRequest add recipe: " + event)
  return event.body !== null;
}

function getCognitoUsername(event) {
  let authHeader = event.requestContext.authorizer;
  if (authHeader !== null) {
    return authHeader.claims["cognito:username"];
  }
  return null;
}


// Lambda Handler
exports.askChat = metricScope((metrics) => async (event, context) => {
  metrics.setNamespace("RecipeApp");
  metrics.putDimensions({ Service: "askChat" });
  metrics.setProperty("RequestId", context.requestId);

  if (!isValidRequest(event)) {
    metrics.putMetric("Error", 1, Unit.Count);
    return response(400, { message: "Error: Invalid request" });
  }

  try {
    
   const completion = await openai.createCompletion({
      model: "gpt-3.5-turbo",
      prompt: event.question,
      temperature: 0.9,
      echo: true,
      max_tokens: 2048
    });

    metrics.putMetric("Success", 1, Unit.Count);
    return response(200, {body:JSON.stringify({"Answer": completion.data.choices[0].text })});
  } catch (err) {
    metrics.putMetric("Error", 1, Unit.Count);
    return response(400, { message: err.message });
  }
});
