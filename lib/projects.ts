import fs from "node:fs"
import path from "node:path"

export type ProjectLogo = {
  src: string
  name: string
}

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".svg", ".avif", ".gif"])
const PROJECTS_DIR = path.join(process.cwd(), "public", "images", "projects")

/**
 * Reads every image inside /public/images/projects at build/request time.
 * Drop new logos into that folder and they show up automatically —
 * no need to register them anywhere.
 */
export function getProjectLogos(): ProjectLogo[] {
  let files: string[] = []

  try {
    files = fs.readdirSync(PROJECTS_DIR)
  } catch {
    // Folder doesn't exist yet or can't be read — render nothing gracefully.
    return []
  }

  return files
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => {
      const base = file.replace(/\.[^.]+$/, "")
      const name = base
        .replace(/[-_]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (c) => c.toUpperCase())

      return {
        src: `/images/projects/${file}`,
        name: name || file,
      }
    })
}
