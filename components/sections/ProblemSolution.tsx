import type { ContentJson } from '@/lib/types'

type Props = { problemSolution: ContentJson['problemSolution'] }

export default function ProblemSolution({ problemSolution }: Props) {
  return (
    <div
      className="container fullContainer noTopMargin padding20-top padding20-bottom padding40H noBorder cornersAll radius0 shadow0 emptySection"
      style={{ paddingTop: 60, paddingBottom: 60, backgroundColor: '#fff' }}
    >
      <div className="containerInner" style={{ maxWidth: 780, margin: '0 auto' }}>
        <div className="row" style={{ padding: '0 20px' }}>
          {problemSolution.body.split('\n\n').map((paragraph, i) => (
            <p
              key={i}
              style={{ fontSize: 17, lineHeight: 1.8, color: '#333', margin: '0 0 20px 0' }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
