angelikaControllers.controller('AlarmsCtrl', function($scope, $http, $timeout, cfg, AlarmHelper, LayoutUtils) {
  $scope.alarms = [];
  $scope.alerts = [];
  $scope.measurementType = AlarmHelper.measurementType;

  $scope.playNotifySound = function() {
    createjs.Sound.play("notify");
  };

  var connectionLost = false;
  var oldAlerts = [];

  function tick() {
    $http.get(cfg.apiUrl + "/alarms/")
      .success(function(data) {
        $scope.popAlert();
        if (connectionLost) {
          $scope.addAlert("server-connection-reestablished");
          connectionLost = false;
        }

        if ($scope.assessNewAlert(data.results, oldAlerts)) {
          $scope.playNotifySound();
        }

        $scope.alarms = data.results;
        oldAlerts  = $scope.alarms;
        $timeout(tick, 5000);
      })
      .error(function(data, status, headers, config) {
        connectionLost = true;
        $scope.addAlert("server-connection-lost");
        console.error(data, status, headers, config);
        $timeout(tick, 20000);
      });
  }
  tick();

  $scope.openPatient = function(patient) {
    LayoutUtils.openPatient(patient);
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.addAlert = function(alertType) {
    $scope.alerts.pop();
    switch(alertType) {
      case "server-connection-lost":
        $scope.alerts.push({ type: 'danger', msg: 'Kommunikasjon med server feilet, nye alarmer vil ikke vises.'});
        break;
      case "server-connection-reestablished":
        $scope.alerts.push({ type: 'success', msg: 'Kommunikasjon med server gjenopprettet, nye alarmer vil vises.'});
        break;
    }
  };

  $scope.popAlert = function() {
    $scope.alerts.pop();
  };

  $scope.assessNewAlert = function(newAlerts, oldAlerts) {
    if (oldAlerts == []) {
      return false;
    }
    return (newAlerts.length > oldAlerts.length);
  }
});
