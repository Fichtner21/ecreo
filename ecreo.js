var sass = require('node-sass');
var fs = require('fs');
var autoprefixer = require('autoprefixer');
var postcss = require('postcss');
var nano = require('cssnano');

function rebuild(color){
    try {
        style = sass.renderSync({
            data: "@import 'C:/xampp/htdocs/ecreo/styles/style.scss';"
        });

        postcss([autoprefixer]).use(nano()).process(style.css.toString()).then(function (result) {
            result.warnings().forEach(function (warn) {
                console.warn(warn.toString());
            });
            fs.writeFileSync("C:/xampp/htdocs/ecreo/styles/style.css", result.css);
        });

        console.log("rebuild ");
    } catch (e) {
        console.log(e);
    }
}

rebuild("main");

fs.watch('C:/xampp/htdocs/ecreo/styles/style.scss', {encoding: 'buffer'}, (eventType, filename) => {
    rebuild("main_ecreo");
});
