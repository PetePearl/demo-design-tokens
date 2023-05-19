// import fetch from 'node-fetch';
import fs from 'fs';
import { exec } from 'child_process';
import StyleDictionary from 'style-dictionary';


const projectPath = process.env.GITLAB_PROJECT_PATH;
//const tokenName = 'tokens%2Ejson'; // символ "." меняем на %2E
//const tokenUrl = `https://gitlab.com/api/v4/projects/${projectPath}/repository/files/${tokenName}?ref=main`;
const tokensBuildDir = './tokens';
const baseTokenName = 'tokens.json';
const cssBuildPath = 'src/tokens/';

// Создаем папку tokens если она не создана
//if (!fs.existsSync(tokensBuildDir)) {
//  fs.mkdirSync(tokensBuildDir);
//}

// Загружаем файл токена из gitHub
// async function getToken() {
//   const res = await fetch(tokenUrl, {
//     method: 'GET',
//     headers: {
//       "PRIVATE-TOKEN": process.env.GITLAB_ACCESS_KEY,
//     }
//   });
//   return await res.json();
// }

//const response = await getToken();
//const token = JSON.parse(Buffer.from(response.content, "base64").toString());

// Сохраняем base-token в файл
//fs.writeFileSync(`${tokensBuildDir}/${baseTokenName}`, JSON.stringify(token, null, 2));


const token = JSON.parse(fs.readFileSync(`${tokensBuildDir}/${baseTokenName}`));
// Создаем css файлы
buildTokensAndCss(token.$metadata.tokenSetOrder);

/**
 * @description
 * Создает набор .json файлов для каждого токена
 * Создает .css файл из каждого .json файла токена
 * @param files: string[]
 */
function buildTokensAndCss(files) {
  for (let filename of files) {
    buildToken(filename, () => { buildCss(filename) });
  }
}

/**
 * @description
 * Создает файл .json для токена и вызывает callback после создания файла
 * токен достается из baseToken с помощью библиотеки token-transformer
 * p.s. у token-transformer есть только cli версия, поэтому пришлось юзать exec
 * @param filename
 * @param callback
 */
function buildToken(filename, callback) {
  exec(
    //`node node_modules/token-transformer ${tokensBuildDir}/${baseTokenName} ${tokensBuildDir}/${filename}.json ${filename}`,
    `node node_modules/token-transformer ${tokensBuildDir}/${baseTokenName} ${tokensBuildDir}/${filename}.json ${filename} --expandTypography=true`,
    callback
  );
}

/**
 * @description Создает файл .css из файла токена
 * @param filename
 */
function buildCss(filename) {
  StyleDictionary
    .extend({
      'source': [`${tokensBuildDir}/${filename}.json`],
      'platforms': {
        'css': {
          'transformGroup': `css`,
          'buildPath': cssBuildPath,
          'files': [{
            'destination': `${filename}.css`,
            'format': `css/variables`
          }]
        },
      }
    })
    .buildAllPlatforms();
}
