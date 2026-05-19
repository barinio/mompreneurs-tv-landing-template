const VERCEL_API = 'https://api.vercel.com'

function headers() {
  const token = process.env.DEPLOY_VERCEL_TOKEN!
  const teamId = process.env.DEPLOY_VERCEL_TEAM_ID
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...(teamId ? { 'X-Vercel-Team-Id': teamId } : {}),
  }
}

export async function createVercelProject(
  name: string,
  githubOwner: string,
  githubRepo: string
): Promise<{ id: string; name: string }> {
  const res = await fetch(`${VERCEL_API}/v9/projects`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      name,
      framework: 'nextjs',
      gitRepository: {
        type: 'github',
        repo: `${githubOwner}/${githubRepo}`,
      },
    }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data?.error?.message ?? 'Failed to create Vercel project')
  return { id: data.id, name: data.name }
}

export async function setEnvVars(
  projectId: string,
  vars: Record<string, string>
): Promise<void> {
  for (const [key, value] of Object.entries(vars)) {
    const res = await fetch(`${VERCEL_API}/v9/projects/${projectId}/env`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ key, value, type: 'encrypted', target: ['production', 'preview'] }),
    })
    if (!res.ok) {
      const data = await res.json()
      throw new Error(data?.error?.message ?? `Failed to set env var ${key}`)
    }
  }
}

// Vercel accepts either the project ID or its name for deletion. Since we only
// persist the URL (not the project ID), we use the name — which matches the
// site slug and the GitHub repo name 1:1.
export async function deleteVercelProject(nameOrId: string): Promise<void> {
  const res = await fetch(`${VERCEL_API}/v9/projects/${nameOrId}`, {
    method: 'DELETE',
    headers: headers(),
  })
  // 404 is fine — project already gone (e.g. user deleted it via Vercel UI).
  if (!res.ok && res.status !== 404) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data?.error?.message ?? `Failed to delete Vercel project ${nameOrId}`)
  }
}

export async function triggerDeploy(
  projectId: string,
  githubRepo: string,
  repoId: number
): Promise<string> {
  const res = await fetch(`${VERCEL_API}/v13/deployments`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      name: githubRepo,
      gitSource: {
        type: 'github',
        repoId,
        ref: 'main',
      },
      target: 'production',
    }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data?.error?.message ?? 'Failed to trigger deploy')
  return data.url ? `https://${data.url}` : `https://${githubRepo}.vercel.app`
}
