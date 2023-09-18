import { toDisplayPrice } from '@/utils/stringUtils'
import DashboardStatCard from '@/components/DashboardStatCard'

export default function Page() {
  const { orders, revenue } = {
    orders: {
      day: 14,
      week: 72,
      month: 365,
    },
    revenue: {
      day: 4658086,
      week: 72583258,
      month: 365572588,
    },
  }

  return (
    <>
      <div className="grid gap-8">
        <div>
          <h1 className="font-bold mb-6 text-3xl text-center lg:text-left border-b-2">
            Orders
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-16">
            <DashboardStatCard
              title="Today"
              body={orders.day}
              description={`${orders.day} orders today`}
            />
            <DashboardStatCard
              title="This Week"
              body={orders.week}
              description={`${orders.week} orders this week`}
            />
            <DashboardStatCard
              title="This Month"
              body={orders.month}
              description={`${orders.month} orders this month`}
            />
          </div>
        </div>

        <div>
          <h1 className="font-bold mb-6 text-3xl text-center lg:text-left border-b-2">
            Revenue
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-16">
            <DashboardStatCard
              title="Today"
              body={toDisplayPrice(revenue.day / 100)}
              description={`${orders.day} orders today`}
            />
            <DashboardStatCard
              title="This Week"
              body={toDisplayPrice(revenue.week / 100)}
              description={`${orders.week} orders this week`}
            />
            <DashboardStatCard
              title="This Month"
              body={toDisplayPrice(revenue.month / 100)}
              description={`${orders.month} orders this month`}
            />
          </div>
        </div>
      </div>
    </>
  )
}
