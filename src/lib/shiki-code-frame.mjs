const text = (value) => ({ type: 'text', value });
const span = (className, value) => ({ type: 'element', tagName: 'span', properties: { className: [className] }, children: value ? [text(value)] : [] });

export default function codeFrame() {
  return {
    name: 'code-frame',
    root(root) {
      const pre = root.children.find((node) => node.type === 'element' && node.tagName === 'pre');
      if (!pre) return;
      const meta = this.options.meta?.__raw ?? '';
      const title = /title=(["'])(.*?)\1/.exec(meta)?.[2] ?? '';
      const lang = this.options.lang === 'plaintext' ? 'text' : String(this.options.lang ?? 'text').toLowerCase();
      const header = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['code-frame-header'] },
        children: [span('code-frame-title', title), span('code-frame-lang', lang)],
      };
      root.children = [
        {
          type: 'element',
          tagName: 'figure',
          properties: { className: ['code-frame'] },
          children: [header, pre],
        },
      ];
    },
  };
}
