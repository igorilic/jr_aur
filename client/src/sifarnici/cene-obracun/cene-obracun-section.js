/**
* "shell" za CeneObracun  sekciju aplikacije. Kreira ili listu ili formu
*  za istu.
*/
export class CeneObracunSection {
  configureRouter(config, router) {
    config.map([
      { route: '',    moduleId: './cene-obracun-lista', nav: false, title: '' },
      { route: ':id', moduleId: './cene-obracun',      nav: false,  title: '' },
    ]);
  }
}
