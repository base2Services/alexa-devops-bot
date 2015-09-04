// Alexa SDK for JavaScript v1.0.00
// Copyright (c) 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved. Use is subject to license terms.
'use strict';

var registerEventHandlers = function (eventHandlers, skillContext) {
    eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
        //if user said a one shot command that triggered an intent event,
        //it will start a new session, and then we should avoid speaking too many words.
        skillContext.needMoreHelp = false;
    };

    eventHandlers.onLaunch = function (launchRequest, session, response) {
      console.log("base2DevOps onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
      var speechOutput = "Welcome to the base two, devops bot! I do DevOps stuff";
      response.ask(speechOutput);
    };
};

exports.register = registerEventHandlers;
