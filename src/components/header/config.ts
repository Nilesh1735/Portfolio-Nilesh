import { Link } from "@/types";

// `thumbnail` is left empty where no preview asset ships in /public.
// The nav image component short-circuits on an empty src, so this avoids
// firing a 404 for every link each time the menu opens.
const links: Link[] = [
  {
    title: 'Home',
    href: '/',
    thumbnail: ''
  },
  {
    title: 'Skills',
    href: '/#skills',
    thumbnail: ''
  },
  {
    title: 'Experience',
    href: '/#experience',
    thumbnail: ''
  },
  {
    title: 'Education',
    href: '/#education',
    thumbnail: ''
  },
  {
    title: 'Projects',
    href: '/#projects',
    thumbnail: ''
  },
  {
    title: 'GitHub',
    href: '/#github',
    thumbnail: ''
  },
  {
    title: 'Contact',
    href: '/#contact',
    thumbnail: ''
  }
];

export { links };
