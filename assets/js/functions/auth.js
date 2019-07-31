$.ajax({
  url: 'http://localhost:3333/api/attendance',
  contentType: 'application/json',
  crossOrigin: true,
  crossDomain: true,
  type: 'GET',
  success(data) {
    console.log(data);
  }
});
