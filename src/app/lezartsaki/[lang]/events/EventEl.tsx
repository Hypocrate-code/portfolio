import { Event } from "./EventSection"
import styles from "./EventEl.module.css"

function EventEl({ event, isVertical } : { event : Event, isVertical: boolean }) {
  return (
    <div className={`${styles.event} ${isVertical && styles.vertical}`}>
      <p className={styles.date}>{event.date}</p>
      <p className={styles.artists}>{event.artists}</p>
      <p className={styles.where}>{event.where}</p>
    </div>
  )
}

export default EventEl