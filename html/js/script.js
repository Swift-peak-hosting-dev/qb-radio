const QBRadio = {}

document.addEventListener('DOMContentLoaded', () => {
    // Display elements
    const containerEl = document.querySelector('.container')
    const radioContainerEl = document.querySelector('.radio-container')
    const channelEl = document.querySelector('#channel-input')

    // Custom functions
    QBRadio.SlideUp = () => {
        containerEl.style.display = "block";
        const anim = radioContainerEl.animate({
            bottom: ["6vh"]
        }, {
            duration: 250,
            easing: "ease-in",
            iterations: 1
        });

        anim.addEventListener('finish', () => { radioContainerEl.style.bottom = "6vh" })
    }
    QBRadio.SlideDown = () => {
        const anim = radioContainerEl.animate({
            bottom: ["-110vh"]
        }, {
            duration: 400,
            easing: "ease-out",
            iterations: 1
        })

        anim.addEventListener('finish', () => {
            containerEl.style.display = "none"
            radioContainerEl.style.bottom = "-110vh"
        })
    }
    QBRadio.JoinChannel = async() => {
        const channel = parseInt(channelEl.value)

        if (!isNaN(channel)) {
            try {
                const { data } = await axios.post('https://qb-radio/joinRadio', {
                    channel
                })
                const newChannel = parseInt(data.channel)

                channelEl.value = newChannel
                document.activeElement.blur()
                console.log('You join the channel:', newChannel)
            } catch (err) {
                console.error(`Error: ${err.message}`)
            }
        } else {
            console.error('You must provide a valid channel')
        }
    }
    QBRadio.LeaveChannel = async() => {
        const channel = parseInt(channelEl.value)
        if (!isNaN(channel)) {
            try {
                const { data } = await axios.post('https://qb-radio/leaveRadio')

                if (data.status === 'success') {
                    channelEl.value = ''
                }
            } catch (err) {
                console.error(`Error: ${err.message}`)
            }
        } else {
            console.warn('Please join a radio channel before trying to change radio volume')
        }
    }
    QBRadio.VolumeUp = async() => {
        const channel = parseInt(channelEl.value)
        if (!isNaN(channel)) {
            try {
                const { data } = await axios.post('https://qb-radio/volumeUp', {
                    channel
                })

                if (data.status === 'success') {
                    console.info('Successfully increase of radio volume')
                }
            } catch (err) {
                console.error(`Error: ${err.message}`)
            }
        } else {
            console.warn('Please join a radio channel before trying to change radio volume')
        }
    }
    QBRadio.VolumeDown = async() => {
        const channel = parseInt(channelEl.value)
        if (!isNaN(channel)) {
            try {
                const { data } = await axios.post('https://qb-radio/volumeDown', {
                    channel
                })

                if (data.status === 'success') {
                    console.info('Successfully decrease of radio volume')
                }
            } catch (err) {
                console.error(`Error: ${err.message}`)
            }
        } else {
            console.warn('Please join a radio channel before trying to change radio volume')
        }
    }
    QBRadio.ChannelUp = async() => {
        const channel = parseInt(channelEl.value)
        if (!isNaN(channel)) {
            try {
                const { data } = await axios.post('https://qb-radio/increaseradiochannel', {
                    channel
                })
                const newChannel = parseInt(data.channel)
                if (!isNaN(newChannel)) {
                    channelEl.value = newChannel
                    console.log("You join the channel:", newChannel)
                }
            } catch (err) {
                console.error(`Error: ${err.message}`)
            }
        } else {
            console.warn('Please join a radio channel before trying to change channel')
        }
    }
    QBRadio.ChannelDown = async() => {
        const channel = parseInt(channelEl.value)
        if (!isNaN(channel)) {
            try {
                const { data } = await axios.post('https://qb-radio/decreaseradiochannel', {
                    channel
                })
                const newChannel = parseInt(data.channel)
                if (!isNaN(newChannel)) {
                    channelEl.value = newChannel
                    console.log("You join the channel:", newChannel)
                }
            } catch (err) {
                console.error(`Error: ${err.message}`)
            }
        } else {
            console.warn('Please join a radio channel before trying to change channel')
        }
    }
    QBRadio.PowerOff = async() => {
        try {
            await axios.post('https://qb-radio/poweredOff')
            channelEl.value = ''
        } catch (err) {
            console.error(`Error: ${err.message}`)
        }
    }

    document.addEventListener('click', async(ev) => {
        ev.preventDefault()
        const { fn: cb } = ev.target.dataset
        switch (cb) {
            case 'connect':
                await QBRadio.JoinChannel()
                break;
            case 'disconnect':
                await QBRadio.LeaveChannel()
                break;
            case 'volumeUp':
                await QBRadio.VolumeUp()
                break;
            case 'volumeDown':
                await QBRadio.VolumeDown()
                break;
            case 'channelUp':
                await QBRadio.ChannelUp()
                break;
            case 'channelDown':
                await QBRadio.ChannelDown()
                break;
            case 'powerOff':
                await QBRadio.PowerOff()
                break;
            default:
                break;
        }
    })

    window.addEventListener('message', (event) => {
        switch (event.data.type) {
            case 'open':
                QBRadio.SlideUp()
                break;
            case 'close':
                QBRadio.SlideDown()
                break;
            default:
                break;
        }
    });

    document.onkeyup = async(data) => {
        if (data.key == "Escape") { // Escape key
            try {
                await axios.post('https://qb-radio/escape');
            } catch (err) {}

            QBRadio.SlideDown()
        } else if (data.key == "Enter") { // Enter key
            await QBRadio.JoinRadio()
        }
    };
})
