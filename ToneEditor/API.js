// API
define(['./utils','./ToneEditor','./Component', './Keyboard','./Copy'], function(utils, ToneEditor, Component, Keyboard, Copy) {

  ToneEditor.add = function(name, component) {
    if (ToneEditor.initialized === false) ToneEditor.init()

    // PARSE ARGUMENTS
    // check if an object
    if (name !== null && typeof name === 'object' ) {
      // check if name is a Tone object, not a string
      if ( name instanceof Tone) {
        addComponent(name)
      } else { // it's an object of names and components
        for (var key in name) {
          addComponent(name[key], key)
        }
      }
    } else { // it's a name
      addComponent(component, name)
    }

    function addComponent(component, name) {
      if (component instanceof Tone.Instrument || component instanceof Tone.Effect || component instanceof Tone.Player) {
        var name = name || generateName()

        // ADD PARAMETERS TO OBJECT
        var newComponent = new Component( name, component)
        ToneEditor.components.push(newComponent)
        ToneEditor.componentsById[name] = newComponent

        //DRAW ELEMENT TO DOM
        newComponent.draw()

      } else { // UNSUPPORTED TONE OBJECT
        console.log('%cIgnored unsupported Tone object', 'color: DarkOrange', component)
        console.log('%cTone-Editor only supports Tone.Instrument, Tone.Effect, Tone.Player', 'color: DarkOrange')
      }

    }

    function generateName() {
      return 'component-'+ToneEditor.components.length
    }
    return ToneEditor
  }

  ToneEditor.show = function() {
    if (ToneEditor.initialized === false) ToneEditor.init()

    ToneEditor.element.classList.remove('hidden')
    return ToneEditor
  }

  ToneEditor.hide = function() {
    if (ToneEditor.initialized === false) ToneEditor.init()

    ToneEditor.element.classList.add('hidden')
    return ToneEditor
  }

  ToneEditor.keyboard = function() {
    if (ToneEditor.initialized === false) ToneEditor.init()

    Keyboard.show()

    // try and target an instrument in ToneEditor.components
    ToneEditor.components.forEach( function(element) {
      if (element.heritage[0] === 'Instrument') Keyboard.setTarget(element)
    })
    return ToneEditor
  }

  ToneEditor.options = function(options) {
    utils.extend(this._options, options)
    return ToneEditor
  }

  module.exports = ToneEditor
})