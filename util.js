function sendMessage(comment) {
  var request = new XMLHttpRequest();
  request.open('POST', 'https://discord.com/api/webhooks/804004480089325578/HKzwR1Np63ou6s4kEW62jvFkjNMGDcQUZGc-bgxSXVzZyKmZEQnYgSKZQR24vpEjAJ0M');
  request.setRequestHeader('Content-type', 'application/json');
  var cookie = checkCookie();
  var params = {
    'username': sessionStorage.getItem('session'),
    'content': `\`\`\`js\nDate: ${cookie}\nURL: ${checkURL()}\nComment: ${comment}\`\`\``
  }
  request.send(JSON.stringify(params));
}

function checkURL() {
  if (window.location.pathname.includes('id')) {
    return 'ID'
  } else if (window.location.pathname.includes('create')) {
    return 'CREATE'
  } else {
    return 'OTHER'
  }
}

function checkCookie() {
  if (document.cookie.includes('last_visited')) {
    if (sessionStorage.getItem('session')) {
      return 'session'
    } else {
      var delta = Date.now() - document.cookie.split('--')[1];
      sessionStorage.setItem('session', (Math.random() * (1000 - 1) + 1).toFixed(0));
      document.cookie = `last_visited=--${Date.now()}--; samesite=strict; max-age=31536000`;
      return delta;
    }
  } else {
    document.cookie = `last_visited=--${Date.now()}--; samesite=strict; max-age=31536000`;
    return 'new_user'
  }
}