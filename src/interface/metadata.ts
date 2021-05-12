import * as pipes from '../pipes'

type Metadatum = {
  method: keyof typeof pipes,
  category: 'abstractions' | 'basic' | 'pseudo states' | 'pseudo elements' | 'relationships',
  label: string,
  args: {
    name: string,
    inputType: 'unknown' | 'string' | 'selector' | 'attributeOperators' | 'directionalities' | 'nthPattern',
    label: string,
    required: boolean | ((values: Record<any, any>) => boolean),
    repeatable?: boolean
  }[]
}

export const metadata: Metadatum[] = [
  // ABSTRACTIONS
  {
    method: 'prepend',
    category: 'abstractions',
    label: 'is selected by a custom selector prepended to the current selector',
    args: [
      {
        name: 'prepended',
        inputType: 'string',
        label: 'Custom selector that should be prepended to the current selector',
        required: true
      },
    ]
  },
  {
    method: 'append',
    category: 'abstractions',
    label: 'is selected by a custom selector appended to the current selector',
    args: [
      {
        name: 'appended',
        inputType: 'string',
        label: 'Custom selector that should be appended to the current selector',
        required: true
      },
    ]
  },
  {
    method: 'pseudoState',
    category: 'abstractions',
    label: 'has a custom pseudo state',
    args: [
      {
        name: 'state',
        inputType: 'string',
        label: 'Name of the pseudo state',
        required: true
      },
    ]
  },
  {
    method: 'pseudoFn',
    category: 'abstractions',
    label: 'has a custom pseudo state that accepts arguments',
    args: [
      {
        name: 'fn',
        inputType: 'string',
        label: 'Name of the pseudo state function',
        required: true
      },
      {
        name: 'args',
        inputType: 'unknown',
        label: 'An argument to pass to the pseudo state function',
        required: true,
        repeatable: true,
      },
    ]
  },
  {
    method: 'pseudoElement',
    category: 'abstractions',
    label: 'has a custom pseudo element',
    args: [
      {
        name: 'state',
        inputType: 'string',
        label: 'Name of the pseudo element',
        required: true
      },
    ]
  },
  {
    method: 'pseudoElementFn',
    category: 'abstractions',
    label: 'has a custom pseudo element that accepts arguments',
    args: [
      {
        name: 'fn',
        inputType: 'string',
        label: 'Name of the pseudo element function',
        required: true
      },
      {
        name: 'args',
        inputType: 'unknown',
        label: 'An argument to pass to the pseudo element function',
        required: true,
        repeatable: true,
      },
    ]
  },
  {
    method: 'relate',
    category: 'abstractions',
    label: 'has a custom relationship with another selector',
    args: [
      {
        name: 'combinator',
        inputType: 'string',
        label: 'Custom combinator that goes between your selector and its relative',
        required: true
      },
      {
        name: 'relative',
        inputType: 'selector',
        label: 'Your selector\'s relative',
        required: true
      },
    ]
  },

  // BASIC
  {
    method: 'universal',
    category: 'basic',
    label: 'universally meets any other conditions',
    args: []
  },
  {
    method: 'tag',
    category: 'basic',
    label: 'has a specific tag',
    args: [
      {
        name: 'tag',
        inputType: 'string',
        label: 'The tag',
        required: true
      },
    ]
  },
  {
    method: 'className',
    category: 'basic',
    label: 'has a specific class',
    args: [
      {
        name: 'name',
        inputType: 'string',
        label: 'The class name',
        required: true
      },
    ]
  },
  {
    method: 'id',
    category: 'basic',
    label: 'has a specific ID',
    args: [
      {
        name: 'id',
        inputType: 'string',
        label: 'The id',
        required: true
      },
    ]
  },
  {
    method: 'attribute',
    category: 'basic',
    label: 'has an attribute, or has an attribute whose value meets certain conditions',
    args: [
      {
        name: 'attribute',
        inputType: 'string',
        label: 'Name of the attribute',
        required: true
      },
      {
        name: 'operator',
        inputType: 'attributeOperators',
        label: 'Operator that describes the relationship between the attribute and its value',
        required: values => !!values.value,
      },
      {
        name: 'value',
        inputType: 'string',
        label: 'Value of the attribute',
        required: values => !!values.operator,
      },
    ]
  },

  // PSEUDO STATES

  // USER ACTION
  {
    method: 'active',
    category: 'pseudo states',
    label: 'is currently activated by the user',
    args: [],
  },
  {
    method: 'focus',
    category: 'pseudo states',
    label: 'is currently focused by the user',
    args: [],
  },
  {
    method: 'focusVisible',
    category: 'pseudo states',
    label: 'is currently focused by the user using the keyboard, not the mouse',
    args: [],
  },
  {
    method: 'focusWithin',
    category: 'pseudo states',
    label: 'is either currently focused by the user, or contains the focused element',
    args: [],
  },
  {
    method: 'hover',
    category: 'pseudo states',
    label: 'is currently hovered by the user',
    args: [],
  },

  // INPUT
  {
    method: 'autofill',
    category: 'pseudo states',
    label: 'has been autofilled',
    args: [],
  },
  {
    method: 'blank',
    category: 'pseudo states',
    label: 'is a blank user input',
    args: [],
  },
  {
    method: 'checked',
    category: 'pseudo states',
    label: 'is a checked radio button or checkbox',
    args: [],
  },
  {
    method: 'defaultState',
    category: 'pseudo states',
    label: 'is the default radio, checkbox, or select option, or the first <button> in a form without the "button" type',
    args: [],
  },
  {
    method: 'disabled',
    category: 'pseudo states',
    label: 'is disabled',
    args: [],
  },
  {
    method: 'enabled',
    category: 'pseudo states',
    label: 'is enabled',
    args: [],
  },
  {
    method: 'indeterminate',
    category: 'pseudo states',
    label: 'is any form element whose state is indeterminate',
    args: [],
  },
  {
    method: 'inRange',
    category: 'pseudo states',
    label: 'is a slider whose selected value is within the allowed range',
    args: [],
  },
  {
    method: 'outOfRange',
    category: 'pseudo states',
    label: 'is a slider whose selected value is outside the allowed range',
    args: [],
  },
  {
    method: 'valid',
    category: 'pseudo states',
    label: 'has valid contents',
    args: [],
  },
  {
    method: 'invalid',
    category: 'pseudo states',
    label: 'has invalid contents',
    args: [],
  },
  {
    method: 'userInvalid',
    category: 'pseudo states',
    label: 'has invalid contents, and the user has already interacted with it',
    args: [],
  },
  {
    method: 'optional',
    category: 'pseudo states',
    label: 'is an optional form field',
    args: [],
  },
  {
    method: 'required',
    category: 'pseudo states',
    label: 'is a required form field',
    args: [],
  },
  {
    method: 'readOnly',
    category: 'pseudo states',
    label: 'is read-only',
    args: [],
  },
  {
    method: 'readWrite',
    category: 'pseudo states',
    label: 'is user-editable',
    args: [],
  },
  {
    method: 'placeholderShown',
    category: 'pseudo states',
    label: 'is an input element that is displaying placeholder text',
    args: [],
  },

  // LOCATION
  {
    method: 'anyLink',
    category: 'pseudo states',
    label: 'is any <a> with an href',
    args: [],
  },
  {
    method: 'localLink',
    category: 'pseudo states',
    label: 'is any <a> that links to the same document',
    args: [],
  },
  {
    method: 'link',
    category: 'pseudo states',
    label: 'is an <a> that hasn\'t been visited',
    args: [],
  },
  {
    method: 'visited',
    category: 'pseudo states',
    label: 'is an <a> that has been visited',
    args: [],
  },
  {
    method: 'scope',
    category: 'pseudo states',
    label: 'is currently calling the querySelector or querySelectorAll method',
    args: [],
  },
  {
    method: 'target',
    category: 'pseudo states',
    label: 'is the target of the current URL',
    args: [],
  },
  {
    method: 'targetWithin',
    category: 'pseudo states',
    label: 'is the target of the current URL, or contains the target',
    args: [],
  },

  // PRINTED PAGE STRUCTURE

  {
    method: 'first',
    category: 'pseudo states',
    label: 'is the first page of a printed document',
    args: [],
  },
  {
    method: 'left',
    category: 'pseudo states',
    label: 'is a left-hand page of a printed document',
    args: [],
  },

  {
    method: 'right',
    category: 'pseudo states',
    label: 'is a right-hand page of a printed document',
    args: [],
  },
  
  // TREE STRUCTURE
  {
    method: 'root',
    category: 'pseudo states',
    label: 'is the document root',
    args: [],
  },
  {
    method: 'empty',
    category: 'pseudo states',
    label: 'has no children other than whitespace characters',
    args: [],
  },
  {
    method: 'firstChild',
    category: 'pseudo states',
    label: 'is the first child inside a parent',
    args: [],
  },
  {
    method: 'firstOfType',
    category: 'pseudo states',
    label: 'is the first child of its type inside a parent',
    args: [],
  },
  {
    method: 'lastChild',
    category: 'pseudo states',
    label: 'is the last child inside a parent',
    args: [],
  },
  {
    method: 'lastOfType',
    category: 'pseudo states',
    label: 'is the last child of its type inside a parent',
    args: [],
  },
  {
    method: 'onlyChild',
    category: 'pseudo states',
    label: 'is the only child inside a parent',
    args: [],
  },
  {
    method: 'onlyOfType',
    category: 'pseudo states',
    label: 'is the only child of its type inside a parent',
    args: [],
  },
  {
    method: 'nthChild',
    category: 'pseudo states',
    label: 'is the nth child inside a parent',
    args: [
      {
        name: 'pattern',
        inputType: 'nthPattern',
        label: 'nth pattern describing the element\'s position',
        required: true,
      }
    ]
  },
  {
    method: 'nthLastChild',
    category: 'pseudo states',
    label: 'is the nth from last child inside a parent',
    args: [
      {
        name: 'pattern',
        inputType: 'nthPattern',
        label: 'nth pattern describing the element\'s position',
        required: true,
      }
    ]
  },
  {
    method: 'nthOfType',
    category: 'pseudo states',
    label: 'is the nth child of its type inside a parent',
    args: [
      {
        name: 'pattern',
        inputType: 'nthPattern',
        label: 'nth pattern describing the element\'s position',
        required: true,
      }
    ]
  },
  {
    method: 'nthLastOfType',
    category: 'pseudo states',
    label: 'is the nth from the last child of its type inside a parent',
    args: [
      {
        name: 'pattern',
        inputType: 'nthPattern',
        label: 'nth pattern describing the element\'s position',
        required: true,
      }
    ]
  },
  {
    method: 'nthCol',
    category: 'pseudo states',
    label: 'is in the nth column inside a parent',
    args: [
      {
        name: 'pattern',
        inputType: 'nthPattern',
        label: 'nth pattern describing the element\'s position',
        required: true,
      }
    ]
  },
  {
    method: 'nthLastCol',
    category: 'pseudo states',
    label: 'is in the nth from last column inside a parent',
    args: [
      {
        name: 'pattern',
        inputType: 'nthPattern',
        label: 'nth pattern describing the element\'s position',
        required: true,
      }
    ]
  },

  // DISPLAY
  {
    method: 'fullscreen',
    category: 'pseudo states',
    label: 'is currently displayed fullscreen',
    args: [],
  },
  {
    method: 'pictureInPicture',
    category: 'pseudo states',
    label: 'is currently displayed as picture-in-picture',
    args: [],
  },


  // TIME DIMENSIONAL
  {
    method: 'current',
    category: 'pseudo states',
    label: 'is a WebVTT caption that is currently displayed',
    args: [],
  },
  {
    method: 'future',
    category: 'pseudo states',
    label: 'is a WebVTT caption that is not yet displayed',
    args: [],
  },
  {
    method: 'past',
    category: 'pseudo states',
    label: 'is a WebVTT caption that was displayed',
    args: [],
  },
  {
    method: 'defined',
    category: 'pseudo states',
    label: 'is a defined custom element',
    args: [],
  },
  

  {
    method: 'host',
    category: 'pseudo states',
    label: '',
    args: [],
  },


  // RESOURCE STATE
  {
    method: 'paused',
    category: 'pseudo states',
    label: 'is a media element that is currently paused',
    args: [],
  },
  {
    method: 'playing',
    category: 'pseudo states',
    label: 'is a media element that is currently playing',
    args: [],
  },

  {
    method: 'dir',
    category: 'pseudo states',
    label: '',
    args: [
      {
        name: 'directionality',
        inputType: 'directionalities',
        label: 'Text directionality',
        required: true,
      }
    ]
  },
  {
    method: 'lang',
    category: 'pseudo states',
    label: '',
    args: [
      {
        name: 'language code',
        inputType: 'string',
        label: '',
        required: true,
      }
    ]
  },
  {
    method: 'has',
    category: 'pseudo states',
    label: '',
    args: [
      {
        name: 'selector',
        inputType: 'selector',
        label: '',
        required: true,
      }
    ]
  },
  {
    method: 'hostFn',
    category: 'pseudo states',
    label: '',
    args: [
      
    ]
  },
  {
    method: 'hostContext',
    category: 'pseudo states',
    label: '',
    args: [
      
    ]
  },
  {
    method: 'is',
    category: 'pseudo states',
    label: '',
    args: [
      {
        name: 'selector',
        inputType: 'selector',
        label: '',
        required: true,
        repeatable: true,
      }
    ]
  },
  {
    method: 'not',
    category: 'pseudo states',
    label: '',
    args: [
      {
        name: 'selector',
        inputType: 'selector',
        label: '',
        required: true,
        repeatable: true,
      }
    ]
  },  
  {
    method: 'where',
    category: 'pseudo states',
    label: '',
    args: [
      {
        name: 'selector',
        inputType: 'selector',
        label: '',
        required: true,
        repeatable: true,
      }
    ]
  },
  {
    method: 'state',
    category: 'pseudo states',
    label: '',
    args: [
      {
        name: 'state',
        inputType: 'string',
        label: '',
        required: true,
      }
    ]
  },

  {
    method: 'after',
    category: 'pseudo elements',
    label: '',
    args: [],
  },
  {
    method: 'backdrop',
    category: 'pseudo elements',
    label: '',
    args: [],
  },
  {
    method: 'before',
    category: 'pseudo elements',
    label: '',
    args: [],
  },
  {
    method: 'cue',
    category: 'pseudo elements',
    label: '',
    args: [],
  },
  {
    method: 'cueRegion',
    category: 'pseudo elements',
    label: '',
    args: [],
  },
  {
    method: 'firstLetter',
    category: 'pseudo elements',
    label: '',
    args: [],
  },
  {
    method: 'firstLine',
    category: 'pseudo elements',
    label: '',
    args: [],
  },
  {
    method: 'fileSelectorButton',
    category: 'pseudo elements',
    label: '',
    args: [],
  },
  {
    method: 'grammarError',
    category: 'pseudo elements',
    label: '',
    args: [],
  },
  {
    method: 'marker',
    category: 'pseudo elements',
    label: '',
    args: [],
  },
  {
    method: 'placeholder',
    category: 'pseudo elements',
    label: '',
    args: [],
  },
  {
    method: 'selection',
    category: 'pseudo elements',
    label: '',
    args: [],
  },
  {
    method: 'spellingError',
    category: 'pseudo elements',
    label: '',
    args: [],
  },
  {
    method: 'targetText',
    category: 'pseudo elements',
    label: '',
    args: [],
  },
  {
    method: 'part',
    category: 'pseudo elements',
    label: '',
    args: [
      {
        name: 'part',
        inputType: 'string',
        label: '',
        required: true,
      }
    ]
  },
  {
    method: 'slotted',
    category: 'pseudo elements',
    label: '',
    args: [
      {
        name: 'selector',
        inputType: 'selector',
        label: '',
        required: true,
        repeatable: true,
      }
    ]
  },

  // RELATIONSHIPS
  {
    method: 'descendant',
    category: 'relationships',
    label: 'is the descendant of a specific element',
    args: [
      {
        name: 'ancestor',
        inputType: 'selector',
        label: 'Ancestor of the selected element',
        required: true,
      }
    ]
  },
  {
    method: 'directChild',
    category: 'relationships',
    label: 'is the direct child of a specific element',
    args: [
      {
        name: 'parent',
        inputType: 'selector',
        label: 'Parent of the selected element',
        required: true,
      }
    ]
  },
  {
    method: 'generalSibling',
    category: 'relationships',
    label: 'is the general sibling of a specific element',
    args: [
      {
        name: 'sibling',
        inputType: 'selector',
        label: 'Sibling of the selected element',
        required: true,
      }
    ]
  },
  {
    method: 'adjacentSibling',
    category: 'relationships',
    label: 'is the adjacent sibling of a specific element',
    args: [
      {
        name: 'sibling',
        inputType: 'selector',
        label: 'Sibling of the selected element',
        required: true,
      }
    ]
  },
]
