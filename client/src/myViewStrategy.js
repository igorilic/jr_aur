import {ValidationViewStrategy} from 'aurelia-validation';

export class MaterialValidationViewStrategy extends ValidationViewStrategy {
      _bindingPathAttribute: string;

       constructor() {
             super();
             this._bindingPathAttribute = 'validate-property';
       }

        getValidationProperty(validation: any, element : any) : any  {
               var attributes = element.attributes;
               if (attributes[this._bindingPathAttribute]) {
                     var bindingPath = attributes[this._bindingPathAttribute].value.trim();
                     if (bindingPath.indexOf('|') != -1)
                               bindingPath = bindingPath.split('|')[0].trim();

                     var validationProperty = validation.result.properties[bindingPath];
                     if (validationProperty === null || validationProperty === undefined) {
                             validation.ensure(bindingPath);
                      validationProperty = validation.result.properties[bindingPath];
               }
               return validationProperty;
          }
        }

     prepareElement(validationProperty: any, element: any) {
           this.appendUIVisuals(validationProperty, element);
     }

     updateElement(validationProperty: any, element: any) {
           this.appendUIVisuals(validationProperty, element);
     }

     appendUIVisuals(validationProperty: any, element: Element) {
           if (validationProperty) {
                  switch (element.tagName) {
                    case "MD-INPUT":
                        var input = element.querySelector('input');
                        if (input) {
                          var label = element.querySelector('label');
                          if (validationProperty.isValid) {
                              input.classList.remove('invalid');
                              input.classList.add('valid');

                              if (label) {
                                  label.removeClass('invalid');
                                  label.addClass('valid');
                                  label.removeAttribute('data-error');
                              }
                          } else {
                              input.classList.remove('valid');
                              input.classList.add('invalid');

                              if (label) {
                                  label.classList.remove('valid');
                                  label.classList.add('invalid');
                                  label.setAttribute('data-error', validationProperty.message);
                              }
                          }
                        }
                        break;
                    case "LABEL":
                             if (validationProperty.isValid) {
                                    element.classList.remove('invalid');
                                    element.classList.add('valid');
                                   element.removeAttribute('data-error');
                             } else {
                                    element.classList.remove('valid');
                                    element.classList.add('invalid');
                                    element.setAttribute('data-error', validationProperty.message);
                             }
                             break;
                     case "INPUT":
                             // find label and apply same properties as above
                            var label = $("label[for='" + element.id + "']");
                            if (validationProperty.isValid) {
                                  element.classList.remove('invalid');
                                  element.classList.add('valid');

                             if (label) {
                                     label.removeClass('invalid');
                                     label.addClass('valid');
                                     label.removeAttr('data-error');
                              }
                        } else {
                             element.classList.remove('valid');
                             element.classList.add('invalid');

                             if (label) {
                                    label.removeClass('valid');
                                    label.addClass('invalid');
                                    label.attr('data-error', validationProperty.message);
                             }
                         }
                        break;
                 }
          }
      }
   }
