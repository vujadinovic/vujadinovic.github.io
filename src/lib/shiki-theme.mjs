export default {
  name: 'site-dark',
  type: 'dark',
  colors: {
    'editor.background': '#131416',
    'editor.foreground': '#D6D9DE',
  },
  tokenColors: [
    { settings: { foreground: '#D6D9DE', background: '#131416' } },
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#8A8F98', fontStyle: 'italic' } },
    { scope: ['keyword', 'storage', 'keyword.operator.logical', 'keyword.control'], settings: { foreground: '#B9B2A6' } },
    { scope: ['string', 'string.quoted', 'punctuation.definition.string'], settings: { foreground: '#C4C8CE' } },
    { scope: ['constant.numeric', 'constant.language', 'constant.character', 'support.constant'], settings: { foreground: '#EEE9E1' } },
    { scope: ['entity.name.function', 'support.function', 'meta.function-call.generic'], settings: { foreground: '#E2DDD4' } },
    { scope: ['entity.name.type', 'entity.name.class', 'support.class', 'support.type'], settings: { foreground: '#E2DDD4', fontStyle: '' } },
    { scope: ['variable.parameter', 'meta.function.parameters'], settings: { foreground: '#C9CCD1' } },
    { scope: ['keyword.operator', 'punctuation'], settings: { foreground: '#A3A8B0' } },
    { scope: ['entity.name.tag', 'entity.other.attribute-name'], settings: { foreground: '#B9B2A6' } },
    { scope: ['markup.inserted'], settings: { foreground: '#C9CCD1' } },
    { scope: ['markup.deleted'], settings: { foreground: '#8A8F98' } },
  ],
};
