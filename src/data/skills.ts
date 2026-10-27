import java from 'devicon/icons/java/java-original.svg'
import javascript from 'devicon/icons/javascript/javascript-original.svg'
import python from 'devicon/icons/python/python-original.svg'
import c from 'devicon/icons/c/c-original.svg'
import html5 from 'devicon/icons/html5/html5-original.svg'
import css3 from 'devicon/icons/css3/css3-original.svg'
import react from 'devicon/icons/react/react-original.svg'
import nodejs from 'devicon/icons/nodejs/nodejs-original.svg'
import express from 'devicon/icons/express/express-original.svg'
import mysql from 'devicon/icons/mysql/mysql-original.svg'
import postgresql from 'devicon/icons/postgresql/postgresql-original.svg'
import git from 'devicon/icons/git/git-original.svg'
import github from 'devicon/icons/github/github-original.svg'
import npm from 'devicon/icons/npm/npm-original-wordmark.svg'
import numpy from 'devicon/icons/numpy/numpy-original.svg'
import pandas from 'devicon/icons/pandas/pandas-original.svg'
import matplotlib from 'devicon/icons/matplotlib/matplotlib-original.svg'
import prisma from 'devicon/icons/prisma/prisma-original.svg'
import typescript from 'devicon/icons/typescript/typescript-original.svg'
import eclipse from 'devicon/icons/eclipse/eclipse-original.svg'
import seaborn from '../assets/seaborn.svg'

export interface Skill {
  name: string
  icon: string
  note: string
}

export interface SkillGroup {
  title: string
  blurb: string
  tint: string
  /** Grid placement in the bento layout. */
  span: string
  skills: Skill[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    blurb: 'The ones I think in.',
    tint: '#ece6ff',
    span: 'md:col-span-2 lg:col-span-4',
    skills: [
      { name: 'Java', icon: java, note: 'Object-oriented programming' },
      { name: 'JavaScript', icon: javascript, note: 'The language of the web' },
      { name: 'Python', icon: python, note: 'Scripting & data work' },
      { name: 'C', icon: c, note: 'Close to the metal' },
    ],
  },
  {
    title: 'Frontend',
    blurb: 'What people see and touch.',
    tint: '#ffe3ec',
    span: 'lg:col-span-2',
    skills: [
      { name: 'HTML5', icon: html5, note: 'Semantic structure' },
      { name: 'CSS', icon: css3, note: 'Layout & styling' },
      { name: 'React.js', icon: react, note: 'Component-based UIs' },
    ],
  },
  {
    title: 'Backend',
    blurb: 'Where the logic lives.',
    tint: '#dcf5ea',
    span: 'lg:col-span-2',
    skills: [
      { name: 'Node.js', icon: nodejs, note: 'JavaScript on the server' },
      { name: 'Express.js', icon: express, note: 'REST APIs' },
    ],
  },
  {
    title: 'Databases',
    blurb: 'Where the data rests.',
    tint: '#dcefff',
    span: 'lg:col-span-2',
    skills: [
      { name: 'MySQL', icon: mysql, note: 'Relational database' },
      { name: 'PostgreSQL', icon: postgresql, note: 'Relational database' },
    ],
  },
  {
    title: 'ORM',
    blurb: 'Typed bridges to data.',
    tint: '#f1eff4',
    span: 'lg:col-span-2',
    skills: [{ name: 'Prisma', icon: prisma, note: 'Type-safe database access' }],
  },
  {
    title: 'Libraries',
    blurb: 'For crunching and charting data.',
    tint: '#ffe8d8',
    span: 'md:col-span-2 lg:col-span-3',
    skills: [
      { name: 'NumPy', icon: numpy, note: 'Numerical computing' },
      { name: 'Pandas', icon: pandas, note: 'Data analysis' },
      { name: 'Matplotlib', icon: matplotlib, note: 'Plotting' },
      { name: 'Seaborn', icon: seaborn, note: 'Statistical visualisation' },
    ],
  },
  {
    title: 'Tools',
    blurb: 'The everyday kit.',
    tint: '#fff4d9',
    span: 'md:col-span-2 lg:col-span-3',
    skills: [
      { name: 'Git', icon: git, note: 'Version control' },
      { name: 'GitHub', icon: github, note: 'Code hosting & collaboration' },
      { name: 'npm', icon: npm, note: 'Package management' },
    ],
  },
]

/** Logos for project tech badges. */
export const techIcons: Record<string, string> = {
  React: react,
  'Node.js': nodejs,
  Express: express,
  PostgreSQL: postgresql,
  Prisma: prisma,
  HTML: html5,
  CSS: css3,
  JavaScript: javascript,
  Java: java,
  MySQL: mysql,
  TypeScript: typescript,
  Eclipse: eclipse,
}
