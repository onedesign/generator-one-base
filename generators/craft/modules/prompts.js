module.exports = [
  //
  //   Craft License
  //
  //////////////////////////////////////////////////////////////////////
  {
    type: 'confirm',
    name: 'acceptCraftLicense',
    message: 'Do you accept the Craft license? (https://craftcms.com/license)',
    default: true,
    store: true
  },

  //
  //   Optional Craft Plugins
  //
  //////////////////////////////////////////////////////////////////////
  {
    type: 'checkbox',
    name: 'craftPlugins',
    message: 'Which optional plugins do you want installed?',
    choices: [
      {
        name: 'Asset Rev',
        value: 'https://github.com/clubstudioltd/craft-asset-rev',
        checked: true
      },
      {
        name: 'Imager',
        value: 'https://github.com/aelvan/Imager-Craft',
        checked: true
      },
      {
        name: 'Link It',
        value: 'https://github.com/fruitstudios/LinkIt',
        checked: true
      },
      {
        name: 'Minify',
        value: 'nystudio107/minify',
        checked: true
      },
      {
        name: 'Twig Perversion',
        value: 'https://github.com/marionnewlevant/craft-twig_perversion',
        checked: true
      },
      {
        name: 'SEOmatic',
        value: 'nystudio107/seomatic',
        checked: true
      },
      {
        name: 'Super Table',
        value: 'https://github.com/engram-design/SuperTable',
        checked: true
      },
      {
        name: 'Pimp My Matrix',
        value: 'https://github.com/supercool/Pimp-My-Matrix',
        checked: true
      }
    ]
  }
]
