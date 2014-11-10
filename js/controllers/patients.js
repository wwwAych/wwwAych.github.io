angelikaControllers.controller('PatientsCtrl', function($scope, $http, cfg, AuthService, LayoutUtils) {
  $scope.patients = [];
  $scope.serverError = false;
  $scope.loadingPatients = true;

  $http.get(cfg.apiUrl + "/patients/")
    .success(function(data) {
      $scope.patients = data.results;
      $scope.loadingPatients = false;
    })
    .error(function(data, status, headers, config) {
      $scope.serverError = true;
      $scope.loadingPatients = false;
    });

  $scope.openPatient = function(patient) {
    LayoutUtils.openPatient(patient);
  };

});
