[![Build Status](https://travis-ci.org/dverbovyi/angular-heremaps.svg?branch=master)](https://travis-ci.org/dverbovyi/angular-heremaps)

# angular-heremaps
Angular directive for working with Nokia HereMaps

### Install guide:

    npm isntall angular-heremaps

#####include angular-heremaps file

```html
    <script src="/node_modules/angular-heremaps/dist/angular-heremaps.js" type="text/javascript"></script>
```
    
#####add dependency in your angular-module

```javascript 
    angular.module('exampleModule', ['heremaps'])
```
        
#####add config provider:
Before, you should register [here](https://developer.here.com/) and take your app credentials:

```javascript
    angular.module('exampleModule')
        .config(["HereMapsConfigProvider", function(HereMapsConfigProvider) {
            HereMapsConfigProvider.setOptions({
                'app_id': 'wMHJuLgCQzkfbhzXIwRF',
                'app_code': 'WLIc7QzoO8irv7lurUt1qA',
                'useHTTPS': true
            });
        }]);
```

### Documentation

See [Wiki Page](https://github.com/dverbovyi/angular-heremaps/wiki)
