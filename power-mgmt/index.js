const {NodeSSH} = require('node-ssh')
var wol = require('wake_on_lan')

const ping = require('ping').promise

const express = require('express')

const username = process.env.USERNAME || 'root'
const password = process.env.PASSWORD || 'root'
const port = process.env.PORT || 8080

const shutdown = async (_, ip)=>{
  
  const ssh = new NodeSSH()

  await ssh.connect({
    host: ip,
    username,
    password,
    hostVerifier: ()=>(true)
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
  console.log('booting ', req.params.ip, req.params.mac)
  const {mac, ip} = req.params
  boot(mac, ip).then(()=>{
    res.sendStatus(204)
  }).catch((err)=>{
    console.log('error booting', err)
    res.sendStatus(500)
  })
})

app.post('/:ip/:mac/shutdown', (req, res)=>{
  console.log('shutting down ', req.params.ip, req.params.mac)
  const {mac, ip} = req.params
  shutdown(mac, ip).then(()=>{
    res.sendStatus(204)
  }).catch((err)=>{
    console.log('error shutting down', err)
    res.sendStatus(500)
  })
  
})


app.get('/:ip/:mac/state', (req, res)=>{
  console.log('state requested for ', req.params.ip)
  ping.probe(req.params.ip, {timeout: '1'}).then(({alive})=>{
    if (alive) res.sendStatus(204)
    else res.sendStatus(404)
  }).catch((err) =>{
    console.log(err)
    res.sendStatus(500)
  })
})

app.use('/', (req, res)=>{
  console.log('404', req.url)
  res.sendStatus(404)
})

app.listen(port, ()=>{
  console.log('listening on port: ', port)
})