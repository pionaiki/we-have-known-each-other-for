function getInput() {
  var input = '';
  input += document.getElementById('MyName').value + '--';
  input += document.getElementById('MyBirth').value + '--';
  input += document.getElementById('TheirName').value + '--';
  input += document.getElementById('TheirBirth').value + '--';
  input += document.getElementById('Meeting').value;
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
}