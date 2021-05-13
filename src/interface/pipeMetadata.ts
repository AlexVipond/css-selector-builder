import * as pipes from '../pipes'
import type { AttributeOperator } from '../pipes'

type PipeMetadatum = {
  name: keyof typeof pipes,
  category: 'abstractions' | 'basic' | 'pseudo states' | 'pseudo elements' | 'relationships',
  label: string,
  args: {
    name: string,
    inputType: 'unknown' | 'string' | 'selector' | 'attributeOperator' | 'attributeCaseSensitivity' | 'directionality' | 'nthPattern',
    label: string,
    required: boolean | ((attributeUserInput: { attribute: string, operator: AttributeOperator, value: string, isCaseSensitive: boolean | 'unspecified' }) => boolean),
    repeatable?: boolean
  }[]
}

export const pipeMetadata: PipeMetadatum[] = [
  // ABSTRACTIONS
  {
    name: 'prepend',
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
    name: 'append',
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
    name: 'pseudoState',
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
    name: 'pseudoFn',
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
    name: 'pseudoElement',
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
    name: 'pseudoElementFn',
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
    name: 'relate',
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
    name: 'universal',
    category: 'basic',
    label: 'universally meets any other conditions',
    args: []
  },
  {
    name: 'tag',
    category: 'basic',
    label: 'has a tag, which I\'ll specify',
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
    name: 'className',
    category: 'basic',
    label: 'has a class, which I\'ll specify',
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
    name: 'id',
    category: 'basic',
    label: 'has a ID, which I\'ll specify',
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
    name: 'attribute',
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
        inputType: 'attributeOperator',
        label: 'Operator that describes the relationship between the attribute and its value',
        required: attributeUserInput => !!attributeUserInput.value || attributeUserInput.isCaseSensitive !== 'unknown',
      },
      {
        name: 'value',
        inputType: 'string',
        label: 'Value of the attribute',
        required: attributeUserInput => !!attributeUserInput.operator || attributeUserInput.isCaseSensitive !== 'unknown',
      },
      {
        name: 'isCaseSensitive',
        inputType: 'attributeCaseSensitivity',
        label: 'Value of the attribute',
      },
    ]
  },

  // PSEUDO STATES

  // USER ACTION
  {
    name: 'active',
    category: 'pseudo states',
    label: 'is currently activated by the user',
    args: [],
  },
  {
    name: 'focus',
    category: 'pseudo states',
    label: 'is currently focused by the user',
    args: [],
  },
  {
    name: 'focusVisible',
    category: 'pseudo states',
    label: 'is currently focused by the user using the keyboard, not the mouse',
    args: [],
  },
  {
    name: 'focusWithin',
    category: 'pseudo states',
    label: 'is either currently focused by the user, or contains the focused element',
    args: [],
  },
  {
    name: 'hover',
    category: 'pseudo states',
    label: 'is currently hovered by the user',
    args: [],
  },

  // INPUT
  {
    name: 'autofill',
    category: 'pseudo states',
    label: 'has been autofilled',
    args: [],
  },
  {
    name: 'blank',
    category: 'pseudo states',
    label: 'is a blank user input',
    args: [],
  },
  {
    name: 'checked',
    category: 'pseudo states',
    label: 'is a checked radio button or checkbox',
    args: [],
  },
  {
    name: 'defaultState',
    category: 'pseudo states',
    label: 'is the default radio, checkbox, or select option, or the first <button> in a form without the "button" type',
    args: [],
  },
  {
    name: 'disabled',
    category: 'pseudo states',
    label: 'is disabled',
    args: [],
  },
  {
    name: 'enabled',
    category: 'pseudo states',
    label: 'is enabled',
    args: [],
  },
  {
    name: 'indeterminate',
    category: 'pseudo states',
    label: 'is any form element whose state is indeterminate',
    args: [],
  },
  {
    name: 'inRange',
    category: 'pseudo states',
    label: 'is a slider whose selected value is within the allowed range',
    args: [],
  },
  {
    name: 'outOfRange',
    category: 'pseudo states',
    label: 'is a slider whose selected value is outside the allowed range',
    args: [],
  },
  {
    name: 'valid',
    category: 'pseudo states',
    label: 'has valid contents',
    args: [],
  },
  {
    name: 'invalid',
    category: 'pseudo states',
    label: 'has invalid contents',
    args: [],
  },
  {
    name: 'userInvalid',
    category: 'pseudo states',
    label: 'has invalid contents, and the user has already interacted with it',
    args: [],
  },
  {
    name: 'optional',
    category: 'pseudo states',
    label: 'is an optional form field',
    args: [],
  },
  {
    name: 'required',
    category: 'pseudo states',
    label: 'is a required form field',
    args: [],
  },
  {
    name: 'readOnly',
    category: 'pseudo states',
    label: 'is read-only',
    args: [],
  },
  {
    name: 'readWrite',
    category: 'pseudo states',
    label: 'is user-editable',
    args: [],
  },
  {
    name: 'placeholderShown',
    category: 'pseudo states',
    label: 'is an input element that is displaying placeholder text',
    args: [],
  },

  // LOCATION
  {
    name: 'anyLink',
    category: 'pseudo states',
    label: 'is an <a> with an href',
    args: [],
  },
  {
    name: 'localLink',
    category: 'pseudo states',
    label: 'is an <a> that links to the same document',
    args: [],
  },
  {
    name: 'link',
    category: 'pseudo states',
    label: 'is an <a> that hasn\'t been visited',
    args: [],
  },
  {
    name: 'visited',
    category: 'pseudo states',
    label: 'is an <a> that has been visited',
    args: [],
  },
  {
    name: 'scope',
    category: 'pseudo states',
    label: 'is currently calling the querySelector or querySelectorAll method',
    args: [],
  },
  {
    name: 'target',
    category: 'pseudo states',
    label: 'is the target of the current URL',
    args: [],
  },
  {
    name: 'targetWithin',
    category: 'pseudo states',
    label: 'is the target of the current URL, or contains the target',
    args: [],
  },

  // PRINTED PAGE STRUCTURE

  {
    name: 'first',
    category: 'pseudo states',
    label: 'is the first page of a printed document',
    args: [],
  },
  {
    name: 'left',
    category: 'pseudo states',
    label: 'is a left-hand page of a printed document',
    args: [],
  },

  {
    name: 'right',
    category: 'pseudo states',
    label: 'is a right-hand page of a printed document',
    args: [],
  },
  
  // TREE STRUCTURE
  {
    name: 'root',
    category: 'pseudo states',
    label: 'is the document root',
    args: [],
  },
  {
    name: 'empty',
    category: 'pseudo states',
    label: 'has no children other than whitespace characters',
    args: [],
  },
  {
    name: 'firstChild',
    category: 'pseudo states',
    label: 'is the first child inside a parent',
    args: [],
  },
  {
    name: 'firstOfType',
    category: 'pseudo states',
    label: 'is the first child of its type inside a parent',
    args: [],
  },
  {
    name: 'lastChild',
    category: 'pseudo states',
    label: 'is the last child inside a parent',
    args: [],
  },
  {
    name: 'lastOfType',
    category: 'pseudo states',
    label: 'is the last child of its type inside a parent',
    args: [],
  },
  {
    name: 'onlyChild',
    category: 'pseudo states',
    label: 'is the only child inside a parent',
    args: [],
  },
  {
    name: 'onlyOfType',
    category: 'pseudo states',
    label: 'is the only child of its type inside a parent',
    args: [],
  },
  {
    name: 'nthChild',
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
    name: 'nthLastChild',
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
    name: 'nthOfType',
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
    name: 'nthLastOfType',
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
    name: 'nthCol',
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
    name: 'nthLastCol',
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
    name: 'fullscreen',
    category: 'pseudo states',
    label: 'is currently displayed fullscreen',
    args: [],
  },
  {
    name: 'pictureInPicture',
    category: 'pseudo states',
    label: 'is currently displayed as picture-in-picture',
    args: [],
  },


  // TIME DIMENSIONAL
  {
    name: 'current',
    category: 'pseudo states',
    label: 'is a WebVTT caption that is currently displayed',
    args: [],
  },
  {
    name: 'future',
    category: 'pseudo states',
    label: 'is a WebVTT caption that is not yet displayed',
    args: [],
  },
  {
    name: 'past',
    category: 'pseudo states',
    label: 'is a WebVTT caption that was displayed',
    args: [],
  },
  {
    name: 'defined',
    category: 'pseudo states',
    label: 'is a defined custom element',
    args: [],
  },
  

  {
    name: 'host',
    category: 'pseudo states',
    label: 'is a shadow root host',
    args: [],
  },


  // RESOURCE STATE
  {
    name: 'paused',
    category: 'pseudo states',
    label: 'is a media element that is currently paused',
    args: [],
  },
  {
    name: 'playing',
    category: 'pseudo states',
    label: 'is a media element that is currently playing',
    args: [],
  },

  {
    name: 'dir',
    category: 'pseudo states',
    label: 'has a text directionality, which I\'ll specify',
    args: [
      {
        name: 'directionality',
        inputType: 'directionality',
        label: 'Text directionality',
        required: true,
      }
    ]
  },
  {
    name: 'lang',
    category: 'pseudo states',
    label: 'contains content in a language, which I\'ll specify',
    args: [
      {
        name: 'language code',
        inputType: 'string',
        label: 'Language code for the element\'s content',
        required: true,
      }
    ]
  },
  {
    name: 'has',
    category: 'pseudo states',
    label: 'contains any element that matches a selector, which I\'ll specify',
    args: [
      {
        name: 'selector',
        inputType: 'selector',
        label: 'Selector for the contained element',
        required: true,
      }
    ]
  },
  {
    name: 'hostFn',
    category: 'pseudo states',
    label: 'is a shadow root host that matches other conditions, which I\'ll specify',
    args: [
      {
        name: 'selector',
        inputType: 'selector',
        label: 'Additional selector conditions for the shadow root host',
        required: true,
      }
    ]
  },
  {
    name: 'hostContext',
    category: 'pseudo states',
    label: 'is a shadow root host with an ancestor that matches other conditions, which I\'ll specify',
    args: [
      {
        name: 'selector',
        inputType: 'selector',
        label: 'Selector for the shadow root host\'s ancestor',
        required: true,
      }
    ]
  },
  {
    name: 'is',
    category: 'pseudo states',
    label: 'matches any of one or more selectors, which I\'ll specify, and retains the specificity of the most specific matching selector',
    args: [
      {
        name: 'selector',
        inputType: 'selector',
        label: 'A selector that the element might match',
        required: true,
        repeatable: true,
      }
    ]
  },
  {
    name: 'where',
    category: 'pseudo states',
    label: 'matches any of one or more selectors, which I\'ll specify, and takes on a specifity of 0',
    args: [
      {
        name: 'selector',
        inputType: 'selector',
        label: 'A selector that the element might match',
        required: true,
        repeatable: true,
      }
    ]
  },
  {
    name: 'not',
    category: 'pseudo states',
    label: 'matches none of one or more selectors, which I\'ll specify',
    args: [
      {
        name: 'selector',
        inputType: 'selector',
        label: 'A selector that the element must not match',
        required: true,
        repeatable: true,
      }
    ]
  },
  {
    name: 'state',
    category: 'pseudo states',
    label: 'has a custom state, which I\'ll specify, in ElementInternals.states',
    args: [
      {
        name: 'state',
        inputType: 'string',
        label: 'Custom state',
        required: true,
      }
    ]
  },

  {
    name: 'before',
    category: 'pseudo elements',
    label: 'is a pseudo element that comes before my element',
    args: [],
  },
  {
    name: 'after',
    category: 'pseudo elements',
    label: 'is a pseudo element that comes after my element',
    args: [],
  },
  {
    name: 'backdrop',
    category: 'pseudo elements',
    label: 'is the pseudo element rendered underneath my element when it displays in fullscreen',
    args: [],
  },
  {
    name: 'cue',
    category: 'pseudo elements',
    label: 'is the pseudo element for any WebVTT cues rendered inside my element',
    args: [],
  },
  {
    name: 'cueRegion',
    category: 'pseudo elements',
    label: 'is the pseudo element for a region containing any WebVTT cues rendered inside my element',
    args: [],
  },
  {
    name: 'firstLetter',
    category: 'pseudo elements',
    label: 'is the pseudo element for the first letter inside my element',
    args: [],
  },
  {
    name: 'firstLine',
    category: 'pseudo elements',
    label: 'is the pseudo element for the first line inside my element',
    args: [],
  },
  {
    name: 'grammarError',
    category: 'pseudo elements',
    label: 'is the pseudo element for grammar errors in my element',
    args: [],
  },
  {
    name: 'spellingError',
    category: 'pseudo elements',
    label: 'is the pseudo element for spelling errors in my element',
    args: [],
  },
  {
    name: 'fileSelectorButton',
    category: 'pseudo elements',
    label: 'is the pseudo element for the file selector button inside my element, which must be a file input',
    args: [],
  },
  {
    name: 'marker',
    category: 'pseudo elements',
    label: 'is the pseudo element for the marker of my element, which must have its \'display\' set to \'list-item\'',
    args: [],
  },
  {
    name: 'placeholder',
    category: 'pseudo elements',
    label: 'is the pseudo element for the placeholder inside my element, which must be a textarea or text input',
    args: [],
  },
  {
    name: 'selection',
    category: 'pseudo elements',
    label: 'is the pseudo element for the part of my document that has been highlighted by the user',
    args: [],
  },
  {
    name: 'targetText',
    category: 'pseudo elements',
    label: 'is the pseudo element for text that has been scrolled to',
    args: [],
  },
  {
    name: 'part',
    category: 'pseudo elements',
    label: 'is the pseudo element for an element in shadow tree with a part, which I\'ll specify',
    args: [
      {
        name: 'part',
        inputType: 'string',
        label: 'The part name',
        required: true,
      }
    ]
  },
  {
    name: 'slotted',
    category: 'pseudo elements',
    label: 'is the pseudo element for an element, whose selector I\'ll specify, that has been placed into a slot inside my element, which must be an HTML template',
    args: [
      {
        name: 'selector',
        inputType: 'selector',
        label: 'Selector for the element in the slot',
        required: true,
      }
    ]
  },

  // RELATIONSHIPS
  {
    name: 'descendant',
    category: 'relationships',
    label: 'is the descendant of an element, which I\'ll specify',
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
    name: 'directChild',
    category: 'relationships',
    label: 'is the direct child of an element, which I\'ll specify',
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
    name: 'generalSibling',
    category: 'relationships',
    label: 'is the general sibling of an element, which I\'ll specify',
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
    name: 'adjacentSibling',
    category: 'relationships',
    label: 'is the adjacent sibling of an element, which I\'ll specify',
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
