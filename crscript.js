function getInput() {
  var input = '';
  input += document.getElementById('MyName').value + '--';
  input += document.getElementById('MyBirth').value;
  if (document.getElementById('MyBirthTime').value) {
    input += 'T' + document.getElementById('MyBirthTime').value;
  }
  input += '--';
  input += document.getElementById('TheirName').value + '--';
  input += document.getElementById('TheirBirth').value;
  if (document.getElementById('TheirBirthTime').value) {
    input += 'T' + document.getElementById('TheirBirthTime').value;
  }
  input += '--';
  input += document.getElementById('Meeting').value;
  if (document.getElementById('MeetingTime').value) {
    input += 'T' + document.getElementById('MeetingTime').value;
  }
  return input;
}

function getLink(string) {
  return 'https://whkeof.pionaiki.com/' + btoa(string);
}

function update() {
  document.getElementById('Link').value = getLink(getInput());
}

function copy(object) {
  object.select();
  object.setSelectionRange(0, object.value.length);
  document.execCommand('copy');
  document.getElementById('Link').value = 'Copied!'
  setTimeout(function () { update(); }, 1000);
}

function getTheirName() {
  if (document.getElementById('TheirName').value) {
    return document.getElementById('TheirName').value;
  } else {
    return 'them';
  }
}