# base2Services Alexa DevOps BOT

AWS Lambda code Alexa Skills Kit config for the base2Services DevOps BOT

## Launching the App

    Alexa, run base2 DevOps

## Cloudformation Skills

* List available stacks
    ```bash
    Alexa, ask base2 DevOps what stacks can I create
    #Will respond with list of cloudformation they have been configured in dynamodb
    ```    

* Creating a stack
    ```bash
    Alexa, ask base2 DevOps to create stack <stack-name>
    #Will respond with creating cloudformation stack
    ```

* Deleting a stack
    ```bash
    Alexa, ask base2 DevOps to delete stack <stack-name>
    #Will respond with deleting cloudformation stack
    ```
