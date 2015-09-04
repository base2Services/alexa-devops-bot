// Alexa SDK for JavaScript v1.0.00
// Copyright (c) 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved. Use is subject to license terms.
'use strict';
var AWS = require("aws-sdk");

var storage = (function () {
    var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

    /*
     * The Stack class stores what params need to create a cloudformation stack
     */
    function Stack(session, stackName, data) {
        if (data) {
            this.data = data;
        } else {
            this.data = {
                s3_url: undefined,
                params: {}
            };
        }
        this.stackName = stackName;
        this._session = session;
    }

    return {

      findStack: function (stackName, session, callback) {
        var params = {
          TableName : 'Base2Stacks',
          Key : {
            StackName : {
              'S' : stackName
            }
          }
        };
        dynamodb.getItem(params, function (err, data) {
          var currentStack;
          if (err) {
            console.log(err, err.stack);
            currentStack = new Stack(session, stackName);
            session.attributes.currentStack = currentStack.data;
            callback(currentStack);
          } else if (data.Item === undefined) {
              console.log('no stack found for ' + stackName);
              callback(undefined);
          }
          else {
            console.log('get stack from dynamodb=' + data.Item.Data.S);
            currentStack = new Stack(session, stackName, JSON.parse(data.Item.Data.S));
            session.attributes.currentStack = currentStack.data;
            callback(currentStack.data);
          }
        });
      },

      listStacks: function (session, callback) {
        var params = {
          TableName : 'Base2Stacks',
          Limit : 5
        };
        dynamodb.scan(params,function (err, data) {
          if (err) {
            console.log(err, err.stack);
            callback(undefined);
            return;
          }
          console.log(data.id);
          callback(data.Items);
        });
      }

    };
})();
module.exports = storage;
