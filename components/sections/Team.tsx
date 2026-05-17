import type { ContentJson } from '@/lib/types'

type Props = { team: ContentJson['team']; theme: ContentJson['theme'] }

export default function Team({ team, theme }: Props) {
  return (
    <div
      className="container fullContainer noTopMargin padding20-top padding20-bottom padding40H noBorder cornersAll radius0 shadow0 emptySection"
      style={{ paddingTop: 60, paddingBottom: 60, backgroundColor: '#fff' }}
    >
      <div className="containerInner" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>
        <h2
          className="ne elHeadline"
          style={{ textAlign: 'center', fontSize: 32, fontWeight: 700, marginBottom: 40, color: '#1a1a1a' }}
        >
          MEET THE TEAM
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: 24,
          }}
        >
          {team.map((member, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <img
                src={member.imageUrl}
                alt={member.name}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: `3px solid ${theme.primaryColor}`,
                  marginBottom: 10,
                }}
              />
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a' }}>{member.name}</div>
              <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{member.role}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
