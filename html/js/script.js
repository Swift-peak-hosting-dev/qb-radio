const QBRadio = {}

document.addEventListener('DOMContentLoaded', () => {
    // Controls elements
    const submitEl = document.querySelector('#submit')
    const disconnectEl = document.querySelector('#disconnect')
    const volumeUpEl = document.querySelector('#volumeUp')
    const volumeDownEl = document.querySelector('#volumeDown')
    const decreaseRadioChannelEl = document.querySelector('#decreaseradiochannel')
    const increaseRadioChannelEl = document.querySelector('#increaseradiochannel')
    const poweredOffEl = document.querySelector('#poweredOff')
    const channelEl = document.querySelector('#channel')

    // Display elements
    const containerEl = document.querySelector('.container')
    const radioContainerEl = document.querySelector('.radio-container')

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
    QBRadio.JoinRadio = () => {
        const curChannel = parseInt(channelEl.value)

        if (!isNaN(curChannel)) {
            fetch('https://qb-radio/joinRadio', {
                method: "POST",
                body: JSON.stringify({
                    channel: curChannel
                }),
            }).then(resp => resp.json()).then(resp => {
                const newChannel = parseInt(resp.channel)
                channelEl.value = newChannel
                document.activeElement.blur()
                console.log('You join the channel:', newChannel)
            }).catch(err => console.error(err));
        }
    }
    QBRadio.LeaveRadio = () => {
        const curChannel = parseInt(channelEl.value)
        if (!isNaN(curChannel)) {
            fetch('https://qb-radio/leaveRadio', {
                method: "POST",
                body: {}
            }).then(resp => resp.json()).then(resp => {
                if (resp.status === 'success') {
                    channelEl.value = ''
                    console.info('You leave the radio channel')
                }
            }).catch(err => console.error(err))
        }
    }
    QBRadio.VolumeUp = () => {
        const curChannel = parseInt(channelEl.value)
        if (!isNaN(curChannel)) {
            fetch('https://qb-radio/volumeUp', {
                method: "POST",
                body: JSON.stringify({
                    channel: curChannel
                }).then(resp => resp.json()).then(resp => {
                    if (resp.status === 'success') {
                        console.info('Radio volume increased')
                    }
                }).catch(err => console.error(err))
            });
        }
    }
    QBRadio.volumeDown = () => {
        const curChannel = parseInt(channelEl.value)
        if (!isNaN(curChannel)) {
            console.info('Decrease radio volume')
            fetch('https://qb-radio/volumeDown', {
                body: JSON.stringify({
                    channel: curChannel
                })
            }).then(resp => resp.json()).then(resp => {
                if (resp.status === 'success') {
                    console.info('Radio volume increased')
                }
            }).catch(err => console.error(err));
        }
    }
    QBRadio.IncreaseRadioChannel = () => {
        const curChannel = parseInt(channelEl.value)
        if (!isNaN(curChannel)) {
            fetch('https://qb-radio/increaseradiochannel', {
                method: "POST",
                body: JSON.stringify({
                    channel: curChannel
                }).then(resp => resp.json()).then(resp => {
                    if (isNaN(parseInt(resp.channel))) {
                        channelEl.value = parseInt(resp.channel)
                        console.log("You join the channel:", resp.channel)
                    }
                }).catch(err => console.error(err))
            });
        } else {
            console.warn('Please join a radio frequency first')
        }
    }
    QBRadio.DecreaseRadioChannel = () => {
        const curChannel = parseInt(channelEl.value)
        if (!isNaN(curChannel)) {
            fetch('https://qb-radio/decreaseradiochannel', {
                method: "POST",
                body: JSON.stringify({
                    channel: curChannel
                }).then(resp => resp.json()).then(resp => {
                    if (isNaN(parseInt(resp.channel))) {
                        channelEl.value = parseInt(resp.channel)
                        console.log("You join the channel:", resp.channel)
                    }
                }).catch(err => console.error(err))
            });
        } else {
            console.warn('Please join a radio frequency first')
        }
    }
    QBRadio.PoweredOff = async() => {
        channelEl.value = ''
        await fetch('https://qb-radio/poweredOff', {
            method: "POST",
            body: JSON.stringify({
                channel: channelEl.value
            })
        }).then(resp => resp.json()).then(resp => {
            if (resp.status === 'success') {
                console.info('Radio volume increased')
            }
        }).catch(err => console.error(err));
    }

    // Event listeners
    submitEl.addEventListener('click', async(event) => {
        event.preventDefault();
        await QBRadio.JoinRadio()
    });

    disconnectEl.addEventListener('click', async(event) => {
        event.preventDefault();
        await QBRadio.LeaveRadio()
    });

    volumeUpEl.addEventListener('click', async(event) => {
        event.preventDefault();

        await QBRadio.VolumeUp()
    });

    volumeDownEl.addEventListener('click', async(event) => {
        event.preventDefault();

        await QBRadio.volumeDown()
    });

    increaseRadioChannelEl.addEventListener('click', async(event) => {
        event.preventDefault();

        await QBRadio.IncreaseRadioChannel()
    });

    decreaseRadioChannelEl.addEventListener('click', async(event) => {
        event.preventDefault();

        await QBRadio.DecreaseRadioChannel()
    });

    poweredOffEl.addEventListener('click', async(event) => {
        event.preventDefault();

        await QBRadio.PoweredOff()
    });

    window.addEventListener('message', (event) => {
        switch (event.data.type) {
            case 'open':
                QBRadio.SlideUp()
                maxFrequency = parseInt(event.data.maxFrequency)
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
            QBRadio.SlideDown()
            await fetch('https://qb-radio/escape', {
                method: "POST",
                body: {}
            });
        } else if (data.key == "Enter") { // Enter key
            await QBRadio.JoinRadio()
        }
    };
})
