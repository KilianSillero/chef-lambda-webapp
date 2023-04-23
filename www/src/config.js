// You can obtain these values by running:
// aws cloudformation describe-stacks --stack-name <YOUR STACK NAME> --query "Stacks[0].Outputs[]"

const config = {
  "aws_user_pools_web_client_id": "27t5sff4nkdherp6bkge20f9e2",     // CognitoClientID
  "api_base_url": "https://yzms6pewqj.execute-api.eu-west-1.amazonaws.com/prod",                                     // RecipeFunctionApi
  "cognito_hosted_domain": "myrecipeappdemo-chef-lambda-webapp.auth.eu-west-1.amazoncognito.com",                   // CognitoDomainName
  "redirect_url": "https://master.d1eak4r8g1jfjf.amplifyapp.com"                                      // AmplifyURL
};

export default config;
