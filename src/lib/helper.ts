export const convertTimeTo24h = (time: string): string => {
    const timeArray = time.split(' ')
    const [timeString, meridiem] = timeArray
    const [hours, minutes] = timeString.split(':')
    let hour = parseInt(hours)

    if (meridiem === 'PM' && hour !== 12) {
        hour += 12
    } else if (meridiem === 'AM' && hour === 12) {
        hour = 0
    }

    const formattedTime = `${hour.toString().padStart(2, '0')}:${minutes}`

    return formattedTime

}   