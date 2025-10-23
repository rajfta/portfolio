// GROQ query result types
export type AboutItem = {
  _id: string
  _key?: string
  title: string
  description: string
  imgUrl: string
}

export type WorkItem = {
  _id: string
  title: string
  description: string
  projectLink?: string
  codeLink?: string
  imgUrl: string
  tags: string[]
}

export type SkillItem = {
  _id: string
  name: string
  bgColor: string
  icon: string
}

export type ExperienceWork = {
  name: string
  company: string
  desc: string
}

export type ExperienceItem = {
  _id: string
  year: string
  works: ExperienceWork[]
}

export type AboutsType = AboutItem[]
export type WorksType = WorkItem[]
export type SkillsType = {
  experiences: ExperienceItem[]
  skills: SkillItem[]
}
