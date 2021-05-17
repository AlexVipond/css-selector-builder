export const directionalities = [
  { label: 'left to right', value: 'ltr' },
  { label: 'right to left', value: 'rtl' }
]

export const directionalityDefault = directionalities[0]


export const attributeOperators = [
  { 
    label: 'is',
    value: '=',
  },
  { 
    label: 'includes (as an exact value in a whitespace-separated list)',
    value: '~=',
  },
  { 
    label: 'contains (as an exact match anywhere)',
    value: '*=',
  },
  { 
    label: 'starts with',
    value: '^=',
  },
  { 
    label: 'ends with',
    value: '$=',
  },
  { 
    label: 'is kebab-cased, with the first segment being',
    value: '|=',
  },
]

export const attributeOperatorDefault = attributeOperators[0]


export const attributeCaseSensitivities = [
  { label: 'unspecified', value: 'unspecified' },
  { label: 'sensitive', value: true },
  { label: 'insensitive', value: false },
]
export const attributeCaseSensitivityDefault = attributeCaseSensitivities[0]


// nth pattern options are more complex, and managed inside the component
export const nthPatternDefault = { key: 'odd', value: 'odd', label: 'odd' }
