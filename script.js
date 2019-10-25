var app = new Vue({
    el: '#app',
    data: {
        image: "",
        title: "",
        explanation: "",
        today: new Date(),
        date: moment(new Date()).format("YYYY-MM-DD"),
        start: new Date(new Date().getFullYear(), 0, 1),
    },
    methods: {
        randomImage() {
            getRandomDate();
            this.getJSON();
        },
        getJSON() {
            var myurl = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=" + this.date;
            console.log(myurl);
            fetch(myurl)
                .then(function(response) {
                    return response.json();
                }).then(function(json) {
                    initDisplay(json);
                });
        },
    },
    created() {
        this.getJSON();
    }
});

function initDisplay(json) {
    app.image = json.url;
    app.title = json.title;
    app.explanation = json.explanation;
}

function getRandomDate(){
    var d = new Date(app.start.getTime() + Math.random() * (app.today.getTime() - app.start.getTime()));
    app.date = moment(d).format("YYYY-MM-DD");
}