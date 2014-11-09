angelikaControllers.controller('HandleAlertCtrl', function($scope, $modalInstance, $http, cfg, alarm, patient) {
  $scope.alarm = alarm;
  $scope.posting = false;
  $scope.motivationalText = {
    text: ''
  };
  $scope.tag = {
    text: ''
  };

  $scope.ok = function() {
    $http.post(
        cfg.apiUrl + "/alarms/" + $scope.alarm.id + "/handle/",
      {
        'alarm': $scope.alarm,
        'motivation_text': $scope.motivationalText
      }
    )
      .success(function(data) {
        $scope.posting = false;
        $modalInstance.close(data);
      })
      .error(function(data) {
        $scope.posting = false;
        alert("Det oppstod en feil under lagring. Prøv igjen senere.");
      });
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };

  $scope.getAlertType = function(typeChar) {
    //TODO: compare value to normal value
    var highOrLow = "lav ";
    var type;
    switch (typeChar) {
      case "O":
        type = "O2-metning";
        break;
      case "P":
        type = "puls";
        break;
      case "T":
        type = "temperatur";
        break;
    }
    return "Unormalt " + highOrLow + type;
  };

  $scope.getNormalValue = function(type, time) {
    //TODO: get old normal value

    return "89% - 100%";
  }
});
