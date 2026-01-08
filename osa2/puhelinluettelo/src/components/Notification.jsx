const Notification = ({ message, notificationState }) => {
    if (message === null) {
        return null
    }

    const className = notificationState === true ? 'notification' : 'error'

    return (
        <div className={className}>
            {message}
        </div>
    )
}

export default Notification