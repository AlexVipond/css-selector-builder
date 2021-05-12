import * as pipes from '../pipes'

type Metadatum = {
  method: keyof typeof pipes,
  category: 'abstractions' | 'basic' | 'pseudo states' | 'pseudo elements' | 'relationships',
  description: string,
  args: {
    name: string,
    type: 'string' | 'selector',
    description: string,
  }[]
}

export const metadata: Metadatum[] = [
  // ABSTRACTIONS
  {
    method: 'prepend',
    category: 'abstractions',
    description: '',
    args: [
      { name: '', type: '', description: '' },
    ]
  },
  {
    method: 'append',
    category: 'abstractions',
    description: '',
    args: [
      { name: '', type: '', description: '' },
    ]
  },
  {
    method: 'pseudoState',
    category: 'abstractions',
    description: '',
    args: [
      { name: '', type: '', description: '' },
    ]
  },
  {
    method: 'pseudoFn',
    category: 'abstractions',
    description: '',
    args: [
      { name: '', type: '', description: '' },
    ]
  },
  {
    method: 'pseudoElement',
    category: 'abstractions',
    description: '',
    args: [
      { name: '', type: '', description: '' },
    ]
  },
  {
    method: 'pseudoElementFn',
    category: 'abstractions',
    description: '',
    args: [
      { name: '', type: '', description: '' },
    ]
  },
  {
    method: 'relate',
    category: 'abstractions',
    description: '',
    args: [
      { name: '', type: '', description: '' },
    ]
  },

  // BASIC
  {
    method: 'universal',
    category: 'basic',
    description: '',
    args: [
      { name: '', type: '', description: '' },
    ]
  },
  {
    method: 'tag',
    category: 'basic',
    description: '',
    args: [
      { name: '', type: '', description: '' },
    ]
  },
  {
    method: 'className',
    category: 'basic',
    description: '',
    args: [
      { name: '', type: '', description: '' },
    ]
  },
  {
    method: 'id',
    category: 'basic',
    description: '',
    args: [
      { name: '', type: '', description: '' },
    ]
  },
  {
    method: 'attribute',
    category: 'basic',
    description: '',
    args: [
      { name: '', type: '', description: '' },
    ]
  },

  // PSEUDO STATES

  // USER ACTION
  {
    method: 'active',
    category: 'pseudo states',
    description: 'is currently activated by the user',
    args: [],
  },
  {
    method: 'focus',
    category: 'pseudo states',
    description: 'is currently focused by the user',
    args: [],
  },
  {
    method: 'focusVisible',
    category: 'pseudo states',
    description: 'is currently focused by the user using the keyboard, not the mouse',
    args: [],
  },
  {
    method: 'focusWithin',
    category: 'pseudo states',
    description: 'is either currently focused by the user, or contains the focused element',
    args: [],
  },
  {
    method: 'hover',
    category: 'pseudo states',
    description: 'is currently hovered by the user',
    args: [],
  },

  // INPUT
  {
    method: 'autofill',
    category: 'pseudo states',
    description: 'has been autofilled',
    args: [],
  },
  {
    method: 'blank',
    category: 'pseudo states',
    description: 'is a blank user input',
    args: [],
  },
  {
    method: 'checked',
    category: 'pseudo states',
    description: 'is a checked radio button or checkbox',
    args: [],
  },
  {
    method: 'defaultState',
    category: 'pseudo states',
    description: 'is the default radio, checkbox, or select option, or the first <button> in a form without the "button" type',
    args: [],
  },
  {
    method: 'disabled',
    category: 'pseudo states',
    description: 'is disabled',
    args: [],
  },
  {
    method: 'enabled',
    category: 'pseudo states',
    description: 'is enabled',
    args: [],
  },
  {
    method: 'indeterminate',
    category: 'pseudo states',
    description: 'is any form element whose state is indeterminate',
    args: [],
  },
  {
    method: 'inRange',
    category: 'pseudo states',
    description: 'is a slider whose selected value is within the allowed range',
    args: [],
  },
  {
    method: 'outOfRange',
    category: 'pseudo states',
    description: 'is a slider whose selected value is outside the allowed range',
    args: [],
  },
  {
    method: 'valid',
    category: 'pseudo states',
    description: 'has valid contents',
    args: [],
  },
  {
    method: 'invalid',
    category: 'pseudo states',
    description: 'has invalid contents',
    args: [],
  },
  {
    method: 'userInvalid',
    category: 'pseudo states',
    description: 'has invalid contents, and the user has already interacted with it',
    args: [],
  },
  {
    method: 'optional',
    category: 'pseudo states',
    description: 'is an optional form field',
    args: [],
  },
  {
    method: 'required',
    category: 'pseudo states',
    description: 'is a required form field',
    args: [],
  },
  {
    method: 'readOnly',
    category: 'pseudo states',
    description: 'is read-only',
    args: [],
  },
  {
    method: 'readWrite',
    category: 'pseudo states',
    description: 'is user-editable',
    args: [],
  },

  // LOCATION
  {
    method: 'anyLink',
    category: 'pseudo states',
    description: 'is any <a> with an href',
    args: [],
  },
  {
    method: 'localLink',
    category: 'pseudo states',
    description: 'is any <a> that links to the same document',
    args: [],
  },
  {
    method: 'link',
    category: 'pseudo states',
    description: 'is an <a> that hasn\'t been visited',
    args: [],
  },
  {
    method: 'visited',
    category: 'pseudo states',
    description: 'is an <a> that has been visited',
    args: [],
  },
  {
    method: 'scope',
    category: 'pseudo states',
    description: 'is currently calling the querySelector or querySelectorAll method',
    args: [],
  },
  {
    method: 'target',
    category: 'pseudo states',
    description: 'is the target of the current URL',
    args: [],
  },
  {
    method: 'targetWithin',
    category: 'pseudo states',
    description: 'is the target of the current URL, or contains the target',
    args: [],
  },
  
  // TREE STRUCTURE
  {
    method: 'root',
    category: 'pseudo states',
    description: 'is the document root',
    args: [],
  },
  {
    method: 'empty',
    category: 'pseudo states',
    description: 'has no children other than whitespace characters',
    args: [],
  },
  {
    method: 'first',
    category: 'pseudo states',
    description: 'is the first page of a printed document',
    args: [],
  },
  {
    method: 'firstChild',
    category: 'pseudo states',
    description: 'is the first child inside a parent',
    args: [],
  },
  {
    method: 'firstOfType',
    category: 'pseudo states',
    description: 'is the first child of a specific type inside a parent',
    args: [],
  },
  {
    method: 'lastChild',
    category: 'pseudo states',
    description: 'is the last child inside a parent',
    args: [],
  },
  {
    method: 'lastOfType',
    category: 'pseudo states',
    description: 'is the last child of a specific type inside a parent',
    args: [],
  },
  {
    method: 'onlyChild',
    category: 'pseudo states',
    description: 'is the only child inside a parent',
    args: [],
  },
  {
    method: 'onlyOfType',
    category: 'pseudo states',
    description: 'is the only child of a specific type inside a parent',
    args: [],
  },
  {
    method: 'left',
    category: 'pseudo states',
    description: '',
    args: [],
  },


  {
    method: 'defined',
    category: 'pseudo states',
    description: 'is a defined custom element',
    args: [],
  },
  
  {
    method: 'fullscreen',
    category: 'pseudo states',
    description: '',
    args: [],
  },

  // TIME DIMENSIONAL
  {
    method: 'current',
    category: 'pseudo states',
    description: 'is a WebVTT caption that is currently displayed',
    args: [],
  },
  {
    method: 'future',
    category: 'pseudo states',
    description: 'is a WebVTT caption that is not yet displayed',
    args: [],
  },
  {
    method: 'past',
    category: 'pseudo states',
    description: 'is a WebVTT caption that was displayed',
    args: [],
  },


  {
    method: 'host',
    category: 'pseudo states',
    description: '',
    args: [],
  },
  
  {
    method: 'pictureInPicture',
    category: 'pseudo states',
    description: '',
    args: [],
  },
  {
    method: 'placeholderShown',
    category: 'pseudo states',
    description: '',
    args: [],
  },
  {
    method: 'paused',
    category: 'pseudo states',
    description: '',
    args: [],
  },
  {
    method: 'playing',
    category: 'pseudo states',
    description: '',
    args: [],
  },
  {
    method: 'right',
    category: 'pseudo states',
    description: '',
    args: [],
  },
  {
    method: 'dir',
    category: 'pseudo states',
    description: '',
    args: [
      { name: '', type: '', description: '' },
    ]
  },
  {
    method: 'has',
    category: 'pseudo states',
    description: '',
    args: [
      { name: '', type: '', description: '' },
    ]
  },
  {
    method: 'hostFn',
    category: 'pseudo states',
    description: '',
    args: [
      { name: '', type: '', description: '' },
    ]
  },
  {
    method: 'hostContext',
    category: 'pseudo states',
    description: '',
    args: [
      { name: '', type: '', description: '' },
    ]
  },
  {
    method: 'is',
    category: 'pseudo states',
    description: '',
    args: [
      { name: '', type: '', description: '' },
    ]
  },
  {
    method: 'lang',
    category: 'pseudo states',
    description: '',
    args: [
      { name: '', type: '', description: '' },
    ]
  },
  {
    method: 'not',
    category: 'pseudo states',
    description: '',
    args: [
      { name: '', type: '', description: '' },
    ]
  },
  {
    method: 'nthChild',
    category: 'pseudo states',
    description: '',
    args: [
      { name: '', type: '', description: '' },
    ]
  },
  {
    method: 'nthCol',
    category: 'pseudo states',
    description: '',
    args: [
      { name: '', type: '', description: '' },
    ]
  },
  {
    method: 'nthLastChild',
    category: 'pseudo states',
    description: '',
    args: [
      { name: '', type: '', description: '' },
    ]
  },
  {
    method: 'nthLastCol',
    category: 'pseudo states',
    description: '',
    args: [
      { name: '', type: '', description: '' },
    ]
  },
  {
    method: 'nthLastOfType',
    category: 'pseudo states',
    description: '',
    args: [
      { name: '', type: '', description: '' },
    ]
  },
  {
    method: 'nthOfType',
    category: 'pseudo states',
    description: '',
    args: [
      { name: '', type: '', description: '' },
    ]
  },
  {
    method: 'state',
    category: 'pseudo states',
    description: '',
    args: [
      { name: '', type: '', description: '' },
    ]
  },
  {
    method: 'where',
    category: 'pseudo states',
    description: '',
    args: [
      { name: '', type: '', description: '' },
    ]
  },

  {
    method: 'after',
    category: 'pseudo elements',
    description: '',
    args: [],
  },
  {
    method: 'backdrop',
    category: 'pseudo elements',
    description: '',
    args: [],
  },
  {
    method: 'before',
    category: 'pseudo elements',
    description: '',
    args: [],
  },
  {
    method: 'cue',
    category: 'pseudo elements',
    description: '',
    args: [],
  },
  {
    method: 'cueRegion',
    category: 'pseudo elements',
    description: '',
    args: [],
  },
  {
    method: 'firstLetter',
    category: 'pseudo elements',
    description: '',
    args: [],
  },
  {
    method: 'firstLine',
    category: 'pseudo elements',
    description: '',
    args: [],
  },
  {
    method: 'fileSelectorButton',
    category: 'pseudo elements',
    description: '',
    args: [],
  },
  {
    method: 'grammarError',
    category: 'pseudo elements',
    description: '',
    args: [],
  },
  {
    method: 'marker',
    category: 'pseudo elements',
    description: '',
    args: [],
  },
  {
    method: 'placeholder',
    category: 'pseudo elements',
    description: '',
    args: [],
  },
  {
    method: 'selection',
    category: 'pseudo elements',
    description: '',
    args: [],
  },
  {
    method: 'spellingError',
    category: 'pseudo elements',
    description: '',
    args: [],
  },
  {
    method: 'targetText',
    category: 'pseudo elements',
    description: '',
    args: [],
  },
  {
    method: 'part',
    category: 'pseudo elements',
    description: '',
    args: [
      { name: '', type: '', description: '' },
    ]
  },
  {
    method: 'slotted',
    category: 'pseudo elements',
    description: '',
    args: [
      { name: '', type: '', description: '' },
    ]
  },

  // RELATIONSHIPS
  {
    method: 'descendant',
    category: 'relationships',
    description: '',
    args: [
      { name: '', type: '', description: '' },
    ]
  },
  {
    method: 'directChild',
    category: 'relationships',
    description: '',
    args: [
      { name: '', type: '', description: '' },
    ]
  },
  {
    method: 'generalSibling',
    category: 'relationships',
    description: '',
    args: [
      { name: '', type: '', description: '' },
    ]
  },
  {
    method: 'adjacentSibling',
    category: 'relationships',
    description: '',
    args: [
      { name: '', type: '', description: '' },
    ]
  },
]
