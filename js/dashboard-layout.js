dashboardLayout = new GoldenLayout({
  labels: {
    close: 'Lukk',
    maximise: 'Maksimer',
    minimise: 'Minimer',
    popout: 'Åpne i nytt vindu'
  },
  settings: {
    showPopoutIcon: false,
    showMaximiseIcon: false,
    showCloseIcon: false
  },
  dimensions: {
    minItemWidth: 420,
    minItemHeight: 250,
    dragProxyWidth: 500,
    dragProxyHeight: 360,
    headerHeight: 42
  },
  content: [
    {
      type: 'stack',
      isClosable: false,
      content: [
        {
          type: 'component',
          componentName: 'template',
          title: '<span class="glyphicon glyphicon-bell"></span> <span class="hidden-xs">Varsler</span> <span class="badge alarms-badge"></span>',
          componentState: { template: 'alarms.html', controller: 'AlarmsCtrl' },
          isClosable: false
        },
        {
          type: 'component',
          componentName: 'template',
          title: '<span class="glyphicon glyphicon-search"></span> <span class="hidden-xs">Brukere</span>',
          componentState: { template: 'patients.html', controller: 'PatientsCtrl' },
          isClosable: false
        },
        {
          type: 'component',
          componentName: 'template',
          title: '<span class="glyphicon glyphicon-cog"></span> <span class="hidden-xs">Innstillinger</span>',
          componentState: { template: 'settings.html', controller: 'SettingsCtrl' },
          isClosable: false
        }
      ]
    }
  ]
});

dashboardLayout.registerComponent('template', function(container, state) {
  if (typeof state.template !== 'string') {
    console.error('state.template must be specified and must be a string');
  }
  if (typeof state.controller !== 'string') {
    console.error('state.controller must be specified and must be a string');
  }

  var templateHtml = $('<div class="component"></div>')
    .attr('ng-include', "'templates/" + state.template + "'")
    .attr('ng-controller', state.controller);
  if (state.padding) {
    templateHtml.addClass('medium-padding');
  }
  if (state.patientId) {
    templateHtml.attr('ng-init', 'patientId = ' + state.patientId + '; init()')
      .attr('data-patient-id', state.patientId);

    container._config.tooltip = container._config.title;
    if (container._config.title.indexOf('<span class="glyphicon glyphicon-user"></span>') === -1) {
      container.setTitle(
          '<span class="glyphicon glyphicon-user"></span> ' + getResponsiveName(container._config.title)
      );
    }
    container.on('resize', function() {
      if (container.width > 0 && container.height > 0) {
        var $container = $(container.getElement());
        if (container.width >= 992) {
          $container.removeClass('container-xs').removeClass('container-sm');
        } else if (container.width >= 768) {
          $container.removeClass('container-xs').addClass('container-sm');
        } else {
          $container.removeClass('container-sm').addClass('container-xs');
        }
        dashboardLayout.emit('resizePatient' + state.patientId, container.width, container.height);
      }
    });
  }

  container.getElement().html(templateHtml);
});

dashboardLayout.on('initialised', function() {
  angular.bootstrap(document.body, ['angelika']);
});

dashboardLayout.init();

dashboardLayout.getPatientParentComponent = function() {
  return dashboardLayout.root.contentItems[0];
};

function getResponsiveName(name) {
  var arr = name.split(" ");
  if (arr.length === 1) {
    return name;
  }
  var strippedName = "";
  for (var i = 0; i < arr.length - 1; i++) {
    strippedName += arr[i].charAt(0) + ". ";
  }
  strippedName += arr[arr.length - 1];
  return '<span class="hidden-md hidden-lg">' + strippedName + '</span>'
    + '<span class="hidden-xs hidden-sm">' + name + '</span>';
}

dashboardLayout.on('tabCreated', function(tab) {
  if (tab.contentItem.config.tooltip) {
    tab.element.attr('title', tab.contentItem.config.tooltip);
  }
});
