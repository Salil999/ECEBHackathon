// Dependencies 
var UI = require('ui');
var ajax = require('ajax');

// Initially clear the data - this is purely for demo purposes

ajax({
    url: 'http://homeproj.cfapps.io/data',
    type: 'json',
    method: 'delete',
    async: false
});

function capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var rooms = new UI.Menu({}); // UI Menu object that will contain list of rooms
var initCard = new UI.Card({});

initCard.title('       Status');
initCard.body('\n        Windows Shut\n             No Flood\n            No Smoke\n        Garage Closed');

var powerStatus;
var smokeStatus;
var waterPowerStatus;
var floodStatus;
var carAtHome;
var garageStatus;
var garagePower;
var bathLeak;

// List of Rooms in Home
var roomsItems = {
    title: '         Rooms in House',
    items: [{
        title: 'Living Room'
    }, {
        title: 'Bedroom'
    }, {
        title: 'Bathroom'
    }, {
        title: 'Basement'
    }, {
        title: 'Garage'
    }]
};

initCard.show();
initCard.on('click', 'select', function() {
    rooms.section(0, roomsItems);
    rooms.show();
});

// Tell benson to post a request

rooms.on('select', function(e) {
    if (e.item.title === 'Living Room') {
        ajax({
                url: 'http://homeproj.cfapps.io/data',
                type: 'json',
                method: 'get',
                async: false
            },
            function(aSix) {
                var sensorsMenu = new UI.Menu({});
                var sensorItems = {
                    title: '            ' + e.item.title,
                    items: [{
                        title: 'Window A',
                        subtitle: capFirstLetter(aSix[0].data.data.homeWindowOpen.windowA)
                    }, {
                        title: 'Window B',
                        subtitle: capFirstLetter(aSix[0].data.data.homeWindowOpen.windowB)
                    }, {
                        title: 'Window C',
                        subtitle: capFirstLetter(aSix[0].data.data.homeWindowOpen.windowC)
                    }]
                };

                sensorsMenu.section(0, sensorItems);
                sensorsMenu.show();
            },
            function(error) {
                console.log('Something happened!');
            });
    } else if (e.item.title === 'Bedroom') {
        ajax({
                url: 'http://homeproj.cfapps.io/data',
                type: 'json',
                method: 'get',
                async: false
            },
            function(aSix) {
                var sensorsMenu = new UI.Menu({});
                var sensorItems = {
                    title: '              ' + e.item.title,
                    items: [{
                        title: 'Window A',
                        subtitle: capFirstLetter(aSix[0].data.data.homeWindowOpen.windowA)
                    }, {
                        title: 'Window B',
                        subtitle: capFirstLetter(aSix[0].data.data.homeWindowOpen.windowB)
                    }, {
                        title: 'Window C',
                        subtitle: capFirstLetter(aSix[0].data.data.homeWindowOpen.windowC)
                    }]
                };

                sensorsMenu.section(0, sensorItems);
                sensorsMenu.show();
            },
            function(error) {
                console.log('Something happened!');
            });
    } else if (e.item.title === 'Basement') {
        ajax({
                url: 'http://homeproj.cfapps.io/data',
                type: 'json',
                method: 'get',
                async: false
            },
            function(aSix) {
                var sensorsMenu = new UI.Menu({});
                var sensorItems = {
                    title: '              ' + e.item.title,
                    items: [{
                        title: 'Smoke Alarm'
                    }, {
                        title: 'Flood Detect'
                    }]
                };

                // Checks the status of the smoke alarm
                if (aSix[0].data.data.homeSmokeAlarmOn.power === 'true') {
                    powerStatus = 'Online';
                } else {
                    powerStatus = 'Offline';
                }
                // Checks area of smoke
                if (aSix[0].data.data.homeSmokeAlarmOn.smoke === 'true') {
                    smokeStatus = 'Smoke Detected';
                } else {
                    smokeStatus = 'Area Clear';
                }

                if (aSix[0].data.data.homeWaterSensorAlarmOn.power === 'true') {
                    waterPowerStatus = 'Online';
                } else {
                    waterPowerStatus = 'Offline';
                }

                if (aSix[0].data.data.homeWaterSensorAlarmOn.flood === 'true') {
                    floodStatus = 'Water Detected';
                } else {
                    floodStatus = 'No Water Detected';
                }

                sensorsMenu.section(0, sensorItems);
                sensorsMenu.show();

                sensorsMenu.on('select', function(e) {
                    if (e.item.title === 'Smoke Alarm') {
                        var basementMenu = new UI.Menu({});
                        var basementItems = {
                            title: '           ' + e.item.title,
                            items: [{
                                title: 'Power',
                                subtitle: powerStatus + ' - ' + aSix[0].data.data.homeSmokeAlarmOn.battery + '%'
                            }, {
                                title: 'Smoke',
                                subtitle: smokeStatus
                            }]
                        };
                        basementMenu.section(0, basementItems);
                        basementMenu.show();
                    } else if (e.item.title === 'Flood Detect') {
                        var floodMenu = new UI.Menu({});
                        var floodItems = {
                            title: '           ' + e.item.title,
                            items: [{
                                title: 'Power',
                                subtitle: waterPowerStatus
                            }, {
                                title: 'Water',
                                subtitle: floodStatus
                            }]
                        };
                        floodMenu.section(0, floodItems);
                        floodMenu.show();
                    }
                });

            },
            function(error) {
                console.log('Something happened!');
            });
    } else if (e.item.title === 'Garage') {
        ajax({
                url: 'http://homeproj.cfapps.io/data',
                type: 'json',
                method: 'get',
                async: false
            },
            function(aSix) {
                if (aSix[0].data.data.tripSummaryUpload.vehicle === 'true') {
                    carAtHome = 'Your car is at home';
                } else {
                    carAtHome = 'Your car is not at home';
                }

                if (aSix[0].data.data.homeGarageOpen.open === 'true') {
                    garageStatus = 'Your garage is open';
                } else {
                    garageStatus = 'Your garage is closed';
                }

                if (aSix[0].data.data.homeGarageOpen.power === 'true') {
                    garagePower = 'Your garage is working';
                } else {
                    garagePower = 'Your garage is not working';
                }
                var garageMenu = new UI.Menu({});
                var garageItems = {
                    title: '              ' + e.item.title,
                    items: [{
                        title: 'Car At Home',
                        subtitle: carAtHome
                    }, {
                        title: 'Garage Status',
                        subtitle: garageStatus
                    }, {
                        title: 'Garage Power',
                        subtitle: garagePower
                    }]
                };

                garageMenu.section(0, garageItems);
                garageMenu.show();
            },
            function(error) {
                console.log('Something happened!');
            });
    } else if (e.item.title === 'Bathroom') {
        ajax({
                url: 'http://homeproj.cfapps.io/data',
                type: 'json',
                method: 'get',
                async: false
            },
            function(aSix) {
                if (aSix[0].data.data.homeWaterSensorAlarmOn.flood === 'true') {
                    bathLeak = 'Possible leak in bathroom';
                } else {
                    bathLeak = 'No leak detected';
                }
                var bathMenu = new UI.Menu({});
                var bathItems = {
                    title: '              ' + e.item.title,
                    items: [{
                        title: 'Bathroom Leak',
                        subtitle: bathLeak
                    }]
                };
                bathMenu.section(0, bathItems);
                bathMenu.show();
            },
            function(error) {
                console.log('Something happened!');
            });
    } else {
        console.log('Something happened');
    }
});