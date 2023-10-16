const fs = require("fs");

const data = Object.fromEntries(['ar', 'en', 'he', 'ru'].map(lang => [lang, require(`../raw_history/GetAlarmsHistory_${lang}.json`)]));
const history = { cities: {}, categories: {} };
data.he.forEach((el, idx) => {
    if (history.cities[el.data] == null) {
        history.cities[el.data] = [];
    }
    history.cities[el.data].push({
        id: el.rid,
        date: el.alertDate,
        cat: el.category,
    })
    if (history.categories[el.category] == null) {
        history.categories[el.category] = Object.fromEntries(['ar', 'en', 'he', 'ru'].map(lang => [lang, data[lang][idx].category_desc]))
    }
});

fs.writeFileSync('./data/history.json', JSON.stringify(history))