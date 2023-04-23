// You can obtain these values by running:
// aws cloudformation describe-stacks --stack-name <YOUR STACK NAME> --query "Stacks[0].Outputs[]"

const config = {
  "aws_user_pools_web_client_id": "1maa8lss4lp91tbfmpf6sdja1t",     // CognitoClientID
  "api_base_url": "https://2pfhf4euzh.execute-api.eu-west-1.amazonaws.com/prod",                                     // RecipeFunctionApi
  "cognito_hosted_domain": "myrecipeappdemo-chef-lambda-webapp.auth.eu-west-1.amazoncognito.com",                   // CognitoDomainName
  "redirect_url": "https://master.d1e68y1rm33pqb.amplifyapp.com"                                      // AmplifyURL
};

export default config;
