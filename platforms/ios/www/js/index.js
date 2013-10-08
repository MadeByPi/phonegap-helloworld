/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {

    // Application Constructor
    init: function () {
        document.addEventListener('deviceready', app.onDeviceReady, false);
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function () {

        window.console.log('app startup');
        window.console.log(window.device);
        window.console.log(window.device.version);
        window.console.log(window.device.cordova);

        app.startup('deviceready');

        app.testAccel();

        app.testConnection();
    },


    // Update DOM on a Received Event
    startup: function (id) {

        var parentElement       = document.getElementById(id);
        var listeningElement    = parentElement.querySelector('.listening');
        var receivedElement     = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

    },

    testAccel : function(){
        var
        onAccelSuccess = function (acceleration) {
            console.log('Acceleration X: ' + acceleration.x + '\n' +
                'Acceleration Y: ' + acceleration.y + '\n' +
                'Acceleration Z: ' + acceleration.z + '\n' +
                'Timestamp: ' + acceleration.timestamp + '\n'
            );
        },

        onAccelError = function () {
            console.warn('onAccelError - ' + arguments);
        },

        //navigator.accelerometer.getCurrentAcceleration(onAccelSuccess, onAccelError);
        options = { frequency: 3000 },
        watchID = navigator.accelerometer.watchAcceleration(onAccelSuccess, onAccelError, options);

        // done?
        //navigator.accelerometer.clearWatch(watchID);
    },

    testConnection : function () {
        var networkState = navigator.network.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';

        console.log('Connection type: ' + states[networkState]);
    }
};
