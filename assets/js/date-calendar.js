// date calendars pulldown

mobiscroll.settings = {
  lang: "en", // Specify language like: lang: 'pl' or omit setting to use default
  theme: "ios", // Specify theme like: theme: 'ios' or omit setting to use default
  themeVariant: "light", // More info about themeVariant: https://docs.mobiscroll.com/4-10-3/javascript/calendar#opt-themeVariant
  display: "bubble", // Specify display mode like: display: 'bottom' or omit setting to use default
};

mobiscroll.calendar("#demo-app-date");

mobiscroll.calendar("#demo-app-date-time", {
  controls: ["calendar", "time"], // More info about controls: https://docs.mobiscroll.com/4-10-3/javascript/calendar#opt-controls
});

var now = new Date();
var startDate = new Date("01/01/2020");
mobiscroll.calendar("#startDate", {
  onInit: function (event, inst) {
    inst.setVal(now, true);
  },
});
mobiscroll.calendar("#endDate", {
  onInit: function (event, inst) {
    inst.setVal(now, true);
  },
});
mobiscroll.calendar("#startDateTable", {
  onInit: function (event, inst) {
    inst.setVal(startDate, true);
  },
});
mobiscroll.calendar("#endDateTable", {
  onInit: function (event, inst) {
    inst.setVal(now, true);
  },
});

var instance = mobiscroll.calendar("#demo-app-date-external", {
  showOnTap: false, // More info about showOnTap: https://docs.mobiscroll.com/4-10-3/javascript/calendar#opt-showOnTap
  showOnFocus: false, // More info about showOnFocus: https://docs.mobiscroll.com/4-10-3/javascript/calendar#opt-showOnFocus
  controls: ["calendar", "time"], // More info about controls: https://docs.mobiscroll.com/4-10-3/javascript/calendar#opt-controls
  onInit: function (event, inst) {
    // More info about onInit: https://docs.mobiscroll.com/4-10-3/javascript/calendar#event-onInit
    inst.setVal(new Date(), true);
  },
});

// document
//     .getElementById('show-demo-app-date-external')
//     .addEventListener('click', function () {
//         instance.show();
//     }, false);
