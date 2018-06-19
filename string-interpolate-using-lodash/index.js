const { template } = require('lodash');
const { readFileSync, writeFileSync } = require('fs');

const templateData = {
  title: 'First try',
  icon:
    'https://cdn4.iconfinder.com/data/icons/materia-flat-social-free/24/038_026_share_link_friends_android_material-512.png',
  facts: ['I am 22', 'trying out templating from lodash', 'love node.js']
};

const templateHtml = readFileSync('./index.template.html');
const html = template(templateHtml)(templateData);

writeFileSync('./index.html', html);
