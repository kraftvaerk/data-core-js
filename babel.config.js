module.exports = {
    'presets': [
        ['@babel/env', {
            'modules': false,
            'useBuiltIns': 'usage'
        }]
    ],
    'plugins': [
        '@babel/plugin-syntax-dynamic-import', 
        '@babel/plugin-proposal-object-rest-spread'
    ]
};

