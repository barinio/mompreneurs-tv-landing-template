import { Octokit } from '@octokit/rest'
import type { ContentJson, SiteEntry } from './types'

function getOctokit() {
  return new Octokit({ auth: process.env.GITHUB_TOKEN })
}

export async function readContentJson(
  owner: string,
  repo: string
): Promise<{ content: ContentJson; sha: string }> {
  const octokit = getOctokit()
  const { data } = await octokit.repos.getContent({ owner, repo, path: 'content.json' })
  if (Array.isArray(data)) {
    throw new Error('content.json is not a file')
  }
  if ('type' in data && data.type !== 'file') {
    throw new Error('content.json is not a file')
  }
  const fileData = data as { content: string; sha: string }
  const decoded = Buffer.from(fileData.content, 'base64').toString('utf-8')
  return { content: JSON.parse(decoded) as ContentJson, sha: fileData.sha }
}

export async function writeContentJson(
  owner: string,
  repo: string,
  content: ContentJson,
  sha: string
): Promise<void> {
  const octokit = getOctokit()
  const encoded = Buffer.from(JSON.stringify(content, null, 2)).toString('base64')
  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: 'content.json',
    message: `Update content via admin — ${new Date().toISOString()}`,
    content: encoded,
    sha,
  })
}

export async function uploadImage(
  owner: string,
  repo: string,
  filename: string,
  base64Data: string,
  existingSha?: string
): Promise<string> {
  const octokit = getOctokit()
  const path = `public/images/${filename}`
  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path,
    message: `Upload image ${filename}`,
    content: base64Data,
    ...(existingSha ? { sha: existingSha } : {}),
  })
  return `/images/${filename}`
}

export async function forkRepo(
  owner: string,
  templateRepo: string,
  newName: string
): Promise<{ name: string; html_url: string }> {
  const octokit = getOctokit()
  const { data } = await octokit.repos.createFork({
    owner,
    repo: templateRepo,
    name: newName,
    default_branch_only: true,
  })
  return { name: data.name, html_url: data.html_url }
}

// Create a new repo from a template repository.
// Unlike forkRepo, this works when target owner == template owner (you can't
// fork your own repo, but you can generate from your own template).
// Requires the template repo to be marked as "Template repository" in Settings.
export async function createFromTemplate(
  templateOwner: string,
  templateRepo: string,
  targetOwner: string,
  newName: string
): Promise<{ name: string; html_url: string }> {
  const octokit = getOctokit()
  const { data } = await octokit.repos.createUsingTemplate({
    template_owner: templateOwner,
    template_repo: templateRepo,
    owner: targetOwner,
    name: newName,
    private: false,
    include_all_branches: false,
  })
  return { name: data.name, html_url: data.html_url }
}

// GitHub creates forks asynchronously — the repo + its files aren't immediately
// queryable. Poll until content.json is readable, then we know the fork is ready.
export async function waitForRepoReady(
  owner: string,
  repo: string,
  maxAttempts = 20,
  intervalMs = 2000
): Promise<void> {
  const octokit = getOctokit()
  for (let i = 0; i < maxAttempts; i++) {
    try {
      await octokit.repos.getContent({ owner, repo, path: 'content.json' })
      return
    } catch {
      if (i === maxAttempts - 1) {
        throw new Error(
          `Fork ${owner}/${repo} not ready after ${(maxAttempts * intervalMs) / 1000}s`
        )
      }
      await new Promise((r) => setTimeout(r, intervalMs))
    }
  }
}

export async function readSitesJson(
  owner: string,
  repo: string
): Promise<{ sites: SiteEntry[]; sha: string }> {
  const octokit = getOctokit()
  try {
    const { data } = await octokit.repos.getContent({ owner, repo, path: 'sites.json' })
    if (Array.isArray(data)) throw new Error()
    if ('type' in data && data.type !== 'file') throw new Error()
    const fileData = data as { content: string; sha: string }
    const decoded = Buffer.from(fileData.content, 'base64').toString('utf-8')
    return { sites: JSON.parse(decoded), sha: fileData.sha }
  } catch {
    return { sites: [], sha: '' }
  }
}

export async function writeSitesJson(
  owner: string,
  repo: string,
  sites: SiteEntry[],
  sha: string
): Promise<void> {
  const octokit = getOctokit()
  const encoded = Buffer.from(JSON.stringify(sites, null, 2)).toString('base64')
  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: 'sites.json',
    message: 'Update sites list',
    content: encoded,
    ...(sha ? { sha } : {}),
  })
}
