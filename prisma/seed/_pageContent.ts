import { WatershedPageData } from '~/config/puck.config';

type SeedContent = {
  en: WatershedPageData;
  nl: WatershedPageData;
  pap: WatershedPageData;
};

export const home: SeedContent = {
  en: {
    root: {
      props: {
        title: 'Hoofdpagina',
        titleIsHidden: true,
        summary: 'De hoofdpagina van de website',
        slug: 'home',
        meta: {
          title: 'Hoofdpagina | Stichting Watershed',
          description: 'Welkom bij Stichting Watershed',
        },
      },
    },
    content: [
      {
        type: 'RichTextBlock',
        props: {
          id: 'RichTextBlock-1e26219b-ab6f-4eb8-8190-411079bf5f3f',
          content:
            '<p style="text-align: center;"><em>Pfffkrrt— ... plop! ...&nbsp;</em><br><em>schhhhhh ...</em><br><br><em>Ja? Hallo?</em></p><p style="text-align: center;"><em>Staat dit ding aan?</em></p><p style="text-align: center;"><em>ss</em></p>',
        },
      },
      {
        type: 'BackgroundBlock',
        props: {
          id: 'BackgroundBlock-a9b9303e-ca1b-4c71-b524-16a6016d78e9',
          color: 'pink',
          content: [
            {
              type: 'UpcomingEventsBlock',
              props: {
                id: 'UpcomingEventsBlock-c43602a2-74b6-47c8-a9c3-431f18cfd99a',
              },
            },
          ],
        },
      },
    ],
  },
  nl: {
    root: {
      props: {
        title: 'Hoofdpagina',
        titleIsHidden: true,
        summary: 'De hoofdpagina van de website',
        slug: 'home',
        meta: {
          title: 'Hoofdpagina | Stichting Watershed',
          description: 'Welkom bij Stichting Watershed',
        },
      },
    },
    content: [
      {
        type: 'RichTextBlock',
        props: {
          id: 'RichTextBlock-1e26219b-ab6f-4eb8-8190-411079bf5f3f',
          content:
            '<p style="text-align: center;"><em>Pfffkrrt— ... plop! ...&nbsp;</em><br><em>schhhhhh ...</em><br><br><em>Ja? Hallo?</em></p><p style="text-align: center;"><em>Staat dit ding aan?</em></p><p style="text-align: center;"><em>ss</em></p>',
        },
      },
      {
        type: 'BackgroundBlock',
        props: {
          id: 'BackgroundBlock-a9b9303e-ca1b-4c71-b524-16a6016d78e9',
          color: 'pink',
          content: [
            {
              type: 'UpcomingEventsBlock',
              props: {
                id: 'UpcomingEventsBlock-c43602a2-74b6-47c8-a9c3-431f18cfd99a',
              },
            },
          ],
        },
      },
    ],
  },
  pap: {
    root: {
      props: {
        title: 'Hoofdpagina',
        titleIsHidden: true,
        summary: 'De hoofdpagina van de website',
        slug: 'home',
        meta: {
          title: 'Hoofdpagina | Stichting Watershed',
          description: 'Welkom bij Stichting Watershed',
        },
      },
    },
    content: [
      {
        type: 'RichTextBlock',
        props: {
          id: 'RichTextBlock-1e26219b-ab6f-4eb8-8190-411079bf5f3f',
          content:
            '<p style="text-align: center;"><em>Pfffkrrt— ... plop! ...&nbsp;</em><br><em>schhhhhh ...</em><br><br><em>Ja? Hallo?</em></p><p style="text-align: center;"><em>Staat dit ding aan?</em></p><p style="text-align: center;"><em>ss</em></p>',
        },
      },
      {
        type: 'BackgroundBlock',
        props: {
          id: 'BackgroundBlock-a9b9303e-ca1b-4c71-b524-16a6016d78e9',
          color: 'pink',
          content: [
            {
              type: 'UpcomingEventsBlock',
              props: {
                id: 'UpcomingEventsBlock-c43602a2-74b6-47c8-a9c3-431f18cfd99a',
              },
            },
          ],
        },
      },
    ],
  },
};

