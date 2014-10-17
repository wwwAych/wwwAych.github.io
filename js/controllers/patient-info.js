angelikaControllers.controller('PatientInfoCtrl', function($scope, $http, cfg) {

  $scope.getPatient().then(function(patient) {
    $scope.patient = patient;

    //TODO: Make the API include this in the patient object
    $scope.patient.next_of_kin = [
      {
        name: "Nils Overhaug",
        telephone: 73345544,
        address:"Lillegata 20"
      },
      {
        name: "Lise Overhaug",
        telephone: 92452343,
        address: "Bittelillegata 30"
      }
    ];
  });

  //TODO: get this from the API
  $scope.alarms = [
    {
      time_created: "2014-10-10T06:08:51Z",
      is_treated: false,
      treated_text: ""
    },
    {
      time_created: "2014-10-01T01:49:34Z",
      is_treated: true,
      treated_text: "Hjerteflimmer."
    },
    {
      time_created: "2014-09-22T22:04:07Z",
      is_treated: true,
      treated_text: "Feber."
    },
    {
      time_created: "2014-09-03T10:28:07Z",
      is_treated: true,
      treated_text: "Fall i trapp."
    }
  ];
});
