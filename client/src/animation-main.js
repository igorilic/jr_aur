import config from './authConfig';
import { MaterialValidationViewStrategy } from './myViewStrategy';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-materialize-bridge', bridge => {
      bridge.useAll()
    })
    .plugin('tkhyn/aurelia-flux')
    .plugin('aurelia-auth', (baseConfig)=>{   //the name of plugin becomes 'paulvanbladel/aurelia-auth'
    	baseConfig.configure(config);
    })
    .feature('resources')        // install application resources such as value-converters and custom html attributes.
    .plugin('aurelia-breeze')  // install the aurelia-breeze integration plugin.
    .plugin('aurelia-animator-css')
    //.plugin('aurelia-kendoui-bridge', (kendo) => kendo.pro())
    .plugin('aurelia-validation',config=>
      {
        config.useLocale('en-US');
        config.useViewStrategy(new MaterialValidationViewStrategy());
      });

    //aurelia.use.globalResources('shared/collapse-panel');
    //aurelia.use.globalResources('shared/markdown');
    //aurelia.use.globalResources('shared/logger');
    //aurelia.use.globalResources('shared/au-code');
    //aurelia.use.globalResources('shared/sampleValueConverters');

    //
    //aurelia.use.plugin("aurelia-ui-toolkits/aurelia-materialize-plugin");
    aurelia.start().then(a => a.setRoot('app', document.body));
}
