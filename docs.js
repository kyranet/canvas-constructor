const docma = require('docma');
const package = require('./package');

docma.create()
    .build({
        app: {
            title: 'canvasConstructor',
            base: '',
            entrance: 'content:readme',
            routing: 'query',
            server: docma.ServerType.GITHUB
        },
        markdown: {
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: true,
            sanitize: true,
            smartLists: true,
            smartypants: true,
            tasks: true,
            emoji: true
        },
        src: [
            { readme: './README.md' },
            { canvasconstructor: './src/*.js' }
        ],
        dest: './docs',
        debug: true,
        jsdoc: { package: './package.json' },
        template: {
            options: {
                title: package.name,
                navItems: [
                    {
                        label: 'Readme',
                        href: '?content=readme'
                    },
                    {
                        label: 'Documentation',
                        href: '?api=canvasconstructor',
                        iconClass: 'ico-book'
                    },
                    {
                        label: 'GitHub',
                        href: package.homepage,
                        target: '_blank',
                        iconClass: 'ico-md ico-github'
                    }
                ]
            }
        }
    })
    .catch(console.error);
