'use strict';

window.app = angular.module('LikerApp', []);
app.controller('LandingController', function ($scope) {
  console.log('landing ctrl works');
  chrome.cookies.getAll({
    domain: "instagram.com"
  }, function (cookies) {
    console.log('COOKIES HERE: ', cookies);
  });
  chrome.storage.local.get(null, function (result) {
    console.log("CHANELS: ", result);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxhbmRpbmcvbGFuZGluZy5jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsImFwcCIsImFuZ3VsYXIiLCJtb2R1bGUiLCJjb250cm9sbGVyIiwiJHNjb3BlIiwiY29uc29sZSIsImxvZyIsImNocm9tZSIsImNvb2tpZXMiLCJnZXRBbGwiLCJkb21haW4iLCJzdG9yYWdlIiwibG9jYWwiLCJnZXQiLCJyZXN1bHQiXSwibWFwcGluZ3MiOiJBQUFBOztBQUNBQSxNQUFBLENBQUFDLEdBQUEsR0FBQUMsT0FBQSxDQUFBQyxNQUFBLENBQUEsVUFBQSxFQUFBLEVBQUEsQ0FBQTtBQ0RBRixHQUFBLENBQUFHLFVBQUEsQ0FBQSxtQkFBQSxFQUFBLFVBQUFDLE1BQUEsRUFBQTtBQUNBQyxFQUFBQSxPQUFBLENBQUFDLEdBQUEsQ0FBQSxvQkFBQTtBQUNBQyxFQUFBQSxNQUFBLENBQUFDLE9BQUEsQ0FBQUMsTUFBQSxDQUFBO0FBQUFDLElBQUFBLE1BQUEsRUFBQTtBQUFBLEdBQUEsRUFBQSxVQUFBRixPQUFBLEVBQUE7QUFDQUgsSUFBQUEsT0FBQSxDQUFBQyxHQUFBLENBQUEsZ0JBQUEsRUFBQUUsT0FBQTtBQUNBLEdBRkE7QUFJQUQsRUFBQUEsTUFBQSxDQUFBSSxPQUFBLENBQUFDLEtBQUEsQ0FBQUMsR0FBQSxDQUFBLElBQUEsRUFBQSxVQUFBQyxNQUFBLEVBQUE7QUFDQVQsSUFBQUEsT0FBQSxDQUFBQyxHQUFBLENBQUEsV0FBQSxFQUFBUSxNQUFBO0FBQ0EsR0FGQTtBQUdBLENBVEEiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbndpbmRvdy5hcHAgPSBhbmd1bGFyLm1vZHVsZSgnTGlrZXJBcHAnLCBbXSk7XG5cblxuIiwiYXBwLmNvbnRyb2xsZXIoJ0xhbmRpbmdDb250cm9sbGVyJywgZnVuY3Rpb24gKCRzY29wZSkge1xuXHRjb25zb2xlLmxvZygnbGFuZGluZyBjdHJsIHdvcmtzJyk7XG5cdGNocm9tZS5jb29raWVzLmdldEFsbCh7ZG9tYWluOiBcImluc3RhZ3JhbS5jb21cIn0sIGZ1bmN0aW9uKGNvb2tpZXMpIHtcblx0ICBjb25zb2xlLmxvZygnQ09PS0lFUyBIRVJFOiAnLCBjb29raWVzKTtcblx0fSk7XG5cbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQobnVsbCwgZnVuY3Rpb24gKHJlc3VsdCkge1xuXHQgICAgY29uc29sZS5sb2coXCJDSEFORUxTOiBcIiwgcmVzdWx0KTtcbiAgICB9KTtcbn0pO1xuXG5cbiJdfQ==