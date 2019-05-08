// tmpl: TemplateStringsArray, ...args: string[]
const robotScript = (tmpl, ...args) => {
    const colors = {
        'F': 'pink',
        'L': 'red',
        'R': 'green',
    };
    const [head, middle, tail] = tmpl;
    const [code, text] = args;
    return `${head}${colors[code] || 'orange'}${middle}${text}${tail}`;
};
function highlight(command) {
    return command.replace(/(F|L|R|\d+|\(|\))\1*/g, (text, code, ind, all) => {
        if (/[()]/.test(code)) {
            return code;
        }
        return robotScript `<span style=\"color: ${code}\">${text}</span>`;
    });
}
let a = highlight("FFFR(3)45F2LL"); // => "<span style=\"color: pink\">FFF</span><span style=\"color: green\">R</span><span style=\"color: orange\">345</span><span style=\"color: pink\">F</span><span style=\"color: orange\">2</span><span style=\"color: red\">LL</span>"
console.log({ a });
//# sourceMappingURL=scratch.js.map