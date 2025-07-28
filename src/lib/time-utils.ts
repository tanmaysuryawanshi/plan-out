export function parseEffectiveHours(effective: string): number {
  const match = effective.match(/(\d+)h\s*(\d*)m?/i);
  const hours = parseInt(match?.[1] || '0', 10);
  const minutes = parseInt(match?.[2] || '0', 10);
  return hours * 60 + minutes;
}

export function parseTimeToDate(timeStr: string): Date {
  const now = new Date();
  const [timePart, modifier] = timeStr.trim().split(' ');
  const [hoursStr, minutesStr] = timePart.split(':');
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  if (modifier.toUpperCase() === 'PM' && hours !== 12) hours += 12;
  if (modifier.toUpperCase() === 'AM' && hours === 12) hours = 0;

  const date = new Date(now);
  date.setHours(hours, minutes, 0, 0); // Zero out seconds
  return date;
}

export function getLeaveTime(punchInTimeStr: string, effectiveHoursStr: string): string {
  const totalRequiredMinutes = 8 * 60;
  const alreadyWorkedMinutes = parseEffectiveHours(effectiveHoursStr);
  const remainingMinutes = totalRequiredMinutes - alreadyWorkedMinutes;

  if (remainingMinutes <= 0) {
    return '✅ You can leave now or relax until 9:00 PM';
  }

  const punchIn = parseTimeToDate(punchInTimeStr);
  const leaveTime = new Date(punchIn.getTime() + remainingMinutes * 60 * 1000);

  const formatted = leaveTime.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });

  return `🕒 You can leave at ${formatted}`;
}
