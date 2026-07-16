import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'Home', href: getPermalink('/') },
    { text: 'Experience', href: getPermalink('/#experience') },
    { text: 'Projects', href: getPermalink('/#projects') },
    { text: 'Ask', href: getPermalink('/ask') },
    { text: 'Tech', href: getPermalink('/#tech') },
    { text: 'Skills', href: getPermalink('/#skills') },
    { text: 'Contact', href: getPermalink('/#contact') },
  ],
  actions: [
    { text: 'Resume', href: '/resume/Anthony-Resume.docx' },
    { text: 'GitHub', href: 'https://github.com/ANest58', target: '_blank' },
  ],
};

export const footerData = {
  links: [],
  secondaryLinks: [],
  socialLinks: [{ ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/ANest58' }],
  footNote: `
    Built by <a class="text-teal-700 underline dark:text-teal-300" href="https://github.com/ANest58">Anthony</a> · All rights reserved.
  `,
};
