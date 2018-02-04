module.exports = {
  'susy': `

  // ---------------------------------------------------------------
  // Susy Config
  // ---------------------------------------------------------------
  $susy: (
    output: float,
    container: auto,
    columns: 12,
    gutters: 0.28,
    global-box-sizing: border-box,
    debug: (
      image: hide,
      color: rgba(#66f, 0.25),
      output: background,
      toggle: top right,
    ),
    use-custom: (
      background-image: true,
      background-options: false,
      box-sizing: true,
      clearfix: false,
      rem: false,
    )
  );
  `,
  'sass-mq': `

  // ---------------------------------------------------------------
  // Sass MQ
  // ---------------------------------------------------------------
  $mq-responsive: true;
  $mq-static-breakpoint: large;
  $mq-breakpoints: (
    small: 500px,
    medium: 768px,
    large: 1024px,
    xlarge: 1280px
  );
  `,
  'one-sass-toolkit': `

  // ---------------------------------------------------------------
  // One Sass Toolkit
  // ---------------------------------------------------------------

  // ---------------------------------------------------------------
  // Colors
  // ---------------------------------------------------------------
  $colors: (
    black: #333,
    white: #fff
  );

  // ---------------------------------------------------------------
  // Spacing
  // ---------------------------------------------------------------
  $spacing: (
    none: rem(0),
    xs: rem(20),
    s: rem(30),
    sm: rem(40),
    m: rem(50),
    ml: rem(60),
    l: rem(85),
    xl: rem(150)
  );

  // ---------------------------------------------------------------
  // Type – Font Stacks
  // ---------------------------------------------------------------
  $font-stacks: (
    helvetica: (
      font-family: ('Helvetica Neue', arial, sans-serif),
      font-weight: normal,
      font-style: normal
    )
  );


  // ---------------------------------------------------------------
  // Type – Styles
  // ---------------------------------------------------------------
  /*
    Map that contains all of the type styles used across the site.
    New styles should always be added to this map and never as
    one off instances elsewhere in the codebase.

    The name for the top level keys should be comprised of the
    font style and desktop/largest size.

    The 'stack' key correlates to the $font-stacks map above.

    Sizes Map: The nested 'sizes' map corelates to the sizes across breakpoints.
    The default being the base size and others being defined across
    breakpoints. The names (small, medium, large, etc.) correlate to
    the $mq-breakpoints map defined in the _base/_variables.scss file.

    Supports additional properties in a 'properties' key.

    See typograhpic styleguide for a list of available styles:
    /styleguide/typography
  */

  $type-styles: (
    a: (
      stack: helvetica,
      font-smoothing: false,
      sizes: (
        default: 13,
        medium: 27
      ),
      properties: (
        line-height: 1.8,
        text-transform: normal,
        letter-spacing: 0
      )
    )
  );
  `
};
