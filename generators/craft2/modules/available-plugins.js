/**
 * This is a list of Craft plugins that can be installed in Craft2.
 * Don't put one in this list unless it should be commonly used across projects.
 *
 * pluginKey: {
 *   name: 'Example Plugin', // Name to show in generator prompt
 *   githubName: 'oneExample', // github zip files extract as <githubName>-<branch>/<pluginKey>
 *   src: '', // Either the composer name or a github base URL
 *   branch: 'master', // Which branch to download. Only used if `src` is a Github URL.
 *   checked: true // Whether this should be checked as a prompt option by default
 * }
 *
 * @type {Object}
 */
module.exports = {
  assetrev: {
    name: 'Asset Rev',
    githubName: 'craft-asset-rev',
    src: 'https://github.com/clubstudioltd/craft-asset-rev/',
    branch: 'v5',
    checked: true
  },
  imager: {
    name: 'Imager',
    githubName: 'Imager-Craft',
    src: 'https://github.com/aelvan/Imager-Craft/',
    branch: 'master',
    checked: true
  },
  fruitlinkit: {
    name: 'Link It',
    githubName: 'LinkIt',
    src: 'https://github.com/fruitstudios/LinkIt/',
    branch: 'master',
    checked: true
  },
  mntwigperversion: {
    name: 'Twig Perversion',
    githubName: 'craft-twig_perversion',
    src: 'https://github.com/marionnewlevant/craft-twig_perversion/',
    branch: 'v1',
    checked: true
  },
  supertable: {
    name: 'Super Table',
    githubName: 'SuperTable',
    src: 'https://github.com/verbb/SuperTable/',
    branch: 'craft-2',
    checked: true
  },
  pimpmymatrix: {
    name: 'Pimp My Matrix',
    githubName: 'Pimp-My-Matrix',
    src: 'https://github.com/supercool/Pimp-My-Matrix/',
    branch: 'master',
    checked: true
  },
  seomatic: {
    name: 'SEOmatic',
    githubName: '',
    src: 'nystudio107/seomatic',
    checked: true
  },
  minify: {
    name: 'Minify',
    githubName: '',
    src: 'nystudio107/minify',
    checked: true
  },
  retour: {
    name: 'Retour',
    githubName: '',
    src: 'nystudio107/retour',
    checked: true
  },
  environmentlabel: {
    name: 'Craft Environment Label',
    githubName: 'craft.labelenvironment',
    src: 'https://github.com/madebykind/craft.labelenvironment/',
    branch: 'master',
    checked: true
  },
  dotenv: {
    name: 'PHP dotenv',
    githubName: 'phpdotenv',
    src: 'vlucas/phpdotenv',
    checked: true
  }
};
