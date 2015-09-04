// Alexa SDK for JavaScript v1.0.00
// Copyright (c) 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved. Use is subject to license terms.
'use strict';
var cfn = require('./cloudformation');

var registerIntentHandlers = function (intentHandlers, skillContext) {

  intentHandlers.HelpIntent = function (intent, session, response) {
    response.ask("I can do DevOps Stuff");
  };

  intentHandlers.HelloWorldIntent = function (intent, session, response) {
    response.tellWithCard("base two DevOps!", "base2", "base2 DevOps!");
  };

  intentHandlers.CreateStackIntent = function (intent, session, response) {
    var stackName = intent.slots.stack.value;
    console.log("slots:" + JSON.stringify(intent.slots));
    cfn.createStack(stackName,session,function (err, data) {
      if (err) {
        var speechOutput = "Error creating cloudformation stack " + stackName;
        response.tellWithCard(speechOutput, "base2", speechOutput + err);
      } else {
        var speechOutput = "Creating cloudformation stack " + stackName + "  for you";
        response.tellWithCard(speechOutput, "base2", speechOutput + data);
      }
    });
  };

  intentHandlers.DeleteStackIntent = function (intent, session, response) {
    var stackName = intent.slots.stack.value;
    console.log("intent:" + JSON.stringify(intent));
    cfn.deleteStack(stackName,session,function (err, data) {
      if (err) {
        var speechOutput = "Error deleting cloudformation stack " + stackName;
        response.tellWithCard(speechOutput, "base2", speechOutput + err);
      } else {
        var speechOutput = "Deleting cloudformation stack " + stackName + "  for you";
        response.tellWithCard(speechOutput, "base2", speechOutput + data);
      }
    });
  };

  intentHandlers.ListPossibleStacksIntent = function (intent, session, response) {
    console.log("intent:" + JSON.stringify(intent));
    cfn.listPossibleStacks(session,function (data) {
      console.log("data " + data);
      if(data && data.length > 0) {
        var stacks = data.join(" or ");
        var speechOutput = "You can create the following cloudformation stacks: " + stacks;
        response.tellWithCard(speechOutput, "base2", speechOutput + data);
      } else {
        var speechOutput = "No cloudformation stacks to create please add some to dyanmodb";
        response.tellWithCard(speechOutput, "base2", speechOutput + data);
      }
    });
  };

};
exports.register = registerIntentHandlers;
