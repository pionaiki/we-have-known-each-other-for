const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var data, idString;

if (urlParams.get('id')) {
  idString = atob(urlParams.get('id')).split('--');
  setData();
  if (checkData().length) {
    alert(`Your link contains errors:\n\n${listErrors(checkData())}\nIf you created the link, and don't know why it isn't working, feel free to message the developer:\nhttps://pionaiki.com/#contact`);
    location = '/create.html';
  }
} else {
  location = '/create.html';
}

function setData() {
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
}

function checkData() {
  var errors = [];
  if (!data.me.name) {
    errors[errors.length] = 'data.me.name could not be parsed / does not exist';
  }
  if (!data.me.birth.getTime()) {
    errors[errors.length] = 'data.me.birth is not a correct Date';
  }
  if (!data.you.name) {
    errors[errors.length] = 'data.you.name could not be parsed / does not exist';
  }
  if (!data.you.birth.getTime()) {
    errors[errors.length] = 'data.you.birth is not a correct Date';
  }
  if (!data.you.meeting.getTime()) {
    errors[errors.length] = 'data.meeting.birth is not a correct Date';
  }
  return errors;
}

function listErrors(errors) {
  if (!errors.length) {
    return 'UNKNOWN ERRORS';
  } else {
    var list = '';
    for (var i = 0; i < errors.length; i++) {
      list += `[ERROR-${i}]: ${errors[i]}\n`;
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
  if (type == 'YouMe') {
    nominator = Math.abs(Date.now() - data.you.meeting.getTime());
    denominator = Math.abs(Date.now() - data.you.birth.getTime());
  } else if (type == 'MeYou') {
    nominator = Math.abs(Date.now() - data.you.meeting.getTime());
    denominator = Math.abs(Date.now() - data.me.birth.getTime());
  } else {
    console.error(`getPercentage(${type}): '${type}' is an incorrect argument.`);
  }
  return 100 * nominator / denominator;
}