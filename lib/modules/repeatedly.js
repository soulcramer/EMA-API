ema.repeatedly = (updateTimeInSeconds, func) => {
    func()
    setInterval(func, updateTimeInSeconds * 1000)
}
