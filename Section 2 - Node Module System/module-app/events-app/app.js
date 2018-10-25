const EventEmitter = require('events'); // opening capital on const name tells you that this is a CLASS and NOT A FUNCTION
const emitter = new EventEmitter();

// Register a listener
emitter.on('messageLogged', e => {
  console.log('Listener called');
  console.log(`e (second arguement from emit function): ${e}`)
})

// Raise event
emitter.emit('messageLogged', { id: 1, url: 'http://' }); // emit is 'Making a noise or producing something' - 'messageLogged' from 'emit' needs to match with 'messageLogged' from first arguement of listener 'on'