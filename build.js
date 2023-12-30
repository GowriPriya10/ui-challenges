const execSync = require('child_process').execSync;
const fs = require('fs');

const projects = ['todo', 'tic-tac-toe', 'star-rating', 'calculator', 'calendar', 'carousel', 'comment-widget', 'product-catalog-search', 'two-way-data-binding'];

try {
    projects.forEach(project => {
        execSync(`cd ${project} && npm i && npm run build:dev`, {stdio: 'inherit'});
        fs.cpSync(`./${project}/dist`, `./dist/${project}`, {recursive: true});
    })
    execSync('cp index.html dist');
}catch(e) {

}
