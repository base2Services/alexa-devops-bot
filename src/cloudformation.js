// Alexa SDK for JavaScript v1.0.00
// Copyright (c) 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved. Use is subject to license terms.
'use strict';
var AWS = require('aws-sdk'),
    storage = require('./storage');


var cfn = (function () {

  var cloudformation = new AWS.CloudFormation();

  return {
    createStack: function (stackName, session, callback) {
      AWS.config.update({region: 'us-east-1'});

      storage.findStack(stackName,session, function (currentStack) {
        console.log('creating stack with params ' + JSON.stringify(currentStack));
        if(currentStack === undefined) {
          var error = new Error("Unable to find the " + stackName + " stack ");
          callback(error,currentStack);
          return;
        }
        var params = {
          StackName: stackName, /* required */
          Capabilities: [
           'CAPABILITY_IAM',
           /* more items */
          ],
          OnFailure: 'ROLLBACK',
          Parameters: [
           {
             ParameterKey: 'TopicName',
             ParameterValue: 'devopsbot2',
             UsePreviousValue: true
           }
          ],
          TemplateURL: currentStack.s3_url,
          TimeoutInMinutes: 30
        };
        console.log('creating stack with params ' + params);
        cloudformation.createStack(params, callback);

      });

    },
    deleteStack: function (stackName, session, callback) {
      AWS.config.update({region: 'us-east-1'});
      var params = {
        StackName: stackName
      };
      console.log('deleting stack with params ' + JSON.stringify(params));
      cloudformation.deleteStack(params, callback);
    },
    listPossibleStacks: function (session, callback) {
      storage.listStacks(session, function (stacks) {
        var stackNames = [];
        console.log("stacks:" + JSON.stringify(stacks));
        if (stacks) {
          stacks.forEach(function (stack) {
            stackNames.push(stack.StackName.S);
          });
        }
        callback(stackNames);
      });
    }
  };
})();
module.exports = cfn;
