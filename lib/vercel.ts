const VERCEL_API = 'https://api.vercel.com'

function headers() {
  const token = process.env.VERCEL_TOKEN!
  const teamId = process.env.VERCEL_TEAM_ID
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...(teamId ? { 'X-Vercel-Team-Id': teamId } : {}),
  }
}

export async function createVercelProject(
  name: string,
  githubOwner: string,
  githubRepo: string,
  githubToken: string
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

export async function triggerDeploy(projectId: string): Promise<string> {
  const res = await fetch(`${VERCEL_API}/v13/deployments`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ name: projectId, target: 'production' }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data?.error?.message ?? 'Failed to trigger deploy')
  return `https://${data.url}`
}
