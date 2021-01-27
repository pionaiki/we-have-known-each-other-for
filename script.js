window.history.replaceState({}, document.title, `/id/${urlParams.get('id')}`);
var data, idString, errors = [];

if (urlParams.get('id')) {
  getData();
  setData();
  checkData();
} else {
  location = '/create.html';
}

function getData() {
  try {
    idString = atob(urlParams.get('id')).split('--');
  } catch (err) {
    errors[errors.length] = `Unable to parse ID String: '${err}'`;
    alertErrors();
  }
}

function setData() {
  try {
    data = {
      'me': {
        'name': atob(idString[0]),
        'birth': new Date(idString[1])
      },
      'you': {
        'name': atob(idString[2]),
        'birth': new Date(idString[3]),
        'meeting': new Date(idString[4]),
      }
    };
  } catch (err) {
    errors[errors.length] = `Unable to set the data object: '${err}'`;
    alertErrors();
  }
}

function checkData() {
  if (!data.me.name) {
    errors[errors.length] = 'data.me.name does not exist';
  }
  if (!data.me.birth.getTime()) {
    errors[errors.length] = 'data.me.birth is not a correct Date';
  }
  if (!data.you.name) {
    errors[errors.length] = 'data.you.name does not exist';
  }
  if (!data.you.birth.getTime()) {
    errors[errors.length] = 'data.you.birth is not a correct Date';
  }
  if (!data.you.meeting.getTime()) {
    errors[errors.length] = 'data.meeting.birth is not a correct Date';
  }
  alertErrors();
}

function alertErrors() {
  if (errors.length) {
    alert(`Your link contains errors.\nIf you created the link, and don't know why it isn't working, feel free to message the developer:\nhttps://pionaiki.com/#contact\n\nErrors:\n${listErrors(errors)}\n`);
    location = '/create.html';
  }
}

function listErrors(errors) {
  if (!errors.length) {
    return 'UNKNOWN ERRORS\n';
  } else {
    var list = `[Param String]: ${urlParams.get('id')}\n`;
    for (var i = 0; i < errors.length; i++) {
      list += `[ERROR - ${i}]: ${errors[i]} \n`;
    }
    return list;
  }
}

function updateNames() {
  document.getElementById('MyName').textContent = data.me.name;
  document.getElementById('YourName').textContent = data.you.name;
}

function update() {
  document.getElementById('YouMe').textContent = getPercentage('YouMe').toFixed(10);
  document.getElementById('MeYou').textContent = getPercentage('MeYou').toFixed(10);
}

function getPercentage(type) {
  var nominator, denominator;
  var now = Date.now();
  if (type == 'YouMe') {
    nominator = Math.abs(now - data.you.meeting.getTime());
    denominator = Math.abs(now - data.you.birth.getTime());
  } else if (type == 'MeYou') {
    nominator = Math.abs(now - data.you.meeting.getTime());
    denominator = Math.abs(now - data.me.birth.getTime());
  } else {
    console.error(`getPercentage(${type}): '${type}' is an incorrect argument.`);
  }
  return 100 * nominator / denominator;
}