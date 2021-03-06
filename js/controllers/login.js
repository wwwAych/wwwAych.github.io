angelikaControllers.controller('LoginCtrl', function($scope, AuthService) {
  $scope.loginFailed = false;
  $scope.loginData = {
    username: "",
    password: ""
  };
  $scope.posting = false;

  $scope.login = function() {
    $scope.posting = true;
    AuthService.login($scope.loginData.username, $scope.loginData.password, function(data) {
      if (data.status === "success") {
        if ('patients' === data.group) {
          window.location.href = 'user-dashboard.html';
        } else if ('health-professionals' === data.group) {
          window.location.href = 'dashboard.html';
        }
      } else if (data.status === 'wrongCredentials') {
        $scope.loginFailed = true;
        $scope.serverError = false;
      } else {
        $scope.loginFailed = false;
        $scope.serverError = true;
      }
      $scope.posting = false;
    });
  };
});
