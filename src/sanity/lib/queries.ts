import { defineQuery } from 'next-sanity'

// Query for all abouts
export const ABOUTS_QUERY = defineQuery(`*[_type == "abouts"] {
  _id,
  _key,
  title,
  description,
  "imgUrl": imgUrl.asset->url
}`)

// Query for all works
export const WORKS_QUERY = defineQuery(`*[_type == "works"] {
  _id,
  title,
  description,
  projectLink,
  codeLink,
  "imgUrl": imgUrl.asset->url,
  tags
}`)

// Query for all skills
export const SKILLS_QUERY = defineQuery(`*[_type == "skills"] {
  _id,
  name,
  bgColor,
  "icon": icon.asset->url
}`)

// Query for all experiences
export const EXPERIENCES_QUERY = defineQuery(`*[_type == "experiences"] {
  _id,
  year,
  works[] {
    name,
    company,
    desc
  }
}`)