export const about: SeedContent = {
  en: {
    root: {
      props: {
        title: 'About Our Organization',
        titleIsHidden: false,
        summary: 'This is the about us page',
        slug: 'about',
        meta: {
          title: 'About Our Organization | Stichting Watershed',
          description: 'Learn more about our organization',
        },
      },
    },
    content: [
      {
        type: 'RichTextBlock',
        props: {
          id: 'RichText-c8a0073a-9d67-4b30-8f31-281a76dedaa31122',
          content:
            '<p>We are an organization committed to excellence. Founded in 2010, we have been serving our community for many years.</p>',
        },
      },
      {
        type: 'HeadingBlock',
        props: {
          id: 'Heading-169403298449711',
          text: 'Team',
          align: 'center',
          level: 2,
        },
      },
      {
        type: 'RichTextBlock',
        props: {
          id: 'RichText-c8a0073a-9d67-4b30-8f31-281a76dedaa3112244',
          content:
            '<p>Our team consists of dedicated professionals who are passionate about their work.</p>',
        },
      },
    ],
  },
  nl: {
    root: {
      props: {
        title: 'Over Ons',
        titleIsHidden: false,
        summary: 'Dit is de over ons pagina',
        slug: 'over-ons',
        meta: {
          title: 'Over ons | Stichting Watershed',
          description: 'Leer meer over onze organisatie',
        },
      },
    },
    content: [
      {
        type: 'RichTextBlock',
        props: {
          id: 'RichText-c8a0073a-9d67-4b30-8f31-281a76dedaa31122',
          content:
            '<p>Wij zijn een organisatie die zich inzet voor uitmuntendheid. Opgericht in 2010, dienen we onze gemeenschap al vele jaren.</p>',
        },
      },
      {
        type: 'HeadingBlock',
        props: {
          id: 'Heading-169403298449711',
          text: 'Ons team',
          align: 'center',
          level: 2,
        },
      },
      {
        type: 'RichTextBlock',
        props: {
          id: 'RichText-c8a0073a-9d67-4b30-8f31-281a76dedaa3112266',
          content:
            '<p>Ons team bestaat uit toegewijde professionals die gepassioneerd zijn over hun werk.</p>',
        },
      },
    ],
  },
  pap: {
    root: {
      props: {
        title: 'Tokante Nos',
        titleIsHidden: false,
        summary: 'Welcome to our website',
        slug: 'tokante-nos',
        meta: {
          title: 'Home | Stichting Watershed',
          description: 'This is our homepage.',
        },
      },
    },
    content: [
      {
        type: 'HeadingBlock',
        props: {
          id: 'Heading-169403298449711',
          text: 'Tokante Nos Organisashon',
          align: 'center',
          level: 1,
        },
      },
      {
        type: 'RichTextBlock',
        props: {
          id: 'RichText-c8a0073a-9d67-4b30-8f31-281a76dedaa31122',
          content:
            '<p>Nos ta un organisashon ku ta komitido na ekselensia. Fundá den 2010, nos ta sirbi nos komunidat pa hopi aña.</p><p>Nos team ta konsistí di profesonal ku ta dediká i ku ta pasioná riba nan trabou.</p>',
        },
      },
    ],
  },
};

export const contact: SeedContent = {
  en: {
    root: {
      props: {
        title: 'Contact Us',
        titleIsHidden: false,
        summary: 'This is the contact us page',
        slug: 'contact',
        meta: {
          title: 'Contact us | Stichting Watershed',
          description: 'Get in touch with us',
        },
      },
    },
    content: [
      {
        type: 'RichTextBlock',
        props: {
          id: 'RichText-c8a0073a-9d67-4b30-8f31-281a76dedaa31122334477',
          content:
            '<p>Email: info@example.com</p><p>Phone: +1 234 567 890</p><p>Address: 123 Main Street, City, Country</p>',
        },
      },
    ],
  },
  nl: {
    root: {
      props: {
        title: 'Neem contact op',
        titleIsHidden: false,
        summary: 'Dit is de contactpagina',
        slug: 'contact',
        meta: {
          title: 'Neem contact op | Stichting Watershed',
          description: 'Neem contact met ons op',
        },
      },
    },
    content: [
      {
        type: 'RichTextBlock',
        props: {
          id: 'RichText-c8a0073a-9d67-4b30-8f31-281a76dedaa31122334477',
          content:
            '<p>Email: info@example.com</p><p>Phone: +1 234 567 890</p><p>Address: 123 Main Street, City, Country</p>',
        },
      },
    ],
  },
  pap: {
    root: {
      props: {
        title: 'Kontakto Ku Nos',
        titleIsHidden: false,
        summary: 'Welcome to our website',
        slug: 'kontakto-ku-nos',
        meta: {
          title: 'Home | Stichting Watershed',
          description: 'This is our homepage.',
        },
      },
    },
    content: [
      {
        type: 'HeadingBlock',
        props: {
          id: 'Heading-1694032984497113344',
          text: 'Contact Us',
          align: 'center',
          level: 1,
        },
      },
      {
        type: 'RichTextBlock',
        props: {
          id: 'RichText-c8a0073a-9d67-4b30-8f31-281a76dedaa31122334477',
          content:
            '<p>Email: info@example.com</p><p>Phone: +1 234 567 890</p><p>Address: 123 Main Street, City, Country</p>',
        },
      },
    ],
  },
};
