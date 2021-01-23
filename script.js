const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var data, idString;

if (urlParams.get('id')) {
  idString = atob(urlParams.get('id')).split('--');
  setData();
} else {
  location = '/create.html'
}

function setData() {
  data = {
    'me': {
      'name': idString[0],
      'birth': new Date(idString[1])
    },
    'you': {
      'name': idString[2],
      'birth': new Date(idString[3]),
      'meeting': new Date(idString[4]),
    }
  };
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