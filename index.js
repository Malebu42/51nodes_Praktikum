//const { ethers } = require("ethers") // ethers

import {ethers} from "./ethers-5.6.esm.min.js"

const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")
connectButton.conclick = connect
fundButton.onclick = fund

console.log(ethers)

async function connect() {
    if ( typeof window.ethereum !== "undefined") { //check if windwo.ethereum exist
        await window.ethereum.request({method: "eth_requestAccounts"})
        connectButton.innerHTML = "Connected!"
        console.log("connected")
        console.log("I see a metamask!")

    } else {
        connectButton.innerHTML= "Please install Metamask"
    }
}

async function fund(ethAmount) {
    console.log('Funding with ${ethAmount}...')
    if ( typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
    }
}
