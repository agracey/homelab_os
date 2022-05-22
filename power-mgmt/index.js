const {NodeSSH} = require('node-ssh')
var wol = require('wake_on_lan')

const express = require('express')

const username = process.env.USERNAME || 'root'
const password = process.env.PASSWORD || 'root'
const port = process.env.PORT || 8080

const shutdown = async (_, ip)=>{
  
  const ssh = new NodeSSH()

  await ssh.connect({
    host: ip,
    username,
    password
  })

  return ssh.execCommand('shutdown now')
}

const boot = async (mac, ip)=>{
  wol.wake(mac,{address: ip}, function(error) {
    if(error)  {
      console.log('WOL Error:', error) 
      return;
    }
  })
}

const app = express()

app.post('/:ip/:mac/boot', (req, res)=>{
  const {mac, ip} = req.params
  boot(mac, ip).then(()=>{
    res.sendStatus(204)
  }).catch(()=>{
    res.sendStatus(500)
  })

})

app.post('/:ip/:mac/shutdown', (req, res)=>{
  const {mac, ip} = req.params
  shutdown(mac, ip).then(()=>{
    res.sendStatus(204)
  }).catch(()=>{
    res.sendStatus(500)
  })
  
})


app.get('/:ip/:mac/state', (req, res)=>{
  // TODO
  res.send(req.path)
})

app.listen(8080,()=>{
  console.log('listening')
})