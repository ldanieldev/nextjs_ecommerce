type props = {
  title: string
  body: string | number
  description: string
}

export default function DashboardStatCard({ title, body, description }: props) {
  return (
    <div className="stats shadow text-center bg-accent">
      <div className="stat">
        <div className="stat-title">{title}</div>
        <div className="stat-value">{body}</div>
        <div className="stat-desc">{description}</div>
      </div>
    </div>
  )
}
