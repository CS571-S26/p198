const monthFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
})

export function buildMonthYearOptions(monthCount = 24) {
  const options = []
  const start = new Date()
  start.setDate(1)

  for (let i = 0; i < monthCount; i += 1) {
    const date = new Date(start.getFullYear(), start.getMonth() + i, 1)
    options.push(monthFormatter.format(date))
  }

  return options
}
